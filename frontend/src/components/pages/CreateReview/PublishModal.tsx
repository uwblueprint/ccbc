import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";

/**
 * The model defining the props for the Publish Modal component
 */
interface PublishModalProps {
  /** A boolean representing whether the modal is open or not */
  isOpen: boolean;
  /** A function that sets isOpen to false */
  onClose: () => void;
  /** A function that publishes the current review */
  publishReview: () => void;
}

/**
 * This component is the modal that appears when the user wants to publish a review and asks for confirmation
 */
const PublishModal = (props: PublishModalProps): React.ReactElement => {
  const { isOpen, onClose, publishReview } = props;

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent w="40%" padding="10px">
        <ModalHeader>Almost there!</ModalHeader>
        <ModalBody>
          <Text>Are you ready to publish your review?</Text>
        </ModalBody>
        <ModalFooter>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            w="100%"
          >
            <Button
              variant="outline"
              w="48%"
              color="#0EBCBD"
              borderColor="#0EBCBD"
              onClick={onClose}
            >
              No, take me back
            </Button>
            <Button
              colorScheme="teal"
              bgColor="#0EBCBD"
              w="48%"
              onClick={() => {
                publishReview();
                onClose();
              }}
            >
              Yes, publish review
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PublishModal;
