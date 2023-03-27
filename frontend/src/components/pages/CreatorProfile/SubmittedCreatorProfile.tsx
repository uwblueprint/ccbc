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

import AuthModalBackground from "../../../assets/forgotPasswordModalGraphic.svg";

interface SubmittedCreatorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubmittedCreatorProfileModal = ({
  isOpen,
  onClose,
}: SubmittedCreatorProfileModalProps): React.ReactElement => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        minW="600px"
        h="480px"
        borderRadius="20px"
        bgImage={AuthModalBackground}
        backgroundSize="60%"
        backgroundRepeat="no-repeat"
        backgroundPosition="bottom 1px right 1px"
      >
        <Box mt="38px" mr="51px">
          <ModalCloseButton margin="inherit" />
          <ModalHeader pt="32px" ml="82px">
            Profile Submitted!
          </ModalHeader>
        </Box>
        <ModalBody ml="82px" mt="15px" width="444px">
          <Text fontSize="18px">
            Congratulations! You have successfully completed your profile.
          </Text>
          <Text fontSize="16px" mt="30px">
            What comes next? A CCBC admin will review your profile shortly and
            an email notification will be sent your way once approved. You can
            make changes to your info at any time by going into your profile and
            clicking edit.
          </Text>
          <Text fontSize="16px" mt="30px">
            Happy creating and connecting!
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SubmittedCreatorProfileModal;
