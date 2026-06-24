import React from 'react'
import { Box, Divider, Flex, IconButton, Image, Text, useToast } from "@chakra-ui/react";
import kanda from "../images/k_and_a.jpg"
import { useDispatch, useSelector } from "react-redux";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { UserLogOut } from '../Redux/action';
const Navbar = () => {
    const isAuth = useSelector((state) => state.HrmReducer.isAuth);
    const dispatch = useDispatch();
    const toast = useToast();
  
    function handleLogout() {
        dispatch(UserLogOut(toast));
      }

    return (
        <div>
            <Flex justifyContent="space-between" paddingLeft="20px" paddingRight="10px">
                <Flex gap="40px">
                    <Box display={{ base: "none", md: "block", lg: "block" }}>
                        <Image
                            src={kanda}
                            alt="fnp"
                            height="70px"
                            width="70px"
                            margin="10px auto"
                            borderRadius="30px"
                        />
                    </Box>
                    <Box display={{ base: "block", md: "none", lg: "none" }}>

                    </Box>
                </Flex>
                <Flex
                    direction={{ base: "column", md: "row", lg: "row" }}
                    alignItems="center"
                >
                    <Box mr="15px"></Box>
                    <Flex gap="10px" alignItems="center">
                        {isAuth ? (
                            <IconButton
                            onClick={handleLogout}
                                fontSize={{ base: "12px", md: "16px", lg: "16px" }}
                                colorScheme="red"
                                icon={
                                    <RiLogoutCircleRFill
                                        style={{
                                            fontFamily: "NexaText-Trial-Heavy",
                                            fontSize: "30px",
                                        }}
                                    />
                                }
                            />
                        ) : (
                            <></>
                        )}
                        <Flex direction="column" textAlign="left">
                            <Text>{JSON.parse(sessionStorage.getItem("email"))}</Text>
    
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
            <Divider />
        </div>
    )
}

export default Navbar
