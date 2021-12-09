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
import Creatable from "react-select/creatable";

import tagAPIClient from "../APIClients/TagAPIClient";
import { TagResponse } from "../types/TagTypes";

const customStyles = {
  option: (provided: any) => ({
    ...provided,
    "display": "flex",
    "padding-left": "5%",
    "justify-content": "space-between",
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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    tagAPIClient.getTags().then((newTags) => {
      setTagOptions(newTags);
      setIsLoading(false);
    });
  }, []);

  const handleCreate = (inputValue: string) => {
    setIsLoading(true);

    // TODO: Create and set tag
    // newTag = tagAPIClient.createTag(inputValue);
    // setTagOptions([...tagOptions, newTag]);

    setIsLoading(false);
  };

  // Delete tag completely
  const handleDeleteClick = (e: any, option: TagResponse) => {
    e.stopPropagation();
    e.preventDefault();
    setIsLoading(true);

    // To do: confirm deletion modal popup

    // Delete the tag in DB and update tags state
    tagAPIClient.deleteTagById(option.value).then((response) => {
      console.log("response", response);
    });

    // Remove tag from dropdown
    const options = tagOptions.filter((x) => x.value !== option.value);
    setTagOptions(options);
    setIsLoading(false);

  };

  const CustomOption = (props: any) => {
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
  return (
    <Container mb={12}>
      <FormControl p={4}>
        <FormLabel>Tags</FormLabel>
        <Creatable
          isMulti
          isLoading={isLoading}
          placeholder="Select some tags..."
          closeMenuOnSelect={false}
          options={tagOptions}
          onCreateOption={handleCreate}
          styles={customStyles}
          components={{ Option: CustomOption }}
          formatCreateLabel={ (tagName: string) => `Add ${tagName}`}
        />
      </FormControl>
    </Container>
  );
};

export default Tags;
