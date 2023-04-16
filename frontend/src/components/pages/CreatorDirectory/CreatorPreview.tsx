import { Avatar, Box, Grid, GridItem, Tag, Text } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";

import { Creator } from "../../../types/CreatorTypes";

const CreatorPreview = ({
  creator,
}: {
  creator: Creator;
}): React.ReactElement => {
  const history = useHistory();

  const handleGradeLevel = (range?: string) => {
    if (!range) {
      return "";
    }
    const ages = range.split(", ");
    const minAge = Number(ages[0]);
    const maxAge = Number(ages[1]);
    const gradeLevels: string[] = [];

    if (minAge <= 3) {
      gradeLevels.push("Kindergarten");
    }
    if (minAge <= 8) {
      gradeLevels.push("Primary");
    }
    if (minAge <= 12) {
      gradeLevels.push("Middle School");
    }
    if (maxAge >= 12) {
      gradeLevels.push("High School");
    }
    return gradeLevels.join(", ");
  };

  return (
    <Grid
      templateColumns="repeat(9, 1fr)"
      gap={6}
      w="full"
      bgColor="white"
      onClick={() => history.push(`/creators/${creator.id}`)}
      cursor="pointer"
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
          <Avatar h="48px" w="48px" mx="3" src={creator.profilePictureLink} />
          <Text fontWeight="bold" mr="2">
            {creator.firstName} {creator.lastName}
          </Text>
          <Tag h="5" bg="gray.200">
            {creator.province}
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
        <Text>
          {handleGradeLevel(
            creator.ageRange?.substring(1, creator.ageRange.length - 1),
          )}
        </Text>
      </GridItem>
      <GridItem
        height="80px"
        flexDir="column"
        display="flex"
        justifyContent="center"
        colSpan={2}
      >
        <Text>{creator.craft ? creator.craft.join(", ") : ""}</Text>
      </GridItem>
      <GridItem
        height="80px"
        flexDir="column"
        display="flex"
        justifyContent="center"
        colSpan={2}
      >
        <Text>{creator.genre ? creator.genre.join(", ") : ""}</Text>
      </GridItem>
    </Grid>
  );
};

export default CreatorPreview;
