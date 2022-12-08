import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
  SimpleGrid,
  Stack,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { TagType } from "../../constants/Enums";
import { Option } from "../../types/BookTypes";
import AddMultiSelect from "./CreateReview/AddMultiSelect";

interface FilterBoxProps {
  genreOptions: Option[]; // dropdown of genres to choose from
  ageOptions: Option[]; // dropdown of ages to choose from
  setGenreFilter: (genreFilter: Option[]) => void;
  setAgeFilter: (ageFilter: Option[]) => void;
  searchStyle?: boolean;
}

const FilterBox = ({
  genreOptions,
  ageOptions,
  setGenreFilter,
  setAgeFilter,
  searchStyle,
}: FilterBoxProps): React.ReactElement => {
  const [genres, setGenres] = useState<Option[]>([]); // save the genres choosen
  const [age, setAge] = useState<Option[]>([]); // save the ages choosen

  const clickApply = async () => {
    setGenreFilter(genres);
    setAgeFilter(age);
  };

  const clear = async () => {
    setGenres([]);
    setAge([]);
    setGenreFilter([]);
    setAgeFilter([]);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clearTag = async (type: TagType, val: any) => {
    if (type === TagType.Genre) {
      setGenres(genres.filter((g) => g.label !== val));
    } else {
      setAge(age.filter((a) => a.label !== val));
    }
  };

  return (
    <>
      <SimpleGrid
        columns={searchStyle ? [1, 2, 2] : [1, 4, 4]}
        spacingX="20px"
        mt="2"
        mb="6"
      >
        <Stack
          direction="row"
          align="center"
          w="100%"
          h="100%"
          spacing={3}
          padding={0}
        >
          <AddMultiSelect
            id="Audience"
            label=""
            maxWidth={searchStyle ? "284px" : "160px"}
            placeholder="Audience"
            options={ageOptions}
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
            maxWidth="284px"
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
          justify="end"
          width="100%"
          h="120%"
          spacing={4}
          padding={0}
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
      </SimpleGrid>
      {age.length || genres.length ? (
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

export default FilterBox;

/*

      */
