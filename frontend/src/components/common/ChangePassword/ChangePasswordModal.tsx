import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import React, { useContext } from "react";

import AuthContext from "../../../contexts/AuthContext";
import firebaseApp from "../../../utils/Firebase";
import ChangePasswordErrorModal from "./ChangePasswordErrorModal";
import ChangePasswordSuccessModal from "./ChangePasswordSuccessModal";

/**
 * The model defining the props for the Change Password Modal component
 */
interface ChangePasswordModalProps {
  /** A boolean representing whether the modal is open or not */
  isOpen: boolean;
  /** A function that sets isOpen to false */
  onClose: () => void;
}

/**
 * This component is the modal that appears when the user wants to change their password
 */
const ChangePasswordModal = (
  props: ChangePasswordModalProps,
): React.ReactElement => {
  const { authenticatedUser } = useContext(AuthContext);

  const { isOpen, onClose } = props;
  const [oldPassword, setOldPassword] = React.useState<string>("");
  const [newPassword, setNewPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [feedback, setFeedback] = React.useState<string>("");
  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);

  const reset = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSubmitted(false);
    setFeedback("");
    setError(false);
  };

  const submit = () => {
    setFeedback("");

    if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
      setFeedback("Please enter all fields.");
    } else if (newPassword !== confirmPassword) {
      setFeedback("Passwords do not match.");
    } else if (oldPassword === newPassword) {
      setFeedback("New password must be different from old password.");
    } else {
      const auth = getAuth(firebaseApp);

      if (authenticatedUser != null) {
        signInWithEmailAndPassword(auth, authenticatedUser.email, oldPassword)
          .then((userCredential) => {
            // Signed in
            const { user } = userCredential;
            updatePassword(user, newPassword)
              .then(() => {
                // Update successful
                setSubmitted(true);
              })
              .catch((e) => {
                // Error occurred
                if ((e as FirebaseError).code === "auth/weak-password") {
                  setFeedback("Please enter a stronger password.");
                } else {
                  setSubmitted(true);
                  setError(true);
                }
              });
          })
          .catch((e) => {
            if ((e as FirebaseError).code === "auth/wrong-password") {
              setFeedback("The password you entered is incorrect.");
            } else {
              setFeedback(
                "An error occurred, please refresh the page and try again.",
              );
            }
          });
      } else {
        setFeedback(
          "An error occurred, please refresh the page and try again.",
        );
      }
    }
  };

  if (submitted && !error) {
    return (
      <ChangePasswordSuccessModal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          reset();
        }}
      />
    );
  }

  if (submitted && error) {
    return (
      <ChangePasswordErrorModal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          reset();
        }}
      />
    );
  }

  return (
    <Modal
      onClose={() => {
        onClose();
        reset();
      }}
      isOpen={isOpen}
      size="lg"
      isCentered
    >
      <ModalOverlay />
      <ModalContent padding="10px">
        <ModalHeader>Change password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="bold" mb="8px">
            Old password
          </Text>
          <Input
            type="password"
            placeholder="Old password"
            mb="20px"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <Text fontWeight="bold" mb="8px">
            New password
          </Text>
          <Input
            type="password"
            placeholder="New password"
            mb="20px"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Text fontWeight="bold" mb="8px">
            Confirm new password
          </Text>
          <Input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {feedback !== "" ? (
            <Text color="red" mt="20px">
              {feedback}
            </Text>
          ) : (
            <></>
          )}
        </ModalBody>
        <ModalFooter justifyContent="flex-start">
          <Button colorScheme="teal" bg="#0EBCBD" onClick={submit}>
            Change password
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChangePasswordModal;
