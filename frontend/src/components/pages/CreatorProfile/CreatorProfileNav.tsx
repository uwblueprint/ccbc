import { ArrowBackIcon, ArrowForwardIcon, CheckIcon } from "@chakra-ui/icons";
import { Button, createIcon, Flex, Spacer } from "@chakra-ui/react";
import React, { useContext, useState } from "react";

import CreatorAPIClient from "../../../APIClients/CreatorAPIClient";
import AuthContext from "../../../contexts/AuthContext";
import CreatorProfileContext from "../../../contexts/CreatorProfileContext";
import { Creator } from "../../../types/CreatorTypes";
import useToasts from "../../Toast";

const SaveIcon = createIcon({
  displayName: "SaveIcon",
  viewBox: "0 0 14 15",
  path: (
    <path
      d="M2.47656 5.49518V5.51861H2.5H8.5H8.52343V5.49518V3.49518V3.47174H8.5H2.5H2.47656V3.49518V5.49518ZM9.5206 11.1138L9.5206 11.1137C9.53608 10.763 9.47842 10.413 9.35129 10.0858C9.22416 9.75862 9.03034 9.46147 8.78215 9.21325C8.53396 8.96503 8.23684 8.77117 7.90967 8.644C7.5825 8.51683 7.23245 8.45913 6.88178 8.47457L6.88171 8.47458C6.39324 8.49749 5.92195 8.66183 5.52515 8.94763C5.12835 9.23342 4.82314 9.62835 4.64663 10.0844C4.47012 10.5404 4.42992 11.0379 4.53091 11.5164C4.6319 11.9949 4.86974 12.4337 5.2155 12.7795C5.56126 13.1253 6.00004 13.3632 6.4785 13.4642C6.95695 13.5653 7.45445 13.5251 7.91051 13.3487C8.36658 13.1722 8.76154 12.867 9.04738 12.4703C9.33322 12.0735 9.49763 11.6022 9.5206 11.1138ZM1 1.01862H10.879L13.9766 4.11614V13.9951C13.9758 14.2539 13.8727 14.5019 13.6897 14.6849C13.5067 14.8679 13.2587 14.971 12.9999 14.9717H1C0.740999 14.9717 0.492607 14.8688 0.309466 14.6857C0.126325 14.5026 0.0234375 14.2542 0.0234375 13.9952V1.99518C0.0234375 1.73618 0.126325 1.48779 0.309466 1.30464C0.492607 1.1215 0.740999 1.01862 1 1.01862Z"
      fill="#0EBCBD"
      stroke="#0EBCBD"
      strokeWidth="0.046875"
    />
  ),
});

interface CreatorProfileNavProps {
  activeForm: number;
  handleNav: (direction: number) => void;
  saveAndExit?: () => boolean;
  setModalState?: (a: boolean) => void;
  userId: number;
}

const CreatorProfileNav = ({
  activeForm,
  handleNav,
  saveAndExit,
  setModalState,
  userId
}: CreatorProfileNavProps): React.ReactElement => {
  const { creatorProfile } = useContext(CreatorProfileContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const newToast = useToasts();

  const handleSaveAndExit = async (finalSubmit: boolean) => {
    setIsLoading(true);
    if (!saveAndExit || saveAndExit()) {
      const formattedProfile = {
        ...creatorProfile,
        bookCovers: creatorProfile?.bookCovers?.map((cover) => cover.url),
      };
      try {
        const creatorObj = await CreatorAPIClient.getCreatorByUserId(
          String(userId),
        );
        try {
          await CreatorAPIClient.updateCreator(
            Number(creatorObj.id),
            formattedProfile as Creator,
          );
          if (finalSubmit && setModalState) {
            setModalState(true);
          } else {
            newToast(
              "success",
              "Creator Profile successfully saved",
              "Revisit this page to continue editing your profile.",
            );
          }
          setIsLoading(false);
        } catch (error) {
          newToast(
            "error",
            "Error saving creator profile",
            "Something went wrong, please refresh the page and try again.",
          );
          setIsLoading(false);
        }
      } catch (error) {
        try {
          const creator = await CreatorAPIClient.createCreator(
            Number(userId),
          );
          await CreatorAPIClient.updateCreator(
            Number(creator.id),
            formattedProfile as Creator,
          );
          if (finalSubmit && setModalState) {
            setModalState(true);
          } else {
            newToast(
              "success",
              "Creator Profile successfully saved",
              "Revisit this page to continue editing your profile.",
            );
          }
          setIsLoading(false);
        } catch (err) {
          newToast(
            "error",
            "Error saving creator profile",
            "Something went wrong, please refresh the page and try again.",
          );
          setIsLoading(false);
        }
      }
    } else {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (activeForm !== 5) {
      handleNav(1);
    } else {
      handleSaveAndExit(true);
    }
  };

  return (
    <Flex justify="space-between" my="20" px="16">
      <Button
        leftIcon={<ArrowBackIcon />}
        colorScheme="teal"
        disabled={activeForm === 0}
        onClick={() => handleNav(-1)}
      >
        Previous
      </Button>
      <Flex>
        <Button
          colorScheme="teal"
          variant="outline"
          leftIcon={<SaveIcon />}
          onClick={() => handleSaveAndExit(false)}
          isLoading={isLoading}
        >
          Save and exit
        </Button>
        <Spacer w="3" />
        <Button
          leftIcon={activeForm === 5 ? <CheckIcon /> : <ArrowForwardIcon />}
          colorScheme="teal"
          onClick={handleNext}
          isLoading={activeForm === 5 && isLoading}
        >
          {activeForm === 5 ? "Submit" : "Next"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default CreatorProfileNav;
