import React, { useState } from "react"
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
import { useDispatch } from "react-redux";
import kanda from "../images/k_and_a.jpg"
import { useNavigate, Link } from "react-router-dom";
import { UserLogin } from "../Redux/action";

const Login = () => {
  const toast = useToast();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logincred, setLoginCred] = useState({
    email: "",
    password: "",
  });

  function handlechange(e) {
    const { name, value } = e.target;
    if (value.charAt(0) === ' ') {
      e.target.value = value.slice(1);
      return;
    }
    setLoginCred({ ...logincred, [name]: value });
  }

  async function handleLoginSave(e) {
    let nav = "/";
    await dispatch(
      UserLogin(
        `${process.env.REACT_APP_API_URL}/user/login`,
        logincred,
        toast,
        nav,
        navigate
      )
    );
  }

  return (
    <Box display="flex" justifyContent="center">
      <Box
        boxShadow="rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
        borderRadius="10px"
        width={{ base: "100%", md: "80%", lg: "400px" }}
        p="0px 20px 20px 20px"
        bg="white"
        mt="120px"
      >
        <Image
          src={kanda}
          alt="fnp"
          height="100px"
          width="150px"
          margin="10px auto"
          borderRadius="30px"
        />
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter Email"
            name="email"
            onChange={(e) => handlechange(e)}
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
              onChange={(e) => handlechange(e)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button w="100%" mt="15px" onClick={handleLoginSave}>
          Login
        </Button>

        {/* ✅ Link to signup for new employees */}
        <Text textAlign="center" mt="10px" fontSize="sm">
          New Employee?{" "}
          <Link to="/signup" style={{ color: "blue", textDecoration: "underline" }}>
            Create Account
          </Link>
        </Text>
      </Box>
    </Box>
  );
}

export default Login;
