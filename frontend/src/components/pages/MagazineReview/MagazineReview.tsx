import {
  Box,
  Center,
  Flex,
  Spinner,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import React, { SetStateAction, useEffect, useState } from "react";

import GenreAPIClient from "../../../APIClients/GenreAPIClient";
import reviewAPIClient from "../../../APIClients/ReviewAPIClient";
import background from "../../../assets/home-bg.png";
import { Option } from "../../../types/BookTypes";
import { PaginatedReviewResponse, Review } from "../../../types/ReviewTypes";
import { mapReviewResponseToReview } from "../../../utils/MappingUtils";
import FilterBox from "../FilterBox";
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

  // filter state
  const [genresFilter, setGenresFilter] = useState<string[]>([]);
  const [allGenres, setAllGenres] = useState<Option[]>([]);
  const [allAges, setAllAges] = useState<Option[]>([]);
  const [ageRangeFilter, setAgeRangeFilter] = useState<number[]>([]); // ageRange[0] is min age, ageRange[1] is max age

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

    // filtering setup

    // fetch filter params from URL
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.has("search_query")
      ? params.get("search_query")
      : "";
    const genres = params.has("genres") ? params.get("genres")?.split(",") : [];
    const ageFilter = params.has("minAge") || params.has("maxAge");
    const minAge = params.has("minAge") ? Number(params.get("minAge")) : 0;
    const maxAge = params.has("maxAge") ? Number(params.get("maxAge")) : 0;

    if (searchQuery) {
      setSearchText(searchQuery);
    }
    if (genres) {
      setGenresFilter(genres);
    }
    if (ageFilter && minAge >= 0 && maxAge >= 0) {
      setAgeRangeFilter([minAge, maxAge]);
    }

    GenreAPIClient.getGenreOptions().then(
      (genreResponse: SetStateAction<Option[]>) => {
        setAllGenres(genreResponse);
      },
    );
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
            <FilterBox
              genreOptions={allGenres}
              ageOptions={allAges}
              setGenreFilter={() => null}
              setAgeFilter={() => null}
              searchStyle
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
    </Center>
  );
};

export default MagazineReview;
