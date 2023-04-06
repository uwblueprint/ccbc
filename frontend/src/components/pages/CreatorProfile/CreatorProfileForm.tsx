import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, Center, Flex, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import CreatorAPIClient from "../../../APIClients/CreatorAPIClient";
import { CREATOR_PROFILE_LANDING } from "../../../constants/Routes";
import AuthContext from "../../../contexts/AuthContext";
import CreatorProfileContext from "../../../contexts/CreatorProfileContext";
import {
  CreatorProfile,
  CreatorProfileFormProps,
} from "../../../types/CreatorProfileTypes";
import LoadingSpinner from "../../common/LoadingSpinner";
import AvailabilityForm from "./AvailabilityForm";
import ContactInfoForm from "./ContactInfoForm";
import CreatorProfileNav from "./CreatorProfileNav";
import GeneralInfoForm from "./GeneralInfoForm";
import PublicationsForm from "./Publications Form/PublicationsForm";
import SubmittedCreatorProfileModal from "./SubmittedCreatorProfile";

const CreatorProfileForm = (): React.ReactElement => {
  const { state } = useLocation<CreatorProfileFormProps>();
  const [creatorProfile, setCreatorProfile] = useState<CreatorProfile>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    province: "",
    postalCode: "",
    publications: [],
    bookCovers: [],
    location: "",
    timezone: "",
    availability: [],
    craft: [],
    genre: [],
    presentations: [],
    website: "",
    bio: "",
    profilePictureLink: "",
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [activeForm, setActiveForm] = useState<number>(state?.currentPage || 0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const forms = [
    "Contact Info",
    "General",
    "Presentations",
    "Publications",
    "Availability",
    "Review",
  ];

  const { authenticatedUser } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    CreatorAPIClient.getCreatorByUserId(String(authenticatedUser?.id))
      .then((res) => {
        if (res) {
          setCreatorProfile({
            firstName: res.firstName || "",
            lastName: res.lastName || "",
            email: res.email || "",
            phone: res.phone || "",
            streetAddress: res.streetAddress || "",
            city: res.city || "",
            province: res.province || "",
            postalCode: res.postalCode || "",
            publications: res.publications || [],
            bookCovers:
              (res.bookCovers || []).map((cover, index) => {
                return {
                  url: cover,
                  name: `Image ${index + 1}`,
                  fileSize: 100,
                };
              }) || [],
            location: res.location || "",
            timezone: res.timezone || "",
            availability: res.availability || [],
            craft: res.craft || [],
            genre: res.genre || [],
            presentations: res.presentations || [],
            website: res.website || "",
            bio: res.bio || "",
            profilePictureLink: res.profilePictureLink || "",
          });
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [authenticatedUser?.id]);

  const handleNav = (direction: number) => {
    const fieldsInvalid =
      (activeForm === 0 &&
        (creatorProfile?.firstName === "" ||
          creatorProfile?.lastName === "" ||
          creatorProfile?.email === "" ||
          creatorProfile?.phone === "" ||
          creatorProfile?.streetAddress === "" ||
          creatorProfile?.city === "" ||
          creatorProfile?.province === "" ||
          creatorProfile?.postalCode === "")) ||
      (activeForm === 1 &&
        ((creatorProfile?.craft && creatorProfile.craft.length === 0) ||
          (creatorProfile?.genre && creatorProfile.genre.length === 0) ||
          creatorProfile?.bio === "" ||
          creatorProfile?.profilePictureLink === "")) ||
      (activeForm === 4 &&
        (creatorProfile?.location === "" ||
          creatorProfile?.timezone === "" ||
          !creatorProfile?.availability ||
          creatorProfile?.availability.length === 0));
    setError(fieldsInvalid ?? false);
    if (direction === 1 && !fieldsInvalid) {
      setActiveForm(Math.min(activeForm + 1, 5));
    } else if (direction === -1) {
      setActiveForm(Math.max(activeForm - 1, 0));
    }
  };

  const handleCloseSubmissionModal = () => {
    setSubmitted(false);
    history.push("/creator-directory");
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
      <SubmittedCreatorProfileModal
        isOpen={submitted}
        onClose={handleCloseSubmissionModal}
      />
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
        <Flex direction="column" pt="4" w="full">
          {isLoading ? (
            <Flex justify="center">
              <LoadingSpinner />
            </Flex>
          ) : (
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
                    setModalState={setSubmitted}
                  />
                </>
              ) : (
                // CreatorProfileNav needs to be within PublicationsForm because the "Save and exit"
                //   button in this step also needs to verify and set state, unlike in other steps
                <PublicationsForm handleNav={handleNav} />
              )}
            </CreatorProfileContext.Provider>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default CreatorProfileForm;
