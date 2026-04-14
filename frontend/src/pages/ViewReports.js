import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";

function ViewReports() {

  const [reports, setReports] = useState([]);
  const [rescues, setRescues] = useState([]);

  useEffect(() => {

    fetchReports();
    fetchRescues();

  }, []);

  /* ================= FETCH REPORTS ================= */

  const fetchReports = async () => {

    try {

      const res = await axios.get(
        "https://disaster-management-response-system.onrender.com/api/reports"
      );

      setReports(res.data);

    }

    catch (error) {

      console.log(error);

    }

  };

  /* ================= FETCH RESCUE TEAMS ================= */

  const fetchRescues = async () => {

    try {

      const res = await axios.get(
        "https://disaster-management-response-system.onrender.com/api/admin/rescues"
      );

      setRescues(res.data);

    }

    catch (error) {

      console.log(error);

    }

  };

  /* ================= DELETE REPORT ================= */

  const deleteReport = async (id) => {

    try {

      const confirmDelete =
        window.confirm("Delete this report?");

      if (!confirmDelete) return;

      await axios.delete(
        `https://disaster-management-response-system.onrender.com/api/reports/${id}`
      );

      fetchReports();

    }

    catch (error) {

      console.log(error);

    }

  };

  /* ================= ASSIGN RESCUE ================= */

  const assignRescue = async (reportId, rescueName) => {

    try {

      await axios.put(

        `https://disaster-management-response-system.onrender.com/api/reports/${reportId}/assign`,

        {
          assignedRescue: rescueName
        }

      );

      fetchReports();

    }

    catch (error) {

      console.log(error);

      alert("Rescue assign failed");

    }

  };

  /* ================= UPDATE STATUS ================= */

  const updateStatus = async (reportId, status) => {

    try {

      await axios.put(

        `https://disaster-management-response-system.onrender.com/api/reports/${reportId}`,

        {
          status: status
        }

      );

      fetchReports();

    }

    catch (error) {

      console.log(error);

      alert("Status update failed");

    }

  };

  /* ================= STATUS COLOR ================= */

  const getStatusColor = (status) => {

    if (status === "Pending")
      return "#ff9800";

    if (status === "On The Way")
      return "#2196f3";

    if (status === "Resolved")
      return "#4caf50";

    return "white";

  };

  return (

<div className="dashboard-container">

<h2 className="dashboard-title">
📋 Admin - Disaster Reports
</h2>

<button
className="btn btn-refresh"
onClick={fetchReports}
>
🔄 Refresh
</button>

{reports.map(report => (

<div
className="card"
key={report._id}
>

<h3>
🚨 {report.type}
</h3>

<p>
📍 {report.location}
</p>

<p>
📝 {report.description}
</p>

{/* ================= STATUS ================= */}

<p>

Status:

<b
style={{
color:
getStatusColor(
report.status
)
}}
>

 {report.status}

</b>

</p>

<select

className="btn btn-status"

value={report.status}

onChange={(e) =>

updateStatus(
report._id,
e.target.value
)

}
>

<option value="Pending">
Pending
</option>

<option value="On The Way">
On The Way
</option>

<option value="Resolved">
Resolved
</option>

</select>

{/* ================= ASSIGNED RESCUE ================= */}

<p>
🚑 Assigned:

<b>
 {report.assignedRescue || " None"}
</b>
</p>

<select

className="btn btn-assign"

onChange={(e) =>

assignRescue(
report._id,
e.target.value
)

}
>

<option>
Assign Rescue
</option>

{rescues.map(rescue => (

<option
key={rescue._id}
value={rescue.name}
>

{rescue.name}

</option>

))}

</select>

<p>
🕒 {
new Date(
report.createdAt
).toLocaleString()
}
</p>

<button
className="btn btn-delete"
onClick={() =>
deleteReport(
report._id
)
}
>
🗑 Delete
</button>

</div>

))}

</div>

  );

}

export default ViewReports;