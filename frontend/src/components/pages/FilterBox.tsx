import { Button, Grid, GridItem, Stack } from "@chakra-ui/react";
import React, { useState } from "react";

import { Option } from "../../types/BookTypes";
import AddMultiSelect from "./CreateReview/AddMultiSelect";


interface FilterBoxProps {
  genreOptions: Option[]; // dropdown of genres to choose from
  ageOptions: Option[];   // dropdown of ages to choose from
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
    <Grid templateColumns="repeat(2, 1fr)" gap={4} borderColor="110A23">
      <GridItem>
        <Stack direction="row" width="100%" spacing={4}>
          <AddMultiSelect
            id="Audience"
            label=""
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
            placeholder="Genres"
            options={genreOptions} 
            setOptions={null} 
            optionsSelected={genres}
            setOptionsSelected={setGenres}
            allowMultiSelectOption
            allowAddOption={false}
          />
      <Button
        onClick={clickApply}>
        Apply
      </Button>
      <Button
        onClick={clear}>
        Clear
      </Button>
        </Stack>
      </GridItem>
    </Grid>
  );
};
export default FilterBox;
