import React from "react";

function MyReports() {

  return (

<div style={styles.container}>

{/* Title */}

<h1 style={styles.title}>
🌍 Disaster Management Response System
</h1>

<p style={styles.subtitle}>
Helping Communities Stay Safe During Emergencies
</p>

<div style={styles.card}>

{/* Section 1 */}

<h2 style={styles.heading}>
🚨 What is a Disaster Management Response System?
</h2>

<p style={styles.text}>

A Disaster Management Response System is used to
provide immediate help and support during natural
or man-made disasters. It allows citizens to report
emergencies quickly and helps rescue teams respond
faster to save lives and reduce damage.

This system plays a vital role in coordinating
emergency services such as rescue teams, medical
assistance, and disaster relief operations.

</p>

{/* Section 2 */}

<h2 style={styles.heading}>
🤝 How This System Helps People
</h2>

<ul style={styles.list}>

<li>
🚑 Provides quick emergency response during disasters
</li>

<li>
📍 Helps locate affected areas faster
</li>

<li>
🧑‍🚒 Supports rescue teams with real-time information
</li>

<li>
🏥 Helps medical teams reach injured people quickly
</li>

<li>
📢 Improves communication between citizens and authorities
</li>

<li>
🛟 Saves lives by reducing response time
</li>

</ul>

{/* Section 3 */}

<h2 style={styles.heading}>
🌪 Types of Disasters Covered
</h2>

<ul style={styles.list}>

<li>🌊 Floods</li>
<li>🔥 Fires</li>
<li>🌍 Earthquakes</li>
<li>🌪 Cyclones</li>
<li>⛰ Landslides</li>
<li>🚗 Road Accidents</li>
<li>⚡ Electrical Hazards</li>

</ul>

{/* Section 4 */}

<h2 style={styles.heading}>
⚙️ Emergency Response Process
</h2>

<p style={styles.text}>

During a disaster, the response system follows
organized steps to manage the situation effectively.

</p>

<ul style={styles.list}>

<li>
📢 Emergency is reported by citizens
</li>

<li>
📍 Location details are recorded
</li>

<li>
🚑 Rescue teams are alerted immediately
</li>

<li>
🧑‍🚒 Emergency services respond quickly
</li>

<li>
🛟 Victims are rescued and provided help
</li>

<li>
📊 Situation is monitored until safe
</li>

</ul>

{/* Section 5 */}

<h2 style={styles.heading}>
🛡 Safety Guidelines During Disasters
</h2>

<ul style={styles.list}>

<li>
🔥 Stay calm and avoid panic
</li>

<li>
📱 Follow official emergency instructions
</li>

<li>
🌊 Move to safer areas during floods
</li>

<li>
🌍 Take cover during earthquakes
</li>

<li>
🚑 Seek medical help if injured
</li>

<li>
📢 Help others when possible
</li>

</ul>

{/* Section 6 */}

<h2 style={styles.heading}>
🌍 Importance of Disaster Response Systems
</h2>

<p style={styles.text}>

Disaster response systems are essential for
protecting lives, reducing damage, and supporting
communities during emergencies. They improve
preparedness, enhance coordination among rescue
teams, and ensure faster recovery after disasters.

These systems play a major role in building safer
communities and minimizing disaster risks.

</p>

</div>

</div>

  );

}

/* ================= STYLES ================= */

const styles = {

container: {

minHeight: "100vh",

background:
"linear-gradient(135deg,#000000,#330000)",

padding: "40px",

color: "white"

},

title: {

textAlign: "center",

color: "#ff4500",

fontSize: "36px",

marginBottom: "10px"

},

subtitle: {

textAlign: "center",

color: "#ffc107",

marginBottom: "30px"

},

card: {

maxWidth: "900px",

margin: "auto",

padding: "30px",

background: "#111",

borderLeft: "6px solid red",

borderRadius: "10px",

boxShadow:
"0 0 20px rgba(255,69,0,0.5)"

},

heading: {

color: "#ff4500",

marginTop: "25px",

marginBottom: "10px"

},

text: {

lineHeight: "1.8",

color: "#ddd"

},

list: {

paddingLeft: "20px",

lineHeight: "1.8",

color: "#ddd"

}

};

export default MyReports;