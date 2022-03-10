import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";

import authAPIClient from "../../APIClients/AuthAPIClient";

export type InviteAdminModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

/**
 * This component allows an admin to invite other user to the platform
**/
const InviteAdminModal = (props: InviteAdminModalProps): React.ReactElement => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { isOpen, onClose } = props;

  const onSubmitClick = async () => {
    if (!email || !firstName || !lastName) {
      setIsInvalid(true);
      setErrorMessage("Please enter all fields");
    } else {
      const user = await authAPIClient.register(firstName, lastName, email);
      if (!user) {
        setIsInvalid(true);
        setErrorMessage(
          "Unable to sign up user. Please check entered details.",
        );
      } else {
        onClose();
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        maxW="627px"
        maxH="483px"
        pl="40px"
        pr="40px"
        pb="40px"
        pt="49px"
      >
        <ModalHeader mb="0px">Invite New Admin Request</ModalHeader>
        <ModalCloseButton mt="30px" mr="30px" />
        <ModalBody>
          <FormControl>
            <Box>
              <FormLabel>First name</FormLabel>
              <Input
                value={firstName}
                name="firstName"
                placeholder="First name"
                onChange={(event) => {
                  setIsInvalid(false);
                  setFirstName(event.target.value);
                }}
              />
            </Box>
            <Box mt="4%">
              <FormLabel>Last name</FormLabel>
              <Input
                value={lastName}
                name="lastName"
                placeholder="Last name"
                onChange={(event) => {
                  setIsInvalid(false);
                  setLastName(event.target.value);
                }}
              />
            </Box>
            <Box mt="4%">
              <FormLabel>Email address</FormLabel>
              <Input
                value={email}
                name="email"
                type="email"
                placeholder="Email address"
                onChange={(event) => {
                  setIsInvalid(false);
                  setEmail(event.target.value);
                }}
              />
            </Box>
            {isInvalid ? (
              <FormHelperText color="crimson">{errorMessage}</FormHelperText>
            ) : null}
          </FormControl>
        </ModalBody>

        <ModalFooter justifyContent="flex-start">
          <Button
            onClick={onSubmitClick}
            variant="submit"
            width="117px"
            height="40px"
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InviteAdminModal;
