import {
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { HiUser } from "react-icons/hi";
import { Link } from "react-router-dom";

import authAPIClient from "../../APIClients/AuthAPIClient";
import logo from "../../assets/ccbc.png";
import { UserRole } from "../../constants/Enums";
import AuthContext from "../../contexts/AuthContext";

const NavBar = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const isAdmin = authenticatedUser?.roleType === UserRole.Admin;
  // let userName = "";
  let userFirstName = "";
  let userLastName = "";
  let userEmail = "";
  if (
    authenticatedUser &&
    authenticatedUser.firstName &&
    authenticatedUser.lastName
  ) {
    userFirstName = authenticatedUser?.firstName;
    userLastName = authenticatedUser?.lastName;
    userEmail = authenticatedUser.email;
  }

  const onLogOutClick = async () => {
    const success = await authAPIClient.logout(authenticatedUser?.id);
    if (success) {
      setAuthenticatedUser(null);
    }
  };

  return (
    <Flex
      direction="row"
      h="80px"
      w="100vw"
      bgColor="#171923"
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
            boxSize="45px"
            borderRadius="full"
          />
        </Link>

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
            <HiUser style={{ color: "#fff", height: "28px", width: "40px" }} />
          </MenuButton>

          <MenuList padding="20px">
            <Text
              textStyle="body"
              fontSize="md"
              fontWeight="bold"
              cursor="default"
              paddingTop="3px"
            >
              {userFirstName} {userLastName}
            </Text>
            <Text
              color="#4A5568"
              textStyle="body"
              fontSize="sm"
              padding="3px 0px"
              cursor="default"
            >
              {userEmail}
            </Text>

            <MenuDivider />
            {isAdmin && (
              <div className="Section 2">
                <Text
                  textStyle="body"
                  fontSize="sm"
                  padding="3px 0px"
                  cursor="pointer"
                >
                  Invite new admin
                </Text>
                <Text
                  textStyle="body"
                  fontSize="sm"
                  padding="3px 0px"
                  cursor="pointer"
                >
                  Change password
                </Text>

                <MenuDivider />
              </div>
            )}

            <Text
              textStyle="body"
              fontSize="sm"
              onClick={onLogOutClick}
              cursor="pointer"
              padding="5px 0px"
            >
              Sign out
            </Text>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default NavBar;
