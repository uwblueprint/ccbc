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
 * The model defining the props for the Delete Book Modal component
 */
interface DeleteBookModalProps {
  /** A boolean representing whether the modal is open or not */
  isOpen: boolean;
  /** A function that sets isOpen to false */
  onClose: () => void;
  /** The index of the current book */
  bookIndex: number;
  /** A function that deletes the current book */
  deleteBook: (index: number) => void;
}

/**
 * This component is the modal that appears when the user wants to delete a book and asks for confirmation
 */
const DeleteBookModal = (props: DeleteBookModalProps): React.ReactElement => {
  const { isOpen, onClose, deleteBook, bookIndex } = props;

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent w="40%" padding="10px">
        <ModalHeader>Hey wait!</ModalHeader>
        <ModalBody>
          <Text>Are you sure you want to delete this book?</Text>
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
                deleteBook(bookIndex);
                onClose();
              }}
            >
              Yes, delete book
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

export default DeleteBookModal;
