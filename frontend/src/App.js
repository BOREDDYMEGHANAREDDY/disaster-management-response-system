import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";

import AdminDashboard from "./AdminDashboard";
import RescueDashboard from "./RescueDashboard";
import UserDashboard from "./UserDashboard";

import ManageUsers from "./pages/ManageUsers";
import ViewReports from "./pages/ViewReports";
import SendAlerts from "./pages/SendAlerts";
import ViewAlerts from "./pages/ViewAlerts";

import SubmitReport from "./pages/SubmitReport";
import MyReports from "./pages/MyReports";

function App() {

  return (

<Router>

<Routes>

<Route path="/" element={<Login />} />

<Route path="/register" element={<Register />} />

<Route path="/admin" element={<AdminDashboard />} />

<Route path="/rescue" element={<RescueDashboard />} />

<Route path="/user" element={<UserDashboard />} />

<Route path="/manage-users" element={<ManageUsers />} />

<Route path="/view-reports" element={<ViewReports />} />

<Route path="/send-alerts" element={<SendAlerts />} />

<Route path="/view-alerts" element={<ViewAlerts />} />

<Route path="/submit-report" element={<SubmitReport />} />

<Route path="/my-reports" element={<MyReports />} />

</Routes>

</Router>

  );

}

export default App;