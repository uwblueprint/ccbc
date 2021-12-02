import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Input,
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

export type SetPasswordProps = {
  email: string;
  uid: string;
};

const SetPassword = ({ email, uid }: SetPasswordProps): React.ReactElement => {
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
        await updatePassword(currentUser, newPassword);

        // verify the user
        const couldVerify = await authAPIClient.verifyEmail(uid);
        if (!couldVerify) {
          throw new Error("Could not verify user");
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
            <Text textStyle="heading">Password Set Up</Text>
          </Center>
          <Center>
            <Text textStyle="body" color="gray.700">
              A CCBC account was successfully created for you! Set your password
              below to activate your account.
            </Text>
          </Center>
          <FormControl mt="1rem">
            <Box mt="4%">
              <FormLabel>New Password</FormLabel>
              <Input
                value={newPassword}
                name="new password"
                type="password"
                placeholder="New Password"
                onChange={(event) => setNewPassword(event.target.value)}
              />
            </Box>
            <Box mt="4%" mb="10%">
              <FormLabel>Confirm Password</FormLabel>
              <Input
                isInvalid={isInvalid}
                value={confirmNewPassword}
                type="password"
                name="confirm password"
                placeholder="Confirm Password"
                onChange={(event) => {
                  setConfirmNewPassword(event.target.value);
                  setInvalid(false);
                }}
                errorBorderColor="crimson"
              />
              {isInvalid ? (
                <FormHelperText color="crimson">{errorMessage}</FormHelperText>
              ) : null}
            </Box>
            <Button variant="submit" type="submit" onClick={onSetPasswordClick}>
              Create Account
            </Button>
          </FormControl>
        </Stack>
      </GridItem>
    </Grid>
  );
};

export { SetPassword };
