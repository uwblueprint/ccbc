import {
  Box,
  HStack,
  Stack,
  Tag,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";

import { Review } from "../../types/ReviewTypes";

interface PreviewInfoProps {
  /** The review to be previewed */
  review: Review;
  currentBook: number;
}

const shortFormats = {
  Hardcover: "(hc)",
  Paperback: "(pb)",
  eBook: "(eb)",
  "Audio Book": "(ab)",
};

const PreviewInfo = ({
  review,
  currentBook,
}: PreviewInfoProps): React.ReactElement => {
  return (
    <Box>
      <Stack>
        <Box paddingBottom={3}>
          <Stack spacing={1}>
            <Text fontSize={24} fontWeight={800}>
              {review.books[currentBook].title}
            </Text>
            {review.books[currentBook].seriesName && (
              <Text fontSize={12}>
                {review.books[currentBook].seriesName}
                {review.books[currentBook].seriesOrder > 0
                  ? ` - ${review.books[currentBook].seriesOrder}`
                  : ""}
              </Text>
            )}
          </Stack>
        </Box>
        <Box fontSize={12} paddingBottom={3}>
          <Stack spacing={1}>
            <HStack>
              <Text fontWeight={600}>Written by:</Text>
              <Text fontWeight={400}>
                {review.books[currentBook].authors
                  .map(({ fullName }) => fullName)
                  .join(", ")}
              </Text>
            </HStack>
            {review.books[currentBook].illustrator.length > 0 &&
              review.books[currentBook].illustrator[0].length > 0 && (
                <HStack>
                  <Text fontWeight={600}>Illustrated by:</Text>
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
                <Text>{`${format.isbn}, ${
                  shortFormats[format.format as keyof typeof shortFormats]
                }, $${format.price}`}</Text>
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
  );
};

export default PreviewInfo;
