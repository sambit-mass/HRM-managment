import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["HR", "EMPLOYEE"], required: true },
    department: { type: String, required: true },
    salary: { type: Number, required: true },
    joinDate: { type: Date, default: Date.now },
    status: { type: String, emum: ["Active", "Inactive"], default: "Active" },
}, { timestamps: true })

const UserModel= mongoose.model("user",UserSchema)

export default UserModel