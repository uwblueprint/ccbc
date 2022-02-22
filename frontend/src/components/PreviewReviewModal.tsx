import {
  Box,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import React from "react";

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
 * what the subscribers of the review will see
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
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent fontFamily="DM Sans">
          <ModalHeader backgroundColor="#FFF8F3">
            <HStack spacing={60}>
              <HStack>
                <Text fontSize={12} fontWeight={600}>
                  Previewing:
                </Text>
                <Text fontSize={12} fontWeight={400}>
                  Draft
                </Text>
              </HStack>
              <Text fontSize={12} fontWeight={600}>
                {title}
              </Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody margin={10}>
            <Stack spacing={10}>
              <HStack>
                <Box marginRight={16}>
                  <Image boxSize={60} objectFit="contain" src={coverUrl} />
                </Box>
                <Box>
                  <Stack>
                    <Box paddingBottom={3}>
                      <Stack spacing={1}>
                        <Text fontSize={24} fontWeight={800}>
                          {title}
                        </Text>
                        <Text fontSize={10} as="i">
                          {subtitle}
                        </Text>
                      </Stack>
                    </Box>
                    <Box fontSize={12} paddingBottom={3}>
                      <Stack spacing={1}>
                        <HStack>
                          <Text fontWeight={600}>Written By:</Text>
                          <Text fontWeight={400}>{writtenBy}</Text>
                        </HStack>
                        <HStack>
                          <Text fontWeight={600}>Reviewed By:</Text>
                          <Text fontWeight={400}>{reviewedBy}</Text>
                        </HStack>
                      </Stack>
                    </Box>
                    <Box fontSize={12} paddingBottom={1}>
                      <Stack spacing={1}>
                        <Text>{publisher}</Text>
                        <Text>{isbn}</Text>
                        <Text>{bookType}</Text>
                        <Text>{ageDesciption}</Text>
                      </Stack>
                    </Box>
                    <HStack spacing={2}>
                      {tags.map((tag: string) => (
                        <Box key={tag}>
                          <Tag bgColor="#F6E1A8" size="sm" fontWeight={600}>
                            {tag}
                          </Tag>
                        </Box>
                      ))}
                    </HStack>
                  </Stack>
                </Box>
              </HStack>
              <div
                style={{ fontSize: "12px" }}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: body }}
              />
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PreviewReviewModal;
