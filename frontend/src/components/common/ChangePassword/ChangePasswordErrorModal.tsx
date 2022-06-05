import {
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";

import PasswordError from "../../../assets/PasswordError.png";

/**
 * The model defining the props for the Change Password Error Modal component
 */
interface ChangePasswordErrorModalProps {
  /** A boolean representing whether the modal is open or not */
  isOpen: boolean;
  /** A function called when the modal is closed, sets isOpen to false and resets the state in the parent component */
  onClose: () => void;
}

/**
 * This component is the modal that appears when an error occurs while the user is attempting to change their password
 */
const ChangePasswordErrorModal = (
  props: ChangePasswordErrorModalProps,
): React.ReactElement => {
  const { isOpen, onClose } = props;

  return (
    <Modal onClose={onClose} isOpen={isOpen} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent padding="10px">
        <ModalCloseButton />
        <ModalBody>
          <Heading size="lg" mt="40px" mb="40px">
            An error has occurred
          </Heading>
          <Text mb="160px">
            Uh oh! Something went wrong with changing your password. Please try
            again later. <br />
            <br /> If the error persists, try refreshing the page and clearing
            your browser of cookies.
          </Text>
          <Image
            src={PasswordError}
            w="70%"
            position="absolute"
            bottom="0"
            right="0"
            borderRadius="8px"
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ChangePasswordErrorModal;
