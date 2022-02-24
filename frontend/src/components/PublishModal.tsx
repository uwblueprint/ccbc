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

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  publishBook: () => void;
}

const PublishModal = (props: PublishModalProps): React.ReactElement => {
  const { isOpen, onClose, publishBook } = props;

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
              variant="add"
              w="48%"
              onClick={() => {
                publishBook();
                onClose();
              }}
            >
              Yes, publish book
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

export default PublishModal;
