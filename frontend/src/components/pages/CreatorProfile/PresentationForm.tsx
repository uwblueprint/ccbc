import {
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { StringOrNumber } from "@chakra-ui/utils/dist/declarations/src/types";
import React, { useContext, useEffect, useState } from "react";

import CreatorProfileContext from "../../../contexts/CreatorProfileContext";
import { Option } from "../../../types/BookTypes";
import AddMultiSelect from "../CreateReview/AddMultiSelect";
import CreatorInputField from "./CreatorInputField";

interface PresentationFormProps {
  submitted: boolean;
}

interface MultiSelectHandler {
  newValue: Option[];
  field: "offeredLocations" 
  | "preferredGradeLevel";
}

interface CheckboxGroupHandler {
  newValue: StringOrNumber[],
  field: string,
}

interface InputHandler {
  newValue: string;
  field: "inPersonDeliveryFee" | "virtualDeliveryFee" | "otherReadingLanguages";
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
    keyValue: MultiSelectHandler | InputHandler | CheckboxGroupHandler | RadioGroupHandler,
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
          For in-person visits, do you bring copies of your books for students
          to purchase and have autographed?
        </FormLabel>
        <RadioGroup
          onChange={(newValueSelected) => {
            handleFormInputChange({
              newValue: newValueSelected,
              field: "booksPurchasedAndAutoGraphed"})}}
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
    </Flex>
  );
};

export default PresentationForm;
