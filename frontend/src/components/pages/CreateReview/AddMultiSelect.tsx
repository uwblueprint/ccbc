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

interface Option {
  label: string;
  value: string;
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

interface AddMultiSelectProps {
  id: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  maxWidth?: string;
  values?: string[];
  selectFields?: Option[];
  setSelectField?: (s: Option[]) => void;
}

const AddMultiSelect = (props: AddMultiSelectProps): React.ReactElement => {
  const {
    id,
    label,
    required,
    maxWidth,
    placeholder,
    values,
    selectFields,
    setSelectField,
  } = props;

  return (
    <FormControl p={4} isRequired={required} width={maxWidth || "100%"}>
      <FormLabel>Tags</FormLabel>
      <Creatable
        isMulti
        placeholder={placeholder || "Select options..."}
        closeMenuOnSelect={false}
        // options={tagOptions}
        // onCreateOption={handleCreate}
        styles={customStyles}
        // value={tagsSelected}
        // onChange={handleSelected}
        // components={{ Option: CustomOption }}
        formatCreateLabel={(tagName: string) => `Add ${tagName}`}
      />
    </FormControl>
  );
};

export default AddMultiSelect;
