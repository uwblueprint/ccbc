/* eslint-disable react/jsx-props-no-spreading */

import { CloseIcon } from "@chakra-ui/icons";
import {
  Container,
  FormControl,
  FormLabel,
  IconButton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { components } from "react-select";
import AsyncCreatableSelect from "react-select/async-creatable";

import tagAPIClient from "../APIClients/TagAPIClient";
import { TagResponse } from "../types/TagTypes";

const { Option } = components;

const customStyles = {
  option: (provided: any) => ({
    ...provided,
    ":hover": {
      color: "gray.100",
    },
  }),
  multiValueRemove: (provided: any, data: any) => ({
    ...provided,
    ":hover": {
      backgroundColor: data.color,
      color: "white",
    },
  }),
};

const Tags = (): React.ReactElement => {
  const [tagOptions, setTagOptions] = useState<TagResponse[]>([]);

  // Filtering on search
  // const filterTags = (inputValue: string) => {
  //   return tagOptions.filter((i) =>
  //     i.label.toLowerCase().includes(inputValue.toLowerCase())
  //   );
  // };

  // On initial load
  const loadOptions = (inputValue: any, callback: any) => {
    tagAPIClient.getTags().then((newTags) => {
      setTagOptions(newTags);
      callback(newTags);
    });
  };

  // const handleChange = async (selectedTags: TagResponse[]) => {
  //   // Checking if tag was removed
  //   if (selectedTags.length < tags.length) {
  //     const removedElement = tags.filter((x) => selectedTags.indexOf(x) < 0)[0];

  //     // Delete the tag in DB and update tags state
  //     // await tagAPIClient.deleteTagById(removedElement.value);
  //     setTags(selectedTags);
  //   } else {
  //     // else tag was added
  //     setTags(selectedTags);
  //   }
  // };

  // const handleCreate = (inputValue: string) => {
  //   setTimeout(() => {
  //     // temp - to add in create req
  //     const newTag = { value: "5", label: inputValue };
  //     setTagOptions([...tagOptions, newTag]);
  //   }, 100);
  // };

  // Delete tag completely
  const handleDeleteClick = (e: any, option: TagResponse) => {
    e.stopPropagation();
    e.preventDefault();

    // To do: confirm deletion modal popup

    // Delete the tag in DB and update tags state
    // tagAPIClient.deleteTagById(option).then((response) => {
    //   console.log("response", response);
    // });

    // Remove tag from dropdown
    console.log("tags b4", tagOptions);
    const options = tagOptions.filter((x) => x !== option);
    const index = tagOptions.indexOf(option);
    setTagOptions(options);
    // tagOptions.splice(index, 1);
  };

  const CustomOption = (props: any) => {
    console.log("props", props);
    const { children, data } = props;
    
    return (
      <components.Option {...props}>
        {children}
        <IconButton
          aria-label="Delete Button"
          size="xs"
          icon={<CloseIcon />}
          onClick={(e) => handleDeleteClick(e, data)}
        />
      </components.Option>
    );
  };
  console.log("tagoptions", tagOptions);
  return (
    <Container mb={12}>
      <FormControl p={4}>
        <FormLabel>Tags</FormLabel>
        <AsyncCreatableSelect
          isMulti
          placeholder="Select some tags..."
          closeMenuOnSelect={false}
          loadOptions={loadOptions}
          defaultOptions
          // options={tagOptions}
          // onChange={(e: any) => handleChange(e)}
          // onCreateOption={handleCreate}
          styles={customStyles}
          components={{ Option: CustomOption }}
        />
      </FormControl>
    </Container>
  );
};

export default Tags;
