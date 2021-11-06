import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { Redirect, useHistory } from "react-router-dom";

import authAPIClient from "../../APIClients/AuthAPIClient";
import { HOME_PAGE, SIGNUP_PAGE } from "../../constants/Routes";
import AuthContext from "../../contexts/AuthContext";
import { AuthenticatedUser } from "../../types/AuthTypes";

type GoogleResponse = GoogleLoginResponse | GoogleLoginResponseOffline;

const Login = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [isInvalid, setInvalid] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const onLogInClick = async () => {
    const user: AuthenticatedUser = await authAPIClient.login(email, password);
    if (!user) {
      setInvalid(true);
    }
    setAuthenticatedUser(user);
  };

  if (authenticatedUser) {
    return <Redirect to={HOME_PAGE} />;
  }

  return (
    <Grid templateColumns="repeat(2, 1fr)">
      <GridItem w="100%" h="100%" bg="papayawhip" />
      <GridItem>
        <Stack justify="center" p="20%">
          <Text textStyle="heading">Log in</Text>
          <Text textStyle="body" color="gray.700">
            Enter your credentials to access your account.
          </Text>
          <FormControl mt="1rem">
            <Box mt="4%">
              <FormLabel>Email address</FormLabel>
              <Input
                value={email}
                name="email"
                placeholder="Email address"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Box>
            <Box mt="4%" mb="10%">
              <FormLabel>Password</FormLabel>
              <Input
                isInvalid={isInvalid}
                value={password}
                type="password"
                name="password"
                placeholder="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                  setInvalid(false);
                }}
                errorBorderColor="crimson"
              />
              {isInvalid ? (
                <FormHelperText color="crimson">
                  The username or password you entered is incorrect.
                </FormHelperText>
              ) : null}
            </Box>
            <Button
              type="submit"
              w="100%"
              colorScheme="teal"
              size="md"
              onClick={onLogInClick}
            >
              Log in
            </Button>
          </FormControl>
        </Stack>
      </GridItem>
    </Grid>
  );
};

export default Login;
