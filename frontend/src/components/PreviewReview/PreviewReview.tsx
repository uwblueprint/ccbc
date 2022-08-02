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
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useState } from "react";

import background from "../../assets/review-book-orange-blob.png";
import { Review } from "../../types/ReviewTypes";

/**
 * The model defining the props for the Preview Review component
 */
interface PreviewReviewProps {
  /** The review to be previewed */
  review: Review;
  isPageView?: boolean;
}

/**
 * This component allows an admin to preview their review and get an understanding of
 * what the subscribers of the review will see
 */
const PreviewReview = ({
  review,
  isPageView = false,
}: PreviewReviewProps): React.ReactElement => {
  const [currentBook, setCurrentBook] = useState<number>(0);

  // sort books based on series order
  review.books.sort((a, b) => {
    const seriesOrderA = a.seriesOrder ? a.seriesOrder : 0;
    const seriesOrderB = b.seriesOrder ? b.seriesOrder : 0;

    return seriesOrderA - seriesOrderB;
  });

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
        <HStack
          justify="space-between"
          mb="-12px"
          spacing={isPageView ? 20 : 0}
        >
          <ChevronLeftIcon
            boxSize="2em"
            style={{
              cursor: `${currentBook !== 0 ? "pointer" : "auto"}`,
              color: `${currentBook !== 0 ? "black" : "lightgray"}`,
            }}
            onClick={handleLeftClick}
          />
          <Box
            pr={16}
            pl={16}
            bgImage={isPageView ? [null, null, background] : [null]}
            bgRepeat="no-repeat"
            backgroundSize="contain"
            alignItems="center"
          >
            <Image
              borderRadius={5}
              maxHeight={isPageView ? 80 : 60}
              maxWidth={isPageView ? 80 : 60}
              objectFit="contain"
              src={
                review.books[currentBook].coverImage
                  ? review.books[currentBook].coverImage
                  : "https://lgimages.s3.amazonaws.com/nc-md.gif"
              }
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
                  {review.books[currentBook].seriesName && (
                    <Text fontSize={12} as="i">
                      {review.books[currentBook].seriesName}
                    </Text>
                  )}
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
                  {review.books[currentBook].illustrator.length > 0 && (
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
                  {review.books[currentBook].publishers.map((publisher) => (
                    <>
                      <Text>{`${publisher.fullName}, ${publisher.publishYear}`}</Text>
                    </>
                  ))}
                  {review.books[currentBook].formats.map((format) => (
                    <>
                      <Text>{`${format.format}, ${format.isbn}`}</Text>
                    </>
                  ))}
                  <Text>{`Ages ${review.books[currentBook].minAge}-${review.books[currentBook].maxAge}`}</Text>
                  {review.books[currentBook].genres.length +
                    review.books[currentBook].tags.length >
                    0 && (
                    <Wrap spacing={1} paddingTop={3}>
                      {review.books[currentBook].genres.map((genre) => (
                        <WrapItem key={`genre-${genre.name}`}>
                          <Tag
                            size="sm"
                            variant="solid"
                            bgColor="#90CDF4"
                            color="black"
                          >
                            {genre.name}
                          </Tag>
                        </WrapItem>
                      ))}
                      {review.books[currentBook].tags.map((tag) => (
                        <WrapItem key={`tag-${tag.name}`}>
                          <Tag
                            size="sm"
                            variant="solid"
                            bgColor="#F7E1A8"
                            color="black"
                          >
                            {tag.name}
                          </Tag>
                        </WrapItem>
                      ))}
                    </Wrap>
                  )}
                </Stack>
              </Box>
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
          {Array.from(Array(review.books.length).keys()).map((_, index) => (
            <Icon
              key={index}
              viewBox="0 0 200 200"
              onClick={() => setCurrentBook(index)}
              style={{ cursor: "pointer" }}
            >
              <path
                fill={`${index === currentBook ? "black" : "none"}`}
                stroke="black"
                strokeWidth="12"
                d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
              />
            </Icon>
          ))}
        </HStack>
        <VStack align="flex-start" width={isPageView ? "50%" : "80%"}>
          <Text fontWeight={400} fontSize="12px">
            <strong>Reviewed By: </strong>
            {review.byline}
          </Text>
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
