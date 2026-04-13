# 🚨 Disaster Management Response System

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application designed to help citizens report disasters and enable rescue teams and administrators to respond quickly and efficiently.

This system improves communication between users, rescue teams, and administrators during emergency situations.

---

# 🌍 Project Overview

The Disaster Management Response System allows users to report disasters such as floods, fires, earthquakes, and accidents. The system enables administrators to monitor reports and manage users, while rescue teams can update response status and handle emergency alerts.

This system helps improve disaster response time and supports better emergency management.

---

# 🎯 Objectives

- Provide a platform to report disasters quickly
- Enable rescue teams to respond efficiently
- Allow administrators to manage emergency reports
- Improve coordination during disaster situations
- Enhance public safety awareness

---

# 👥 User Roles

## 👤 User

Users can:

- Register and login
- Submit disaster reports
- Upload disaster images
- Provide location details
- View disaster awareness information

---

## 🚑 Rescue Team

Rescue users can:

- View incoming reports
- Receive emergency alerts
- Update report status
- Mark alerts as completed
- Assist in disaster response

---

## 🛠 Admin

Admin users can:

- View dashboard statistics
- Manage users
- Manage disaster reports
- Send emergency alerts
- Monitor system activity

---

# 🚀 Features

## 🔐 Authentication

- Secure Login System
- Role-Based Access Control
- Admin / Rescue / User login

---

## 📢 Disaster Reporting

Users can:

- Submit disaster reports
- Select disaster type
- Enter location details
- Add description
- Upload images

Supported Disaster Types:

- 🔥 Fire
- 🌊 Flood
- 🌍 Earthquake
- 🌪 Cyclone
- ⛰ Landslide
- 🚗 Accidents

---

## 📊 Admin Dashboard

Admin dashboard provides:

- Total Reports Count
- Pending Reports Count
- Resolved Reports Count
- Manage Users
- Manage Reports
- Send Emergency Alerts

---

## 🚑 Rescue Dashboard

Rescue teams can:

- View active alerts
- Update report status
- Mark alerts as completed
- Monitor rescue operations

---

## 📖 Disaster Awareness Module

Provides:

- Disaster safety tips
- Emergency response guidance
- Awareness information
- Emergency procedures

---

# 🛠 Technologies Used

## Frontend

- React.js
- Axios
- JavaScript
- HTML
- CSS
- React Router

---

## Backend

- Node.js
- Express.js
- REST API

---

## Database

- MongoDB
- Mongoose ODM

---

## Additional Tools

- Multer (Image Upload)
- JWT Authentication
- Local Storage
- GitHub Version Control

---

# 📁 Project Structure
disaster-management-response-system/

backend/
│
├── models/
│ ├── User.js
│ ├── Report.js
│ ├── Alert.js
│
├── routes/
│ ├── authRoutes.js
│ ├── reportRoutes.js
│ ├── adminRoutes.js
│ ├── alertRoutes.js
│
├── uploads/
├── server.js
├── package.json

frontend/
│
├── public/
│ ├── images/
│ │ └── bg-disaster.png
│
├── src/
│ ├── components/
│ ├── pages/
│ ├── App.js
│ ├── index.js
│
├── package.json

README.md
.gitignore


---

# ⚙️ Installation Guide

## Step 1 — Clone Repository

bash
git clone https://github.com/BOREDDYMEGHANAREDDY/disaster-management-response-system.git
Step 2 — Install Backend Dependencies
cd backend
npm install
Step 3 — Install Frontend Dependencies
cd frontend
npm install
Step 4 — Run Backend Server
cd backend
npm start

Server runs on:

http://localhost:5000
Step 5 — Run Frontend
cd frontend
npm start

Frontend runs on:

http://localhost:3000
📊 Database Design

Database used:

MongoDB

Main Collections:

Users
Reports
Alerts
User Collection Fields
name
email
password
role
phone
location
Report Collection Fields
location
type
description
image
status
lat
lng
createdAt
Alert Collection Fields
message
disasterType
location
status
createdAt
Security Features
Role-Based Authentication
Protected Routes
Token-based Login
Secure Data Handling
🌍 Future Enhancements

Possible future improvements:

Google Maps Integration
Real-time Notifications
SMS Alerts
Email Alerts
AI-based Disaster Prediction
Mobile Application Version
Live Location Tracking
🎓 Academic Use

This project is developed as part of:

B.Tech Computer Science Project

Useful for:

Academic Submission
Final Year Project
Portfolio Development
Disaster Management Research
👩‍💻 Author

Name: Boreddy Meghana Reddy
Course: B.Tech Computer Science Engineering
Project: Disaster Management Response System

GitHub Repository:

https://github.com/BOREDDYMEGHANAREDDY/disaster-management-response-system
📜 License

This project is developed for educational purposes only.

Educational Use License
