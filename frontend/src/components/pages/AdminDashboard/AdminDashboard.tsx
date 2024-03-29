import {
  Box,
  Button,
  Center,
  Flex,
  Spacer,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { CREATE_REVIEW_PAGE } from "../../../constants/Routes";
import AdminCreatorProfiles from "./AdminCreatorProfiles";
import AdminReviews from "./AdminReviews";

const AdminDashboard = (): React.ReactElement => {
  useEffect(() => {}, []);

  return (
    <Box>
      <Center>
        <Stack w="90%" mb="50">
          <Flex mt="10" mb="25">
            <Text textStyle="heading">Admin dashboard</Text>
            <Spacer />
            <Link to={CREATE_REVIEW_PAGE}>
              <Button w="159px" h="48px" colorScheme="teal">
                + Add review
              </Button>
            </Link>
          </Flex>
          <Tabs variant="unstyled" colorScheme="green">
            <TabList>
              <Tab
                fontWeight="bold"
                px="0"
                mr="24"
                _selected={{ borderBottom: "4px", borderColor: "green.400" }}
              >
                Magazine Reviews
              </Tab>
              <Tab
                fontWeight="bold"
                px="0"
                mr="10"
                _selected={{ borderBottom: "4px", borderColor: "green.400" }}
              >
                Creator Profiles
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <AdminReviews />
              </TabPanel>
              <TabPanel>
                <AdminCreatorProfiles />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Center>
    </Box>
  );
};

export default AdminDashboard;
