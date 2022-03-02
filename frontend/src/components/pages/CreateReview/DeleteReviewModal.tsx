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
 * The model defining the props for the Delete Review Modal component
 */
interface DeleteReviewModalProps {
  /** A boolean representing whether the modal is open or not */
  isOpen: boolean;
  /** A function that sets isOpen to false */
  onClose: () => void;
  /** A function that deletes the current review */
  deleteReview: () => void;
}

/**
 * This component is the modal that appears when the user wants to delete a review and asks for confirmation
 */
const DeleteReviewModal = (
  props: DeleteReviewModalProps,
): React.ReactElement => {
  const { isOpen, onClose, deleteReview } = props;

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent w="40%" padding="10px">
        <ModalHeader>Hey wait!</ModalHeader>
        <ModalBody>
          <Text>Are you sure you want to delete this review?</Text>
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
              colorScheme="teal"
              bgColor="#0EBCBD"
              w="48%"
              onClick={() => {
                deleteReview();
                onClose();
              }}
            >
              Yes, delete review
            </Button>
            <Button
              variant="outline"
              w="48%"
              color="#0EBCBD"
              borderColor="#0EBCBD"
              onClick={onClose}
            >
              No, take me back
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteReviewModal;
