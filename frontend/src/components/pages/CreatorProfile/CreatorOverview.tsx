import {
  Box,
  Flex,
  HStack,
  Image,
  Link as ChakraLink,
  VStack,
} from "@chakra-ui/react";
import { makeStyles } from "@material-ui/core";
import React from "react";
import ReactQuill from "react-quill";

import { Creator } from "../../../types/CreatorTypes";

type CreatorOverviewProps = {
  currentCreator: Creator;
};

const useStyles = makeStyles({
  reactQuill: {
    "& .ql-container": {
      display: "flex",
      alignItems: "center",
    },
    "& .ql-editor": {
      minHeight: "0px",
      padding: "0px",
    },
  },
});

export default function CreatorOverview({
  currentCreator,
}: CreatorOverviewProps): React.ReactElement {
  const { reactQuill } = useStyles();

  const titleValuePair = [
    { title: "Craft", value: currentCreator.craft },
    {
      title: "Genre",
      value: currentCreator.genre
        ?.map((genre) =>
          genre.replace(
            /^[a-z]|[A-Z]/g,
            (c, i) => (i ? " " : "") + c.toUpperCase(),
          ),
        )
        .join(", "),
    },
    {
      title: "Audience",
      value: currentCreator.ageRange
        ?.replace(/[^0-9\s]/g, "")
        .replace(" ", "-"),
    },
    { title: "Province", value: currentCreator.province },
    { title: "Timezone", value: currentCreator.timezone },
    { title: "Website", value: currentCreator.website },
    { title: "Bio", value: currentCreator.bio },
  ];

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
        <VStack gap={2} py="10px" align="start">
          {titleValuePair.map((pair) => {
            return pair.value ? (
              <HStack key={pair.title}>
                <Box width="130px">
                  <b>{pair.title}</b>
                </Box>
                {(pair.title === "Craft" &&
                  (typeof pair.value === "string"
                    ? [pair.value]
                    : pair.value
                  ).map((craft: any) => {
                    return (
                      <Box
                        py="2px"
                        px="8px"
                        bg="green.100"
                        borderRadius="sm"
                        key={craft}
                      >
                        {craft}
                      </Box>
                    );
                  })) ||
                  (pair.title === "Website" && (
                    <ChakraLink href="www.google.com">
                      <ReactQuill
                        value={pair.value as any}
                        readOnly
                        theme="bubble"
                        className={reactQuill}
                      />
                    </ChakraLink>
                  )) || (
                    <ReactQuill
                      value={pair.value as any}
                      readOnly
                      theme="bubble"
                      className={reactQuill}
                    />
                  )}
              </HStack>
            ) : null;
          })}
        </VStack>
      </Flex>
    </Box>
  );
}
