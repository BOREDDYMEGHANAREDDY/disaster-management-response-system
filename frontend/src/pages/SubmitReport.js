import React, { useState } from "react";
import axios from "axios";

function SubmitReport() {

  const [formData, setFormData] =
    useState({
      location: "",
      type: "",
      description: ""
    });

  const [image, setImage] =
    useState(null);

  /* ================= Handle Input ================= */

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
      e.target.value
    });

  };

  /* ================= Handle Image ================= */

  const handleImageChange =
    (e) => {

      const file =
        e.target.files[0];

      console.log(
        "Selected file:",
        file
      );

      setImage(file);

  };

  /* ================= Submit Report ================= */

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const data =
          new FormData();

        data.append(
          "location",
          formData.location
        );

        data.append(
          "type",
          formData.type
        );

        data.append(
          "description",
          formData.description
        );

        /* Get userId */

        const userId =
          localStorage.getItem("userId");

        data.append(
          "userId",
          userId
        );

        /* Append image */

        if (image) {

          data.append(
            "image",
            image
          );

        }

        /* Send Request */

        await axios.post(

"https://disaster-management-response-system.onrender.com/api/reports",

          data

        );

        alert(
"🚨 Report Submitted Successfully!"
        );

        /* Reset Form */

        setFormData({
          location: "",
          type: "",
          description: ""
        });

        setImage(null);

      }

      catch (error) {

        console.log(
          "Submit Error:",
          error
        );

        alert(
"Error submitting report"
        );

      }

  };

  return (

<div style={styles.container}>

<h1 style={styles.title}>
🚨 Submit Disaster Report
</h1>

<div style={styles.card}>

<form onSubmit={handleSubmit}>

{/* Location */}

<input
name="location"
placeholder="Enter Location"
value={formData.location}
onChange={handleChange}
required
style={styles.input}
/>

{/* Disaster Type */}

<select
name="type"
value={formData.type}
onChange={handleChange}
required
style={styles.select}
>

<option value="">
Select Disaster Type
</option>

<option>Flood</option>
<option>Fire</option>
<option>Earthquake</option>
<option>Cyclone</option>
<option>Landslide</option>

</select>

{/* Description */}

<textarea
name="description"
placeholder="Enter Description"
value={formData.description}
onChange={handleChange}
required
style={styles.textarea}
/>

{/* File Upload */}

<input
type="file"
name="image"   // ⭐ IMPORTANT
accept="image/*"
onChange={handleImageChange}
style={styles.fileInput}
/>

{/* Submit Button */}

<button
type="submit"
style={styles.button}
>

🚨 Submit Report

</button>

</form>

</div>

</div>

  );

}

/* ================= THEME STYLES ================= */

const styles = {

container: {

minHeight: "100vh",

background:
"linear-gradient(135deg,#000000,#330000)",

padding: "40px",

color: "white"

},

title: {

color: "#ff4500",

marginBottom: "30px",

textAlign: "center",

fontSize: "32px"

},

card: {

maxWidth: "500px",

margin: "auto",

padding: "30px",

background: "#111",

borderLeft: "5px solid red",

borderRadius: "8px",

boxShadow:
"0 0 15px rgba(255,69,0,0.5)"

},

input: {

width: "100%",

padding: "12px",

marginBottom: "15px",

background: "black",

border: "2px solid #ff4500",

borderRadius: "6px",

color: "white"

},

select: {

width: "100%",

padding: "12px",

marginBottom: "15px",

background: "black",

border: "2px solid #ff4500",

borderRadius: "6px",

color: "white"

},

textarea: {

width: "100%",

height: "100px",

padding: "12px",

marginBottom: "15px",

background: "black",

border: "2px solid #ff4500",

borderRadius: "6px",

color: "white"

},

fileInput: {

marginBottom: "15px",

color: "white"

},

button: {

width: "100%",

padding: "12px",

background:
"linear-gradient(45deg,#ff0000,#ff4500)",

border: "none",

borderRadius: "6px",

color: "white",

fontSize: "16px",

cursor: "pointer"

}

};

export default SubmitReport;