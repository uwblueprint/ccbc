/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-explicit-any */

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
import ConfirmationModal from "./common/ConfirmationModal";

const EmptyTag = { value: "", label: "" };
interface Option {
  readonly label: string;
  readonly value: string;
}

const customStyles = {
  option: (provided: any) => ({
    ...provided,
    display: "flex",
    paddingLeft: "5%",
    justifyContent: "space-between",
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
  const [tagOptions, setTagOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [tagToDelete, setTagToDelete] = useState<Option>(EmptyTag);

  const onClose = () => setShowModal(false);

  useEffect(() => {
    tagAPIClient.getTags().then((newTags) => {
      const options: Option[] = [];
      newTags.forEach((tag: TagResponse) => {
        options.push({
          value: tag.id,
          label: tag.name,
        });
      });
      setTagOptions(options);
      setIsLoading(false);
    });
  }, []);

  // Temporary (to be removed after adding createTag endpoint)
  const createTagOption = (label: string) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ""),
  });

  const handleCreate = (inputValue: string) => {
    setIsLoading(true);
    const newTag = createTagOption(inputValue);
    setTagOptions([...tagOptions, newTag]);
    setIsLoading(false);
  };

  // Delete tag completely
  const handleDelete = async () => {
    // Condition to ensure there is a tag to be deleted
    if (tagToDelete.value === "") {
      return;
    }

    // Delete the tag in DB and update tags state
    await tagAPIClient.deleteTagById(tagToDelete.value);

    // Remove tag from dropdown and update state
    const options = tagOptions.filter((x) => x.value !== tagToDelete.value);
    setTagOptions(options);
    setShowModal(false);
    setTagToDelete(EmptyTag);
  };

  const confirmDelete = (e: any, option: Option) => {
    e.stopPropagation();
    e.preventDefault();
    setShowModal(true);
    setTagToDelete(option);
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
          onClick={(e) => confirmDelete(e, data)}
        />
      </components.Option>
    );
  };

  return (
    <Container mb={12}>
      <ConfirmationModal
        showModal={showModal}
        onClose={onClose}
        handleDelete={() => handleDelete}
        itemToDelete={tagToDelete}
        deleteType="Tag"
      />
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
          formatCreateLabel={(tagName: string) => `Add ${tagName}`}
        />
      </FormControl>
    </Container>
  );
};

export default Tags;
