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
import { SIGNUP_ERROR } from "../../constants/ErrorMessages";
import useToasts from "../Toast";
import LoadingSpinner from "./LoadingSpinner";

export type InviteAdminModalProps = {
  // this describes the state of the modal
  isOpen: boolean;
  // a callback function to close the modal
  onClose: () => void;
};

/**
 * This component allows an admin to invite other user to the platform
 * */
const InviteAdminModal = (props: InviteAdminModalProps): React.ReactElement => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onClose } = props;
  const newToast = useToasts();

  /**
   * handler function to be executed when the submit button is clicked
   */
  const onSubmitClick = async () => {
    setIsLoading(true);
    if (!email || !firstName || !lastName) {
      setIsInvalid(true);
      setErrorMessage("Please enter all fields");
    } else {
      const user = await authAPIClient.register(firstName, lastName, email);
      setIsLoading(false);
      if (!user) {
        setIsInvalid(true);
        setErrorMessage(SIGNUP_ERROR);
        newToast("error", "Error inviting admin", SIGNUP_ERROR);
      } else {
        onClose();
        // clear states
        setEmail("");
        setFirstName("");
        setLastName("");
        setIsInvalid(false);
        setErrorMessage("");
        newToast(
          `success`,
          `Invite sent`,
          `Your admin invite has been sent to ${firstName} ${lastName}`,
        );
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
        {isLoading ? (
          <LoadingSpinner h="20%" />
        ) : (
          <>
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
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default InviteAdminModal;
