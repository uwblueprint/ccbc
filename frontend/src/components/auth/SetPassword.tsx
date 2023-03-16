import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { getAuth, updatePassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";

import authAPIClient from "../../APIClients/AuthAPIClient";
import { HOME_PAGE } from "../../constants/Routes";
import AuthContext from "../../contexts/AuthContext";
/* Images */
import CCBCLogo from "../../images/ccbc-logo.png";
import LoginGraphic from "../../images/Login-graphic.png";
import { AuthenticatedUser } from "../../types/AuthTypes";
import firebaseApp from "../../utils/Firebase";
import PasswordRequirements from "../common/ChangePassword/PasswordRequirements";
import PasswordInputField from "../common/PasswordInputField";

/**
 * A model describing the props for SetPassword component
 */
export type SetPasswordProps = {
  email: string;
  uid: string;
  isNewAccount: boolean;
};

/**
 * This component is responsible for setting up a password for a new user OR
 * reseting an existing user's password (the key difference being in if the account is marked as verified or not)
 */
const SetPassword = ({
  email,
  uid,
  isNewAccount,
}: SetPasswordProps): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [userEmail] = useState(email);
  const [errorMessage, setErrorMessage] = useState("");
  const [isInvalid, setInvalid] = useState(false);

  const onSetPasswordClick = async () => {
    if (newPassword !== confirmNewPassword) {
      setInvalid(true);
      setErrorMessage("Entered passwords do not match");
    } else {
      try {
        const auth = getAuth(firebaseApp);

        // update the password for the loggedin user
        const { currentUser } = auth;
        if (currentUser === null)
          throw new Error("Unable to retreive current user");
        try {
          await updatePassword(currentUser, newPassword);
        } catch (e: any) {
          if (e.message.includes("weak-password")) {
            setInvalid(true);
            setErrorMessage(
              "The password is too weak, must be at least 6 characters long.",
            );
            return;
          }
          throw new Error(e);
        }

        if (isNewAccount) {
          // verify the user
          const couldVerify = await authAPIClient.verifyEmail(uid);
          if (!couldVerify) {
            throw new Error("Could not verify user");
          }
        }

        // log the user in if password reset was successful
        const user: AuthenticatedUser = await authAPIClient.login(
          userEmail,
          newPassword,
        );
        if (!user) {
          throw Error("Could not log in user");
        }
        setAuthenticatedUser(user);
      } catch (error) {
        setInvalid(true);
        setErrorMessage("Unable to set password, please try again later");
      }
    }
  };

  if (authenticatedUser) {
    return <Redirect to={HOME_PAGE} />;
  }

  return (
    <Grid
      overflow="hidden"
      w="100vw"
      h="100vh"
      templateColumns="repeat(2, 1fr)"
    >
      <GridItem bg="papayawhip">
        <Stack>
          <Image
            boxSize="50px"
            m="5vh 5vw"
            src={CCBCLogo}
            alt="ccbc-logo"
            objectFit="cover"
          />
          <Center p="5vh">
            <Image src={LoginGraphic} />
          </Center>
        </Stack>
      </GridItem>
      <GridItem>
        <Stack justify="center" p="25vh 10vw">
          <Center>
            <Text textStyle="heading">
              {isNewAccount ? "Password Set Up" : "Reset Password"}
            </Text>
          </Center>
          <Text textStyle="body" color="gray.700">
            {isNewAccount
              ? "A CCBC account was successfully created for you! Set your password below to activate your account."
              : "Enter a new password below to reset it."}
          </Text>
          <PasswordRequirements />
          <FormControl mt="1rem">
            <Box mt="4%">
              <FormLabel>New Password</FormLabel>
              <PasswordInputField
                isInvalid={isInvalid}
                value={newPassword}
                onChangeHandler={(event) => {
                  setNewPassword(event.target.value);
                  setInvalid(false);
                }}
                placeholder="New Password"
                errorMessage=""
              />
            </Box>
            <Box mt="4%" mb="10%">
              <FormLabel>Confirm Password</FormLabel>
              <PasswordInputField
                isInvalid={isInvalid}
                value={confirmNewPassword}
                onChangeHandler={(event) => {
                  setConfirmNewPassword(event.target.value);
                  setInvalid(false);
                }}
                placeholder="Confirm Password"
                errorMessage={errorMessage}
              />
            </Box>
            <Button variant="submit" type="submit" onClick={onSetPasswordClick}>
              {isNewAccount ? "Create account" : "Reset password"}
            </Button>
          </FormControl>
        </Stack>
      </GridItem>
    </Grid>
  );
};

export { SetPassword };
