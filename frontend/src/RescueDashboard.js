import React,
{
  useEffect,
  useState
}
from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function RescueDashboard() {

  const navigate = useNavigate();

  const [reports, setReports] =
    useState([]);

  const [alerts, setAlerts] =
    useState([]);

  /* ================= LOGOUT ================= */

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    navigate("/");

  };

  /* ================= AUTH CHECK ================= */

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      navigate("/login");

    }

  }, [navigate]);

  /* ================= AUTO REFRESH ================= */

  useEffect(() => {

    fetchReports();
    fetchAlerts();

    const interval =
      setInterval(() => {

        fetchReports();
        fetchAlerts();

      }, 5000);

    return () =>
      clearInterval(interval);

  }, []);

  /* ================= FETCH REPORTS ================= */

  const fetchReports =
    async () => {

      try {

        const res =
          await axios.get(
"https://disaster-management-response-system.onrender.com/api/reports"
          );

        setReports(res.data);

      }

      catch (error) {

        console.log(
          "Fetch Reports Error:",
          error
        );

      }

    };

  /* ================= FETCH ALERTS ================= */

  const fetchAlerts =
    async () => {

      try {

        const res =
          await axios.get(
"https://disaster-management-response-system.onrender.com/api/alerts"
          );

        setAlerts(res.data);

      }

      catch (error) {

        console.log(
          "Fetch Alerts Error:",
          error
        );

      }

    };

  /* ================= UPDATE REPORT STATUS ================= */

  const updateReportStatus =
    async (id, status) => {

      try {

        console.log(
          "Updating:",
          id,
          status
        );

        await axios.put(

"https://disaster-management-response-system.onrender.com/api/reports/" +
id +
"/status",

          { status }

        );

        /* Refresh after update */

        setTimeout(() => {

          fetchReports();

        }, 500);

      }

      catch (error) {

        console.log(
          "Status Update Error:",
          error
        );

        alert(
          "Status update failed"
        );

      }

    };

  /* ================= UPDATE ALERT STATUS ================= */

  const updateAlertStatus =
    async (id, status) => {

      try {

        await axios.put(

"https://disaster-management-response-system.onrender.com/api/alerts/" +
id +
"/status",

          { status }

        );

        fetchAlerts();

      }

      catch (error) {

        console.log(
          "Alert Update Error:",
          error
        );

      }

    };

  return (

<div style={styles.wrapper}>

<div style={styles.overlay}></div>

<div style={styles.container}>

{/* LOGOUT */}

<div style={styles.logoutContainer}>

<button
style={styles.logoutBtn}
onClick={handleLogout}
>

Logout

</button>

</div>

<h1 style={styles.title}>
🚑 Rescue Dashboard
</h1>

{/* ================= ALERTS ================= */}

<h2 style={styles.alertTitle}>
🚨 Emergency Alerts
</h2>

{alerts.length === 0 ? (

<p>No emergency alerts</p>

) : (

alerts.map((alert) => (

<div
key={alert._id}

style={{
...styles.alertCard,

borderLeft:
alert.status === "Completed"
? "6px solid green"
: "6px solid red"
}}
>

<h3>{alert.message}</h3>

<p>
🔥 Type:
<strong>
{alert.disasterType}
</strong>
</p>

<p>
📍 Location:
{alert.location || "Not specified"}
</p>

<p>
Status:
<strong>
{alert.status || "Active"}
</strong>
</p>

{alert.status !== "Completed" && (

<button
style={styles.completeBtn}

onClick={() =>
updateAlertStatus(
alert._id,
"Completed"
)
}
>

✅ Mark Completed

</button>

)}

</div>

))

)}

<hr style={{ margin: "30px 0" }} />

{/* ================= REPORTS ================= */}

<h2>
📋 All Reports
</h2>

{reports.length === 0 ? (

<p>No reports available</p>

) : (

reports.map((report) => (

<div
key={report._id}

style={styles.reportCard}
>

<h3>
🚨 {report.type}
</h3>

<p>
📍 Location:
{report.location}
</p>

<p>
📝 {report.description}
</p>

{report.image && (

<img
src={
"https://disaster-management-response-system.onrender.com" +
report.image
}
alt="Report"
style={styles.image}
/>

)}

<p>
Status:
<strong>
{report.status}
</strong>
</p>

<select

value={report.status}

onChange={(e) =>

updateReportStatus(
report._id,
e.target.value
)

}

style={styles.dropdown}

>

<option value="Pending">
Pending
</option>

<option value="In Progress">
In Progress
</option>

<option value="Resolved">
Resolved
</option>

</select>

</div>

))

)}

</div>

</div>

  );

}

/* ================= STYLES ================= */

const styles = {

wrapper: {

minHeight: "100vh",

backgroundImage:
"linear-gradient(rgba(0,0,0,0.78), rgba(0,0,0,0.95)), url('/images/bg-disaster.png')",

backgroundSize: "cover",

backgroundPosition: "center",

backgroundRepeat: "no-repeat",

backgroundAttachment: "fixed",

position: "relative"

},

overlay: {

position: "absolute",

width: "100%",
height: "100%",

background:
"radial-gradient(circle at center, rgba(255,69,0,0.25), rgba(0,0,0,0.95))",

backdropFilter: "blur(2px)"

},

container: {

position: "relative",

zIndex: "2",

padding: "20px",

color: "white"

},

logoutContainer: {

display: "flex",

justifyContent: "flex-end",

marginBottom: "10px"

},

logoutBtn: {

background:
"linear-gradient(45deg,#ff0000,#ff4500)",

color: "white",

border: "none",

padding: "8px 15px",

cursor: "pointer",

borderRadius: "5px"

},

title: {

marginBottom: "20px",

color: "#ff4500"

},

alertTitle: {

color: "#ffc107"

},

alertCard: {

background:
"rgba(0,0,0,0.65)",

padding: "15px",

marginBottom: "10px",

borderRadius: "8px",

boxShadow:
"0 0 15px rgba(255,69,0,0.5)"

},

reportCard: {

padding: "15px",

marginBottom: "12px",

background:
"rgba(0,0,0,0.65)",

borderRadius: "8px",

boxShadow:
"0 0 10px rgba(255,69,0,0.4)"

},

dropdown: {

marginTop: "10px",

padding: "6px",

borderRadius: "5px"

},

image: {

width: "100%",

maxHeight: "200px",

objectFit: "cover",

marginTop: "10px",

borderRadius: "8px"

},

completeBtn: {

marginTop: "10px",

padding: "6px 12px",

background: "green",

color: "white",

border: "none",

cursor: "pointer",

borderRadius: "5px"

}

};

export default RescueDashboard;