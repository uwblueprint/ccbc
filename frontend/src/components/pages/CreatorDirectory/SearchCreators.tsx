import {
  Avatar,
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import creatorAPIClient from "../../../APIClients/CreatorAPIClient";
import background from "../../../assets/creator-bg.png";
import { Creator } from "../../../types/CreatorTypes";
import LoadingSpinner from "../../common/LoadingSpinner";
import CreatorPreview from "./CreatorPreview";

const SearchCreators = (): React.ReactElement => {
  const [data, setData] = useState<Creator[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    creatorAPIClient.getCreators("true").then((resp: Creator[]) => {
      if (!resp) {
        setData([]);
      } else {
        setData(resp || []);
      }
      setIsLoading(false);
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
                  {data.map((creator, index) => {
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
