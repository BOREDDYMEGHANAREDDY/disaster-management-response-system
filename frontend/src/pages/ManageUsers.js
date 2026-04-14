import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";

function ManageUsers() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {

    const res = await axios.get(
      "http://localhost:5000/api/admin/users"
    );

    setUsers(res.data.users || res.data);

  };

  const deleteUser = async (id) => {

    await axios.delete(
      `http://localhost:5000/api/admin/user/${id}`
    );

    fetchUsers();

  };

  return (

    <div className="dashboard-container">

      <h2 className="dashboard-title">
        👥 Manage Users
      </h2>

      <div className="card">

        <table>

          <thead>

            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {users.map(user => (

              <tr key={user._id}>

                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>{user.role}</td>

                <td>

                  <button
                    className="btn btn-delete"
                    onClick={() =>
                      deleteUser(user._id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default ManageUsers;