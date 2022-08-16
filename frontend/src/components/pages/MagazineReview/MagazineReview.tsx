import { Box, Center, Spinner, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import reviewAPIClient from "../../../APIClients/ReviewAPIClient";
import background from "../../../assets/home-bg.png";
import { PaginatedReviewResponse, Review } from "../../../types/ReviewTypes";
import { mapReviewResponseToReview } from "../../../utils/MappingUtils";
import SearchBox from "../SearchBox";
import CategoryReviews from "./CategoryReviews";

const MagazineReview = (): React.ReactElement => {
  const [searchText, setSearchText] = useState<string>("");
  const [zeroToThreeReviews, setZeroToThreeReviews] = useState<Review[]>([]);
  const [fourToEightReviews, setFourToEightReviews] = useState<Review[]>([]);
  const [nineToTwelveReviews, setNineToTwelveReviews] = useState<Review[]>([]);
  const [featuredReviews, setFeaturedReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // get featured reviews on magazine home page
  useEffect(() => {
    setLoading(true);
    reviewAPIClient
      .getReviews(undefined, 5, 0, undefined, undefined, true)
      .then((reviewResponse: PaginatedReviewResponse) => {
        setFeaturedReviews(mapReviewResponseToReview(reviewResponse.reviews));
      });
    reviewAPIClient
      .getReviews(undefined, 5, 0, 0, 3)
      .then((reviewResponse: PaginatedReviewResponse) => {
        setZeroToThreeReviews(
          mapReviewResponseToReview(reviewResponse.reviews),
        );
      });
    reviewAPIClient
      .getReviews(undefined, 5, 0, 4, 8)
      .then((reviewResponse: PaginatedReviewResponse) => {
        setFourToEightReviews(
          mapReviewResponseToReview(reviewResponse.reviews),
        );
      });
    reviewAPIClient
      .getReviews(undefined, 5, 0, 9, 12)
      .then((reviewResponse: PaginatedReviewResponse) => {
        setNineToTwelveReviews(
          mapReviewResponseToReview(reviewResponse.reviews),
        );
        setLoading(false);
      });
  }, []);

  return (
    <Center>
      <Box
        h="100%"
        minH="100vh"
        w="100%"
        bgImage={[null, null, background]}
        bgRepeat="no-repeat"
        backgroundSize="cover"
        backgroundAttachment="scroll"
        bgPosition="0 -80px"
      >
        <VStack>
          <Box mt="10" w={["80%", "80%", "30%"]} mb="6">
            <VStack textAlign="center">
              <Text textStyle="h2">Welcome to the CCBC Magazine Review</Text>
              <Text textStyle="body">
                Scroll and skim through a wide selection of book reviews
                approved by the Canadian Children’s Book Centre
              </Text>
            </VStack>
          </Box>
          <Box w={["90%", "85%", "70%"]}>
            <SearchBox setSearchText={setSearchText} searchQuery={searchText} />
            {loading ? (
              <Center mt="20">
                <Spinner />
              </Center>
            ) : (
              <Box py="10">
                <CategoryReviews
                  name="Featured Reviews"
                  link="/magazine/search_results"
                  reviews={featuredReviews}
                />
                <CategoryReviews
                  name="Age 0 - 3"
                  link="/magazine/search_results/?minAge=0&maxAge=3"
                  reviews={zeroToThreeReviews}
                />
                <CategoryReviews
                  name="Age 4 - 8"
                  link="/magazine/search_results/?minAge=4&maxAge=8"
                  reviews={fourToEightReviews}
                />
                <CategoryReviews
                  name="Age 9 - 12"
                  link="/magazine/search_results/?minAge=9&maxAge=12"
                  reviews={nineToTwelveReviews}
                />
              </Box>
            )}
          </Box>
        </VStack>
      </Box>
    </Center>
  );
};

export default MagazineReview;
