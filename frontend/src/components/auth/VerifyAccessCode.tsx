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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

import authAPIClient from "../../APIClients/AuthAPIClient";
import { SETUP_PASSWORD_MODE } from "../../constants/AuthConstants";
import { HOME_PAGE } from "../../constants/Routes";
import * as Routes from "../../constants/Routes";
import AuthContext from "../../contexts/AuthContext";
/* Images */
import CCBCLogo from "../../images/ccbc-logo.png";
import LoginGraphic from "../../images/Login-graphic.png";
import firebaseApp from "../../utils/Firebase";
import PasswordInputField from "../common/PasswordInputField";
import { SetPasswordProps } from "./SetPassword";

const VerifyAccessCode = ({ uid }: { uid: string }): React.ReactElement => {
  const { authenticatedUser } = useContext(AuthContext);
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [allowSetup, setAllowSetup] = useState(true);
  const [email, setEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");

  const history = useHistory<SetPasswordProps>();

  const onInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccessCode(event.target.value);
    setIsInvalid(false);
  };

  useEffect(() => {
    // This function gets the user info and
    // stores the email and isVerified
    async function getUserInfo() {
      try {
        const firebaseUser = await authAPIClient.getFirebaseUserByUid(uid);
        setIsVerified(firebaseUser.emailVerified);
        if (firebaseUser.email === null)
          throw new Error("Unable to set up account");
        setEmail(firebaseUser.email);
      } catch (error) {
        setAllowSetup(false); // TODO: if something went wrong, we should show an error page
      }
    }

    getUserInfo();
  }, [email, isVerified, uid]);

  const onSubmitClick = async () => {
    try {
      const auth = getAuth(firebaseApp);
      // try to login the user to get the currentUser from firebase-auth
      await signInWithEmailAndPassword(auth, email, accessCode);
      history.push(`/auth/action?mode=${SETUP_PASSWORD_MODE}`, { email, uid });
    } catch (error) {
      setIsInvalid(true);
      setErrorMessage("Invalid access code");
    }
  };

  const onLoginClick = () => {
    history.push(`/login`);
  };

  if (authenticatedUser) {
    return <Redirect to={HOME_PAGE} />;
  }

  const verifiedContent = (
    <Stack justify="center" p="25vh 10vw">
      <Center>
        <Text textStyle="heading">Account Activated</Text>
      </Center>
      <Center>
        <Text textStyle="body" color="gray.700" marginBottom={50}>
          Your verification code has already been used to activate your account.
          Click the button below to log in.
        </Text>
      </Center>
      <FormControl mt="1rem">
        <Button variant="submit" type="submit" onClick={onLoginClick}>
          Log in
        </Button>
      </FormControl>
    </Stack>
  );

  const unverifiedContent = (
    <Stack justify="center" p="25vh 10vw">
      <Center>
        <Text textStyle="heading">Verification Code</Text>
      </Center>
      <Center>
        <Text textStyle="body" color="gray.700">
          Please enter the verification code sent to your email address
        </Text>
      </Center>
      <FormControl mt="1rem">
        <Box mt="4%" mb="10%">
          <FormLabel>Access Code</FormLabel>
          <PasswordInputField
            isInvalid={isInvalid}
            value={accessCode}
            onChangeHandler={onInputChanged}
            placeholder="Access Code"
            errorMessage={errorMessage}
          />
        </Box>
        <Button variant="submit" type="submit" onClick={onSubmitClick}>
          Done
        </Button>
      </FormControl>
    </Stack>
  );

  const allowSetupPage = (
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
      <GridItem>{isVerified ? verifiedContent : unverifiedContent}</GridItem>
    </Grid>
  );

  return allowSetup ? (
    allowSetupPage
  ) : (
    <Redirect to={Routes.UNAUTHORIZED_PAGE} />
  );
};

export default VerifyAccessCode;
