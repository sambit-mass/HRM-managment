import express from "express";
import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    leaveType: { type: String, enum: ["Sick", "Unpaid", "Paid"], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
    appliedOn: { type: Date, default: Date.now },
}, { timestamps: true })

const leaveModel = mongoose.model("leave", leaveSchema)

export default leaveModel