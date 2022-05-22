import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  Icon,
  Image,
  Stack,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { ReviewResponse } from "../../types/ReviewTypes";

/**
 * The model defining the props for the Preview Review component
 */
interface PreviewReviewProps {
  /** The review to be previewed */
  review: ReviewResponse;
}

/**
 * This component allows an admin to preview their review and get an understanding of
 * what the subscribers of the review will see
 */
const PreviewReview = ({ review }: PreviewReviewProps): React.ReactElement => {
  const [currentBook, setCurrentBook] = useState<number>(0);

  const handleLeftClick = () => {
    if (currentBook > 0) {
      setCurrentBook(currentBook - 1);
    }
  };

  const handleRightClick = () => {
    if (currentBook < review.books.length - 1) {
      setCurrentBook(currentBook + 1);
    }
  };

  return (
    <>
      <VStack spacing={10}>
        <HStack justify="space-between" mb="-12px">
          <ChevronLeftIcon
            boxSize="2em"
            style={{
              cursor: `${currentBook !== 0 ? "pointer" : "auto"}`,
              color: `${currentBook !== 0 ? "black" : "lightgray"}`,
            }}
            onClick={handleLeftClick}
          />
          <Box paddingRight={16}>
            <Image
              borderRadius={5}
              maxHeight={60}
              maxWidth={60}
              objectFit="contain"
              src={review.books[currentBook].coverImage}
              boxShadow="lg"
            />
          </Box>
          <Box>
            <Stack>
              <Box paddingBottom={3}>
                <Stack spacing={1}>
                  <Text fontSize={24} fontWeight={800}>
                    {review.books[currentBook].title}
                  </Text>
                  <Text fontSize={12} as="i">
                    {review.books[currentBook].series.name}
                  </Text>
                </Stack>
              </Box>
              <Box fontSize={12} paddingBottom={3}>
                <Stack spacing={1}>
                  <HStack>
                    <Text fontWeight={600}>Written By:</Text>
                    <Text fontWeight={400}>
                      {review.books[currentBook].authors
                        .map(({ fullName }) => fullName)
                        .join(", ")}
                    </Text>
                  </HStack>
                  {review.books[currentBook].illustrator && (
                    <HStack>
                      <Text fontWeight={600}>Illustrated By:</Text>
                      <Text fontWeight={400}>
                        {review.books[currentBook].illustrator?.join(", ")}
                      </Text>
                    </HStack>
                  )}
                </Stack>
              </Box>
              <Box fontSize={12} paddingBottom={1}>
                <Stack spacing={1}>
                  <Text>
                    {`${review.books[currentBook].publishers[currentBook].fullName}, ${review.books[currentBook].publishers[currentBook].publishYear}`}
                  </Text>
                  {review.books[currentBook].formats?.map((format) => (
                    <>
                      <Text>{`${format.format}, ${format.isbn}`}</Text>
                    </>
                  ))}
                  <Text>{`Ages ${review.books[currentBook].minAge}-${review.books[currentBook].maxAge}`}</Text>
                </Stack>
              </Box>
              <HStack spacing={2}>
                {review.tags.map((tag, index) => (
                  <Box key={index}>
                    <Tag bgColor="#F6E1A8" size="sm" fontWeight={600}>
                      {tag.name}
                    </Tag>
                  </Box>
                ))}
              </HStack>
            </Stack>
          </Box>
          <ChevronRightIcon
            boxSize="2em"
            style={{
              cursor: `${
                currentBook !== review.books.length - 1 ? "pointer" : "auto"
              }`,
              color: `${
                currentBook !== review.books.length - 1 ? "black" : "lightgray"
              }`,
            }}
            onClick={handleRightClick}
          />
        </HStack>
        <HStack>
          {Array.from(Array(3).keys()).map((_, index) => (
            <Icon key={index} viewBox="0 0 200 200">
              <path
                fill={`${index === currentBook ? "black" : "none"}`}
                stroke="black"
                strokeWidth="12"
                d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
              />
            </Icon>
          ))}
        </HStack>
        <VStack align="flex-start" width="80%">
          <HStack fontSize="12px">
            <Text fontWeight={600}>Reviewed By:</Text>
            <Text
              fontWeight={400}
            >{`${review.createdByUser.firstName} ${review.createdByUser.lastName}`}</Text>
          </HStack>
          <div
            style={{ fontSize: "14px" }}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: review.body }}
          />
        </VStack>
      </VStack>
    </>
  );
};

export default PreviewReview;
