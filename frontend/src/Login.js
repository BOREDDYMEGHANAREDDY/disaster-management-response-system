import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "https://disaster-management-response-system.onrender.com/login",
        {
          email: username,
          password: password
        }
      );

      console.log("Login Response:", response.data);

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
        response.data.role.toLowerCase();

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

  console.log("Login Error:", error.response);

  alert(
    error.response?.data?.message ||
    JSON.stringify(error.response?.data) ||
    "Login Failed"
  );

}

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
            type="text"
            placeholder="Email"
            required
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={styles.input}
          />

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

          <button
            type="submit"
            style={styles.button}
          >
            LOGIN
          </button>

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

export default Login;