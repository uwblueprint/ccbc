import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Link as ChakraLink,
  VStack,
} from "@chakra-ui/react";
import React from "react";

import { Creator } from "../../../types/CreatorTypes";

type CreatorOverviewProps = {
  currentCreator: Creator;
};

export default function CreatorOverview({
  currentCreator,
}: CreatorOverviewProps): React.ReactElement {
  return (
    <Box boxShadow="lg" padding="5" my="20px" bg="white" borderRadius="8px">
      <Flex
        flexDir={{ base: "column", lg: "row" }}
        gap={{ base: "20px", md: "50px" }}
      >
        <Image
          borderRadius="sm"
          maxW="100%"
          maxH="349px"
          src={currentCreator.profilePictureLink}
          objectFit="cover"
        />
        <Grid gridTemplateColumns="120px 1fr">
          <GridItem fontWeight="bold">
            <VStack gap={2} py="10px" align="start">
              <div> Craft</div>
              <div> Genre</div>
              <div> Audience</div>
              <div> Province</div>
              <div> Timezone</div>
              <div> Website</div>
              <div> Bio</div>
            </VStack>
          </GridItem>
          <GridItem w="100%">
            <VStack gap={2} py="10px" align="start">
              <Box py="2px" px="8px" bg="green.100" borderRadius="sm">
                {currentCreator.craft}
              </Box>
              <div> {currentCreator.genre?.join(", ")}</div>
              <div>
                {currentCreator.ageRange
                  ?.replace(/[^0-9\s]/g, "")
                  .replace(" ", "-")}
              </div>
              <div> {currentCreator.province}</div>
              <div> {currentCreator.timezone}</div>
              <ChakraLink href="www.google.com">
                {currentCreator.website}
              </ChakraLink>
              <div> {currentCreator.bio}</div>
            </VStack>
          </GridItem>
        </Grid>
      </Flex>
    </Box>
  );
}
