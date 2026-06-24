# HR Management System

A full-stack Human Resource Management (HRM) application built with React, Node.js, Express, MongoDB, JWT Authentication, and Docker Compose.

## Features

### Authentication & Authorization

* JWT-based authentication
* Role-based access control (HR / Employee)
* Secure password hashing using bcrypt
* Protected API routes

### Employee Management

* Employee self-registration
* HR-managed employee creation
* View employee details
* Update employee information
* Delete employees

### Attendance Management

* Employee check-in
* Employee check-out
* Attendance tracking
* Working hours calculation

### Leave Management

* Apply for leave
* View leave requests
* HR leave approval/rejection

### Payroll Management

* Payroll generation
* Salary calculations
* Attendance-based payroll processing

---

# Technology Stack

## Frontend

* React
* Chakra UI
* Axios
* React Router

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt

## DevOps

* Docker
* Docker Compose

---

# Project Structure

```
project-root/
│
├── backend/
│   ├── Controller/
│   ├── Middleware/
│   ├── Models/
│   ├── Routes/
│   ├── index.js
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

---

# Environment Variables

## Backend (.env)

```env
PORT=5000
MONGO_URL=mongodb://mongo:27017/hrm-db
JWT_TOKEN=your_secret_key
```

## Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

# Running with Docker Compose

## Build and Start Containers

```bash
docker compose up -d --build
```

## View Running Containers

```bash
docker ps
```

## View Backend Logs

```bash
docker logs backend
```

## View Frontend Logs

```bash
docker logs frontend
```

## Stop Containers

```bash
docker compose down
```

---

# Default HR Account

When the backend starts, a default HR account is automatically created if no HR user exists.

### Login Credentials

```text
Email: hr@company.com
Password: hr123456
```

Use this account to:

* Login as HR
* Create employees
* Approve leave requests
* Generate payroll
* Manage attendance records

---

# API Endpoints

## Authentication

### Employee Signup

```http
POST /api/user/signup
```

### Login

```http
POST /api/user/login
```

---

## User Management

### Create Employee (HR Only)

```http
POST /api/user/create
```

### Get All Employees

```http
GET /api/user/read/all
```

### Get Employee By ID

```http
GET /api/user/read/:id
```

### Update Employee

```http
POST /api/user/update/:id
```

### Delete Employee

```http
DELETE /api/user/delete/:id
```

---

## Attendance

### Check In

```http
POST /api/attendance/checkin
```

### Check Out

```http
POST /api/attendance/checkout
```

### View Attendance

```http
GET /api/attendance
```

---

## Leave

### Apply Leave

```http
POST /api/leave/create
```

### View Leave Requests

```http
GET /api/leave
```

### Approve Leave

```http
POST /api/leave/approve/:id
```

---

## Payroll

### Generate Payroll

```http
POST /api/payroll/generate
```

### View Payroll

```http
GET /api/payroll
```

---

# Docker Commands

## Rebuild Backend

```bash
docker compose up -d --build backend
```

## Rebuild Frontend

```bash
docker compose up -d --build frontend
```

## Open MongoDB Shell

```bash
docker exec -it mongo mongosh
```

Use database:

```javascript
use hrm-db
```

View users:

```javascript
db.users.find()
```

---

# License

This project is for learning and demonstration purposes.
