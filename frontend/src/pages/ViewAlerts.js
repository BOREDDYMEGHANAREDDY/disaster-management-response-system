import React,
{
  useEffect,
  useState
}
from "react";

import axios from "axios";

function ViewAlerts() {

  const [alerts, setAlerts] =
    useState([]);

  // Load alerts + auto refresh
  useEffect(() => {

    fetchAlerts();

    const interval =
      setInterval(fetchAlerts, 5000);

    return () =>
      clearInterval(interval);

  }, []);

  // Fetch alerts
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

        console.log(error);

      }

  };

  return (

<div style={styles.container}>

<h1 style={styles.title}>
📢 Alert Status (Admin)
</h1>

{alerts.length === 0 ? (

<p>No alerts available</p>

) : (

alerts.map((alert) => (

<div
key={alert._id}

style={{
...styles.card,

borderLeft:
alert.status === "Completed"
? "6px solid green"
: "6px solid red"
}}
>

<h3>
{alert.message}
</h3>

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

</div>

))

)}

</div>

);

}

const styles = {

container: {

padding: "20px",
background: "#f5f5f5",
minHeight: "100vh"

},

title: {

marginBottom: "20px"

},

card: {

background: "white",
padding: "15px",
marginBottom: "10px",
borderRadius: "8px"

}

};

export default ViewAlerts;