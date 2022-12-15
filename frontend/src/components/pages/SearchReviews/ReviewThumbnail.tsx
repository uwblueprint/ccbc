import { Box, Flex, Image, Spacer, Tag, Text } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";

import { DISPLAY_REVIEW_PAGE } from "../../../constants/Routes";
import { Author } from "../../../types/BookTypes";
import CircleBadge from "../../common/CircleBadge";

interface ReviewThumbnailProps {
  title: string;
  coverImage: string;
  authors: Author[];
  publishDate: Date;
  additionalBooks?: number;
  id: number;
  genre?: string;
}

const ReviewThumbnail = (props: ReviewThumbnailProps): React.ReactElement => {
  const {
    id,
    title,
    coverImage,
    authors,
    publishDate,
    additionalBooks,
    genre,
  } = props;

  const history = useHistory();

  const redirectReviewUrl = () => {
    return DISPLAY_REVIEW_PAGE.replace(":id", String(id));
  };

  return (
    <Box
      flexDir="column"
      w={["140px", "140px", "140px", "220px"]}
      h={["300px", "300px", "300px", "410px"]}
    >
      <Box
        position="relative"
        onClick={() => history.push(`/reviews/${id}`)}
        cursor="pointer"
      >
        <Image
          h={["180px", "180px", "180px", "282px"]}
          w={["140px", "140px", "140px", "220px"]}
          src={coverImage}
          style={{ objectFit: "cover" }}
        />
        {additionalBooks && <CircleBadge count={additionalBooks} />}
      </Box>
      <Text
        textStyle={["mobileBookTitle", "mobileBookTitle", "bookTitle"]}
        noOfLines={2}
        mt="4%"
        onClick={() => history.push(redirectReviewUrl())}
        cursor="pointer"
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
      <Flex>
        <Text textStyle={["mobileCaption", "mobileCaption", "caption"]} mt="2%">
          {publishDate.toLocaleDateString("sv")}
        </Text>
        <Spacer />
        {genre && (
          <Tag size="sm" variant="solid" bgColor="#90CDF4" color="black">
            {genre}
          </Tag>
        )}
      </Flex>
    </Box>
  );
};

export default ReviewThumbnail;
