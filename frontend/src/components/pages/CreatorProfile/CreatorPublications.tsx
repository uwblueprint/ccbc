import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import React from "react";

import rectangle from "../../../assets/rectangle.png";
import * as Routes from "../../../constants/Routes";
import { Creator, Publication } from "../../../types/CreatorTypes";
import Carousel from "./Carousel";

interface CreatorPublicationsProps {
  currentCreator: Creator;
}

const CreatorPublications = ({
  currentCreator,
}: CreatorPublicationsProps): React.ReactElement => {
  const publicationDisplay = (publication: Publication, index: number) => {
    return (
      <Flex mb="16px" key={index}>
        <Image mr="12px" src={rectangle} />
        <Box>
          <Text fontWeight="500">
            {`${publication.title}, ${publication.publication_year}`}
          </Text>
          <Text textStyle="heading6">
            {" "}
            Published by {publication.publisher}
          </Text>
          <Text> </Text>
          <Text as="i" fontWeight="400" fontSize="16px">
            {publication.notes}
          </Text>
        </Box>
      </Flex>
    );
  };

  const bookCoverDisplay = (bookCoverImageURL: string, index: number) => {
    return (
      <Image
        maxHeight="250px"
        marginLeft="25px"
        width="auto"
        src={bookCoverImageURL}
        key={index}
      />
    );
  };

  return (
    <>
      <Text
        textStyle="heading"
        fontWeight="bold"
        textAlign="left"
        fontSize="30px"
        mb="18px"
      >
        Publications
      </Text>
      <Flex direction={{ base: "column", lg: "row" }}>
        <Box flex="2">
          {currentCreator.publications
            ?.slice(0, 3)
            .map((publication: Publication, index: number) =>
              publicationDisplay(publication, index),
            )}
          <Link
            ml="16px"
            href={`${Routes.SEARCH_REVIEWS_PAGE}/?search_query=${currentCreator.firstName}+${currentCreator.lastName}`}
            isExternal
          >
            View All <ExternalLinkIcon mx="2px" />
          </Link>
        </Box>
        <Flex flex="4" paddingLeft="50px">
          {currentCreator.bookCovers &&
            currentCreator.bookCovers.length <= 3 &&
            currentCreator.bookCovers
              ?.slice(0, 3)
              .map((bookCoverImageURL: string, index: number) =>
                bookCoverDisplay(bookCoverImageURL, index),
              )}
          {currentCreator.bookCovers &&
            currentCreator.bookCovers.length > 3 && (
              <Carousel images={currentCreator.bookCovers || []} />
            )}
        </Flex>
      </Flex>
    </>
  );
};

export default CreatorPublications;
