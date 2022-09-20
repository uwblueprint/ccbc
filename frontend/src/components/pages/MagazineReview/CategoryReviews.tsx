import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";

import { Review } from "../../../types/ReviewTypes";
import ReviewsGrid from "../SearchReviews/ReviewsGrid";

interface CategoryReviewsProps {
  name: string;
  link: string;
  reviews: Review[];
}

const CategoryReviews = ({
  name,
  link,
  reviews,
}: CategoryReviewsProps): React.ReactElement => {
  const history = useHistory();
  const displayReviews = useBreakpointValue(
    {
      base: 2,
      lg: 5,
      md: 3,
      sm: 3,
    },
    "lg",
  );

  return (
    <Box>
      <HStack justifyContent="space-between">
        <Text
          textStyle={[
            "mobileReviewsCategoryTitle",
            "reviewsCategoryTitle",
            "reviewsCategoryTitle",
          ]}
        >
          {name}
        </Text>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          onClick={() => {
            history.push(link);
          }}
          style={{ cursor: "pointer" }}
        >
          <Text
            fontSize={["13px", "15px", "15px"]}
            fontWeight="medium"
            color="#3182CE"
            _hover={{ textDecoration: "underline" }}
          >
            View more
          </Text>
          <IconButton
            aria-label="Go back"
            variant="ghost"
            isRound
            icon={<ArrowForwardIcon w={7} h={7} />}
            mr={6}
            color="#3182CE"
          />
        </Box>
      </HStack>
      <Box mt="20px" mb="20px">
        {reviews.length > 0 ? <ReviewsGrid displayedReviews={reviews.slice(0, displayReviews)} /> : <Text>No reviews found</Text>}
      </Box>
    </Box>
  );
};

export default CategoryReviews;
