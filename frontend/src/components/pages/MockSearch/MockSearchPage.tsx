import { Box } from "@chakra-ui/react";
import React from "react";

import { Author, Book } from "../../../types/BookTypes";
import mockReviews from "./mockReviews";
import ReviewThumbnail from "./ReviewThumbnail";

const MockSearchPage = (): React.ReactElement => {
  const getAllAuthors = (books: Book[]): Author[] => {
    const allAuthors: Author[] = [];
    books.forEach((book) => {
      book.authors.forEach((author) => allAuthors.push(author));
    });
    const uniqueAuthorsMap = new Map(
      allAuthors.map((item) => [item.fullName, item]),
    );
    const uniqueAuthors = Array.from(uniqueAuthorsMap, ([, value]) => value);
    return uniqueAuthors;
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="flex-start"
      justifyContent="flex-start"
      mt="10px"
      mb="50px"
    >
      {mockReviews.map(
        (review, key) =>
          review.publishedAt &&
          review.books[0].title && (
            <ReviewThumbnail
              key={key}
              title={
                review.books.length > 0 && review.books[0].seriesName
                  ? review.books[0].seriesName
                  : review.books[0].title
              }
              coverImage={review.books[0].coverImage}
              authors={getAllAuthors(review.books)}
              publishDate={new Date(review.publishedAt)}
            />
          ),
      )}
    </Box>
  );
};

export default MockSearchPage;
