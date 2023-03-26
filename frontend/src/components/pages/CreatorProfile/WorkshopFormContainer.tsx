import {
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Icon,
  Input,
  Radio,
  RadioGroup,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { StringOrNumber } from "@chakra-ui/utils/dist/declarations/src/types";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import React, { useContext, useEffect, useState } from "react";
import { displayPartsToString } from "typescript";

import CreatorProfileContext from "../../../contexts/CreatorProfileContext";
import { Option } from "../../../types/BookTypes";
import { PresentationAttributes } from "../../../types/CreatorProfileTypes";
import AddMultiSelect from "../CreateReview/AddMultiSelect";
import CreatorInputField from "./CreatorInputField";

interface WorkshopFormContainerProps {
  title: string;
  index: number /* Index in creatorForm presentations array */;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  icon: ReactJSXElement;
  submitted: boolean;
  detailsDisplayedWhenCollapsed?: [PresentationAttributes, string][];
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
  field:
    | "equipmentRequired"
    | "inPersonDeliveryFee"
    | "virtualDeliveryFee"
    | "otherReadingLanguages"
    | "preferredAudienceSize";
}

interface RadioGroupHandler {
  newValue: string;
  field: "booksPurchasedAndAutoGraphed";
}

const WorkshopFormContainer = ({
  isOpen,
  title,
  index,
  setIsOpen,
  icon,
  submitted,
  detailsDisplayedWhenCollapsed = [
    ["offeredLocations", "Offered locations"],
    ["preferredGradeLevel", "Preferred grade level"],
    ["preferredAudienceSize", "Preferred audience size"],
  ],
}: WorkshopFormContainerProps): ReactJSXElement => {
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

    if (creatorProfileObj.presentations) {
      // eslint-disable-next-line
      creatorProfileObj.presentations[index][field] = newValue;
    }
    setCreatorProfile(creatorProfileObj);
  };

  const presentation =
    creatorProfile?.presentations && creatorProfile?.presentations[index];
  const detailsToDisplay = detailsDisplayedWhenCollapsed.filter(
    ([field]) => presentation && presentation[field].length > 0,
  );
  const generateCollapsedDetails = () => {
    detailsToDisplay.map(([field, displayName]) => {
      return (
        <Flex key={`${field}-${title}`} direction="row">
          <Text>{displayName}</Text>
          <Text>placeholder</Text>
        </Flex>
      );
    });
  };

  const [offeredLocationsOptions, setOfferedLocationsOptions] = useState<
    Option[]
  >([]);
  const [preferredGradeLevelOptions, setPreferredGradeLevelOptions] = useState<
    Option[]
  >([]);
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
    <Flex direction="column">
      <Flex alignItems="center">
        <Grid
          w="50px"
          h="50px"
          marginRight="16px"
          borderRadius="50%"
          bg="gray.300"
          placeItems="center"
        >
          {icon}
        </Grid>
        <Text as="b" fontSize="xl" marginRight="32px">
          {title}
        </Text>
        <Button
          color="blue.400"
          onClick={() => setIsOpen((open: boolean) => !open)}
        >
          {isOpen ? "Save details" : "Add details"}
        </Button>
      </Flex>
      <Container p="12px 0px 24px 42px">
        {isOpen ? (
          /** Details Expanded */
          <Container>
            <AddMultiSelect
              id="offeredLocations"
              label="Offered locations"
              placeholder="Select or add your own option"
              optionsSelected={presentation?.offeredLocations || []}
              setOptionsSelected={(newOptionsSelected: Option[]) => {
                handleFormInputChange({
                  newValue: newOptionsSelected,
                  field: "offeredLocations",
                });
              }}
              required
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
              optionsSelected={presentation?.preferredGradeLevel || []}
              setOptionsSelected={(newOptionsSelected: Option[]) => {
                handleFormInputChange({
                  newValue: newOptionsSelected,
                  field: "preferredGradeLevel",
                });
              }}
              required
              options={preferredGradeLevelOptions}
              setOptions={setPreferredGradeLevelOptions}
              allowAddOption
              allowMultiSelectOption
              maxWidth="80%"
            />
            <FormLabel>Preferred audience size</FormLabel>
            <Select
              name="Preferred audience size"
              value={presentation?.preferredAudienceSize}
              onChange={(e) => {
                handleFormInputChange({
                  newValue: e.target.value,
                  field: "preferredAudienceSize",
                });
              }}
              width="33%"
            >
              {["0-5", "6-10", "11-15", "16-20", "21-25"].map((item, i) => {
                return <option key={i}>{item}</option>;
              })}
            </Select>
            <FormControl isRequired>
              <FormLabel mb="1" mt="3">
                How do you deliver readings?
              </FormLabel>
              <Flex>
                <Button> In-person </Button>
                <Input
                  name="In-person delivery fee"
                  placeholder="Enter fee for in-person"
                  value={presentation?.inPersonDeliveryFee}
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
                  value={presentation?.virtualDeliveryFee}
                  onChange={(e) => {
                    handleFormInputChange({
                      newValue: e.target.value,
                      field: "virtualDeliveryFee",
                    });
                  }}
                />
              </Flex>
            </FormControl>
            <FormLabel>
              Please describe any AV materials or special equipment required
            </FormLabel>
            <Input
              value={presentation?.equipmentRequired}
              onChange={(e) => {
                handleFormInputChange({
                  newValue: e.target.value,
                  field: "equipmentRequired",
                });
              }}
              width="33%"
            />

            <FormControl>
              <FormLabel mb="1" mt="3">
                Please list the languages your readings are avaliable in:
              </FormLabel>
              <Flex direction="column">
                <CheckboxGroup
                  value={presentation?.languages || []}
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
                value={presentation?.booksPurchasedAndAutoGraphed}
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
          </Container>
        ) : (
          /** Details Collapsed */
          <Flex>
            {console.log(detailsToDisplay)}
            {detailsToDisplay.length > 0 ? (
              generateCollapsedDetails()
            ) : (
              <Text color="gray.300">
                No information to display yet! Add details to populate this
                section.
              </Text>
            )}
          </Flex>
        )}
      </Container>
    </Flex>
  );
};

export default WorkshopFormContainer;
