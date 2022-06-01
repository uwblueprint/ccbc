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

import { Book } from "../../types/BookTypes";
import { Review, Tag } from "../../types/ReviewTypes";
import PreviewReview from "./PreviewReview";

/**
 * The model defining the props for the Preview Review Modal component
 */
interface PreviewReviewModalProps {
  /** An array of book objects for the Modal to display (pass to PreviewReview) */
  review?: Review;
  /** A boolean indicating whether the Modal is open or not */
  isOpen: boolean;
  /** A react hook function to toggle isOpen */
  onClose: () => void;
  /** An array of Book objects passed in from the create review page */
  books?: Book[];
  /** An array of Tag objects passed in from the create review page  */
  tags?: Tag[];
  /**  A string representing the review body passed in from the create review page */
  body?: string;
}

/**
 * This component allows an admin to preview their review and get an understanding of
 * what the subscribers of the review will see in a Modal
 */
const PreviewReviewModal = ({
  review,
  isOpen,
  onClose,
  books,
  tags,
  body,
}: PreviewReviewModalProps): React.ReactElement => {
  // modalTitle returns the series name if it exists, otherwise, returns the title of the book
  const modalTitle = () => {
    if (books && books[0]) {
      return books[0].seriesName ? books[0].seriesName : books[0].title;
    }
    if (review && review.books) {
      return review.books[0].seriesName
        ? review.books[0].seriesName
        : review.books[0].title;
    }
    return "";
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
        <ModalOverlay />
        <ModalContent fontFamily="DM Sans">
          <ModalHeader backgroundColor="#FFF8F3" borderRadius={10}>
            <HStack spacing={150} fontSize={14}>
              <HStack>
                <Text fontWeight={600}>Previewing:</Text>
                <Text fontWeight={400}>Draft</Text>
              </HStack>
              <Text fontWeight={600}>{modalTitle()}</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody margin={10}>
            <PreviewReview
              review={review}
              books={books}
              tags={tags}
              body={body}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PreviewReviewModal;
