/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
} from "@chakra-ui/react";
import React, { useRef } from "react";

interface Props {
  showModal: boolean;
  onClose: any;
  handleDelete: any;
  itemToDelete?: any;
  deleteType: string;
}

const ConfirmationModal = (props: Props): React.ReactElement => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { showModal, onClose, handleDelete, itemToDelete, deleteType } = props;

  return (
    <>
      <AlertDialog
        isOpen={showModal}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <Text textStyle="heading" fontSize="lg">
                Delete {deleteType}
              </Text>
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text textStyle="body" fontSize="md">
                Are you sure? You cannot undo this action.
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                <Text textStyle="body" fontSize="sm">
                  Cancel
                </Text>
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDelete(itemToDelete)}
                ml={3}
              >
                <Text textStyle="body" fontSize="sm">
                  Delete
                </Text>
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ConfirmationModal;
