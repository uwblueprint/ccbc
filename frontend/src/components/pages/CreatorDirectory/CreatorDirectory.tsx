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
import React from "react";

import background from "../../../assets/home-bg.png";

const CreatorDirectory = (): React.ReactElement => {
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
              <Grid
                templateColumns="repeat(9, 1fr)"
                gap={6}
                w="full"
                bgColor="white"
              >
                <GridItem
                  height="80px"
                  flexDir="column"
                  display="flex"
                  justifyContent="center"
                  colSpan={3}
                >
                  <Box
                    flexDir="row"
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <Avatar h="48px" w="48px" mx="3" />
                    <Text fontWeight="bold" mr="2">
                      Amy John
                    </Text>
                    <Tag h="5" bg="gray.200">
                      BC
                    </Tag>
                  </Box>
                </GridItem>
                <GridItem
                  height="80px"
                  flexDir="column"
                  display="flex"
                  justifyContent="center"
                  colSpan={2}
                >
                  <Text>Kindergarten</Text>
                </GridItem>
                <GridItem
                  height="80px"
                  flexDir="column"
                  display="flex"
                  justifyContent="center"
                  colSpan={2}
                >
                  <Text>Illustrator</Text>
                </GridItem>
                <GridItem
                  height="80px"
                  flexDir="column"
                  display="flex"
                  justifyContent="center"
                  colSpan={2}
                >
                  <Text>Fiction</Text>
                </GridItem>
              </Grid>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Center>
  );
};

export default CreatorDirectory;
