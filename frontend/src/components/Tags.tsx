import { Container, FormControl, FormLabel } from "@chakra-ui/react";
import React, { useState } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";

import tagAPIClient from "../APIClients/TagAPIClient";
import { TagResponse } from "../types/TagTypes";

const customStyles = {
  option: (provided) => ({
    ...provided,
    ":hover": {
      color: "gray.100",
    },
  }),
  multiValueRemove: (provided, data) => ({
    ...provided,
    ":hover": {
      backgroundColor: data.color,
      color: "white",
    },
  }),
};

const Tags = (): React.ReactElement => {
  const [tags, setTags] = useState<TagResponse[]>([]);

  const getTags = () =>
    new Promise<TagResponse[]>((resolve) => {
      setTimeout(() => {
        resolve(tagAPIClient.getTags());
      }, 100);
    });

  const handleChange = async (selectedTags: TagResponse[]) => {
    // Checking if tag was removed
    if (selectedTags.length < tags.length) {
      const removedElement = tags.filter((x) => selectedTags.indexOf(x) < 0)[0];

      // Delete the tag in DB and update tags state
      await tagAPIClient.deleteTagById(removedElement.value);
      setTags(selectedTags);
    } else {
      // else tag was added
      setTags(selectedTags);
    }
  };

  const handleCreate = (inputValue: string) => {
    setTimeout(() => {
      // temp - to add in create req
      const newTag = { value: "5", label: inputValue };
      setTags([...tags, newTag]);
    }, 100);
  };

  return (
    <Container mb={12}>
      <FormControl p={4}>
        <FormLabel>Tags</FormLabel>
        <AsyncCreatableSelect
          isMulti
          cacheOptions
          placeholder="Select some tags..."
          closeMenuOnSelect={false}
          loadOptions={getTags}
          defaultOptions
          options={tags}
          onChange={(e) => handleChange(e)}
          onCreateOption={handleCreate}
          styles={customStyles}
        />
      </FormControl>
    </Container>
  );
};

export default Tags;
