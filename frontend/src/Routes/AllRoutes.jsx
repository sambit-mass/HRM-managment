import React from "react"
import { Route, Routes } from "react-router-dom"
import Login from "../Pages/Login"
import Signup from "../Pages/Signup"
import Home from "../Pages/Home"
import Authentication from "../Authentication/Authentication"
import Employee from "../Pages/Employee"
import Attendance from "../Pages/Attendance"
import Leave from "../Pages/Leave"
import Payroll from "../Pages/Payroll"
import NotAuthorized from "../Components/NotAuthorized"
import { useSelector } from "react-redux"

const AllRoutes = () => {
  const reduxUser = useSelector((state) => state.HrmReducer.user)
  const role = reduxUser?.role || JSON.parse(sessionStorage.getItem("role"))

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* ✅ Public signup route for employees */}
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/"
        element={
          <Authentication>
            <Home />
          </Authentication>
        }
      />
      <Route
        path="/employee"
        element={
          <Authentication>
            {role === "HR" ? <Employee /> : <NotAuthorized />}
          </Authentication>
        }
      />
      <Route
        path="/attendance"
        element={
          <Authentication>
            <Attendance />
          </Authentication>
        }
      />
      <Route
        path="/leave"
        element={
          <Authentication>
            <Leave />
          </Authentication>
        }
      />
      <Route
        path="/payroll"
        element={
          <Authentication>
            {role === "HR" ? <Payroll /> : <NotAuthorized />}
          </Authentication>
        }
      />
    </Routes>
  )
}

export default AllRoutes
