import React, { useState } from "react";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "https://disaster-management-response-system.onrender.com/login",
        {
          email,
          password
        }
      );

      console.log(res.data);

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.role
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Successful");

      /* Redirect based on role */

      if (res.data.role === "admin") {

        window.location.href =
          "/admin-dashboard";

      }

      else if (res.data.role === "rescue") {

        window.location.href =
          "/rescue-dashboard";

      }

      else {

        window.location.href =
          "/user-dashboard";

      }

    }

    catch (err) {

      console.log(err);

      alert("Login Failed");

    }

  };

  return (

    <div className="login-container">

      <h2>🚨 Disaster Management System</h2>

      <h3>Emergency Login Portal</h3>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
        >

          <option value="user">
            User
          </option>

          <option value="admin">
            Admin
          </option>

          <option value="rescue">
            Rescue
          </option>

        </select>

        <button type="submit">

          LOGIN

        </button>

      </form>

      <br />

      <button
        onClick={() =>
          window.location.href =
          "/register"
        }
      >

        New User? Register Here

      </button>

    </div>

  );

}

export default Login;