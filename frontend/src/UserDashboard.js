import React from "react";
import { useNavigate } from "react-router-dom";

function UserDashboard() {

  const navigate = useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  /* LOGOUT */

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    navigate("/");

  };

  return (

<div style={styles.wrapper}>

<div style={styles.overlay}></div>

<div style={styles.container}>

{/* HEADER */}

<div style={styles.header}>

<h1 style={styles.title}>
👤 User Dashboard
</h1>

<button
style={styles.logoutButton}
onClick={handleLogout}
>

Logout

</button>

</div>

{/* WELCOME */}

<h2 style={styles.welcome}>
Welcome, {user?.name || "User"}
</h2>

<p style={styles.subtitle}>
Choose an option below to continue
</p>

{/* CARDS */}

<div style={styles.cardContainer}>

{/* Submit Report */}

<div
style={styles.card}

onClick={() =>
navigate("/submit-report")
}

onMouseEnter={(e) =>
e.currentTarget.style.transform =
"scale(1.05)"
}

onMouseLeave={(e) =>
e.currentTarget.style.transform =
"scale(1)"
}

>

<div style={styles.icon}>
📢
</div>

<h3 style={styles.cardTitle}>
Submit Report
</h3>

<p style={styles.cardText}>
Report emergencies such as
fires, floods, earthquakes,
and accidents.
</p>

</div>

{/* Disaster Awareness */}

<div
style={styles.card}

onClick={() =>
navigate("/my-reports")
}

onMouseEnter={(e) =>
e.currentTarget.style.transform =
"scale(1.05)"
}

onMouseLeave={(e) =>
e.currentTarget.style.transform =
"scale(1)"
}

>

<div style={styles.icon}>
📖
</div>

<h3 style={styles.cardTitle}>
Disaster Awareness
</h3>

<p style={styles.cardText}>
Learn safety tips and
how disaster response
systems help save lives.
</p>

</div>

</div>

</div>

</div>

  );

}

/* ================= STYLES ================= */

const styles = {

/* 🌍 DISASTER BACKGROUND */

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

/* 🔥 GLOW OVERLAY */

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

color: "white",

textAlign: "center"

},

header: {

display: "flex",

justifyContent: "space-between",

alignItems: "center",

marginBottom: "30px"

},

title: {

color: "#ff4500",

fontSize: "30px"

},

logoutButton: {

padding: "10px 18px",

background:
"linear-gradient(45deg,#ff0000,#ff4500)",

border: "none",

borderRadius: "8px",

color: "white",

cursor: "pointer"

},

welcome: {

fontSize: "28px",

color: "#ffc107",

marginBottom: "10px"

},

subtitle: {

color: "#ddd",

marginBottom: "40px"

},

cardContainer: {

display: "flex",

justifyContent: "center",

gap: "40px",

flexWrap: "wrap"

},

/* ✨ GLASS EFFECT CARDS */

card: {

width: "260px",

padding: "35px",

background:
"rgba(0,0,0,0.65)",

borderRadius: "18px",

cursor: "pointer",

boxShadow:
"0 0 25px rgba(255,69,0,0.6)",

transition: "0.3s",

backdropFilter: "blur(6px)"

},

icon: {

fontSize: "40px",

marginBottom: "15px"

},

cardTitle: {

fontSize: "20px",

marginBottom: "10px",

color: "#ff4500"

},

cardText: {

fontSize: "14px",

color: "#ddd",

lineHeight: "1.6"

}

};

export default UserDashboard;