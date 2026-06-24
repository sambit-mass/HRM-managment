import React, { useState } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Flex,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

const Accordian = () => {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState(null);
    const role=JSON.parse(sessionStorage.getItem("role"))
    console.log("role",role)
    console.log(role)

    const handleAccordionClick = (index) => {
        setActiveItem(index);
    };

    return (
        <div>
            <Accordion allowToggle>
              {role==="HR" &&  <AccordionItem>
                    <h2>
                        <AccordionButton onClick={() => {
                            navigate("/employee");
                            handleAccordionClick(0);
                        }} bg={activeItem === 0 ? "gray.200" : ""}
                            color={activeItem === 0 ? "#7D8035" : ""}>

                            <Box as='span' flex='1' textAlign='left'>
                            <Flex
                  gap="10px"
                  alignItems="center"
                  fontSize="14px"
                  fontWeight="bold"
                >Employee</Flex>
                                
                            </Box>

                        </AccordionButton>
                    </h2>
                   
                </AccordionItem>}

                <AccordionItem>
                    <h2>
                        <AccordionButton
                            onClick={() => {
                                navigate("/attendance");
                                handleAccordionClick(1);
                            }}
                            bg={activeItem === 1 ? "gray.200" : ""}
                            color={activeItem === 1 ? "#7D8035" : ""}
                        >
                            <Box as='span' flex='1' textAlign='left'>
                              
                                <Flex
                  gap="10px"
                  alignItems="center"
                  fontSize="14px"
                  fontWeight="bold"
                >  Attendance</Flex>
                            </Box>

                        </AccordionButton>
                    </h2>
                   
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton onClick={() => {
                            navigate("/leave");
                            handleAccordionClick(2);
                        }} bg={activeItem === 2 ? "gray.200" : ""}
                            color={activeItem === 2 ? "#7D8035" : ""}>
                            <Box as='span' flex='1' textAlign='left'>
                               
                                <Flex
                  gap="10px"
                  alignItems="center"
                  fontSize="14px"
                  fontWeight="bold"
                >   Leave</Flex>
                            </Box>

                        </AccordionButton>
                    </h2>
                 
                </AccordionItem>

                {role==="HR" && <AccordionItem>
                    <h2>
                        <AccordionButton onClick={() => {
                            navigate("/payroll");
                            handleAccordionClick(3);
                        }} bg={activeItem === 3 ? "gray.200" : ""}
                            color={activeItem === 3 ? "#7D8035" : ""}>
                            <Box as='span' flex='1' textAlign='left'>
                                       
                                <Flex
                  gap="10px"
                  alignItems="center"
                  fontSize="14px"
                  fontWeight="bold"
                >    Payroll </Flex>
                            </Box>

                        </AccordionButton>
                    </h2>
                    
                </AccordionItem>}
            </Accordion>
        </div>
    )
}

export default Accordian
