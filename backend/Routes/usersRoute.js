import express from "express";
import { CreateUser, DeleteuserById, GetAllUsers, GetuserById, UpdateUserById, UserLogin } from "../Controller/UserController.js";
import { authenticateUserAccess, checkRoleMiddleware } from "../Middleware/authenticateUserAccess.js";

const userRoute = express.Router()

userRoute.get("/read/all", authenticateUserAccess, checkRoleMiddleware(["HR"]), GetAllUsers)
userRoute.get("/read/:id", authenticateUserAccess, checkRoleMiddleware(["HR", "EMPLOYEE"]), GetuserById)
userRoute.delete("/delete/:id", authenticateUserAccess, checkRoleMiddleware(["HR"]), DeleteuserById)

// ✅ /signup — public, employee self-registration (role forced to EMPLOYEE in controller)
userRoute.post("/signup", CreateUser)

// ✅ /create — protected, only HR can create users with any role
userRoute.post("/create", authenticateUserAccess, checkRoleMiddleware(["HR"]), CreateUser)

userRoute.post("/update/:id", authenticateUserAccess, checkRoleMiddleware(["HR"]), UpdateUserById)
userRoute.post("/login", UserLogin)

export default userRoute
