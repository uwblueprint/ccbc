import {
  Box,
  HStack,
  Image,
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
  /** The body of the review */
  body: string;
  /** The tags associated with the book */
  tags: string[];
  /** The URL of the cover image of the book */
  coverUrl: string;
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
}: PreviewReviewModalProps): React.ReactElement => {
  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader backgroundColor="#FFF8F3">
          <HStack spacing="225px">
            <HStack>
              <Text fontSize={12} fontWeight={600} fontFamily="DM Sans">
                Previewing:
              </Text>
              <Text fontFamily="DM Sans" fontSize={12} fontWeight={400}>
                Draft
              </Text>
            </HStack>
            <Text fontFamily="DM Sans" fontSize={12} fontWeight={600}>
              {title}
            </Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody margin={10}>
          <Stack spacing={10}>
            <HStack>
              <Box marginRight={16}>
                <Image boxSize="250px" objectFit="contain" src={coverUrl} />
              </Box>
              <Box fontFamily="DM Sans">
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
            <Box fontFamily="DM Sans" fontSize={12}>
              <Text>{body}</Text>
            </Box>
          </Stack>
        </ModalBody>
      </ModalContent>
    </>
  );
};

export default PreviewReviewModal;
