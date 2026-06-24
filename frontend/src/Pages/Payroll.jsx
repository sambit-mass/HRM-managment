import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { setToast } from "../Functions/Toastfunction";

const Payroll = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [loading, setLoading] = useState(false);
  const role = JSON.parse(sessionStorage.getItem("role"));

  const fetchPayroll = () => {
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
    };

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/payroll`,
      headers,
    })
      .then((response) => {
        setPayrollData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPayroll();
  }, []);

  return (
    <div>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading as="h4" size="lg" fontWeight="medium">
          PAYROLL DETAILS
        </Heading>
        <Button 
          colorScheme="blue" 
          onClick={fetchPayroll}
          isLoading={loading}
        >
          Calculate Payroll
        </Button>
      </Flex>
      <br />
      <div style={{
        borderRadius: "7px",
        boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        backgroundColor: "white",
      }}>
        <TableContainer>
          <Table size="md" fontSize="16px">
            <Thead>
              <Tr height="50px">
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Present Days</Th>
                <Th>Leave Days</Th>
                <Th>Total Days</Th>
                <Th>Net Salary</Th>
              </Tr>
            </Thead>
            <Tbody>
              {payrollData.map((item, i) => (
                <Tr key={i} height="50px">
                  <Td>{item.name}</Td>
                  <Td>{item.email}</Td>
                  <Td>{item.present_days}</Td>
                  <Td>{item.leave_days}</Td>
                  <Td>{item.total_days}</Td>
                  <Td>₹{item.net_salary.toFixed(2)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Payroll;