import {
  Box,
  Button,
  Center,
  createIcon,
  Flex,
  Grid,
  GridItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { SetStateAction, useEffect, useState } from "react";

import creatorAPIClient from "../../../APIClients/CreatorAPIClient";
import GenreAPIClient from "../../../APIClients/GenreAPIClient";
import background from "../../../assets/creator-bg.png";
import { Option } from "../../../types/BookTypes";
import { Creator } from "../../../types/CreatorTypes";
import LoadingSpinner from "../../common/LoadingSpinner";
import SearchBox from "../SearchBox";
import CreatorFilterBox from "./CreatorFilterBox";
import CreatorPreview from "./CreatorPreview";

const FiltersIcon = createIcon({
  displayName: "FiltersIcon",
  viewBox: "0 0 22 22",
  path: (
    <svg width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1545_4372)">
        <path
          d="M3.66699 19.25V12.8333M3.66699 9.16667V2.75M11.0003 19.25V11M11.0003 7.33333V2.75M18.3337 19.25V14.6667M18.3337 11V2.75M0.916992 12.8333H6.41699M8.25033 7.33333H13.7503M15.5837 14.6667H21.0837"
          stroke="#110A23"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1545_4372">
          <rect width="22" height="22" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
});

const SearchCreators = (): React.ReactElement => {
  const [data, setData] = useState<Creator[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showFilters, setShowFilters] = useState<boolean>(false);

  const [searchText, setSearchText] = useState<string>("");
  const [allGenres, setAllGenres] = useState<Option[]>([]);
  const [ageRangeFilter, setGradeLevelFilter] = useState<string[]>([]);
  const [genresFilter, setGenresFilter] = useState<string[]>([]);
  const [provincesFilter, setProvincesFilter] = useState<string[]>([]);
  const [craftsFilter, setCraftsFilter] = useState<string[]>([]);

  /** Fetches the search queries from url */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.has("search_query")
      ? params.get("search_query")
      : "";
    const genres = params.has("genres") ? params.get("genres")?.split(",") : [];
    const gradeLevel = params.has("gradeLevel")
      ? params.get("gradeLevel")?.split(",")
      : [];

    if (searchQuery) {
      setSearchText(searchQuery);
    }
    if (genres) {
      setGenresFilter(genres);
    }
    if (gradeLevel) {
      setGradeLevelFilter(gradeLevel);
    }
    setIsLoading(false);

    GenreAPIClient.getGenreOptions().then(
      (genreResponse: SetStateAction<Option[]>) => {
        setAllGenres(genreResponse);
      },
    );
  }, []);

  /** Creates new url based on search text and filters */
  const generateSearchUrl = (
    search: string,
    genres: string[],
    gradeLevels: string[],
    provinces: string[],
    crafts: string[],
  ) => {
    const searchUrl = new URL(`${window.location.origin}/creator-directory/`);
    if (search) searchUrl.searchParams.append("search_query", search);
    if (genres && genres.length > 0)
      searchUrl.searchParams.append("genres", genres?.join(","));
    if (gradeLevels && gradeLevels.length > 0) {
      searchUrl.searchParams.append("gradeLevel", gradeLevels?.join(","));
    }
    if (provinces && provinces.length > 0) {
      searchUrl.searchParams.append("provinces", provinces?.join(","));
    }
    if (crafts && crafts.length > 0) {
      searchUrl.searchParams.append("crafts", crafts?.join(","));
    }

    return searchUrl;
  };

  /** Converts grade labels back to age range for database */
  const handleGradeLevel = (gradeLevels?: string[]) => {
    if (!gradeLevels || gradeLevels.length === 0) {
      return "";
    }

    const ranges: Array<[number, number]> = [];
    let last: [number, number];
    let temp: number;
    const gradeRanges: Array<[number, number]> = [];
    if (gradeLevels.includes("Kindergarten")) {
      gradeRanges.push([0, 3]);
    }
    if (gradeLevels.includes("Primary")) {
      gradeRanges.push([4, 8]);
    }
    if (gradeLevels.includes("Middle School")) {
      gradeRanges.push([9, 12]);
    }
    if (gradeLevels.includes("High School")) {
      gradeRanges.push([12, 100]);
    }

    gradeRanges.sort((a, b) => {
      return a[0] - b[0] || a[1] - b[1];
    });

    gradeRanges.forEach((r) => {
      if (!last || r[0] + 1 === last[1]) {
        last = r;
        ranges.push(last);
      } else if (r[1] > last[1]) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        [temp, last[1]] = r;
      }
    });

    return `[${ranges[0]?.join(",")}]`;
  };

  /** Changes url to when search filters are changed and fetches search results  */
  useEffect(() => {
    if (isLoading) return;
    setIsLoading(true);
    const newSearchUrl = generateSearchUrl(
      searchText,
      genresFilter,
      ageRangeFilter,
      provincesFilter,
      craftsFilter,
    );
    window.history.replaceState(
      null,
      "New search result",
      newSearchUrl.toString(),
    );

    const params = new URLSearchParams(window.location.search);
    const genres = params.has("genres")
      ? String(params.get("genres")).split(",")
      : undefined;
    const gradeLevel = params.has("gradeLevel")
      ? handleGradeLevel(String(params.get("gradeLevel")).split(","))
      : "";
    const provinces = params.has("provinces")
      ? String(params.get("provinces")).split(",")
      : undefined;
    const crafts = params.has("crafts")
      ? String(params.get("crafts")).split(",")
      : undefined;

    setIsLoading(true);
    creatorAPIClient
      .getCreators("true", searchText, genres, provinces, crafts, gradeLevel)
      .then((resp: Creator[]) => {
        if (!resp) {
          setData([]);
        } else {
          setData(resp || []);
        }
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, genresFilter, ageRangeFilter, provincesFilter, craftsFilter]);
  
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
          <Box mt="20" w={["80%", "80%", "80%"]}>
            <VStack textAlign="start" alignItems="flex-start">
              <Text textStyle="h2" fontSize="4xl">
                Explore our directory
              </Text>
              <Text textStyle="body">
                Find and discover creators, view their profiles, and get in
                touch with them.
              </Text>
            </VStack>
          </Box>
          <Box mt="20" w={["80%", "80%", "80%"]}>
            <Flex gap="2">
              <Box flex={1}>
                <SearchBox
                  setSearchText={setSearchText}
                  searchQuery={searchText}
                />
              </Box>
              <Button
                leftIcon={<FiltersIcon />}
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                color="black"
                borderColor="black"
                backgroundColor="white"
              >
                Filters
              </Button>
            </Flex>
            {showFilters && (
              <CreatorFilterBox
                genreOptions={allGenres}
                setCraftFilter={(craft) => {
                  setCraftsFilter(craft.map((g) => g.label));
                }}
                setAgeFilter={(ages) => {
                  setGradeLevelFilter(ages.map((g) => g.label));
                }}
                setGenreFilter={(genres) => {
                  setGenresFilter(genres.map((g) => g.label));
                }}
                setProvinceFilter={(provinces) => {
                  setProvincesFilter(provinces.map((g) => g.label));
                }}
              />
            )}
          </Box>
          <Box mt="20" w={["80%", "80%", "80%"]}>
            <VStack textAlign="start" spacing="24px" alignItems="flex-start">
              {!isLoading && data && (
                <Text textStyle="body">
                  {data.length || 0} result{data.length !== 1 && "s"} found
                </Text>
              )}
            </VStack>
          </Box>
          <Box mt="20" w={["80%", "80%", "80%"]}>
            <VStack textAlign="start" alignItems="flex-start">
              <Text textStyle="h2" fontSize="2xl">
                Our Members
              </Text>
              <Grid
                templateColumns="repeat(9, 1fr)"
                gap={6}
                borderBottom="2px"
                fontWeight="bold"
                borderColor="black"
                w="full"
              >
                <GridItem w="100%" h="10" colSpan={3}>
                  Name
                </GridItem>
                <GridItem w="100%" h="10" colSpan={2}>
                  Grade Levels
                </GridItem>
                <GridItem w="100%" h="10" colSpan={2}>
                  Craft
                </GridItem>
                <GridItem w="100%" h="10" colSpan={2}>
                  Genres
                </GridItem>
              </Grid>
              {isLoading ? (
                <Box alignContent="center" flexDirection="row" width="full">
                  <LoadingSpinner h="20%" />
                </Box>
              ) : (
                <>
                  {data &&
                    data?.map((creator, index) => {
                      return <CreatorPreview key={index} creator={creator} />;
                    })}
                </>
              )}
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Center>
  );
};

export default SearchCreators;
