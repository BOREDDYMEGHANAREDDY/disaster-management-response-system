import React, { useState } from "react";
import axios from "axios";
import "./dashboard.css";

function SendAlerts() {

  const [message, setMessage] =
    useState("");

  const [disasterType, setDisasterType] =
    useState("");

  const [location, setLocation] =
    useState("");   // NEW

  const sendAlert = async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/alerts/send",
        {
          message,
          disasterType,
          location   // IMPORTANT
        }
      );

      alert("🚨 Alert Sent!");

      setMessage("");
      setDisasterType("");
      setLocation("");   // reset

    }

    catch (error) {

      console.log(error);
      alert("Error sending alert");

    }

  };

  return (

    <div className="dashboard-container">

      <h2 className="dashboard-title">
        🚨 Send Emergency Alert
      </h2>

      <div className="card">

        {/* Disaster Type */}

        <input
          className="input"
          placeholder="Disaster Type"
          value={disasterType}
          onChange={(e) =>
            setDisasterType(e.target.value)
          }
        />

        {/* Location Field (NEW) */}

        <input
          className="input"
          placeholder="Enter Location"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
        />

        {/* Message */}

        <textarea
          className="input"
          placeholder="Enter Message"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
        />

        <button
          className="btn btn-primary"
          onClick={sendAlert}
        >
          Send Alert
        </button>

      </div>

    </div>

  );

}

export default SendAlerts;