import {
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { HiUser } from "react-icons/hi";
import { Link, useHistory } from "react-router-dom";

import authAPIClient from "../../APIClients/AuthAPIClient";
import logo from "../../assets/ccbc.png";
import { UserRole } from "../../constants/Enums";
import AuthContext from "../../contexts/AuthContext";
import ChangePasswordModal from "./ChangePassword/ChangePasswordModal";
import InviteAdminModal from "./InviteAdminModal";

const NavBar = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const history = useHistory();

  const isAdmin = authenticatedUser?.roleType === UserRole.Admin;
  const isCreator = authenticatedUser?.roleType === UserRole.Creator;
  const {
    isOpen: isChangePasswordModalOpen,
    onOpen: onChangePasswordModalOpen,
    onClose: onChangePasswordModalClose,
  } = useDisclosure();

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

  const displayNavText = useBreakpointValue(
    {
      base: false,
      sm: true,
      md: true,
      lg: true,
    },
    "lg",
  );

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
        pl={["30px", "30px", "80px"]}
        pr={["30px", "30px", "80px"]}
        justify="space-between"
        top="0"
      >
        <Flex direction="row" align="center">
          <Link to="/">
            <Image
              src={logo}
              alt="CCBC Logo"
              boxSize="64px"
              borderRadius="full"
            />
          </Link>
          {displayNavText && (
            <Link to="/reviews">
              <Text textStyle="h4" ml="60px">
                Magazine Directory
              </Text>
            </Link>
          )}
          {displayNavText && (
            <Link to="/creator-directory">
              <Text textStyle="h4">Creator Directory</Text>
            </Link>
          )}
          {displayNavText && (
            <Link to="/dashboard">
              {isAdmin && <Text textStyle="h4">Admin Dashboard</Text>}
            </Link>
          )}
        </Flex>
        <Flex sx={{ "z-index": "3" }}>
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
                {authenticatedUser?.firstName} {authenticatedUser?.lastName}
              </Text>
              <Text
                color="#4A5568"
                textStyle="body"
                fontSize="sm"
                padding="3px 0px"
                cursor="default"
              >
                {authenticatedUser?.email}
              </Text>

              <Text
                color="#4A5568"
                textStyle="body"
                fontSize="sm"
                cursor="default"
              >
                {authenticatedUser?.roleType}
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
                </div>
              )}
              {isCreator && (
                <div className="Section 2">
                  <MenuItem
                    textStyle="body"
                    fontSize="sm"
                    padding="3px 0px"
                    cursor="pointer"
                    onClick={() =>
                      history.push("/create-creator-profile", {
                        currentPage: 5,
                      })
                    }
                  >
                    Edit creator profile
                  </MenuItem>
                </div>
              )}
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
