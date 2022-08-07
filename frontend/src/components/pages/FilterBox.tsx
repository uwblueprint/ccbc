import { Button, SimpleGrid, Stack } from "@chakra-ui/react";
import React, { useState } from "react";

import { Option } from "../../types/BookTypes";
import AddMultiSelect from "./CreateReview/AddMultiSelect";

interface FilterBoxProps {
  genreOptions: Option[]; // dropdown of genres to choose from
  ageOptions: Option[]; // dropdown of ages to choose from
  setGenreFilter: (genreFilter: Option[]) => void;
  setAgeFilter: (ageFilter: Option[]) => void;
}

const FilterBox = ({
  genreOptions,
  ageOptions,
  setGenreFilter,
  setAgeFilter,
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
  return (
    <SimpleGrid columns={[1, 4, 4]} spacingX="10px">
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
          maxWidth="140px"
          placeholder="Audience"
          options={ageOptions}
          setOptions={null}
          optionsSelected={age}
          setOptionsSelected={setAge}
          allowMultiSelectOption={false}
          allowAddOption={false}
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
        />
      </Stack>

      <Stack
        direction="row"
        align="center"
        width="100%"
        h="120%"
        spacing={1}
        padding={0}
      >
        <Button onClick={clickApply}>Apply</Button>
        <Button onClick={clear}>Clear</Button>
      </Stack>
    </SimpleGrid>
  );
};

export default FilterBox;

/*

      */
