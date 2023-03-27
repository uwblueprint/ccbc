import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  HStack,
  Stack,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { TagType } from "../../../constants/Enums";
import { Option } from "../../../types/BookTypes";
import AddMultiSelect from "../CreateReview/AddMultiSelect";

interface FilterBoxProps {
  genreOptions: Option[]; // dropdown of genres to choose from
  setGenreFilter: (genreFilter: Option[]) => void;
  setAgeFilter: (ageFilter: Option[]) => void;
  setProvinceFilter: (provinceFilter: Option[]) => void;
  setCraftFilter: (craftFilter: Option[]) => void;
  searchStyle?: boolean;
}

const CreatorFilterBox = ({
  genreOptions,
  setGenreFilter,
  setAgeFilter,
  setProvinceFilter,
  setCraftFilter,
  searchStyle,
}: FilterBoxProps): React.ReactElement => {
  const [genres, setGenres] = useState<Option[]>([]); // save the genres choosen
  const [age, setAge] = useState<Option[]>([]); // save the ages choosen
  const [craft, setCraft] = useState<Option[]>([]); // save the craft choosen
  const [province, setProvince] = useState<Option[]>([]); // save the ages choosen

  const clickApply = async () => {
    setGenreFilter(genres);
    setAgeFilter(age);
    setProvinceFilter(province);
    setCraftFilter(craft);
  };

  const clear = async () => {
    setGenres([]);
    setAge([]);
    setCraft([]);
    setProvince([]);
    setGenreFilter([]);
    setAgeFilter([]);
    setProvinceFilter([]);
    setCraftFilter([]);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clearTag = async (type: TagType, val: any) => {
    if (type === TagType.Genre) {
      setGenres(genres.filter((g) => g.label !== val));
    } else if (type === TagType.Province) {
      setProvince(province.filter((p) => p.label !== val));
    } else if (type === TagType.Craft) {
      setCraft(craft.filter((c) => c.label !== val));
    } else {
      setAge(age.filter((a) => a.label !== val));
    }
  };

  return (
    <>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="center"
        align="center"
        mt="2"
        mb="6"
      >
        <Stack
          direction={{ base: "column", md: "row" }}
          align="center"
          w="100%"
          h="100%"
          spacing={3}
          padding={0}
        >
          <AddMultiSelect
            id="Craft"
            label=""
            maxWidth="200px"
            placeholder="Craft"
            options={["Author", "Illustrator", "Storyteller"].map((c) => {
              return { label: c, value: c };
            })}
            setOptions={null}
            optionsSelected={craft}
            setOptionsSelected={setCraft}
            allowMultiSelectOption
            allowAddOption={false}
            searchStyle={searchStyle}
          />
          <AddMultiSelect
            id="ProvinceAndTerritory"
            label=""
            maxWidth="250px"
            placeholder="Province & Territories"
            options={[
              { name: "Alberta", abbreviation: "AB" },
              { name: "British Columbia", abbreviation: "BC" },
              { name: "Manitoba", abbreviation: "MB" },
              { name: "New Brunswick", abbreviation: "NB" },
              { name: "Newfoundland and Labrador", abbreviation: "NL" },
              { name: "Northwest Territories", abbreviation: "NT" },
              { name: "Nova Scotia", abbreviation: "NS" },
              { name: "Nunavut", abbreviation: "NU" },
              { name: "Ontario", abbreviation: "ON" },
              { name: "Prince Edward Island", abbreviation: "PE" },
              { name: "Quebec", abbreviation: "QC" },
              { name: "Saskatchewan", abbreviation: "SK" },
              { name: "Yukon Territory", abbreviation: "YT" },
            ].map((region) => {
              return { label: region.abbreviation, value: region.abbreviation };
            })}
            setOptions={null}
            optionsSelected={province}
            setOptionsSelected={setProvince}
            allowMultiSelectOption
            allowAddOption={false}
            searchStyle={searchStyle}
          />
          <AddMultiSelect
            id="GradeLevel"
            label=""
            maxWidth="200px"
            placeholder="Grade Level"
            options={[
              "Kindergarten",
              "Primary",
              "Middle School",
              "High School",
            ].map((level) => {
              return { label: level, value: level };
            })}
            setOptions={null}
            optionsSelected={age}
            setOptionsSelected={setAge}
            allowMultiSelectOption
            allowAddOption={false}
            searchStyle={searchStyle}
          />
          <AddMultiSelect
            id="genre"
            label=""
            maxWidth="200px"
            placeholder="Genres"
            options={genreOptions}
            setOptions={null}
            optionsSelected={genres}
            setOptionsSelected={setGenres}
            allowMultiSelectOption
            allowAddOption={false}
            searchStyle={searchStyle}
          />
        </Stack>

        <Stack
          direction="row"
          align="center"
          justify={{ base: "center", md: "end" }}
          width="100%"
          h="120%"
          spacing={4}
          padding={0}
          mt={{ base: "10px", md: "0px" }}
        >
          <Button
            fontWeight="normal"
            textDecoration="underline"
            color="blue.500"
            variant="link"
            onClick={clickApply}
          >
            Apply
          </Button>
          <Button
            fontWeight="normal"
            textDecoration="underline"
            color="blue.500"
            variant="link"
            onClick={clear}
          >
            Clear All
          </Button>
        </Stack>
      </Flex>
      {age.length || genres.length || province.length || craft.length ? (
        <HStack spacing={4} mb="3">
          <Text>Applied filters: </Text>
          {age.map((a) => {
            return (
              <Tag
                key={a.value}
                borderColor="blue.500"
                backgroundColor="blue.50"
                borderWidth={1}
                paddingY={1}
              >
                <TagLabel>{a.label}</TagLabel>
                <TagRightIcon
                  as={SmallCloseIcon}
                  color="gray.900"
                  onClick={() => clearTag(TagType.Age, a.label)}
                />
              </Tag>
            );
          })}
          {province.map((a) => {
            return (
              <Tag
                key={a.value}
                borderColor="blue.500"
                backgroundColor="blue.50"
                borderWidth={1}
                paddingY={1}
              >
                <TagLabel>{a.label}</TagLabel>
                <TagRightIcon
                  as={SmallCloseIcon}
                  color="gray.900"
                  onClick={() => clearTag(TagType.Province, a.label)}
                />
              </Tag>
            );
          })}
          {craft.map((a) => {
            return (
              <Tag
                key={a.value}
                borderColor="blue.500"
                backgroundColor="blue.50"
                borderWidth={1}
                paddingY={1}
              >
                <TagLabel>{a.label}</TagLabel>
                <TagRightIcon
                  as={SmallCloseIcon}
                  color="gray.900"
                  onClick={() => clearTag(TagType.Craft, a.label)}
                />
              </Tag>
            );
          })}
          {genres.map((g) => {
            return (
              <Tag
                key={g.value}
                borderColor="blue.500"
                backgroundColor="blue.50"
                borderWidth={1}
                paddingY={1}
              >
                <TagLabel>{g.label}</TagLabel>
                <TagRightIcon
                  as={SmallCloseIcon}
                  color="gray.900"
                  onClick={() => clearTag(TagType.Genre, g.label)}
                />
              </Tag>
            );
          })}
        </HStack>
      ) : null}
    </>
  );
};

export default CreatorFilterBox;
