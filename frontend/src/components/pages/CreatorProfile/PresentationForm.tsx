import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  CheckboxGroupProps,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  Input,
  Radio,
  RadioGroup,
  Text,
  Textarea,
} from "@chakra-ui/react";
//
import { StringOrNumber } from "@chakra-ui/utils/dist/declarations/src/types";
import { Book } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";

import CreatorProfileContext from "../../../contexts/CreatorProfileContext";
import { Option } from "../../../types/BookTypes";
import AddMultiSelect from "../CreateReview/AddMultiSelect";
import CreatorInputField from "./CreatorInputField";
import WorkshopFormContainer from "./WorkshopFormContainer";

interface PresentationFormProps {
  submitted: boolean;
}

interface MultiSelectHandler {
  newValue: Option[];
  field: "offeredLocations" | "preferredGradeLevel";
}

interface CheckboxGroupHandler {
  newValue: StringOrNumber[];
  field: "languages";
}

interface InputHandler {
  newValue: string;
  field: "inPersonDeliveryFee" | "virtualDeliveryFee" | "otherReadingLanguages";
}

interface RadioGroupHandler {
  newValue: string;
  field: "booksPurchasedAndAutoGraphed";
}

const PresentationForm = ({
  submitted,
}: PresentationFormProps): React.ReactElement => {
  const { creatorProfile, setCreatorProfile } = useContext(
    CreatorProfileContext,
  );
  /**
   * @param newOptionsSelected handle updating context
   * @param field string of key in context value
   */
  const handleFormInputChange = (
    keyValue:
      | MultiSelectHandler
      | InputHandler
      | CheckboxGroupHandler
      | RadioGroupHandler,
  ) => {
    const { newValue, field } = keyValue;
    const creatorProfileObj = { ...creatorProfile };
    creatorProfileObj[field] = newValue;
    setCreatorProfile(creatorProfileObj);
  };

  const [offeredLocationsOptions, setOfferedLocationsOptions] = useState<
    Option[]
  >([]);
  const [preferredGradeLevelOptions, setPreferredGradeLevelOptions] = useState<
    Option[]
  >([]);

  const [isReadingSectionOpen, setIsReadingSectionOpen] = useState(false);
  const [isWorkshopSectionOpen, setIsWorkshopSectionOpen] = useState(false);

  // Set inital multiselection options
  useEffect(() => {
    // TODO: Replace with DB calls
    setOfferedLocationsOptions([
      { label: "Schools", value: "Schools" },
      { label: "Libraries", value: "Libraries" },
    ]);

    // TODO: Replace with DB calls
    setPreferredGradeLevelOptions([
      { label: "Primary School", value: "Primary School" },
      { label: "Middle Grade", value: "Primary Grade" },
      { label: "High School", value: "High School" },
    ]);
  }, []);

  return (
    <Flex flex="1" direction="column" justify="start">
      <Text textStyle="heading" textAlign="left" fontWeight="bold">
        Presentation
      </Text>
      <Text textAlign="left" mb="5">
        Provide details about readings/workshops that you may offer or add
        another presentation.
      </Text>
      {/* Readings Section */}
      <WorkshopFormContainer
        title="Readings"
        isOpen={isReadingSectionOpen}
        setIsOpen={setIsReadingSectionOpen}
        icon={
          <Icon w="24px" h="24px" viewBox="0 0 18 18" fill="none" radius="50%">
            <path
              d="M9 5.62476C9.5625 3.40429 11.687 2.2705 16.3125 2.24976C16.3864 2.24948 16.4597 2.26384 16.5281 2.29201C16.5965 2.32018 16.6586 2.3616 16.7109 2.41389C16.7632 2.46618 16.8046 2.5283 16.8327 2.59667C16.8609 2.66504 16.8753 2.73831 16.875 2.81226V12.9373C16.875 13.0864 16.8157 13.2295 16.7102 13.335C16.6048 13.4405 16.4617 13.4998 16.3125 13.4998C11.8125 13.4998 10.074 14.4071 9 15.7498C7.93231 14.4138 6.1875 13.4998 1.6875 13.4998C1.34016 13.4998 1.125 13.2168 1.125 12.8694V2.81226C1.12473 2.73831 1.13908 2.66504 1.16725 2.59667C1.19542 2.5283 1.23685 2.46618 1.28913 2.41389C1.34142 2.3616 1.40354 2.32018 1.47191 2.29201C1.54029 2.26384 1.61356 2.24948 1.6875 2.24976C6.31301 2.2705 8.4375 3.40429 9 5.62476Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 5.62427V15.7493"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Icon>
        }
      >
        <>
          <AddMultiSelect
            id="offeredLocations"
            label="Offered locations"
            placeholder="Select or add your own option"
            optionsSelected={creatorProfile?.offeredLocations || []}
            setOptionsSelected={(newOptionsSelected: Option[]) => {
              handleFormInputChange({
                newValue: newOptionsSelected,
                field: "offeredLocations",
              });
            }}
            options={offeredLocationsOptions}
            setOptions={setOfferedLocationsOptions}
            allowAddOption
            allowMultiSelectOption
            maxWidth="80%"
          />
          <AddMultiSelect
            id="preferredGradeLevel"
            label="Preferred grade level"
            placeholder="Select or add your own option"
            optionsSelected={creatorProfile?.preferredGradeLevel || []}
            setOptionsSelected={(newOptionsSelected: Option[]) => {
              handleFormInputChange({
                newValue: newOptionsSelected,
                field: "preferredGradeLevel",
              });
            }}
            options={preferredGradeLevelOptions}
            setOptions={setPreferredGradeLevelOptions}
            allowAddOption
            allowMultiSelectOption
            maxWidth="80%"
          />
          <CreatorInputField
            name="Preferred audience size"
            value={creatorProfile?.preferredAudienceSize}
            field="preferredAudienceSize"
            error={submitted}
            selectOptions={["0-5", "6-10", "11-15", "16-20", "21-25"]}
            width="33%"
          />
          <FormControl isRequired isInvalid={submitted}>
            <FormLabel mb="1" mt="3">
              How do you deliver readings?
            </FormLabel>
            <Flex>
              <Button> In-person </Button>
              <Input
                name="In-person delivery fee"
                placeholder="Enter fee for in-person"
                value={creatorProfile?.inPersonDeliveryFee}
                onChange={(e) => {
                  handleFormInputChange({
                    newValue: e.target.value,
                    field: "inPersonDeliveryFee",
                  });
                }}
              />
            </Flex>
            <Flex>
              <Button> Virtual </Button>
              <Input
                name="Virtual delivery fee"
                placeholder="Enter fee for virtual"
                value={creatorProfile?.virtualDeliveryFee}
                onChange={(e) => {
                  handleFormInputChange({
                    newValue: e.target.value,
                    field: "virtualDeliveryFee",
                  });
                }}
              />
            </Flex>
          </FormControl>
          <CreatorInputField
            name="Please describe any AV materials or special equipment required."
            value={creatorProfile?.equipmentRequired}
            field="equipmentRequired"
            error={submitted}
            width="33%"
          />
          <FormControl>
            <FormLabel mb="1" mt="3">
              Please list the languages your readings are avaliable in:
            </FormLabel>
            <Flex direction="column">
              <CheckboxGroup
                value={creatorProfile?.languages || []}
                onChange={(newValueSelected) => {
                  handleFormInputChange({
                    newValue: newValueSelected,
                    field: "languages",
                  });
                }}
              >
                <Checkbox value="english"> English </Checkbox>
                <Checkbox value="french"> French </Checkbox>
                <Checkbox value="other"> Other </Checkbox>
              </CheckboxGroup>
            </Flex>
            <Flex alignContent="center">
              <FormLabel w="270px">If Other, please specify:</FormLabel>
              <Input
                placeholder="Specify other languages"
                onChange={(e) => {
                  handleFormInputChange({
                    newValue: e.target.value,
                    field: "otherReadingLanguages",
                  });
                }}
              />
            </Flex>
            <FormLabel />
          </FormControl>
          <FormControl>
            <FormLabel>
              {" "}
              For in-person visits, do you bring copies of your books for
              students to purchase and have autographed?
            </FormLabel>
            <RadioGroup
              onChange={(newValueSelected) => {
                handleFormInputChange({
                  newValue: newValueSelected,
                  field: "booksPurchasedAndAutoGraphed",
                });
              }}
              value={creatorProfile?.booksPurchasedAndAutoGraphed}
            >
              <Flex direction="column">
                <Radio value="yes"> Yes </Radio>
                <Radio value="no"> No </Radio>
              </Flex>
            </RadioGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel> Describe the contents of your readings(s)</FormLabel>
            <Textarea />
          </FormControl>
        </>
      </WorkshopFormContainer>
      <Divider size="4px" />
      {/* Workshops section */}
      <WorkshopFormContainer
        title="Workshops"
        isOpen={isWorkshopSectionOpen}
        setIsOpen={setIsWorkshopSectionOpen}
        icon={
          <Icon w="24px" h="24px" viewBox="0 0 18 18" fill="none" radius="50%">
            <path
              d="M15.9036 2.09683C15.6367 1.82989 15.2746 1.67993 14.8971 1.67993C14.5196 1.67993 14.1575 1.82989 13.8906 2.09683L6.46875 10.3624C7.28016 10.5276 8.09016 11.3218 8.20055 12.0942L15.9036 4.10988C16.1706 3.84293 16.3205 3.48087 16.3205 3.10335C16.3205 2.72584 16.1706 2.36378 15.9036 2.09683V2.09683Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.85156 11.8132C3.80109 11.8132 2.95312 12.6746 2.95312 13.7419C2.95312 14.5839 2.21906 15.0276 1.6875 15.0276C2.26969 15.8119 3.2632 16.3132 4.21875 16.3132C5.61726 16.3132 6.75 15.1626 6.75 13.7419C6.75 12.6746 5.90203 11.8132 4.85156 11.8132Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Icon>
        }
      >
        <>
          <AddMultiSelect
            id="offeredLocations"
            label="Offered locations"
            placeholder="Select or add your own option"
            optionsSelected={creatorProfile?.offeredLocations || []}
            setOptionsSelected={(newOptionsSelected: Option[]) => {
              handleFormInputChange({
                newValue: newOptionsSelected,
                field: "offeredLocations",
              });
            }}
            options={offeredLocationsOptions}
            setOptions={setOfferedLocationsOptions}
            allowAddOption
            allowMultiSelectOption
            maxWidth="80%"
          />
          <AddMultiSelect
            id="preferredGradeLevel"
            label="Preferred grade level"
            placeholder="Select or add your own option"
            optionsSelected={creatorProfile?.preferredGradeLevel || []}
            setOptionsSelected={(newOptionsSelected: Option[]) => {
              handleFormInputChange({
                newValue: newOptionsSelected,
                field: "preferredGradeLevel",
              });
            }}
            options={preferredGradeLevelOptions}
            setOptions={setPreferredGradeLevelOptions}
            allowAddOption
            allowMultiSelectOption
            maxWidth="80%"
          />
          <CreatorInputField
            name="Preferred audience size"
            value={creatorProfile?.preferredAudienceSize}
            field="preferredAudienceSize"
            error={submitted}
            selectOptions={["0-5", "6-10", "11-15", "16-20", "21-25"]}
            width="33%"
          />
          <FormControl isRequired isInvalid={submitted}>
            <FormLabel mb="1" mt="3">
              How do you deliver readings?
            </FormLabel>
            <Flex>
              <Button> In-person </Button>
              <Input
                name="In-person delivery fee"
                placeholder="Enter fee for in-person"
                value={creatorProfile?.inPersonDeliveryFee}
                onChange={(e) => {
                  handleFormInputChange({
                    newValue: e.target.value,
                    field: "inPersonDeliveryFee",
                  });
                }}
              />
            </Flex>
            <Flex>
              <Button> Virtual </Button>
              <Input
                name="Virtual delivery fee"
                placeholder="Enter fee for virtual"
                value={creatorProfile?.virtualDeliveryFee}
                onChange={(e) => {
                  handleFormInputChange({
                    newValue: e.target.value,
                    field: "virtualDeliveryFee",
                  });
                }}
              />
            </Flex>
          </FormControl>
          <CreatorInputField
            name="Please describe any AV materials or special equipment required."
            value={creatorProfile?.equipmentRequired}
            field="equipmentRequired"
            error={submitted}
            width="33%"
          />
          <FormControl>
            <FormLabel mb="1" mt="3">
              Please list the languages your readings are avaliable in:
            </FormLabel>
            <Flex direction="column">
              <CheckboxGroup
                value={creatorProfile?.languages || []}
                onChange={(newValueSelected) => {
                  handleFormInputChange({
                    newValue: newValueSelected,
                    field: "languages",
                  });
                }}
              >
                <Checkbox value="english"> English </Checkbox>
                <Checkbox value="french"> French </Checkbox>
                <Checkbox value="other"> Other </Checkbox>
              </CheckboxGroup>
            </Flex>
            <Flex alignContent="center">
              <FormLabel w="270px">If Other, please specify:</FormLabel>
              <Input
                placeholder="Specify other languages"
                onChange={(e) => {
                  handleFormInputChange({
                    newValue: e.target.value,
                    field: "otherReadingLanguages",
                  });
                }}
              />
            </Flex>
            <FormLabel />
          </FormControl>
          <FormControl>
            <FormLabel>
              {" "}
              For in-person visits, do you bring copies of your books for
              students to purchase and have autographed?
            </FormLabel>
            <RadioGroup
              onChange={(newValueSelected) => {
                handleFormInputChange({
                  newValue: newValueSelected,
                  field: "booksPurchasedAndAutoGraphed",
                });
              }}
              value={creatorProfile?.booksPurchasedAndAutoGraphed}
            >
              <Flex direction="column">
                <Radio value="yes"> Yes </Radio>
                <Radio value="no"> No </Radio>
              </Flex>
            </RadioGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel> Describe the contents of your readings(s)</FormLabel>
            <Textarea />
          </FormControl>
        </>
      </WorkshopFormContainer>
      <Divider />
      <Button color="blue.400" w="30%" justifyContent="start" p="0">
        <Flex justifyContent="space-between">
          <AddIcon />
          Other presentation
        </Flex>
      </Button>
    </Flex>
  );
};

export default PresentationForm;
