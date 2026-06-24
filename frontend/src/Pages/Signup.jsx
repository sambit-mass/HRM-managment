import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Box,
  Input,
  Image,
  Button,
  Text,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import kanda from "../images/k_and_a.jpg";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { setToast } from "../Functions/Toastfunction";

const Signup = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    salary: "",
    role: "EMPLOYEE",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (value.charAt(0) === " ") return;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.department ||
      !form.salary
    ) {
      setToast(toast, "All fields are required", "", "error");
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/user/signup`,
        form
      );

      setToast(
        toast,
        "Account created successfully! Please login.",
        "",
        "success"
      );

      navigate("/login");
    } catch (err) {
      console.error(err);

      setToast(
        toast,
        err?.response?.data?.message ||
          err?.response?.data?.err ||
          "Signup failed",
        "",
        "error"
      );
    }
  };

  return (
    <Box display="flex" justifyContent="center">
      <Box
        boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
        borderRadius="10px"
        width={{ base: "100%", md: "80%", lg: "400px" }}
        p="0px 20px 20px 20px"
        bg="white"
        mt="60px"
      >
        <Image
          src={kanda}
          alt="logo"
          height="100px"
          width="150px"
          margin="10px auto"
          borderRadius="30px"
        />

        <FormControl>
          <FormLabel>Full Name</FormLabel>
          <Input
            placeholder="Enter your name"
            name="name"
            onChange={handleChange}
          />
        </FormControl>

        <br />

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter email"
            name="email"
            onChange={handleChange}
          />
        </FormControl>

        <br />

        <FormControl>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              name="password"
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              onChange={handleChange}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <br />

        <FormControl>
          <FormLabel>Department</FormLabel>
          <Input
            placeholder="e.g. Engineering"
            name="department"
            onChange={handleChange}
          />
        </FormControl>

        <br />

        <FormControl>
          <FormLabel>Salary</FormLabel>
          <Input
            placeholder="e.g. 30000"
            name="salary"
            type="number"
            onChange={handleChange}
          />
        </FormControl>

        <br />

        <Button w="100%" mt="5px" onClick={handleSignup}>
          Sign Up
        </Button>

        <Text textAlign="center" mt="10px" fontSize="sm">
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "blue",
              textDecoration: "underline",
            }}
          >
            Login
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Signup;
