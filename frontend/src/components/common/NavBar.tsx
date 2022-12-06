import {
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { HiUser } from "react-icons/hi";
import { Link } from "react-router-dom";

import authAPIClient from "../../APIClients/AuthAPIClient";
import logo from "../../assets/ccbc.png";
import { UserRole } from "../../constants/Enums";
import AuthContext from "../../contexts/AuthContext";
import ChangePasswordModal from "./ChangePassword/ChangePasswordModal";
import InviteAdminModal from "./InviteAdminModal";

const NavBar = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const isAdmin = authenticatedUser?.roleType === UserRole.Admin;
  const {
    isOpen: isChangePasswordModalOpen,
    onOpen: onChangePasswordModalOpen,
    onClose: onChangePasswordModalClose,
  } = useDisclosure();
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

  const {
    isOpen: isInviteAdminOpen,
    onOpen: onInviteAdminOpen,
    onClose: onInviteAdminClose,
  } = useDisclosure();

  return (
    <div>
      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={onChangePasswordModalClose}
      />
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

          <Link to="/">
            <Text textStyle="h4" ml="60px">
              Home
            </Text>
          </Link>

          <Link to="/dashboard">
            {isAdmin && <Text textStyle="h4">Admin Dashboard</Text>}
          </Link>
        </Flex>
        <Flex sx={{'z-index': "3"}}>
          <Menu>
            <MenuButton>
              <HiUser
                style={{ color: "#fff", height: "28px", width: "40px" }}
              />
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
                  <MenuItem
                    textStyle="body"
                    fontSize="sm"
                    padding="3px 0px"
                    cursor="pointer"
                    onClick={onInviteAdminOpen}
                  >
                    Invite new admin
                  </MenuItem>
                  <MenuItem
                    textStyle="body"
                    fontSize="sm"
                    padding="3px 0px"
                    cursor="pointer"
                    onClick={onChangePasswordModalOpen}
                  >
                    Change password
                  </MenuItem>

                  <MenuDivider />
                </div>
              )}

              <MenuItem
                textStyle="body"
                fontSize="sm"
                onClick={onLogOutClick}
                cursor="pointer"
                padding="5px 0px"
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <InviteAdminModal
        isOpen={isInviteAdminOpen}
        onClose={onInviteAdminClose}
      />
    </div>
  );
};

export default NavBar;
