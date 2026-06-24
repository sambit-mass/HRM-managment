import mongoose from "mongoose";

const payrollSchema= new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    month: { type: String, required: true }, 
    year: { type: Number, required: true },
    totalWorkingDays: { type: Number, required: true },
    totalLeaves: { type: Number, required: true },
    netsalary: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
},{timestamps:true})

const payrollModel= mongoose.model("payroll",payroll)

export default payrollModel