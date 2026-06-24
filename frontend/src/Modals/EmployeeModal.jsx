import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { setToast } from "../Functions/Toastfunction";
import axios from "axios";

const EmployeeModal = ({
  onClose,
  isOpen,
  employeeDetail,
  setEmployeeDetail,
  update,
  setUpdataeEmployee
}) => {
  const toast = useToast();
  const [showfirst, setShowfirst] = useState(false);
  const handleClickfirst = () => setShowfirst(!showfirst);

  const [showsecond, setShowsecond] = useState(false);
  const handleClicksecond = () => setShowsecond(!showsecond);

  const validateEmail = (email) => {
    // Regex for a more reliable email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  function handleOnChange(e) {
    console.log(e.target);
    const { name, value } = e.target;
    setEmployeeDetail({
      ...employeeDetail,
      [name]: value,
    });
  }

  console.log(employeeDetail, "detail");

  function handlesubmitEmployeeDetail() {
    if (employeeDetail.password !== employeeDetail.confirm_password) {
      setToast(toast, `Password Dosen't match`, "", "error");
      return;
    }
    //    console.log(validateEmail(employeeDetail.email),"sdklkj")
    if (!validateEmail(employeeDetail.email)) {
      setToast(toast, `Please Enter Corret Email`, "", "error");
    }
    const headers = {
        Authorization: `Bearer ${JSON.parse(
          sessionStorage.getItem("token")
        )}`,
      };

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/user/create`,
      data: employeeDetail,
      headers
    })
      .then((r) => {
        console.log(r.data);
        setToast(toast, `${r.data.res}`, "", "success");
        onClose();
        setEmployeeDetail({
          name: "",
          email: "",
          password: "",
          confirm_password: "",
          salary: "",
          role: "",
          department: "",
        });
      })
      .catch((err) => {
        console.log(err);
        setToast(toast, `${err.response.data.err}`, "", "error");
      });
  }

  function handleUpdateEmployeeDetail(){
    const headers = {
        Authorization: `Bearer ${JSON.parse(
          sessionStorage.getItem("token")
        )}`,
      };
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/user/update/${employeeDetail._id}`,
        data: employeeDetail,
        headers
      })
        .then((r) => {
          console.log(r.data);
          setToast(toast, `${r.data.res}`, "", "success");
          onClose();
          setEmployeeDetail({
            name: "",
            email: "",
            password: "",
            confirm_password: "",
            salary: "",
            role: "",
            department: "",
          });
          setUpdataeEmployee(false)
        })
        .catch((err) => {
          console.log(err);
          setToast(toast, `${err.response.data.err}`, "", "error");
        });
  }

  console.log(employeeDetail, "detail");
  return (
    <div>
      <Modal onClose={onClose} size={"md"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <center>
            <ModalHeader>{update ? "Update" : "Add"} Employee</ModalHeader>
          </center>
          <ModalBody>
            <FormControl mb="10px">
              <FormLabel>Enter Name</FormLabel>
              <Input
                name="name"
                onChange={(e) => handleOnChange(e)}
                value={employeeDetail.name}
                placeholder="Enter Name"
              />
            </FormControl>

            <FormControl mb="10px">
              <FormLabel>Enter Email</FormLabel>
              <Input
                name="email"
                onChange={(e) => handleOnChange(e)}
                value={employeeDetail.email}
                placeholder="Enter Email"
              />
            </FormControl>

            <FormControl>
              <FormLabel> Enter Password</FormLabel>
              <InputGroup size="md">
                <Input
                  name="password"
                  pr="4.5rem"
                  type={showfirst ? "text" : "password"}
                  placeholder="password"
                  onChange={(e) => handleOnChange(e)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClickfirst}>
                    {showfirst ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel> Confirm Password</FormLabel>
              <InputGroup size="md">
                <Input
                  name="confirm_password"
                  pr="4.5rem"
                  type={showsecond ? "text" : "password"}
                  placeholder="Enter password"
                  onChange={(e) => handleOnChange(e)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClicksecond}>
                    {showsecond ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl mb="10px">
              <FormLabel>Enter Salary</FormLabel>
              <Input
                name="salary"
                type="number"
                onChange={(e) => handleOnChange(e)}
                value={employeeDetail.salary}
                placeholder="Enter Salary"
              />
            </FormControl>
            <FormControl>
              <FormLabel> Role</FormLabel>
              <RadioGroup defaultValue="2">
                <Stack spacing={5} direction="row">
                  <Radio
                    colorScheme="red"
                    value="EMPLOYEE"
                    name="role"
                    onChange={(e) => handleOnChange(e)}
                  >
                    Employee
                  </Radio>
                  <Radio
                    colorScheme="green"
                    value="HR"
                    name="role"
                    onChange={(e) => handleOnChange(e)}
                  >
                    HR
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel> Department</FormLabel>
              <RadioGroup defaultValue="2">
                <Stack spacing={5} direction="row">
                  <Radio
                    colorScheme="red"
                    value="IT"
                    name="department"
                    onChange={(e) => handleOnChange(e)}
                  >
                    IT
                  </Radio>
                  <Radio
                    colorScheme="green"
                    value="HR"
                    name="department"
                    onChange={(e) => handleOnChange(e)}
                  >
                    HR
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            {update ? (
              <Button colorScheme="blue" mr="20px" onClick={handleUpdateEmployeeDetail}>
                Update
              </Button>
            ) : (
              <Button
                colorScheme="blue"
                mr="20px"
                onClick={handlesubmitEmployeeDetail}
              >
                Save
              </Button>
            )}

            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EmployeeModal;
