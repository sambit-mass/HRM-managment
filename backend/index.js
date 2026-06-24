import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";

import userRoute from "./Routes/usersRoute.js";
import attendanceRoute from "./Routes/attendanceRoute.js";
import leaveRoute from "./Routes/LeaveRoute.js";
import payrollRoute from "./Routes/payrollRoute.js";
import UserModel from "./Models/Users.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/test", (req, res) => {
  res.send("working");
});

app.use("/api/user", userRoute);
app.use("/api/attendance", attendanceRoute);
app.use("/api/leave", leaveRoute);
app.use("/api/payroll", payrollRoute);

const port = process.env.PORT || 5000;

// Create default HR if none exists
const createDefaultHR = async () => {
  try {
    const existingHR = await UserModel.findOne({ role: "HR" });

    if (!existingHR) {
      const hashedPassword = await bcrypt.hash("hr123456", 10);

      await UserModel.create({
        name: "Admin HR",
        email: "hr@company.com",
        password: hashedPassword,
        role: "HR",
        department: "Management",
        salary: 50000,
        status: "Active",
      });

      console.log("✅ Default HR created");
      console.log("Email: hr@company.com");
      console.log("Password: hr123456");
    } else {
      console.log("✅ HR user already exists");
    }
  } catch (err) {
    console.error("❌ Error creating default HR:", err);
  }
};

mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("Connected To MongoDB");
    await createDefaultHR();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Can't connect To MongoDB", err);
  });
