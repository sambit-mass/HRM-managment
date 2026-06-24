import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Spinner,
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
import LeaveModal from "../Modals/LeaveModal";
const Leave = () => {
  const [allLeave, setallLeave] = useState([]);
  let role = JSON.parse(sessionStorage.getItem("role"));
const [leavemodal, setLeavemodal] = useState(false);


const onOpenLeaveModal = () => {
  setLeavemodal(true);
};

const onCloseLeaveModal = () => {
  setLeavemodal(false);

};

  function getAllLeave() {
    const headers = {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
    };

    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/leave/all`,
      headers,
    })
      .then((r) => {
        console.log(r.data.res);
        setallLeave(r.data.res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
let [refresh,setRefresh]=useState(false)
  function handleUpdateLeave(id, status) {
    if(refresh){
      return
    }
    setRefresh(true)
    const headers = {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
    };

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/leave/action`,
      data: {
        id,
        status,
      },
      headers,
    })
      .then((r) => {
        console.log(r.data.res);
        getAllLeave();
        setRefresh(false)
      })
      .catch((err) => {
        console.log(err);
        setRefresh(false)
      });
  }

  console.log(allLeave,"leave")

  function formatDateWithoutTime(dateString) {
    // Create a Date object from the input string
    const date = new Date(dateString);

    // Extract year, month, and day
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getUTCDate()).padStart(2, "0");

    // Return the formatted date string (YYYY-MM-DD)
    return `${year}-${month}-${day}`;
  }

  

  useEffect(() => {
    getAllLeave();
  }, [leavemodal]);

  return (
    <>
    {refresh?<Spinner/>: <div>
      <LeaveModal isOpen={leavemodal} onClose={onCloseLeaveModal}/>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading as="h4" size="lg" fontWeight="medium">
          LEAVE DETAIL
        </Heading>
        <Button colorScheme="green" onClick={onOpenLeaveModal}
         leftIcon={<IoMdAdd fontSize={"20px"} />}>
          Apply Leave
        </Button>
      </Flex>
      <br />
      {role === "EMPLOYEE" ? (
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
                  
                  <Th>LEAVE TYPE</Th>
                  <Th>START DATE</Th>
                  <Th>END DATE</Th>
                  <Th>REASON</Th>
                  <Th>STATUS</Th>
                  <Th>APPLIED ON</Th>
                </Tr>
              </Thead>
              <Tbody>
                {allLeave.map((item, i) => (
                  <Tr key={i} height="50px">
                    <Td>{item.leaveType}</Td>
                    <Td>{formatDateWithoutTime(item.startDate)}</Td>
                    <Td>{formatDateWithoutTime(item.endDate)}</Td>
                    <Td>{item.reason}</Td>
                    <Td>{item.status}</Td>
                    <Td>{item.appliedOn}</Td>
                    
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      ) : (
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
                <Th>Email</Th>
                  <Th>LEAVE TYPE</Th>
                  <Th>START DATE</Th>
                  <Th>END DATE</Th>
                  <Th>REASON</Th>
                  <Th>STATUS</Th>
                  <Th>APPLIED ON</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {allLeave.length && allLeave?.map((item, i) => (
                  <Tr key={i} height="50px">
                    <Td>{item.userId?.email}</Td>
                    <Td>{item.leaveType}</Td>
                    <Td>{formatDateWithoutTime(item.startDate)}</Td>
                    <Td>{formatDateWithoutTime(item.endDate)}</Td>
                    <Td>{item.reason}</Td>
                    <Td>{item.status}</Td>
                    <Td>{item.appliedOn}</Td>
                    {item.status === "Pending" && (
                      <Td>
                        <Flex gap="30px">
                          <Button
                            colorScheme="green"
                            variant="outline"
                            onClick={() =>
                              handleUpdateLeave(item._id, "Approved")
                            }
                          >
                            Approve
                          </Button>

                          {/* Reject Button (Red) */}
                          <Button
                            colorScheme="red"
                            variant="outline"
                            onClick={() =>
                              handleUpdateLeave(item._id, "Rejected")
                            }
                          >
                            Reject
                          </Button>
                        </Flex>
                      </Td>
                    )}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>}
    </>
   
  );
};

export default Leave;
