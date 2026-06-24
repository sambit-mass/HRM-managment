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
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { setToast } from "../Functions/Toastfunction";
import axios from "axios";
import { ChevronDownIcon } from "@chakra-ui/icons";

const LeaveModal = ({ onClose, isOpen }) => {
  const [leavedetail, setLeaveDetail] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  function handleOnChange(e) {
    const { name, value } = e.target;
    setLeaveDetail({
      ...leavedetail,
      [name]: value,
    });
  }

  function handleLeaveApply(){
    const headers = {
        Authorization: `Bearer ${JSON.parse(
          sessionStorage.getItem("token")
        )}`,
      };
      axios({
        method:"POST",
        url:`${process.env.REACT_APP_API_URL}/leave/apply`,
        data:leavedetail,
        headers
      }).then((r)=>{
        console.log(r.data)
        onClose()
      }).catch((err)=>{
        console.log(err)
        onClose()
      })
  }

  console.log(leavedetail, "detail");
  return (
    <div>
      <Modal onClose={onClose} size={"md"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <center>
            <ModalHeader> Apply Leave</ModalHeader>
          </center>
          <ModalBody>
            <FormControl>
              <FormLabel> Leave Type</FormLabel>
              <RadioGroup defaultValue="2">
                <Stack spacing={5} direction="row">
                  <Radio
                    colorScheme="red"
                    name="leaveType"
                    value="Paid"
                    onChange={(e) => handleOnChange(e)}
                  >
                    paid
                  </Radio>

                  <Radio
                    colorScheme="green"
                    value="Sick"
                    name="leaveType"
                    onChange={(e) => handleOnChange(e)}
                  >
                    Sick
                  </Radio>

                  <Radio
                    colorScheme="green"
                    value="Unpaid"
                    name="leaveType"
                    onChange={(e) => handleOnChange(e)}
                  >
                    Unpaid
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl mb="10px">
              <FormLabel>Start Date</FormLabel>
              <Input
                name="startDate"
                type="date"
                onChange={(e) => handleOnChange(e)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>End Date</FormLabel>
              <Input
                name="endDate"
                type="date"
                onChange={(e) => handleOnChange(e)}
              />
            </FormControl>

            <FormControl>
              <FormLabel> Reason</FormLabel>
              <Input
                name="reason"
                type="text"
                placeholder="Enter Reason"
                onChange={(e) => handleOnChange(e)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
          <Button colorScheme="green" onClick={handleLeaveApply}mr="10px" >Apply </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LeaveModal;
