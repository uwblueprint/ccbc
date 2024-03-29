import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

export type DeleteConfirmationProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
  reviewName?: string;
  authorName?: string;
};

/**
 * DeleteConfirmationModal displays and asks for confirmation when
 * the delete button on an Admin Dashboard row is clicked
 */
const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onDelete,
  reviewName,
  authorName,
}: DeleteConfirmationProps): React.ReactElement => {
  return (
    <Modal isOpen={isOpen} onClose={() => onClose()} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          mt="40px"
          ml="40px"
          mr="40px"
          fontFamily="DM Sans"
          fontSize="30px"
          fontWeight="700"
        >
          Hey wait!
        </ModalHeader>
        <ModalCloseButton />
        {reviewName ? (
          <ModalBody ml="40px" mr="40px" fontFamily="DM Sans">
            Are you sure you want to delete this review of {reviewName}?
          </ModalBody>
        ) : (
          <ModalBody ml="40px" mr="40px" fontFamily="DM Sans">
            Are you sure you want to delete {authorName}?
          </ModalBody>
        )}
        <ModalFooter mb="40px" mr="40px" ml="40px">
          <Button
            w="167px"
            colorScheme="teal"
            onClick={() => {
              onClose();
              onDelete();
            }}
          >
            Yes, delete {reviewName ? "review" : "creator"}
          </Button>
          <Button
            w="167px"
            ml="16px"
            colorScheme="teal"
            variant="outline"
            onClick={() => onClose()}
          >
            No, take me back
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmationModal;
