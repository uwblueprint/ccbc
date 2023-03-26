import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, Center, createIcon, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { CREATOR_PROFILE_LANDING } from "../../../constants/Routes";
import CreatorProfileContext from "../../../contexts/CreatorProfileContext";
import { CreatorProfile } from "../../../types/CreatorProfileTypes";
import AvailabilityForm from "./AvailabilityForm";
import ContactInfoForm from "./ContactInfoForm";
import CreatorProfileNav from "./CreatorProfileNav";
import GeneralInfoForm from "./GeneralInfoForm";
import PublicationsForm from "./Publications Form/PublicationsForm";

const CreatorProfileForm = (): React.ReactElement => {
  const [creatorProfile, setCreatorProfile] = useState<CreatorProfile>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    bibliography: [],
    bookCovers: [],
    geographicReach: "",
    primaryTimezone: "",
    availability: [],
    crafts: [],
    genres: [],
    presentations: [],
    website: "",
    bio: "",
    profilePictureLink: "",
  });

  const [activeForm, setActiveForm] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);

  const forms = [
    "Contact Info",
    "General",
    "Presentations",
    "Publications",
    "Availability",
    "Review",
  ];

  const handleNav = (direction: number) => {
    const fieldsInvalid =
      (activeForm === 0 &&
        (creatorProfile?.firstName === "" ||
          creatorProfile?.lastName === "" ||
          creatorProfile?.email === "" ||
          creatorProfile?.phone === "" ||
          creatorProfile?.address === "" ||
          creatorProfile?.city === "" ||
          creatorProfile?.province === "" ||
          creatorProfile?.postalCode === "")) ||
      (activeForm === 1 &&
        ((creatorProfile?.crafts && creatorProfile.crafts.length === 0) ||
          (creatorProfile?.genres && creatorProfile.genres.length === 0) ||
          (creatorProfile?.presentations &&
            creatorProfile.presentations.length === 0) ||
          creatorProfile?.bio === "" ||
          creatorProfile?.profilePictureLink === "")) ||
      (activeForm === 4 &&
        (creatorProfile?.geographicReach === "" ||
          creatorProfile?.primaryTimezone === "" ||
          !creatorProfile?.availability ||
          creatorProfile?.availability.length === 0));
    setError(fieldsInvalid ?? false);
    if (direction === 1 && !fieldsInvalid) {
      setActiveForm(Math.min(activeForm + 1, 5));
    } else if (direction === -1) {
      setActiveForm(Math.max(activeForm - 1, 0));
    }
  };

  return (
    <>
      <Link to={CREATOR_PROFILE_LANDING}>
        <Button
          textAlign="left"
          leftIcon={<ArrowBackIcon />}
          mt="5"
          ml="5"
          variant="link"
          color="black"
        >
          Back
        </Button>
      </Link>
      <Flex
        direction={{ sm: "column", base: "row", md: "row", lg: "row" }}
        justify="flex-start"
        pl="168" // TODO: Should this be hardcoded? might need bootstrap?
      >
        <Flex
          direction="column"
          justify="start"
          align="start"
          pr="16"
          pl="8"
          pt="4"
        >
          {forms.map((form, index) => {
            return (
              <Flex key={index}>
                <Flex direction="column" align="center">
                  <Center
                    border="2px"
                    borderColor={activeForm === index ? "teal.300" : "gray.300"}
                    rounded="full"
                    height="10"
                    width="10"
                    padding="3"
                  >
                    <Text
                      fontSize="18"
                      fontWeight="medium"
                      color={activeForm === index ? "teal.300" : "gray.300"}
                    >
                      {index + 1}
                    </Text>
                  </Center>
                  {index !== 5 && (
                    <Center
                      borderLeftColor="gray.300"
                      height="10"
                      style={{ borderLeftWidth: 2 }}
                    />
                  )}
                </Flex>
                <Text
                  fontSize="18"
                  color={activeForm === index ? "teal.300" : "gray.300"}
                  ps="2"
                  pt="1.5"
                  fontWeight="medium"
                >
                  {form}
                </Text>
              </Flex>
            );
          })}
        </Flex>
        <Flex direction="column" pt="4">
          <CreatorProfileContext.Provider
            value={{ creatorProfile, setCreatorProfile }}
          >
            {activeForm !== 3 ? (
              <>
                <Center
                  borderLeftWidth="thin"
                  borderLeftColor="gray.200"
                  px="16"
                >
                  {activeForm === 0 && <ContactInfoForm submitted={error} />}
                  {activeForm === 1 && <GeneralInfoForm submitted={error} />}
                  {activeForm === 4 && <AvailabilityForm submitted={error} />}
                </Center>
                <CreatorProfileNav
                  activeForm={activeForm}
                  handleNav={handleNav}
                  saveAndExit={() => {}}
                />
              </>
            ) : (
              // CreatorProfileNav needs to be within PublicationsForm because the "Save and exit"
              //   button in this step also needs to verify and set state, unlike in other steps
              <PublicationsForm handleNav={handleNav} />
            )}
          </CreatorProfileContext.Provider>
        </Flex>
      </Flex>
    </>
  );
};

export default CreatorProfileForm;
