import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

import UsersAPIClient from "../../APIClients/UsersAPIClient";
import * as Routes from "../../constants/Routes";
/* Images */
import CCBCLogo from "../../images/ccbc-logo.png";
import LoginGraphic from "../../images/Login-graphic.png";
import authUtils from "../../utils/AuthUtils";

const SubscriberSignup = (): React.ReactElement => {
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [email, setEmail] = useState("");

  const onSendEmailClick = async () => {
    if (!authUtils.validateEmail(email)) {
      setIsEmailInvalid(true);
    } else {
      await UsersAPIClient.register(email);
    }
  };

  return (
    <Grid
      overflow="hidden"
      w="100vw"
      h="100vh"
      templateColumns="repeat(2, 1fr)"
    >
      <GridItem bg="#F6F4F2">
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
          <Text textStyle="heading" align="center">
            Create an Account
          </Text>
          <Text textStyle="body" color="gray.700">
            Please enter an email for a verification code to be sent
          </Text>
          <FormControl mt="1rem">
            <Box mt="4%" mb="4%">
              <FormLabel>Email address</FormLabel>
              <Input
                value={email}
                name="email"
                placeholder="example@gmail.com"
                isInvalid={isEmailInvalid}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setIsEmailInvalid(false);
                }}
              />
            </Box>
            <Button variant="submit" type="button" onClick={onSendEmailClick}>
              Sign Up
            </Button>
            <Box display="flex" mt="3">
              <Box mr="1">
                <Text textStyle="body" color="gray.700">
                  Already have an account?
                </Text>
              </Box>
              <Link href={`${Routes.LOGIN_PAGE}`}>
                <Text fontWeight="bold" color="gray.700" as="u">
                  Log In
                </Text>
              </Link>
            </Box>
          </FormControl>
        </Stack>
      </GridItem>
    </Grid>
  );
};

export default SubscriberSignup;
