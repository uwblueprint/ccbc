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

export type ApproveConfirmationProps = {
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => Promise<void>;
  authorName?: string;
};

/**
 * ApproveConfirmationModal displays and asks for confirmation when
 * the approve button on an Admin Dashboard row is clicked
 */
const ApproveConfirmationModal = ({
  isOpen,
  onClose,
  onApprove,
  authorName,
}: ApproveConfirmationProps): React.ReactElement => {
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
          Are you sure you want to approve {authorName}?
        </ModalBody>
        <ModalFooter mb="40px" mr="40px" ml="40px">
          <Button
            w="195px"
            colorScheme="teal"
            onClick={() => {
              onClose();
              onApprove();
            }}
          >
            Yes, approve creator
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

export default ApproveConfirmationModal;
