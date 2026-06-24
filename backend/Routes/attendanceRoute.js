import express from "express";
import { AttendanceCheckin, AttendanceCheckOut } from "../Controller/AttendanceController.js";
import { authenticateUserAccess, checkRoleMiddleware } from "../Middleware/authenticateUserAccess.js";


const attendanceRoute = express.Router()

attendanceRoute.post("/checkin",authenticateUserAccess,
  checkRoleMiddleware(["HR", "EMPLOYEE"]), AttendanceCheckin)

attendanceRoute.post("/checkout",authenticateUserAccess,
    checkRoleMiddleware(["HR", "EMPLOYEE"]), AttendanceCheckOut)

export default attendanceRoute