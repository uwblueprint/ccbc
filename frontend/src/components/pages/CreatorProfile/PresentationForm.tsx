import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Radio,
  RadioGroup,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";

import CreatorProfileContext from "../../../contexts/CreatorProfileContext";
import { Option } from "../../../types/BookTypes";
import AddMultiSelect from "../CreateReview/AddMultiSelect";
import InputField from "../CreateReview/InputField";
import CreatorInputField from "./CreatorInputField";

interface PresentationFornProps {
  submitted: boolean;
}

const PresentationForm = ({
  submitted,
}: PresentationFornProps): React.ReactElement => {
  const { creatorProfile } = useContext(CreatorProfileContext);
  const [inPersonFee] = useState("");
  const [virtualFee] = useState("");

  const [offeredLocations, setOfferedLocations] = useState<Option[]>([]);
  const [preferredGradeLevel, setPreferredGradeLevel] = useState<Option[]>([]);

  const [offeredLocationsOptions, setOfferedLocationsOptions] = useState<
    Option[]
  >([]);
  const [preferredGradeLevelOptions, setPreferredGradeLevelOptions] = useState<
    Option[]
  >([]);

  const [booksPurchasedAndAutographed, setBooksPurchasedAndAutographed] =
    useState("");

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
        optionsSelected={offeredLocations}
        setOptionsSelected={setOfferedLocations}
        options={offeredLocationsOptions}
        setOptions={setOfferedLocationsOptions}
        allowMultiSelectOption
        maxWidth="80%"
      />
      <AddMultiSelect
        id="preferredGradeLevel"
        label="Preferred grade level"
        optionsSelected={preferredGradeLevel}
        setOptionsSelected={setPreferredGradeLevel}
        options={preferredGradeLevelOptions}
        setOptions={setPreferredGradeLevelOptions}
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
      <FormControl isRequired isInvalid={submitted && inPersonFee === ""}>
        <FormLabel mb="1" mt="3">
          How do you deliver readings?
        </FormLabel>
        <Flex>
          <Button> In-person </Button>
          <Input />
        </Flex>
        <Flex>
          <Button> Virtual </Button>
          <Input />
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
          <Checkbox> English </Checkbox>
          <Checkbox> French </Checkbox>
          <Checkbox> Other </Checkbox>
        </Flex>

        <Flex alignContent="center">
          <FormLabel w="270px">If Other, please specify:</FormLabel>
          <Input placeholder="Specify other languages" />
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
          onChange={setBooksPurchasedAndAutographed}
          value={booksPurchasedAndAutographed}
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
