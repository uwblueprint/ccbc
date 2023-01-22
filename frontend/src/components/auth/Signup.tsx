import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";

import authAPIClient from "../../APIClients/AuthAPIClient";
import { AuthenticatedUser } from "../../types/AuthTypes";
import SuccessfullyCreatedEmailModal from "./SuccessfullyCreatedEmailModal";

const Signup = (): React.ReactElement => {
  const [isInvalid, setInvalid] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const onSignupClick = async () => {
    const user: AuthenticatedUser = await authAPIClient.register(
      firstName,
      lastName,
      email,
    );

    if (user) {
      setInvalid(false);
      onOpen();
    } else {
      setInvalid(true);
    }
  };

  return (
    <Stack justify="center" p="25vh 10vw">
      <Text textStyle="heading">Signup</Text>
      <FormControl
        onKeyPress={(e) => e.key === "Enter" && onSignupClick()}
        isInvalid={isInvalid}
      >
        <Box mt="0.5em">
          <FormLabel>First name</FormLabel>
          <Input
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="First name"
          />
        </Box>
        <Box mt="0.5em" mb="1em">
          <FormLabel>Last name</FormLabel>
          <Input
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            placeholder="Last name"
          />
        </Box>
        <Box mt="0.5em">
          <FormLabel>Email address</FormLabel>
          <Input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="username@domain.com"
          />
        </Box>
        <FormErrorMessage>Account creation failed</FormErrorMessage>
        <Box mt="1em">
          <Button variant="submit" type="submit" onClick={onSignupClick}>
            Sign Up
          </Button>
          <SuccessfullyCreatedEmailModal isOpen={isOpen} onClose={onClose} />
        </Box>
      </FormControl>
    </Stack>
  );
};

export default Signup;
