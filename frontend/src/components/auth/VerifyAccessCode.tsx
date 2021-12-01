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
import { Auth, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

import authAPIClient from "../../APIClients/AuthAPIClient";
import { SETUP_PASSWORD_MODE } from "../../constants/AuthConstants";
import { HOME_PAGE } from "../../constants/Routes";
import AuthContext from "../../contexts/AuthContext";
/* Images */
import CCBCLogo from "../../images/ccbc-logo.png";
import LoginGraphic from "../../images/Login-graphic.png";
import { AuthenticatedUser } from "../../types/AuthTypes";
import firebaseApp from "../../utils/firebase";
import { SetPasswordProps } from "./SetPassword";

const VerifyAccessCode = ({ uid }: { uid: string }): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [allowSetup, setAllowSetup] = useState(true);
  const [accessCode, setAccessCode] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory<SetPasswordProps>();

  useEffect(() => {
    // This function gets the user info and
    // stores the email and isVerified
    async function getUserInfo() {
      try {
        const firebaseUser = await authAPIClient.getFirebaseUserByUid(uid);
        setIsVerified(firebaseUser.emailVerified);

        if (firebaseUser.email === null) {
          setAllowSetup(false); // user should not be able to setup if we can't get their firebase user
          throw new Error("Unable to setup user. Please try again");
        }
        setEmail(firebaseUser.email);
      } catch (error) {
        setAllowSetup(false);
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
              <Input
                isInvalid={isInvalid}
                value={accessCode}
                type="password"
                name="accessCode"
                placeholder="Access Code"
                onChange={(event) => {
                  setAccessCode(event.target.value);
                  setIsInvalid(false);
                }}
                errorBorderColor="crimson"
              />
              {isInvalid ? (
                <FormHelperText color="crimson">
                  Invalid access code
                </FormHelperText>
              ) : null}
            </Box>
            <Button variant="submit" type="submit" onClick={onSubmitClick}>
              Done
            </Button>
          </FormControl>
        </Stack>
      </GridItem>
    </Grid>
  );
};

export default VerifyAccessCode;
