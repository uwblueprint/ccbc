import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, HStack, Icon, Image, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import background from "../../assets/review-book-orange-blob.png";
import { Review } from "../../types/ReviewTypes";
import PreviewInfo from "./PreviewInfo";

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
  const multiplebooks = review.books.length > 1;

  const [currentBook, setCurrentBook] = useState<number>(0);
  const [isMobile, setMobile] = useState(window.innerWidth < 1024);

  const updateMedia = () => {
    setMobile(window.innerWidth < 1024);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

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
          {multiplebooks ? (
            <ChevronLeftIcon
              boxSize="2em"
              style={{
                cursor: `${currentBook !== 0 ? "pointer" : "auto"}`,
                color: `${currentBook !== 0 ? "black" : "lightgray"}`,
              }}
              onClick={handleLeftClick}
            />
          ) : null}
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
          {!isMobile && (
            <PreviewInfo review={review} currentBook={currentBook} />
          )}
          {multiplebooks ? (
            <ChevronRightIcon
              boxSize="2em"
              style={{
                cursor: `${
                  currentBook !== review.books.length - 1 ? "pointer" : "auto"
                }`,
                color: `${
                  currentBook !== review.books.length - 1
                    ? "black"
                    : "lightgray"
                }`,
              }}
              onClick={handleRightClick}
            />
          ) : null}
        </HStack>
        <HStack>
          {multiplebooks
            ? Array.from(Array(review.books.length).keys()).map((_, index) => (
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
              ))
            : null}
        </HStack>
        {isMobile && <PreviewInfo review={review} currentBook={currentBook} />}
        <VStack align="flex-start" width={isPageView ? "50%" : "80%"}>
          <Text fontWeight={400} fontSize="12px">
            <strong>Reviewed by: </strong>
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
