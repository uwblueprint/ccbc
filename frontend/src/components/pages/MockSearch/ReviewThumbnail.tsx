import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

import { Author } from "../../../types/BookTypes";

interface ReviewThumbnailProps {
  title: string;
  coverImage: string;
  authors: Author[];
  publishDate: Date;
}

const ReviewThumbnail = (props: ReviewThumbnailProps): React.ReactElement => {
  const { title, coverImage, authors, publishDate } = props;

  return (
    <Flex flexDir="column" maxW="220px" maxH="428px">
      <Image
        h="282px"
        w="220px"
        src={coverImage}
        style={{ objectFit: "cover" }}
      />
      <Text textStyle="bookTitle" noOfLines={2} mt="12px">
        {title}
      </Text>
      <Text textStyle="body" noOfLines={2} mt="4px">
        {authors.map((elem) => elem.displayName).join(", ")}
      </Text>
      <Text textStyle="caption" mt="10px">
        {publishDate.toLocaleDateString("sv")}
      </Text>
    </Flex>
  );
};

export default ReviewThumbnail;
