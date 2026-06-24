import attendanceModel from "../Models/Attendence.js";

export const AttendanceCheckin = async (req, res) => {
  const  userId  = req.user.id;
  try {
    const today = new Date().toISOString().split("T")[0];
    const isCheckIn = await attendanceModel.findOne({
      userId,
      date: today,
      checkOutTime: { $exists: false },
    });
console.log(isCheckIn,"checkin")
    if (isCheckIn) {
      return res.status(400).json({ error: "Already checked in today" });
    }

    const attendance = new attendanceModel({
      userId,
      date:today,
      checkInTime: new Date(),
    });

    await attendance.save();
    res.status(201).send({ res: "Checked In" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const AttendanceCheckOut = async (req, res) => {
  const userId = req.user.id;
  console.log(userId,"dsio")
  try {
    const attendance = await attendanceModel
      .findOne({
        userId,
        checkOutTime: { $exists: false }
      })
      .sort({ checkInTime: -1 });
      console.log(attendance)
    if (!attendance) {
      return res.status(400).json({ error: "No active check-in found" });
    }

    attendance.checkOutTime = new Date();
    const diff = attendance.checkOutTime - attendance.checkInTime;
    attendance.WorkingHours = (diff / (1000 * 60 * 60)).toFixed(2);
    await attendance.save();
    res.status(200).json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
