/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Center,
  Flex,
  Spinner,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import reviewAPIClient from "../../../APIClients/ReviewAPIClient";
import background from "../../../assets/home-bg.png";
import { UserRole } from "../../../constants/Enums";
import { PaginatedReviewResponse, Review } from "../../../types/ReviewTypes";
import { mapReviewResponseToReview } from "../../../utils/MappingUtils";
import SearchBox from "../SearchBox";
import SubscriptionExpireModal from "../Subscription/SubscriptionExpireModal";
import CategoryReviews from "./CategoryReviews";
import FeaturedReview from "./FeaturedReview";

const MagazineReview = (): React.ReactElement => {
  const [searchText, setSearchText] = useState<string>("");
  const [zeroToThreeReviews, setZeroToThreeReviews] = useState<Review[]>([]);
  const [fourToEightReviews, setFourToEightReviews] = useState<Review[]>([]);
  const [nineToTwelveReviews, setNineToTwelveReviews] = useState<Review[]>([]);
  const [twelveAndOverReviews, setTwelveAndOverReviews] = useState<Review[]>(
    [],
  );
  const [featuredReviews, setFeaturedReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const displayBlurb = useBreakpointValue(
    {
      base: false,
      lg: true,
      md: true,
      sm: false,
    },
    "lg",
  );

  // get featured reviews on magazine home page
  useEffect(() => {
    setLoading(true);
    reviewAPIClient
      .getReviews(undefined, 5, 0, undefined, undefined, true)
      .then((reviewResponse: PaginatedReviewResponse) => {
        setFeaturedReviews(mapReviewResponseToReview(reviewResponse.reviews));
      });
    reviewAPIClient
      .getReviews(undefined, 4, 0, 0, 3)
      .then((reviewResponse: PaginatedReviewResponse) => {
        setZeroToThreeReviews(
          mapReviewResponseToReview(reviewResponse.reviews),
        );
      });
    reviewAPIClient
      .getReviews(undefined, 4, 0, 4, 8)
      .then((reviewResponse: PaginatedReviewResponse) => {
        setFourToEightReviews(
          mapReviewResponseToReview(reviewResponse.reviews),
        );
      });
    reviewAPIClient
      .getReviews(undefined, 4, 0, 9, 12)
      .then((reviewResponse: PaginatedReviewResponse) => {
        setNineToTwelveReviews(
          mapReviewResponseToReview(reviewResponse.reviews),
        );
        setLoading(false);
      });
    reviewAPIClient
      .getReviews(undefined, 4, 0, 12, 100)
      .then((reviewResponse: PaginatedReviewResponse) => {
        setTwelveAndOverReviews(
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
        bgPosition="0"
      >
        <VStack>
          {displayBlurb && (
            <Box mt="10" w={["80%", "80%", "30%"]}>
              <VStack textAlign="center">
                <Text textStyle="h2">Welcome to the CCBC Magazine Review</Text>
                <Text textStyle="body">
                  Scroll and skim through a wide selection of book reviews
                  approved by the Canadian Children’s Book Centre
                </Text>
              </VStack>
            </Box>
          )}
          <Box w={["90%", "85%", "70%"]} maxW="1000px" pt="6">
            <SearchBox
              setSearchText={setSearchText}
              searchQuery={searchText}
              homePage
            />
          </Box>

          {loading ? (
            <Center mt="20">
              <Spinner />
            </Center>
          ) : (
            <Flex
              py="50"
              w={["90%", "85%", "70%"]}
              flexDirection="column"
              alignItems="center"
            >
              <Box maxW="none" mb="20">
                <FeaturedReview reviews={featuredReviews} />
              </Box>
              <Box w={["90%", "90%", "100%"]} maxW="1000px">
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
                <CategoryReviews
                  name="Age 12+"
                  link="/magazine/search_results/?minAge=12&maxAge=100"
                  reviews={twelveAndOverReviews}
                />
              </Box>
            </Flex>
          )}
        </VStack>
      </Box>
      <SubscriptionExpireModal targetUser={UserRole.Subscriber} />
    </Center>
  );
};

export default MagazineReview;
