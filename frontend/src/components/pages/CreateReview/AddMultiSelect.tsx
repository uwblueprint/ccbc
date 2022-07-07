/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-explicit-any */

import { CloseIcon } from "@chakra-ui/icons";
import { FormControl, FormLabel, IconButton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { components } from "react-select";
import Creatable from "react-select/creatable";

import { Option } from "../../../types/BookTypes";
import ConfirmationModal from "../../common/ConfirmationModal";

const EmptyOption = { value: "", label: "" };

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

interface AddMultiSelectProps {
  id: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  maxWidth?: string;
  options: Option[];
  setOptions: any;
  optionsSelected: Option[];
  setOptionsSelected: any;
}

const AddMultiSelect = ({
  id,
  label,
  required,
  placeholder,
  maxWidth,
  options,
  setOptions,
  optionsSelected,
  setOptionsSelected,
}: AddMultiSelectProps): React.ReactElement => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [optionToDelete, setOptionToDelete] = useState<Option>(EmptyOption);

  const onClose = () => setShowModal(false);

  const createOption = (opt: string) => ({
    label: opt,
    value: opt.toLowerCase().replace(/\W/g, ""),
  });

  const handleCreate = (inputValue: string) => {
    const newOption = createOption(inputValue);
    setOptions([...options, newOption]);
  };

  const handleDelete = () => {
    // Condition to ensure there is an option to be deleted
    if (optionToDelete.value === "") {
      return;
    }

    // Remove option from dropdown and update state
    const newOptions = options.filter((x) => x.value !== optionToDelete.value);
    setOptions(newOptions);
    setShowModal(false);
    setOptionToDelete(EmptyOption);
  };

  const confirmDelete = (e: any, opt: Option) => {
    e.stopPropagation();
    e.preventDefault();
    setShowModal(true);
    setOptionToDelete(opt);
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
          onClick={(e: any) => confirmDelete(e, data)}
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
        itemToDelete={optionToDelete}
        deleteType="Tag"
      />
      <FormControl
        id={id}
        isRequired={required}
        width={maxWidth || "100%"}
      >
        <FormLabel>{label}</FormLabel>
        <Creatable
          isMulti
          placeholder={placeholder || "Select some options..."}
          closeMenuOnSelect={false}
          options={options}
          onCreateOption={handleCreate}
          styles={customStyles}
          value={optionsSelected}
          onChange={setOptionsSelected}
          components={{ Option: CustomOption }}
          formatCreateLabel={(optionType: string) => `Add ${optionType}`}
        />
      </FormControl>
    </>
  );
};

export default AddMultiSelect;
