import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

import { Author } from "../../../types/BookTypes";
import CircleBadge from "../../common/CircleBadge";

interface ReviewThumbnailProps {
  title: string;
  coverImage: string;
  authors: Author[];
  publishDate: Date;
  additionalBooks?: number;
}

const ReviewThumbnail = (props: ReviewThumbnailProps): React.ReactElement => {
  const { title, coverImage, authors, publishDate, additionalBooks } = props;

  return (
    <Box
      flexDir="column"
      w={["140px", "140px", "220px"]}
      h={["300px", "300px", "410px"]}
    >
      <Box position="relative">
        <Image
          h={["180px", "180px", "282px"]}
          w={["140px", "140px", "220px"]}
          src={coverImage}
          style={{ objectFit: "cover" }}
        />
        {additionalBooks && <CircleBadge count={additionalBooks} />}
      </Box>
      <Text
        textStyle={["mobileBookTitle", "mobileBookTitle", "bookTitle"]}
        noOfLines={2}
        mt="4%"
      >
        {title}
      </Text>
      <Text
        textStyle={["mobileBody", "mobileBody", "body"]}
        noOfLines={2}
        mt="3%"
      >
        {authors.map((elem) => elem.displayName).join(", ")}
      </Text>
      <Text textStyle={["mobileCaption", "mobileCaption", "caption"]} mt="2%">
        {publishDate.toLocaleDateString("sv")}
      </Text>
    </Box>
  );
};

export default ReviewThumbnail;
