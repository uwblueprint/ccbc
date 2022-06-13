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
interface SaveDraftReviewModalProps {
  /** A boolean representing whether the modal is open or not */
  isOpen: boolean;
  /** A function that sets isOpen to false */
  onClose: () => void;
  /** A function that deletes the current review */
  deleteReview: () => void;
  /** A function that saves the current review */
  saveReview: () => void;
  bookTitle: string;
}

/**
 * This component is the modal that appears when the user wants to delete a review and asks for confirmation
 */
const SaveDraftReviewModal = (
  props: SaveDraftReviewModalProps,
): React.ReactElement => {
  const { isOpen, onClose, deleteReview, saveReview, bookTitle } = props;

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent w="40%" padding="10px">
        <ModalHeader>Hey wait!</ModalHeader>
        <ModalBody>
          <Text>
            Do you want to save changes to &ldquo;{bookTitle}&rdquo;? Your edits
            will be lost if you don&apos;t save them.
          </Text>
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
                saveReview();
                onClose();
              }}
            >
              Yes, save changes
            </Button>
            <Button
              variant="outline"
              w="48%"
              color="#0EBCBD"
              borderColor="#0EBCBD"
              onClick={() => {
                deleteReview();
                onClose();
              }}
            >
              No, don&apos;t save
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SaveDraftReviewModal;
