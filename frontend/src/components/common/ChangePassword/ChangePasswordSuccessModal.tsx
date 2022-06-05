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

import PasswordChanged from "../../../assets/PasswordChanged.png";

/**
 * The model defining the props for the Change Password Success Modal component
 */
interface ChangePasswordSuccessModalProps {
  /** A boolean representing whether the modal is open or not */
  isOpen: boolean;
  /** A function called when the modal is closed, sets isOpen to false and resets the state in the parent component */
  onClose: () => void;
}

/**
 * This component is the modal that appears when the user successfully changes their password
 */
const ChangePasswordSuccessModal = (
  props: ChangePasswordSuccessModalProps,
): React.ReactElement => {
  const { isOpen, onClose } = props;

  return (
    <Modal
      onClose={() => {
        onClose();
        // window is reloaded in order to reset the BEARER_TOKEN constant in constants/AuthConstants.ts
        window.location.reload();
      }}
      isOpen={isOpen}
      size="lg"
      isCentered
    >
      <ModalOverlay />
      <ModalContent padding="10px">
        <ModalCloseButton />
        <ModalBody>
          <Heading size="lg" mt="40px" mb="40px">
            Password changed!
          </Heading>
          <Text mb="220px">
            You have successfully changed your password. You may now close this
            window and return to your work
          </Text>
          <Image
            src={PasswordChanged}
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

export default ChangePasswordSuccessModal;
