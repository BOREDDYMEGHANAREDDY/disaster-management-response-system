import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({

      name: "",
      email: "",
      phone: "",
      location: "",
      username: "",
      password: "",
      role: "user"

    });

  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "https://disaster-management-response-system.onrender.com/register",
        formData
      );

      alert(res.data);

      navigate("/");

    }

    catch (error) {

      console.log(error);

      alert("Registration Failed");

    }

  };

  return (

    <div style={styles.wrapper}>

      <div style={styles.overlay}></div>

      <div style={styles.registerBox}>

        <h2 style={styles.title}>
          🚨 Disaster Management System
        </h2>

        <p style={styles.subtitle}>
          Register New Account
        </p>

        <form onSubmit={handleSubmit}>

          <input
            style={styles.input}
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            name="location"
            placeholder="Location"
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <select
            style={styles.input}
            name="role"
            value={formData.role}
            onChange={handleChange}
          >

            <option value="user">
              👤 User
            </option>

            <option value="rescue">
              🚑 Rescue Team
            </option>

          </select>

          <button
            type="submit"
            style={styles.button}
          >
            Register
          </button>

        </form>

      </div>

    </div>

  );

}

/* Styles */

const styles = {

  wrapper: {

    height: "100vh",

    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url('https://images.unsplash.com/photo-1600375462888-5c7a0f7b3a3d')",

    backgroundSize: "cover",
    backgroundPosition: "center",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    position: "relative"

  },

  overlay: {

    position: "absolute",

    width: "100%",
    height: "100%",

    background:
      "radial-gradient(circle, rgba(255,69,0,0.25), rgba(0,0,0,0.9))"

  },

  registerBox: {

    width: "420px",

    padding: "40px",

    background: "rgba(0,0,0,0.65)",

    borderRadius: "15px",

    backdropFilter: "blur(12px)",

    boxShadow:
      "0 0 20px rgba(255,69,0,0.6)",

    textAlign: "center",

    zIndex: "2"

  },

  title: {

    color: "#ff4500",

    marginBottom: "10px"

  },

  subtitle: {

    color: "#ffc107",

    marginBottom: "20px"

  },

  input: {

    width: "100%",

    padding: "12px",

    marginBottom: "14px",

    background: "transparent",

    border: "2px solid #ff4500",

    borderRadius: "8px",

    color: "white"

  },

  button: {

    width: "100%",

    padding: "12px",

    background:
      "linear-gradient(45deg,#ff0000,#ff4500,#ff8c00)",

    border: "none",

    borderRadius: "8px",

    color: "white",

    fontSize: "16px",

    cursor: "pointer"

  }

};

export default Register;