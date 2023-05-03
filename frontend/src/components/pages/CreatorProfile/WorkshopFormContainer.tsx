import {
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Image,
  Input,
  Radio,
  RadioGroup,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { StringOrNumber } from "@chakra-ui/utils";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import checkMarkActive from "../../../assets/checkmark-active.svg";
import checkMarkInactive from "../../../assets/checkmark-inactive.svg";
import CreatorProfileContext from "../../../contexts/CreatorProfileContext";
import { Option } from "../../../types/BookTypes";
import { PresentationAttributes } from "../../../types/CreatorProfileTypes";
import { Presentation } from "../../../types/CreatorTypes";
import AddMultiSelect from "../CreateReview/AddMultiSelect";
import RichTextEditorField from "./RichTextEditorField";
import AddProfilePictureField from "./AddProfilePictureField";
import AddProfilePictureMode from "../../../types/Types";


interface WorkshopFormContainerProps {
  title: string;
  index: number /* Index in creatorForm presentations array */;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  icon: ReactJSXElement;
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
    | "preferredAudienceSize"
    | "details";
}

interface RadioGroupHandler {
  newValue: string;
  field: "booksPurchasedAndAutoGraphed";
}

const DeliverReadingButton = ({
  isActive,
  buttonText,
  setActiveState,
}: {
  isActive: boolean;
  buttonText: string;
  setActiveState: Dispatch<SetStateAction<boolean>>;
}): ReactJSXElement => {
  return (
    <Button
      color={isActive ? "gray.500" : "gray.400"}
      minW="131px"
      minH="45px"
      px="12px"
      py="7px"
      border="1px"
      borderColor={isActive ? "blue.400" : "gray.300"}
      borderRadius="4px"
      display="flex"
      alignItems="center"
      bg={isActive ? "blue.50" : "gray.50"}
      fontSize="16px"
      gap="8px"
      justifyContent="start"
      onClick={() => setActiveState(!isActive)}
    >
      <Image src={isActive ? checkMarkActive : checkMarkInactive} />
      {buttonText}
    </Button>
  );
};

const WorkshopFormContainer = ({
  isOpen,
  title,
  index,
  setIsOpen,
  icon,
  detailsDisplayedWhenCollapsed = [
    ["offeredLocations", "Offered locations"],
    ["preferredGradeLevel", "Preferred grade level"],
    ["preferredAudienceSize", "Preferred audience size"],
  ],
}: WorkshopFormContainerProps): ReactJSXElement => {
  const { creatorProfile, setCreatorProfile } = useContext(
    CreatorProfileContext,
  );
  const [isInPerson, setIsInPerson] = useState(false);
  const [isVirtual, setIsVirtual] = useState(false);
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
      if (creatorProfileObj.presentations[index] === undefined) {
        const newPresentation = {
          title,
          details: "",
          photos: [],
          contentOfReadings: "",
          offeredLocations: [],
          preferredGradeLevel: [],
          languages: [],
          equipmentRequired: "",
          inPersonDeliveryFee: "",
          virtualDeliveryFee: "",
          otherReadingLanguages: "",
          booksPurchasedAndAutoGraphed: "",
          preferredAudienceSize: "",
        };
        creatorProfileObj.presentations.push(newPresentation as Presentation);
      }

      if (field === "offeredLocations" || field === "preferredGradeLevel") {
        creatorProfileObj.presentations[index][field] = newValue;
      } else if (field === "languages") {
        creatorProfileObj.presentations[index][field] = newValue as string[];
      } else {
        creatorProfileObj.presentations[index][field] = newValue as string;
      }
    }
    setCreatorProfile(creatorProfileObj);
  };

  const presentation =
    creatorProfile?.presentations && creatorProfile?.presentations[index];
  const detailsToDisplay = detailsDisplayedWhenCollapsed.filter(
    ([field]) => presentation && presentation[field].length > 0,
  );
  const generateCollapsedDetails = () =>
    detailsToDisplay.map(([field, displayName]) => {
      return (
        <Flex
          key={`${field}-${title}`}
          direction="row"
          justifyContent="space-between"
          w="50%"
        >
          <Text>{displayName}:</Text>
          <Text>
            {presentation && (
              <>
                {Array.isArray(presentation[field])
                  ? (presentation[field] as Option[])
                      .map((option: Option) => option.label)
                      .join(", ")
                  : presentation[field]}
              </>
            )}
          </Text>
        </Flex>
      );
    });

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
            <FormLabel mt="12px">Preferred audience size</FormLabel>
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
            <FormControl isRequired mb="12px">
              <FormLabel mb="1" mt="3">
                How do you deliver readings?
              </FormLabel>
              <Flex gap="10px" mb="10px">
                <DeliverReadingButton
                  isActive={isInPerson}
                  buttonText="In-person"
                  setActiveState={setIsInPerson}
                />
                <Input
                  isDisabled={!isInPerson}
                  minH="45px"
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
              <Flex gap="10px">
                <DeliverReadingButton
                  isActive={isVirtual}
                  buttonText="Virtual"
                  setActiveState={setIsVirtual}
                />
                <Input
                  isDisabled={!isVirtual}
                  minH="45px"
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
              <Textarea
                value={presentation?.details}
                onChange={(e) => {
                  handleFormInputChange({
                    newValue: e.target.value,
                    field: "details",
                  });
                }}
              />
              <AddProfilePictureField
                name="contentReadings"
                value={presentation?.photos}
                field="profilePictureLink"
                setInputField={() => {}}
                mode={AddProfilePictureMode.WorkshopForm}
                required={false}
              />
            </FormControl>
          </Container>
        ) : (
          /** Details Collapsed */
          <Container>
            {detailsToDisplay.length > 0 ? (
              generateCollapsedDetails()
            ) : (
              <Text color="gray.300">
                No information to display yet! Add details to populate this
                section.
              </Text>
            )}
          </Container>
        )}
      </Container>
    </Flex>
  );
};

export default WorkshopFormContainer;
