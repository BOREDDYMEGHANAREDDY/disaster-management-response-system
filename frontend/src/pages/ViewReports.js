import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";

function ViewReports() {

  const [reports, setReports] =
    useState([]);

  useEffect(() => {

    fetchReports();

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

  /* ================= DELETE REPORT ================= */

  const deleteReport = async (id) => {

    try {

      const confirmDelete =
        window.confirm(
          "Delete this report?"
        );

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

  /* ================= STATUS COLOR ================= */

  const getStatusColor =
    (status) => {

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