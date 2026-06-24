import express from "express";
import {
  AllLeave,
  LeaveAction,
  LeaveApply,
} from "../Controller/LeaveController.js";
import {
  authenticateUserAccess,
  checkRoleMiddleware,
} from "../Middleware/authenticateUserAccess.js";

const leaveRoute = express.Router();

leaveRoute.post(
  "/apply",
  authenticateUserAccess,
  checkRoleMiddleware(["HR", "EMPLOYEE"]),
  LeaveApply
);

leaveRoute.post(
  "/action",
  authenticateUserAccess, 
  checkRoleMiddleware(["HR"]),
  LeaveAction
);

leaveRoute.get("/all", authenticateUserAccess, AllLeave);

export default leaveRoute;
