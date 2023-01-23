import {
  Box,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";

import AuthModalBackground from "../../assets/forgotPasswordModalGraphic.svg";

/**
 * This is a model for the SuccessfullyCreatedEmail component's props
 */
interface SuccessfullyCreatedEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * This component is the modal to let the user know that an email has been sent
 * with instructions on how to activate their account
 */
const SuccessfullyCreatedEmailModal = ({
  isOpen,
  onClose,
}: SuccessfullyCreatedEmailModalProps): React.ReactElement => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        minW="590px"
        maxW="590px"
        minH="480px"
        maxH="480px"
        borderRadius="20px"
      >
        <Box mt="38px" mr="51px">
          <ModalCloseButton margin="inherit" />
          <ModalHeader pt="32px" ml="82px">
            Check your email!
          </ModalHeader>
        </Box>
        <ModalBody ml="82px" mt="15px" width="444px">
          <Text fontSize="18px">
            We have sent you further instructions to create your account
          </Text>
          <Text fontSize="16px" mt="30px">
            Did not recieve the email? Check your spam inbox or close this
            window and try another email address.{" "}
          </Text>
        </ModalBody>
        <Image
          src={AuthModalBackground}
          maxHeight="60%"
          maxWidth="60%"
          alignSelf="end"
          borderBottomRightRadius="inherit"
        />
      </ModalContent>
    </Modal>
  );
};

export default SuccessfullyCreatedEmailModal;
