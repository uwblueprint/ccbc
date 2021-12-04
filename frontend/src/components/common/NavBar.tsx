import { Box, Flex, Heading, Image, Text, Menu, MenuButton, MenuGroup, MenuItem, MenuList, MenuDivider } from "@chakra-ui/react";
import React, { useContext } from "react";
import { HiUser } from "react-icons/hi";
import { Link } from "react-router-dom";
import Logout from "../auth/Logout";

import logo from "../../ccbc.png";
import { UserRole } from "../../constants/Enums";
import AuthContext from "../../contexts/AuthContext";

const NavBar = (): React.ReactElement => {
  const { authenticatedUser } = useContext(AuthContext);
  const isAdmin = authenticatedUser?.roleType === UserRole.Admin;
  var userName = "";
  var userEmail = "";
  if(authenticatedUser && authenticatedUser.firstName && authenticatedUser.lastName){
    userName = authenticatedUser?.firstName + authenticatedUser?.lastName;
    userEmail = authenticatedUser.email;
  }
  return (
    <Flex
      direction="row"
      h="calc(96px - 32px)"
      w="calc(100vw - 160px)"
      bgColor="#2D5577"
      align="center"
      pt="16px"
      pb="16px"
      pl="80px"
      pr="80px"
      position="absolute"
      justify="space-between"
      top="0"
    >
      <Flex direction="row" align="center">
        <Link to="/">
          <Image
            src={logo}
            alt="CCBC Logo"
            boxSize="60px"
            borderRadius="full"
          />
        </Link>
        {/* <Heading style={{ color: "#fff", margin: "30px" }}>Home</Heading> */}
        <Text textStyle="h4" ml="60px">
          Home
        </Text>
        <Link to="/dashboard">
          {isAdmin && <Text textStyle="h4">Admin Dashboard</Text>}
        </Link>
      </Flex>
      <Flex>
        <Menu>
          <MenuButton>
            <HiUser style={{ color: "#fff", height: "40px", width: "40px" }} />
          </MenuButton>
          <MenuList>
            <Text textStyle="body" fontSize="xl" fontWeight="bold" >{userName}</Text>
            <Text color="#4A5568" textStyle="body" fontSize="md">{userEmail}</Text>
            <MenuDivider />
            {isAdmin && (
                <div className="Section 2">
                  <Link to="">
                    <Text textStyle="body" fontSize="md">Invite new admin</Text>
                  </Link>
                  <Link to="">
                    <Text textStyle="body" fontSize="md">Change password</Text>
                  </Link>
                  <MenuDivider />
                </div>
            )}
            <Link to="">
              <Text textStyle="body" fontSize="md">Sign out</Text>
            </Link>
          </MenuList>
        </Menu>

        
      </Flex>
    </Flex>
  );
};

export default NavBar;
