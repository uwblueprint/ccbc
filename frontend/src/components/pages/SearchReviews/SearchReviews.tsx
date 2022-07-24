import { Box, Center, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import LoadingSpinner from "../../common/LoadingSpinner";
import ReviewsGrid from "../MockSearch/ReviewsGrid";
import SearchBox from "../SearchBox";

/**
 * The component for the page where the user searches and filters reviews.
 */
const SearchReviews = (): React.ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [genresFilter, setGenresFilter] = useState<string[]>([]);
  // todo set the state for age range as well!

  /** Fetches the search queries from url */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.has("search_query")
      ? params.get("search_query")
      : "";
    const genres = params.has("genres") ? params.get("genres")?.split(",") : [];
    // todo do age range later
    if (searchQuery) {
      setSearchText(searchQuery);
    }
    if (genres) {
      setGenresFilter(genres);
    }
  }, []);

  /** Changes url to when search filters are changed and fetches search results  */
  useEffect(() => {
    setLoading(true);
    // todo add age range filter too
    let newSearchUrl = "/magazine/search_results";
    newSearchUrl += searchText || genresFilter.length > 0 ? "?" : "";
    const newParams = [];
    if (searchText) newParams.push(`search_query=${searchText}`);
    if (genresFilter.length > 0)
      newParams.push(`genres=${genresFilter.join(",")}`);
    newSearchUrl += newParams.join("&");
    window.history.replaceState(null, "New search result", newSearchUrl);

    // call backend search filter here
    setLoading(false);

    // todo see display review for review api client
  }, [searchText, genresFilter]);

  if (loading) {
    return <LoadingSpinner mt="21%" />;
  }
  return (
    <Center>
      <Box w={["90%", "85%", "65%"]} paddingTop="10">
        <SearchBox setSearchText={setSearchText} searchQuery={searchText} />
        <Text>{searchText}</Text>
        <Text>{genresFilter}</Text>
        <ReviewsGrid />
      </Box>
    </Center>
  );
};

export default SearchReviews;
