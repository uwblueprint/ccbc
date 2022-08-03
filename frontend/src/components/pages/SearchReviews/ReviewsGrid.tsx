import { Center, SimpleGrid } from "@chakra-ui/react";
import React from "react";

import { Author, Book } from "../../../types/BookTypes";
import { Review } from "../../../types/ReviewTypes";
import ReviewThumbnail from "./ReviewThumbnail";

interface ReviewsGridProps {
  displayedReviews: Review[];
}

const ReviewsGrid = ({
  displayedReviews,
}: ReviewsGridProps): React.ReactElement => {
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
    <Center mt="50px">
      <SimpleGrid
        minChildWidth={["140px", "140px", "180px"]}
        w="100%"
        spacingY={[0, 4, 10]}
        spacingX={[2, 5, 5]}
      >
        {displayedReviews.map(
          (review, key) =>
            review.publishedAt &&
            review.books[0].title && (
              <Center>
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
                  additionalBooks={
                    review.books.length > 1
                      ? review.books.length - 1
                      : undefined
                  }
                />
              </Center>
            ),
        )}
      </SimpleGrid>
    </Center>
  );
};

export default ReviewsGrid;
