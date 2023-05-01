import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Moment from "moment";
import React, { useCallback, useContext, useEffect, useRef } from "react";

import UsersAPIClient from "../../../APIClients/UsersAPIClient";
import { UserRole } from "../../../constants/Enums";
import AuthContext from "../../../contexts/AuthContext";
import { AuthenticatedUser } from "../../../types/AuthTypes";

interface SubscriptionModalProps {
  targetUser: UserRole;
}

const SubscriptionExpireModal = ({
  targetUser,
}: SubscriptionModalProps): React.ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const expiryDate = useRef(authenticatedUser?.subscriptionExpiresOn);
  const isTargetUser = authenticatedUser?.roleType === targetUser;

  const onClick = () => {
    window.location.href = `${process.env.REACT_APP_GIVECLOUD_URL}`;
  };
  const checkUserSubscriptionExpiry = useCallback(async () => {
    // Convert the PostgresSQL date to a JavaScript Date object
    const subscriptionExpiryDate = new Date(
      Moment(expiryDate.current).format("LLLL"),
    );
    if (subscriptionExpiryDate < new Date(Date.now()) && isTargetUser) {
      onOpen();
    } else {
      onClose();
    }
  }, [onClose, onOpen]);

  const verifySubscriptionExpiry = useCallback(async () => {
    if (authenticatedUser) {
      const updatedUser: AuthenticatedUser =
        await UsersAPIClient.getUserByEmail(authenticatedUser?.email);
      if (updatedUser) {
        expiryDate.current = updatedUser.subscriptionExpiresOn;
        setAuthenticatedUser({
          ...authenticatedUser,
          subscriptionExpiresOn: updatedUser.subscriptionExpiresOn,
        });
        checkUserSubscriptionExpiry();
      }
    }
  }, [authenticatedUser, checkUserSubscriptionExpiry, setAuthenticatedUser]);

  useEffect(() => {
    verifySubscriptionExpiry();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>User Subscription Expired</ModalHeader>
        <ModalBody>
          Your subscription to the Canadian Children&apos;s Book Centre has
          expired. Please click on the button below and follow the steps to
          renew your account
        </ModalBody>
        <ModalFooter>
          <Button variant="submit" type="submit" onClick={onClick}>
            Renew Subscription
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SubscriptionExpireModal;
