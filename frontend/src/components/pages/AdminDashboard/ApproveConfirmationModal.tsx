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

export type StatusConfirmationProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isApproving?: boolean;
  authorName?: string;
};

/**
 * ApproveConfirmationModal displays and asks for confirmation when
 * the approve button on an Admin Dashboard row is clicked
 */
const StatusConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  isApproving,
  authorName,
}: StatusConfirmationProps): React.ReactElement => {
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
        <ModalBody ml="40px" mr="40px" fontFamily="DM Sans">
          Are you sure you want to {isApproving ? "approve" : "reject"}{" "}
          {authorName}?
        </ModalBody>
        <ModalFooter mb="40px" mr="40px" ml="40px">
          <Button
            w="195px"
            colorScheme="teal"
            onClick={() => {
              onClose();
              onConfirm();
            }}
          >
            Yes, {isApproving ? "approve" : "reject"} creator
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

export default StatusConfirmationModal;
