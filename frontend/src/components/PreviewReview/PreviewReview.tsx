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
import { RateReviewTwoTone } from "@material-ui/icons";
import React, { useContext, useState } from "react";

import AuthContext from "../../contexts/AuthContext";
import { Book } from "../../types/BookTypes";
import {
  Review,
  Tag as TagType,
} from "../../types/ReviewTypes";

/**
 * The model defining the props for the Preview Review component
 */
interface PreviewReviewProps {
  /** The review to be previewed */
  review?: Review;
  /** An array of Book objects passed in from the create review page */
  books?: Book[];
  /** An array of Tag objects passed in from the create review page */
  tags?: TagType[];
  /** A string representing the review body passed in from the create review page */
  body?: string;
}

/**
 * This component allows an admin to preview their review and get an understanding of
 * what the subscribers of the review will see
 */
const PreviewReview = ({
  review,
  books,
  tags,
  body,
}: PreviewReviewProps): React.ReactElement => {
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);
  const [currentBook, setCurrentBook] = useState<number>(0);

  const handleLeftClick = () => {
    if (currentBook > 0) {
      setCurrentBook(currentBook - 1);
    }
  };

  const handleRightClick = () => {
    if (
      (review && currentBook < review.books.length - 1) ||
      (books && currentBook < books.length - 1)
    ) {
      setCurrentBook(currentBook + 1);
    }
  };

  const imageUrl = () => {
    if (review && review.books[currentBook].coverImage) {
      return review.books[currentBook].coverImage;
    }
    if (books && books[currentBook].coverImage) {
      return books[currentBook].coverImage;
    }
    return "https://lgimages.s3.amazonaws.com/nc-md.gif";
  };

  const reviewSeriesName = () => {
    if (review && review.books[currentBook].seriesName) {
      return review.books[currentBook].seriesName;
    }
    if (books && books[currentBook].seriesName) {
      return books[currentBook].seriesName;
    }
    return "";
  };

  const arrowNavigator = () => {
    const previewBooks = review ? review.books : books;
    if (previewBooks) {
      return Array.from(Array(previewBooks.length).keys()).map((_, index) => (
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
      ));
    }
    return "";
  };

  const bookAuthors = () => {
    const previewBooks = review ? review.books : books;
    return previewBooks
      ? previewBooks[currentBook].authors
        .map(({ fullName }) => fullName)
        .join(", ")
      : "";
  };

  const bookIllustrators = () => {
    const previewBooks = review ? review.books : books;
    if (previewBooks) {
      return previewBooks[currentBook].illustrator &&
        previewBooks[currentBook].illustrator.length !== 0 ? (
        <HStack>
          <Text fontWeight={600}>Illustrated By:</Text>
          <Text fontWeight={400}>
            {previewBooks[currentBook].illustrator?.join(", ")}
          </Text>
        </HStack>
      ) : (
        ""
      );
    }
    return "";
  };

  const bookInfo = () => {
    const previewBooks = review ? review.books : books;
    if (previewBooks) {
      return (
        <Stack spacing={1}>
          {previewBooks[currentBook].publishers.map((publisher) => (
            <>
              <Text>{`${publisher.fullName}, ${publisher.publishYear}`}</Text>
            </>
          ))}
          {previewBooks[currentBook].formats.map((format) => (
            <>
              <Text>{`${format.format}, ${format.isbn}`}</Text>
            </>
          ))}
          <Text>{`Ages ${previewBooks[currentBook].minAge}-${previewBooks[currentBook].maxAge}`}</Text>
        </Stack>
      );
    }
    return "";
  };

  const reviewTags = () => {
    const previewTags = review ? review.tags : tags;
    return previewTags
      ? previewTags.map((tag, index) => (
        <Box key={index}>
          <Tag bgColor="#F6E1A8" size="sm" fontWeight={600}>
            {tag.name}
          </Tag>
        </Box>
      ))
      : "";
  };

  const reviewAuthors = () => {
    const firstName = review
      ? review.createdByUser.firstName
      : authenticatedUser?.firstName;
    const lastName = review
      ? review.createdByUser.lastName
      : authenticatedUser?.lastName;

    if (firstName && lastName) {
      return <Text fontWeight={400}>{`${firstName} ${lastName}`}</Text>;
    }
    return "";
  };

  const reviewBody = () => {
    let previewBody = "";
    if (review) {
      previewBody = review.body;
    } else if (body) {
      previewBody = body;
    }

    return (
      <div
        style={{ fontSize: "14px" }}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: previewBody }}
      />
    );
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
              src={imageUrl()}
              boxShadow="lg"
            />
          </Box>
          <Box>
            <Stack>
              <Box paddingBottom={3}>
                <Stack spacing={1}>
                  <Text fontSize={24} fontWeight={800}>
                    {review && review.books[currentBook].title}
                    {books && books[currentBook].title}
                  </Text>
                  {(review && review.books[currentBook].seriesName) ||
                    (books && books[currentBook].seriesName && (
                      <Text fontSize={12} as="i">
                        {reviewSeriesName()}
                      </Text>
                    ))}
                </Stack>
              </Box>
              <Box fontSize={12} paddingBottom={3}>
                <Stack spacing={1}>
                  <HStack>
                    <Text fontWeight={600}>Written By:</Text>
                    <Text fontWeight={400}>{bookAuthors()}</Text>
                  </HStack>
                  {bookIllustrators()}
                </Stack>
              </Box>
              <Box fontSize={12} paddingBottom={1}>
                {bookInfo()}
              </Box>
              <HStack spacing={2}>{reviewTags()}</HStack>
            </Stack>
          </Box>
          <ChevronRightIcon
            boxSize="2em"
            style={{
              cursor: `${(review && currentBook !== review.books.length - 1) ||
                (books && currentBook !== books.length - 1)
                ? "pointer"
                : "auto"
                }`,
              color: `${(review && currentBook !== review.books.length - 1) ||
                (books && currentBook !== books.length - 1)
                ? "black"
                : "lightgray"
                }`,
            }}
            onClick={handleRightClick}
          />
        </HStack>
        <HStack>{arrowNavigator()}</HStack>
        <VStack align="flex-start" width="80%">
          <HStack fontSize="12px">
            <Text fontWeight={600}>Reviewed By:</Text>
            {reviewAuthors()}
          </HStack>
          {reviewBody()}
        </VStack>
      </VStack>
    </>
  );
};

export default PreviewReview;
