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

import PreviewReview from "./PreviewReview";

/**
 * The model defining the props for the Preview Review Modal component
 */
interface PreviewReviewModalProps {
  /** The title of the book that is being reviewed */
  title: string;
  /** The subtitle of the book that is being reviewed */
  subtitle: string;
  /** The name of the author of the book */
  writtenBy: string;
  /** The name of the reviewer */
  reviewedBy: string;
  /** The publishes of the book */
  publisher: string;
  /** The ISBN number of the book */
  isbn: string;
  /** The type of the book */
  bookType: string;
  /** A description of the audience the book is recommended for */
  ageDesciption: string;
  /** The HTML body of the review */
  body: string;
  /** The tags associated with the book */
  tags: string[];
  /** The URL of the cover image of the book */
  coverUrl: string;
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
  title,
  subtitle,
  writtenBy,
  reviewedBy,
  publisher,
  isbn,
  bookType,
  ageDesciption,
  body,
  tags,
  coverUrl,
  isOpen,
  onClose,
}: PreviewReviewModalProps): React.ReactElement => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
        <ModalOverlay />
        <ModalContent fontFamily="DM Sans">
          <ModalHeader backgroundColor="#FFF8F3">
            <HStack spacing={150} fontSize={14}>
              <HStack>
                <Text fontWeight={600}>Previewing:</Text>
                <Text fontWeight={400}>Draft</Text>
              </HStack>
              <Text fontWeight={600}>{title}</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody margin={10}>
            <PreviewReview
              title={title}
              subtitle={subtitle}
              writtenBy={writtenBy}
              reviewedBy={reviewedBy}
              publisher={publisher}
              isbn={isbn}
              bookType={bookType}
              ageDesciption={ageDesciption}
              body={body}
              tags={tags}
              coverUrl={coverUrl}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PreviewReviewModal;
