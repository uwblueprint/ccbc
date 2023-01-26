import {
  Center,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";

import UsersAPIClient from "../../APIClients/UsersAPIClient";
/* Images */
import CCBCLogo from "../../images/ccbc-logo.png";
import LoginGraphic from "../../images/Login-graphic.png";
import { AuthenticatedUser } from "../../types/AuthTypes";
import authUtils from "../../utils/AuthUtils";
import EmailForm from "./EmailForm";
import SuccessfullyCreatedEmailModal from "./SuccessfullyCreatedEmailModal";

const SubscriberSignup = (): React.ReactElement => {
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSendEmailClick = async (email: string) => {
    if (!authUtils.validateEmail(email)) {
      setIsEmailInvalid(true);
    } else {
      const user: AuthenticatedUser = await UsersAPIClient.register(email);

      if (user) {
        setIsEmailInvalid(false);
        onOpen();
      } else {
        setIsEmailInvalid(true);
      }
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
            <EmailForm
              onSendEmailClick={onSendEmailClick}
              isEmailInvalid={isEmailInvalid}
              setIsEmailInvalid={setIsEmailInvalid}
            />
            <FormErrorMessage>Account creation failed</FormErrorMessage>
            <SuccessfullyCreatedEmailModal isOpen={isOpen} onClose={onClose} />
          </FormControl>
        </Stack>
      </GridItem>
    </Grid>
  );
};

export default SubscriberSignup;
