import {
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";

import { Review } from "../../types/ReviewTypes";
import PreviewReview from "./PreviewReview";

/**
 * The model defining the props for the Preview Review Modal component
 */
interface PreviewReviewModalProps {
  /** An array of book objects for the Modal to display (pass to PreviewReview) */
  review: Review;
  /** A boolean indicating whether the Modal is open or not */
  isOpen: boolean;
  /** A react hook function to toggle isOpen */
  onClose: () => void;
}

/**
 * This component allows an admin to preview their review and get an understanding of
 * what the subscribers of the review will see in a Modal
 */
const PreviewReviewModal = ({
  review,
  isOpen,
  onClose,
}: PreviewReviewModalProps): React.ReactElement => {
  // modalTitle returns the series name if it exists, otherwise, returns the title of the book
  const modalTitle = () => {
    if (review.books && review.books[0].seriesName) {
      return review.books[0].seriesName;
    }
    if (review.books) {
      return review.books[0].title;
    }
    return "";
  };
  // modalState returns "Published" if published_at has a value and "Draft" if it is null
  const modalState = () => {
    if (review.publishedAt == null) {
      return "Draft";
    }
    return "Published";
  };
  // below needs to be changed
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
        <ModalOverlay />
        <ModalContent fontFamily="DM Sans">
          <ModalHeader backgroundColor="#FFF8F3" borderRadius={10}>
            <HStack spacing={150} fontSize={14}>
              <HStack>
                <Text fontWeight={600}>Previewing:</Text>
                <Text fontWeight={400}>{modalState()}</Text>
              </HStack>
              <Text fontWeight={600}>{modalTitle()}</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody margin={10}>
            <PreviewReview review={review} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PreviewReviewModal;
