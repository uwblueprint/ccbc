import { ArrowBackIcon, EmailIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import CreatorAPIClient from "../../../APIClients/CreatorAPIClient";
import background from "../../../assets/SearchResultsBackground.png";
import { Creator } from "../../../types/CreatorTypes";
import LoadingSpinner from "../../common/LoadingSpinner";
import CreatorOverview from "./CreatorOverview";
import CreatorPublications from "./CreatorPublications";

interface CreatorProfileParams {
  id: string;
}

const CreatorProfile = (): React.ReactElement => {
  const [currentCreator, setCurrentCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams<CreatorProfileParams>();

  const history = useHistory();

  // Fetch Creator info from url query params
  useEffect(() => {
    setLoading(true);

    CreatorAPIClient.getCreatorById(id)
      .then((res) => {
        if (res) {
          setCurrentCreator(res);
        }
        setLoading(false);
      })
      .catch((error) => {
        history.replace("/404");
      });
  }, [id, history]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return currentCreator ? (
    <div>
      <>
        <Box
          minW="100vw"
          minH="100vh"
          bgImage={[null, null, background]}
          bgRepeat="no-repeat"
          backgroundSize="cover"
          backgroundAttachment="scroll"
          bgPosition="0 -120px"
        >
          <Center>
            <Box w="80%">
              <Flex align="center" mt="20px" mb="40px" gap="8px">
                <ArrowBackIcon boxSize={6} />
                <Link to="..">
                  <Text fontSize="lg" color="#000" fontWeight="semibold">
                    Return to Creator Directory
                  </Text>
                </Link>
              </Flex>

              <Flex gap="31px" alignItems="center">
                <Heading as="h2" size="xl">
                  {currentCreator.firstName} {currentCreator.lastName}
                </Heading>
                <Button leftIcon={<EmailIcon />} variant="add" cursor="pointer">
                  Contact
                </Button>
              </Flex>

              <CreatorOverview currentCreator={currentCreator} />
              <CreatorPublications currentCreator={currentCreator} />
            </Box>
          </Center>
        </Box>
      </>
    </div>
  ) : (
    <></>
  );
};

export default CreatorProfile;