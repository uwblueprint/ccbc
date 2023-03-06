import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import React from "react";

import rectangle from "../../../assets/rectangle.png";
import * as Routes from "../../../constants/Routes";
import { Publication } from "../../../types/CreatorTypes";

interface CreatorPublicationsProps {
  publications?: Publication[];
  bookCovers?: string[];
  firstName?: string;
  lastName?: string;
}

const CreatorPublications = ({
  publications,
  bookCovers,
  firstName,
  lastName,
}: CreatorPublicationsProps): React.ReactElement => {
  const publicationDisplay = (publication: Publication) => {
    return (
      <Flex mb="16px">
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

  const bookCoverDisplay = (bookCoverImageURL: string) => {
    return <Image minWidth="175px" height="auto" src={bookCoverImageURL} />;
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
      <Flex>
        <Box flex="2">
          {publications
            ?.slice(0, 3)
            .map((publication: Publication) => publicationDisplay(publication))}
          <Link
            ml="16px"
            href={`${Routes.SEARCH_REVIEWS_PAGE}/?search_query=${firstName}+${lastName}`}
            isExternal
          >
            View All <ExternalLinkIcon mx="2px" />
          </Link>
        </Box>
        <Flex flex="4" paddingLeft="50px">
          {bookCovers
            ?.slice(0, 3)
            .map((bookCoverImageURL: string) =>
              bookCoverDisplay(bookCoverImageURL),
            )}
        </Flex>
      </Flex>
    </>
  );
};

export default CreatorPublications;
