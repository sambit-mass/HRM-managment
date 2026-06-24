import mongoose from "mongoose";
import leaveModel from "../Models/Leave.js";

export const LeaveApply = async (req, res) => {
    let data = req.body;
    data.userId=req.user.id
    try {
        let leavedata = leaveModel.create(data)
        res.status(201).send({ res: "Your Leave is In Pending" })
    } catch (err) {
        res.status(400).send({ err: err.message });
    }

}

export const LeaveAction = async (req, res) => {
    let status = req.body.status;
    let id=req.body.id
   
    try {
        let LeaveData =await  leaveModel.findByIdAndUpdate( id, {status} )
        res.status(201).send({ res: `Leave is ${status}` })
    }
    catch (err) {
        res.status(400).send({ err: err.message });
    }
}


export const AllLeave = async (req, res) => {
    let role=req.user.role;
    let id=req.user.id 
    
    try {
        let leaveData
        if(role==="HR"){
            leaveData = await leaveModel.find({}).populate("userId", "email");
        }else{
            leaveData = await leaveModel.find({userId:id})
            console.log(leaveData,"leaveDat")
        }
      
        res.status(201).send({ res: leaveData })
    }
    catch (err) {
        res.status(400).send({ err: err.message }); 
    }
}

