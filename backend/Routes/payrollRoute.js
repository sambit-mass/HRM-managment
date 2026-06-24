import express from "express";
import { payrollCalculator } from "../Controller/PayrollController.js";
import { authenticateUserAccess, checkRoleMiddleware } from "../Middleware/authenticateUserAccess.js";

const payrollRoute = express.Router();

payrollRoute.post(
  "/",
  authenticateUserAccess,
  checkRoleMiddleware(["HR"]),
  payrollCalculator
);

export default payrollRoute;
