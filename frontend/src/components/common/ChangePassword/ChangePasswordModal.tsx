import {
  Button,
  FormControl,
  FormLabel,
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
import PasswordInputField from "../PasswordInputField";
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
 * Type for error-related props to the PasswordInputField component
 */
type PasswordFeedback = {
  isInvalid: boolean;
  errorMessage: string;
};

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

  const [
    oldPasswordFeedback,
    setOldPasswordFeedback,
  ] = React.useState<PasswordFeedback>({ isInvalid: false, errorMessage: "" });
  const [
    newPasswordFeedback,
    setNewPasswordFeedback,
  ] = React.useState<PasswordFeedback>({ isInvalid: false, errorMessage: "" });
  const [
    confirmPasswordFeedback,
    setConfirmPasswordFeedback,
  ] = React.useState<PasswordFeedback>({ isInvalid: false, errorMessage: "" });

  const [feedback, setFeedback] = React.useState<string>("");
  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);

  const resetFeedback = () => {
    setFeedback("");
    setOldPasswordFeedback({ isInvalid: false, errorMessage: "" });
    setNewPasswordFeedback({ isInvalid: false, errorMessage: "" });
    setConfirmPasswordFeedback({ isInvalid: false, errorMessage: "" });
  };

  const reset = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSubmitted(false);
    setError(false);
    resetFeedback();
  };

  const submit = () => {
    resetFeedback();

    if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
      setOldPasswordFeedback({ isInvalid: true, errorMessage: "Required" });
      setNewPasswordFeedback({ isInvalid: true, errorMessage: "Required" });
      setConfirmPasswordFeedback({ isInvalid: true, errorMessage: "Required" });
      setFeedback("Please enter all fields.");
    } else if (newPassword !== confirmPassword) {
      setNewPasswordFeedback({ isInvalid: true, errorMessage: "" });
      setConfirmPasswordFeedback({
        isInvalid: true,
        errorMessage: "Passwords do not match.",
      });
    } else if (oldPassword === newPassword) {
      setOldPasswordFeedback({ isInvalid: true, errorMessage: "" });
      setNewPasswordFeedback({
        isInvalid: true,
        errorMessage: "New password and old password must be different.",
      });
    } else {
      const auth = getAuth(firebaseApp);

      if (authenticatedUser?.email) {
        // Sign in on the frontend side to validate password
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
                  setNewPasswordFeedback({
                    isInvalid: true,
                    errorMessage: "Password is too weak.",
                  });
                } else {
                  setSubmitted(true);
                  setError(true);
                }
              });
          })
          .catch((e) => {
            if ((e as FirebaseError).code === "auth/wrong-password") {
              setOldPasswordFeedback({
                isInvalid: true,
                errorMessage: "The password you entered is incorrect.",
              });
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
          <FormControl
            isInvalid={
              oldPasswordFeedback.isInvalid ||
              newPasswordFeedback.isInvalid ||
              confirmPasswordFeedback.isInvalid
            }
          >
            <FormLabel htmlFor="Old password" fontWeight="bold" mb="8px">
              Old password
            </FormLabel>
            <PasswordInputField
              isInvalid={oldPasswordFeedback.isInvalid}
              value={oldPassword}
              placeholder="Old password"
              onChangeHandler={(e) => setOldPassword(e.target.value)}
              errorMessage={oldPasswordFeedback.errorMessage}
            />
            <FormLabel
              htmlFor="New password"
              fontWeight="bold"
              mt="20px"
              mb="8px"
            >
              New password
            </FormLabel>
            <PasswordInputField
              isInvalid={newPasswordFeedback.isInvalid}
              value={newPassword}
              placeholder="New password"
              onChangeHandler={(e) => setNewPassword(e.target.value)}
              errorMessage={newPasswordFeedback.errorMessage}
            />
            <FormLabel
              htmlFor="Confirm new password"
              fontWeight="bold"
              mt="20px"
              mb="8px"
            >
              Confirm new password
            </FormLabel>
            <PasswordInputField
              isInvalid={confirmPasswordFeedback.isInvalid}
              value={confirmPassword}
              placeholder="Confirm new password"
              onChangeHandler={(e) => setConfirmPassword(e.target.value)}
              errorMessage={confirmPasswordFeedback.errorMessage}
            />
            {feedback !== "" ? (
              <Text color="crimson" mt="20px">
                {feedback}
              </Text>
            ) : (
              <></>
            )}
          </FormControl>
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
