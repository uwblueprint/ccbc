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

  // picks one genre (if any) to show
  const getGenre = (books: Book[]): string | undefined => {
    if (books.length === 1) {
      return books[0].genres.length !== 0 ? books[0].genres[0].name : undefined;
    }

    // return most frequent tag
    const genreCount: Map<string, number> = new Map();
    let maxName: string | undefined;
    let maxCount = 0;
    books.forEach((book) => {
      book.genres.forEach(({ name }) => {
        const newCount = (genreCount.get(name) || 0) + 1;
        genreCount.set(name, newCount);
        if (newCount > maxCount) {
          maxName = name;
          maxCount = newCount;
        }
      });
    });
    return maxName;
  };

  // sort books based on series order
  displayedReviews.forEach((review) =>
    review.books.sort((a, b) => {
      const seriesOrderA = a.seriesOrder ? a.seriesOrder : 0;
      const seriesOrderB = b.seriesOrder ? b.seriesOrder : 0;
      return seriesOrderA - seriesOrderB;
    }),
  );

  return (
    <Center>
      <SimpleGrid
        minChildWidth={["140px", "140px", "140px", "221px"]}
        w="100%"
        spacingY={[0, 4, 10]}
        spacingX={[2, 2, 4]}
      >
        {displayedReviews.map(
          (review, key) =>
            review.publishedAt &&
            review.books[0].title && (
              <Center key={key}>
                <ReviewThumbnail
                  id={review.reviewId}
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
                  genre={getGenre(review.books)}
                />
              </Center>
            ),
        )}
      </SimpleGrid>
    </Center>
  );
};

export default ReviewsGrid;
