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

  // Filtering on search
  // const filterTags = (inputValue: string) => {
  //   return tagOptions.filter((i) =>
  //     i.label.toLowerCase().includes(inputValue.toLowerCase())
  //   );
  // };

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
    setIsLoading(true);

    // To do: confirm deletion modal popup

    // Delete the tag in DB and update tags state
    // tagAPIClient.deleteTagById(option).then((response) => {
    //   console.log("response", response);
    // });

    // Remove tag from dropdown
    const options = tagOptions.filter((x) => x.value !== option.value);
    setTimeout(() => {
      // Only using set time out to simulate backend delete request. Remove this when actually deleting
      setTagOptions(options);
      setIsLoading(false);
    }, 2000);
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
