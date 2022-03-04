import {
  Button,
  Heading,
  Image,
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

import PasswordChanged from "../../assets/PasswordChanged.png";
import PasswordError from "../../assets/PasswordError.png";
import AuthContext from "../../contexts/AuthContext";
import firebaseApp from "../../utils/Firebase";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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
          <ModalCloseButton />
          <ModalBody>
            <Heading size="lg" mt="40px" mb="40px">
              Password changed!
            </Heading>
            <Text mb="220px">
              You have successfully changed your password. You may now close
              this window and return to your work
            </Text>
            <Image
              src={PasswordChanged}
              w="70%"
              position="absolute"
              bottom="0"
              right="0"
              borderRadius="8px"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  if (submitted && error) {
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
          <ModalCloseButton />
          <ModalBody>
            <Heading size="lg" mt="40px" mb="40px">
              An error has occurred
            </Heading>
            <Text mb="160px">
              Uh oh! Something went wrong with changing your password. Please
              try again later. <br />
              <br /> If the error persists, try refreshing the page and
              clearning your browser of cookies.
            </Text>
            <Image
              src={PasswordError}
              w="70%"
              position="absolute"
              bottom="0"
              right="0"
              borderRadius="8px"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
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
