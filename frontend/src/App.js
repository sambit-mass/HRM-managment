import logo from './logo.svg';
import './App.css';
import AllRoutes from './Routes/AllRoutes';
import Navbar from './Components/Navbar';
import { useSelector } from "react-redux";
import { Box, Divider, Flex } from '@chakra-ui/react';
import Accordian from './Components/Accordian';
import { useEffect, useState } from 'react';

function App() {
  const isAuth = useSelector((state)=>state.HrmReducer.isAuth);
  const [screensize, setScreenSize] = useState(false);
  const screenwidth = window.screen.width;

  useEffect(() => {
    if (screenwidth < 800) {
      setScreenSize(true);
    }
  }, []);

  return (
    <div className="App">
      <>
              {isAuth ? <Navbar /> : null}
              <Flex  width="100%" minHeight="100vh">
                {isAuth ? (
                  <Box
                    display={{ base: "none", md: "block", lg: "block" }}
                    width={"15%"}
                  >
                    {sessionStorage.getItem("token") && <Accordian />}
                  </Box>
                ) : null}
                <Divider orientation="vertical" type="gray" />
                <Box
                  width={screensize ? "100%" : isAuth ? "85%" : "100%"}
                  p="7"
                >
                  <AllRoutes />
                </Box>
              </Flex>
            </>
    </div>
  );
}

export default App;
