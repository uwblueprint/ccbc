/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-explicit-any */

import { CloseIcon } from "@chakra-ui/icons";
import { FormControl, FormLabel, IconButton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { components } from "react-select";
import Creatable from "react-select/creatable";

import tagAPIClient from "../../../APIClients/TagAPIClient";
import { Option, TagResponse } from "../../../types/TagTypes";
import ConfirmationModal from "../../common/ConfirmationModal";

const EmptyTag = { value: "", label: "" };

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

interface Props {
  tagsSelected: Option[];
  handleSelected: any;
}

const Tags = (props: Props): React.ReactElement => {
  const { tagsSelected, handleSelected } = props;

  const [tagOptions, setTagOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [tagToDelete, setTagToDelete] = useState<Option>(EmptyTag);
  const [tagsFromDB, setTagsFromDB] = useState<Option[]>([]);

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
      setTagsFromDB(options);
      setIsLoading(false);
    });
  }, []);

  const createTagOption = (label: string) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ""),
  });

  const handleCreate = (inputValue: string) => {
    const newTag = createTagOption(inputValue);
    setTagOptions([...tagOptions, newTag]);
  };

  // Delete tag completely
  const handleDelete = async () => {
    // Condition to ensure there is a tag to be deleted
    if (tagToDelete.value === "") {
      return;
    }

    // Check if the tag needs to be deleted from DB
    if (tagsFromDB.find((x) => x.value === tagToDelete.value)) {
      // Delete the tag in DB
      await tagAPIClient.deleteTagById(tagToDelete.value);
    }

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

  const CustomOption = (optionProps: any) => {
    const { children, data } = optionProps;

    return (
      <components.Option {...optionProps}>
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
    <>
      <ConfirmationModal
        showModal={showModal}
        onClose={onClose}
        handleDelete={() => handleDelete}
        itemToDelete={tagToDelete}
        deleteType="Tag"
      />
      <FormControl>
        <FormLabel>Tags</FormLabel>
        <Creatable
          isMulti
          isLoading={isLoading}
          placeholder="Select some tags..."
          closeMenuOnSelect={false}
          options={tagOptions}
          onCreateOption={handleCreate}
          styles={customStyles}
          value={tagsSelected}
          onChange={handleSelected}
          components={{ Option: CustomOption }}
          formatCreateLabel={(tagName: string) => `Add ${tagName}`}
        />
      </FormControl>
    </>
  );
};

export default Tags;
