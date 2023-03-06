import { ArrowBackIcon, EmailIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Link as ChakraLink,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import CreatorAPIClient from "../../../APIClients/CreatorAPIClient";
import { Creator } from "../../../types/CreatorTypes";
import LoadingSpinner from "../../common/LoadingSpinner";

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
        <Center mt="30px">
          <Box w="80%">
            <Flex align="center" mb="40px" gap="8px">
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

            <Box boxShadow="lg" padding="5" my="20px">
              <Flex
                flexDir={{ base: "column", md: "row" }}
                gap={{ base: "20px", md: "50px" }}
              >
                <Image
                  borderRadius="sm"
                  maxW="100%"
                  maxH="349px"
                  // src="https://bit.ly/dan-abramov"
                  src="https://storage.googleapis.com/ccbc-95e66.appspot.com/images/86b092bb-b082-49d9-ac32-790f0a1472b8"
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
                      <div> {currentCreator.genre?.replace(/[{}]/g, "")}</div>
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
          </Box>
        </Center>
      </>
    </div>
  ) : (
    <></>
  );
};

export default CreatorProfile;
