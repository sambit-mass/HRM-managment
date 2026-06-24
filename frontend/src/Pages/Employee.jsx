import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import EmployeeModal from "../Modals/EmployeeModal";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import axios from "axios";
import { setToast } from "../Functions/Toastfunction";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";

const Employee = () => {
  const toast = useToast();
  const [allEmployee, setAllEmployee] = useState([]);
  const [employeemodal, setEmployeemodal] = useState(false);
  const [updateEmployee, setUpdataeEmployee] = useState(false);
  const [employeeDetail, setEmployeeDetail] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    salary: "",
    role: "",
    department: "",
  });

  function handleEditEmployeeButtonClicked(detail) {
    setUpdataeEmployee(true)
    setEmployeeDetail(detail);
    onOpenEmployeeModal();
  }

  const convertToDate = (dateString) => {
    return new Date(dateString);
  };

  const onOpenEmployeeModal = () => {
    setEmployeemodal(true);
  };

  const onCloseEmployeeModal = () => {
    setEmployeemodal(false);
    setUpdataeEmployee(false)
  };
  const fetchAllEmployee = () => {
    const headers = {
      Authorization: `Bearer ${JSON.parse(
        sessionStorage.getItem("token")
      )}`,
    };
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/user/read/all`,
      headers
    })
      .then((r) => {
        console.log(r.data, "data");
        setAllEmployee(r.data.data);
      })
      .catch((err) => {
        console.log(err);
        setToast(toast, `${err.response.data.err}`, "", "error");
      });
  };


  function handleDeleteEmployee(id){
    const headers = {
      Authorization: `Bearer ${JSON.parse(
        sessionStorage.getItem("token")
      )}`,
    };
    axios({
      method:"DELETE",
      url:`${process.env.REACT_APP_API_URL}/user/delete/${id}`,
      headers
    }).then((r)=>{
      fetchAllEmployee()
    }).catch((err)=>{
      console.log(err)
    })
  }
  
  console.log(allEmployee, "emp");
  useEffect(() => {
    fetchAllEmployee();
  }, [employeemodal]);


  return (
    <Box>
      <EmployeeModal
        onClose={onCloseEmployeeModal}
        isOpen={employeemodal}
        employeeDetail={employeeDetail}
        setEmployeeDetail={setEmployeeDetail}
        update={updateEmployee}
        setUpdataeEmployee={setUpdataeEmployee}
      />
      <Flex justifyContent="space-between" alignItems="center">
        <Heading as="h4" size="lg" fontWeight="medium">
         EMPLOYEE DETAIL
        </Heading>
        <Button
          colorScheme="green"
          leftIcon={<IoMdAdd fontSize={"20px"} />}
          onClick={onOpenEmployeeModal}
        >
          Add Employee
        </Button>
      </Flex>
      <br />
      <div
        style={{
          borderRadius: "7px",
          boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
          backgroundColor: "white",
        }}
      >
        <TableContainer>
          <Table size="sm" fontSize="20px">
            <Thead>
              <Tr height="50px">
                <Th>NAME</Th>
                <Th>EMAIL</Th>
                <Th>ROLE</Th>
                <Th>DEPARTMENT</Th>
                <Th>SALARY</Th>
                <Th>JOINING</Th>
                <Th>ACTION</Th>
              </Tr>
            </Thead>
            <Tbody>
              {allEmployee.map((item, i) => (
                <Tr key={i} height="50px">
                  <Td>{item.name}</Td>
                  <Td>{item.email}</Td>
                  <Td>{item.role}</Td>
                  <Td>{item.department}</Td>
                  <Td>{item.salary}</Td>
                  <Td>{convertToDate(item?.joinDate).toLocaleString()}</Td>
                  <Td>
                    <Flex gap="30px">
                      <IconButton
                        color="blue.500"
                        onClick={() => handleEditEmployeeButtonClicked(item)}
                        icon={<CiEdit fontSize="30px" />}
                        variant="outline"
                      />
                      <IconButton
                        color="red.500"
                         onClick={() => handleDeleteEmployee(item._id)}
                        icon={<AiOutlineDelete fontSize="30px" />}
                        variant="outline"
                      />
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </Box>
  );
};

export default Employee;
