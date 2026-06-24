import attendanceModel from "../Models/Attendence.js";
import leaveModel from "../Models/Leave.js";
import UserModel from "../Models/Users.js";

export const payrollCalculator = async (req, res) => {
  
        try {
          const today = new Date();
          const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
          const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
          const totalDays = lastDayOfMonth.getDate();
      
          const users = await UserModel.find({});
          const result = [];
      
          for (const user of users) {
            // Calculate Leave Days
            let totalLeaveDays = 0;
            const leaves = await leaveModel.find({
              userId: user._id, 
              status: "Approved",
              startDate: { $lte: lastDayOfMonth },
              endDate: { $gte: firstDayOfMonth }
            });
      
            for (const leave of leaves) {
              const leaveStart = new Date(leave.startDate);
              const leaveEnd = new Date(leave.endDate);
              
              const overlapStart = leaveStart < firstDayOfMonth ? firstDayOfMonth : leaveStart;
              const overlapEnd = leaveEnd > lastDayOfMonth ? lastDayOfMonth : leaveEnd;
              
              const diffTime = Math.abs(overlapEnd - overlapStart);
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
              totalLeaveDays += diffDays;
            }
      
         
            const attendanceRecords = await attendanceModel.find({
              userId: user._id,
              date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
              checkInTime: { $exists: true }
            });
      
            const presentDays = attendanceRecords.length;
      
            console.log((user.salary / totalDays),'sal')
            console.log( (totalDays - (presentDays + totalLeaveDays)))
            const netSalary = ((user.salary / totalDays) *  (presentDays + totalLeaveDays)).toFixed(2);
      
            result.push({
              email: user.email,
              name: user.name,
              net_salary: parseFloat(netSalary),
              present_days: presentDays,
              leave_days: totalLeaveDays,
              total_days: totalDays
            });
          }
      
          res.send(result )
      
        } catch (error) {
          console.error('Error calculating salaries:', error);
          return [];
        }
    
};

function calculateLeave() {}
