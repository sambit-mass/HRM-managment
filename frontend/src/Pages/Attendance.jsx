import React, { useState, useEffect } from "react";
import { Button, Text, Flex, useToast } from "@chakra-ui/react";
import axios from "axios";
import { setToast } from "../Functions/Toastfunction";

const Attendance = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [timer, setTimer] = useState(0);
  const toast = useToast();

 
  useEffect(() => {
    const savedCheckInTime = localStorage.getItem("checkInTime");
    if (savedCheckInTime) {
      const checkInTime = new Date(savedCheckInTime);
      const currentTime = new Date();
      const elapsedSeconds = Math.floor((currentTime - checkInTime) / 1000);
      setTimer(elapsedSeconds);
      setIsCheckedIn(true);
    }
  }, []);


  useEffect(() => {
    let interval;
    if (isCheckedIn) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCheckedIn]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  const handleAttendance = async () => {
    const headers = {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
    };
    
    try {
      if (!isCheckedIn) {
        const response = await axios({
          method:"POST",
          url:`${process.env.REACT_APP_API_URL}/attendance/checkin`,
          headers
        })
       
        // Save check-in time to localStorage
        const checkInTime = new Date().toISOString();
        localStorage.setItem("checkInTime", checkInTime);
        
        setIsCheckedIn(true);
        setToast(toast, "Checked In", "", "success");
      } else {
        await axios({
          method:"POST",
          url:`${process.env.REACT_APP_API_URL}/attendance/checkout`,
          headers
        })
        localStorage.removeItem("checkInTime");
        
        setIsCheckedIn(false);
        setTimer(0);
        setToast(toast, "Checked Out", "", "success");
      }
    } catch (error) {
      setToast(toast, "Error", error.response?.data?.error || "Something went wrong", "error");
    }
  };

  return (
    <Flex direction="column" align="center" gap={4} p={8}>
      <Text fontSize="2xl" fontWeight="bold">
        {formatTime(timer)}
      </Text>

      <Button
        colorScheme={isCheckedIn ? "red" : "green"}
        size="lg"
        onClick={handleAttendance}
      >
        {isCheckedIn ? "Check Out" : "Check In"}
      </Button>
    </Flex>
  );
};

export default Attendance;