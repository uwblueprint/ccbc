import { Box, Center } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import reviewAPIClient from "../../../APIClients/ReviewAPIClient";
import background from "../../../assets/SearchResultsBackground.png";
import { PaginatedReviewResponse, Review } from "../../../types/ReviewTypes";
import { mapReviewResponseToReview } from "../../../utils/MappingUtils";
import LoadingSpinner from "../../common/LoadingSpinner";
import SearchBox from "../SearchBox";
import ReviewsGrid from "./ReviewsGrid";

/**
 * The component for the page where the user searches and filters reviews.
 *
 * Url Parameters that can be passed in:
 *    search_query: current search command i.e "Potter"
 *    genres: the genres filter(s) applied to search, seperated by commas i.e "Horror" or "Romance,Thriller,Comedy"
 *    ageRange: the age range filter applied to search, in the format of "minAge,maxAge" i.e "5,10"
 */
const SearchReviews = (): React.ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [genresFilter, setGenresFilter] = useState<string[]>([]);
  const [ageRangeFilter, setAgeRangeFilter] = useState<number[]>([]); // ageRange[0] is min age, ageRange[1] is max age
  const [displayedReviews, setDisplayedReviews] = useState<Review[]>([]);

  /** Fetches the search queries from url */
  useEffect(() => {
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
  }, []);

  /** Creates new url based on search text and filters */
  const generateSearchUrl = (
    search: string,
    genres: string[],
    ageRange: number[],
  ) => {
    const searchUrl = new URL(
      `${window.location.origin}/magazine/search_results/`,
    );
    if (search) searchUrl.searchParams.append("search_query", search);
    if (genres && genres.length > 0)
      searchUrl.searchParams.append("genres", genres.join(","));
    if (ageRange && ageRange.length > 0) {
      searchUrl.searchParams.append("minAge", String(ageRange[0]));
      searchUrl.searchParams.append("maxAge", String(ageRange[1]));
    }

    return searchUrl;
  };

  /** Changes url to when search filters are changed and fetches search results  */
  useEffect(() => {
    setLoading(true);
    const newSearchUrl = generateSearchUrl(
      searchText,
      genresFilter,
      ageRangeFilter,
    );
    window.history.replaceState(
      null,
      "New search result",
      newSearchUrl.toString(),
    );

    reviewAPIClient
      .getReviews(searchText, 25, 0)
      .then((reviewResponse: PaginatedReviewResponse) => {
        setDisplayedReviews(mapReviewResponseToReview(reviewResponse.reviews));
        setLoading(false);
      });
  }, [searchText, genresFilter, ageRangeFilter]);

  return (
    <Box
      bgImage={[null, null, background]}
      bgRepeat="no-repeat"
      backgroundSize="cover"
      backgroundAttachment="scroll"
      h="100%"
      minH="100vh"
    >
      <Center>
        <Box w={["90%", "85%", "70%"]} py="10">
          <SearchBox setSearchText={setSearchText} searchQuery={searchText} />
          {loading ? (
            <LoadingSpinner mt="21%" />
          ) : (
            <Box mt="50px">
              <ReviewsGrid displayedReviews={displayedReviews} />
            </Box>
          )}
        </Box>
      </Center>
    </Box>
  );
};

export default SearchReviews;
