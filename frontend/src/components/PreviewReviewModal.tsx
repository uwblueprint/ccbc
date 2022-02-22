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

interface PreviewReviewModalProps {
  title: string;
  subtitle: string;
  writtenBy: string;
  reviewedBy: string;
  publisher: string;
  isbn: string;
  bookType: string;
  ageDesciption: string;
  body: string;
  tags: string[];
  coverUrl: string;
}

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
