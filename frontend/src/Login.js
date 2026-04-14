import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "https://disaster-management-response-system.onrender.com/login",
        {
          email,
          password
        }
      );

      console.log(response.data);

      /* Save token */

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "userId",
        response.data.user._id
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      alert("Login Successful");

      /* Redirect */

      if (response.data.role === "admin") {

        navigate("/admin");

      }

      else if (response.data.role === "rescue") {

        navigate("/rescue");

      }

      else {

        navigate("/user");

      }

    }

    catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    }

  };

  return (

    <div style={styles.wrapper}>

      <div style={styles.overlay}></div>

      <div style={styles.loginBox}>

        <h1 style={styles.title}>
          🚨 Disaster Management System
        </h1>

        <p style={styles.subtitle}>
          Emergency Login Portal
        </p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={styles.input}
            required
          />

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            style={styles.select}
          >

            <option value="user">
              User
            </option>

            <option value="admin">
              Admin
            </option>

            <option value="rescue">
              Rescue Team
            </option>

          </select>

          <button
            type="submit"
            style={styles.button}
          >

            LOGIN

          </button>

          <button
            type="button"
            style={styles.registerButton}
            onClick={() =>
              navigate("/register")
            }
          >

            New User? Register Here

          </button>

        </form>

      </div>

    </div>

  );

}

/* 🎨 THEME STYLES */

const styles = {

  wrapper: {
    height: "100vh",
    background:
      "url('https://images.unsplash.com/photo-1581090700227-1e37b190418e') no-repeat center center/cover",
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
      "rgba(0,0,0,0.6)"
  },

  loginBox: {
    position: "relative",
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    width: "350px",
    textAlign: "center",
    zIndex: "2"
  },

  title: {
    color: "#d32f2f",
    marginBottom: "10px"
  },

  subtitle: {
    marginBottom: "20px",
    color: "#555"
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },

  select: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px"
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#d32f2f",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px"
  },

  registerButton: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    background: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }

};

export default Login;