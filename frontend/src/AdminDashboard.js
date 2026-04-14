import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {

  const navigate = useNavigate();

  /* ================= LOGOUT FUNCTION ================= */

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    navigate("/");

  };

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0
  });

  /* ================= FETCH STATS ================= */

  useEffect(() => {

    fetchStats();

    const interval = setInterval(() => {
      fetchStats();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const fetchStats = async () => {

    try {

      const res = await axios.get(
        "https://disaster-management-response-system.onrender.com/api/admin/stats"
      );

      setStats(res.data);

    }

    catch (error) {

      console.log(error);

    }

  };

  return (

<div style={styles.wrapper}>

<div style={styles.overlay}></div>

<div style={styles.container}>

{/* LOGOUT BUTTON */}

<div style={styles.logoutContainer}>

<button
style={styles.logoutBtn}
onClick={handleLogout}
>

Logout

</button>

</div>

<h1 style={styles.title}>
🚨 Admin Dashboard
</h1>

{/* Statistics */}

<div style={styles.statsContainer}>

<div style={styles.statCard}>
<h2>Total Reports</h2>
<p>{stats.total}</p>
</div>

<div style={styles.statCard}>
<h2>Pending Reports</h2>
<p>{stats.pending}</p>
</div>

<div style={styles.statCard}>
<h2>Resolved Reports</h2>
<p>{stats.resolved}</p>
</div>

</div>

{/* Navigation */}

<div
style={styles.card}
onClick={() => navigate("/manage-users")}
>

👥 Manage Users

</div>

<div
style={styles.card}
onClick={() => navigate("/view-reports")}
>

📍 Manage Reports

</div>

<div
style={styles.card}
onClick={() => navigate("/view-alerts")}
>

📢 View Alert Status

</div>

<div
style={styles.card}
onClick={() => navigate("/send-alerts")}
>

📢 Send Emergency Alerts

</div>

</div>

</div>

  );

}

/* ================= STYLES ================= */

const styles = {

/* 🌍 SAME DISASTER BACKGROUND */

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

/* 🔥 OVERLAY */

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

padding: "40px",

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

padding: "10px 16px",

cursor: "pointer",

borderRadius: "6px"

},

title: {

color: "#ff4500",

marginBottom: "30px"

},

statsContainer: {

display: "flex",

gap: "20px",

marginBottom: "40px",

flexWrap: "wrap"

},

/* ✨ GLASS STAT CARDS */

statCard: {

flex: "1",

minWidth: "200px",

padding: "20px",

background:
"rgba(0,0,0,0.65)",

borderLeft: "5px solid orange",

borderRadius: "10px",

textAlign: "center",

boxShadow:
"0 0 20px rgba(255,69,0,0.6)",

backdropFilter: "blur(6px)"

},

/* NAVIGATION CARDS */

card: {

padding: "20px",

marginBottom: "20px",

background:
"rgba(0,0,0,0.65)",

borderLeft: "5px solid red",

borderRadius: "10px",

cursor: "pointer",

fontSize: "18px",

boxShadow:
"0 0 15px rgba(255,69,0,0.5)",

transition: "0.3s"

}

};

export default AdminDashboard;