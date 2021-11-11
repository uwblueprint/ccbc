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
import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";

import authAPIClient from "../../APIClients/AuthAPIClient";
import { HOME_PAGE } from "../../constants/Routes";
import AuthContext from "../../contexts/AuthContext";
/* Images */
import CCBCLogo from "../../images/ccbc-logo.png";
import LoginGraphic from "../../images/Login-graphic.png";
import { AuthenticatedUser } from "../../types/AuthTypes";

const Login = (): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const [isInvalid, setInvalid] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <Grid overflow="hidden" w="100vw" h="100vh" templateColumns="repeat(2, 1fr)">
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
