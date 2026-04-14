import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "https://disaster-management-response-system.onrender.com/login",
        {
          email: email,
          password: password,
          role: role
        }
      );

      console.log("Login Success:", response.data);

      /* Save token */

      localStorage.setItem(
        "token",
        response.data.token
      );

      /* Save userId */

      localStorage.setItem(
        "userId",
        response.data.user._id
      );

      /* Save role */

      const userRole =
        response.data.user.role.toLowerCase();

      localStorage.setItem(
        "role",
        userRole
      );

      /* Redirect */

      if (userRole === "admin") {

        navigate("/admin");

      }

      else if (userRole === "rescue") {

        navigate("/rescue");

      }

      else {

        navigate("/user");

      }

    }

    catch (error) {

      console.error(error);

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

          {/* Email */}

          <input
            type="email"
            placeholder="Enter Email"
            required
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={styles.input}
          />

          {/* Password */}

          <input
            type="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={styles.input}
          />

          {/* Role */}

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            style={styles.select}
          >

            <option value="Admin">
              Admin
            </option>

            <option value="Rescue">
              Rescue Team
            </option>

            <option value="User">
              User
            </option>

          </select>

          {/* Login Button */}

          <button
            type="submit"
            style={styles.button}
          >
            LOGIN
          </button>

          {/* Register Button */}

          {role === "User" && (

            <button
              type="button"
              style={styles.registerButton}
              onClick={() =>
                navigate("/register")
              }
            >

              New User? Register Here

            </button>

          )}

        </form>

      </div>

    </div>

  );

}

/* ================= STYLES ================= */

const styles = {

  wrapper: {

    height: "100vh",

    /* Background Image */

    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url('/images/bg-disaster.png')",

    backgroundSize: "cover",

    backgroundPosition: "center",

    backgroundRepeat: "no-repeat",

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

  loginBox: {

    width: "380px",

    padding: "40px",

    background: "rgba(0,0,0,0.65)",

    borderRadius: "15px",

    backdropFilter: "blur(12px)",

    boxShadow:
      "0 0 25px rgba(255,69,0,0.7), 0 0 60px rgba(255,0,0,0.4)",

    textAlign: "center",

    zIndex: "2"

  },

  title: {

    color: "#ff4500",

    fontSize: "26px",

    marginBottom: "10px",

    fontWeight: "bold"

  },

  subtitle: {

    color: "#ffc107",

    marginBottom: "25px",

    fontSize: "14px"

  },

  input: {

    width: "100%",

    padding: "12px",

    marginBottom: "18px",

    background: "transparent",

    border: "2px solid #ff4500",

    borderRadius: "8px",

    color: "white",

    fontSize: "14px"

  },

  select: {

    width: "100%",

    padding: "12px",

    marginBottom: "20px",

    borderRadius: "8px",

    border: "2px solid #ff4500",

    background: "black",

    color: "white",

    fontSize: "14px"

  },

  button: {

    width: "100%",

    padding: "12px",

    background:
      "linear-gradient(45deg,#ff0000,#ff4500,#ff8c00)",

    border: "none",

    borderRadius: "8px",

    fontSize: "16px",

    color: "white",

    cursor: "pointer",

    fontWeight: "bold"

  },

  registerButton: {

    width: "100%",

    marginTop: "12px",

    padding: "10px",

    background: "transparent",

    border: "2px solid #ffc107",

    borderRadius: "8px",

    color: "#ffc107",

    cursor: "pointer",

    fontSize: "13px"

  }

};

export default Login;