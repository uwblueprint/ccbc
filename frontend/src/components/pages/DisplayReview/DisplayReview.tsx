import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, IconButton, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import reviewAPIClient from "../../../APIClients/ReviewAPIClient";
import background from "../../../assets/review-base-page-bg.jpg";
import { Review, ReviewResponse } from "../../../types/ReviewTypes";
import { mapReviewResponseToReview } from "../../../utils/MappingUtils";
import LoadingSpinner from "../../common/LoadingSpinner";
import PreviewReview from "../../PreviewReview/PreviewReview";

/**
 * The model defining the route parameters that can be passed to
 * the Display Review Page
 */
interface DisplayReviewParams {
  /** The unique identifer for the Review that is being viewed */
  id: string;
}

/**
 * The component for the page where the user views a review.
 */
const DisplayReview = (): React.ReactElement => {
  const { id } = useParams<DisplayReviewParams>();
  const [currentReview, setCurrentReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const history = useHistory();

  /** Fetches the review information with id passed through parameters */
  useEffect(() => {
    setLoading(true);
    reviewAPIClient
      .getReviewById(id)
      .then((reviewResponse: ReviewResponse) => {
        const review: Review[] = mapReviewResponseToReview([reviewResponse]);
        setCurrentReview(review[0]);
        setLoading(false);
      })
      .catch(() => {
        history.replace("/404");
      });
  }, [id, history]);

  if (loading) {
    return <LoadingSpinner mt="21%" />;
  }
  return currentReview ? (
    <>
      <Box
        h="100%"
        minHeight="100vh"
        bgColor="#F6F6F6"
        bgImage={[null, null, background]}
        bgRepeat="no-repeat"
        backgroundSize="cover"
        backgroundAttachment="scroll"
        bgPosition="0 -50px"
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          m="0 0 60px 0"
          h="60px"
          w="100%"
          bgColor="#F6F6F6"
          padding="2% 10% 0 10%"
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            onClick={() => history.goBack()}
            style={{ cursor: "pointer" }}
          >
            <IconButton
              aria-label="Go back"
              variant="ghost"
              isRound
              icon={<ArrowBackIcon w={7} h={7} />}
              mr={6}
            />
            <Text fontSize="15px" fontWeight="medium">
              Go Back
            </Text>
          </Box>
        </Box>
        <Box>
          <PreviewReview review={currentReview} isPageView />
        </Box>
      </Box>
    </>
  ) : (
    <></>
  );
};

export default DisplayReview;
