import { ArrowBackIcon } from "@chakra-ui/icons";
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
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import authAPIClient from "../../APIClients/AuthAPIClient";
/* Images */
import CCBCLogo from "../../images/ccbc-logo.png";
import LoginGraphic from "../../images/Login-graphic.png";
import authUtils from "../../utils/AuthUtils";
import ForgotPasswordEmailModal from "./ForgotPasswordEmailModal";

/**
 * This component is responsible for getting the user's email
 * and sending them an email with instructions on resetting their password
 */
const ForgotPassword = (): React.ReactElement => {
  const [email, setEmail] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const history = useHistory();

  const onBackClick = () => {
    history.push(`/login`);
  };

  const onSendEmailClick = async () => {
    if (!authUtils.validateEmail(email)) {
      setIsEmailInvalid(true);
    } else {
      await authAPIClient.sendForgotPasswordEmail(email);
      onOpen();
    }
  };

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
        <Button
          marginLeft="86px"
          marginTop="86px"
          leftIcon={<ArrowBackIcon />}
          variant="ghost"
          onClick={onBackClick}
        >
          Back
        </Button>
        <Stack justify="center" pt="165px" pb="403px" pl="138px" pr="130px">
          <Center>
            <Text textStyle="heading">Forgot your password?</Text>
          </Center>
          <Text textStyle="body" color="gray.700">
            Enter your email and we will email you instructions on how to reset
            your password.
          </Text>
          <FormControl mt="1rem">
            <Box mt="4%" mb="8%">
              <FormLabel>Email address</FormLabel>
              <Input
                value={email}
                name="email"
                isInvalid={isEmailInvalid}
                placeholder="Email address"
                onChange={(event) => {
                  setIsEmailInvalid(false);
                  setEmail(event.target.value);
                }}
                errorBorderColor="crimson"
                mb="8px"
              />
              <Text
                visibility={isEmailInvalid ? "visible" : "hidden"}
                textColor="crimson"
              >
                Email address is invalid
              </Text>
            </Box>
            <Button variant="submit" type="submit" onClick={onSendEmailClick}>
              Send email
            </Button>
            <ForgotPasswordEmailModal isOpen={isOpen} onClose={onClose} />
          </FormControl>
        </Stack>
      </GridItem>
    </Grid>
  );
};

export default ForgotPassword;
