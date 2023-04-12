/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Button,
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Moment from "moment"
import React, { useContext, useEffect, useState } from "react";

import reviewAPIClient from "../../../APIClients/ReviewAPIClient";
import UsersAPIClient from "../../../APIClients/UsersAPIClient";
import background from "../../../assets/home-bg.png";
import AuthContext from "../../../contexts/AuthContext";
import { AuthenticatedUser } from "../../../types/AuthTypes";
import { PaginatedReviewResponse, Review } from "../../../types/ReviewTypes";
import { mapReviewResponseToReview } from "../../../utils/MappingUtils";
import SearchBox from "../SearchBox";
import CategoryReviews from "./CategoryReviews";
import FeaturedReview from "./FeaturedReview";

const MagazineReview = (): React.ReactElement => {
  const [searchText, setSearchText] = useState<string>("");
  const [zeroToThreeReviews, setZeroToThreeReviews] = useState<Review[]>([]);
  const [fourToEightReviews, setFourToEightReviews] = useState<Review[]>([]);
  const [nineToTwelveReviews, setNineToTwelveReviews] = useState<Review[]>([]);
  const [featuredReviews, setFeaturedReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { authenticatedUser, setAuthenticatedUser } = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const displayBlurb = useBreakpointValue(
    {
      base: false,
      lg: true,
      md: true,
      sm: false,
    },
    "lg",
  );

  const onClick = () => {
    window.location.href = `${process.env.REACT_APP_GIVECLOUD_URL}`;
  };

  const checkUserSubscriptionExpiry = async () => {
    if (authenticatedUser) {
      const user: AuthenticatedUser = await UsersAPIClient.getUserByEmail(
        authenticatedUser?.email,
      );

      // Convert the PostgresSQL date to a JavaScript Date object
      const subscriptionExpiryDate = new Date(
        Moment(user?.subscriptionExpiresOn).format("LLLL"),
      );

      if (user) {
        if (subscriptionExpiryDate < new Date(Date.now())) {
          onOpen();
        }
      }
    }
  };

  useEffect(() => {
    checkUserSubscriptionExpiry();
  });

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
        bgPosition="0 -120px"
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
              </Box>
            </Flex>
          )}
        </VStack>
      </Box>
      <Modal isOpen={isOpen} onClose={() => {}}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User Subscription Expired</ModalHeader>
          <ModalBody>
            Your subscription to the Canadian Children's Book Centre has
            expired. Please click on the button below and follow the steps to
            renew your account
          </ModalBody>
          <ModalFooter>
            <Button variant="submit" type="submit" onClick={onClick}>
              Renew Subscription
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default MagazineReview;
