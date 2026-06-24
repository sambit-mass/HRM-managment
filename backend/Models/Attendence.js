import mongoose, { Mongoose } from "mongoose";

const attendanceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId },
    date: { type: Date, default: Date.now },
    checkInTime: { type: Date, required: true },
    checkOutTime: { type: Date, },
    WorkingHours: { type: Number, default: 0 },
}, { timestamps: true })

const attendanceModel = mongoose.model("attendance", attendanceSchema);

export default attendanceModel;  