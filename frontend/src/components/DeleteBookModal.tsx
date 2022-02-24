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

interface DeleteBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookIndex: number;
  deleteBook: (index: number) => void;
}

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
              variant="add"
              w="48%"
              onClick={() => {
                deleteBook(bookIndex);
                onClose();
              }}
            >
              Yes, delete book
            </Button>
            <Button variant="outline" w="48%" onClick={onClose}>
              No, take me back
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteBookModal;
