import {
  Box,
  Button,
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

export type InviteAdminModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const InviteAdminModal = (props: InviteAdminModalProps): React.ReactElement => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { isOpen, onClose } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Invite New Admin Request</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mt="4%">
            <FormLabel>First name</FormLabel>
            <Input
              value={firstName}
              name="firstName"
              placeholder="First name"
              onChange={(event) => setFirstName(event.target.value)}
            />
          </Box>
          <Box mt="4%">
            <FormLabel>Last name</FormLabel>
            <Input
              value={lastName}
              name="lastName"
              placeholder="Last name"
              onChange={(event) => setLastName(event.target.value)}
            />
          </Box>
          <Box mt="4%">
            <FormLabel>Email address</FormLabel>
            <Input
              value={email}
              name="email"
              placeholder="Email address"
              onChange={(event) => setEmail(event.target.value)}
            />
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button>Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InviteAdminModal;
