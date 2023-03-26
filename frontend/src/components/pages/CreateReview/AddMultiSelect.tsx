/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-explicit-any */

import { CloseIcon } from "@chakra-ui/icons";
import {
  Checkbox,
  FormControl,
  FormLabel,
  IconButton,
  Text,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { components } from "react-select";
import Creatable from "react-select/creatable";

import { Option } from "../../../types/BookTypes";
import ConfirmationModal from "../../common/ConfirmationModal";

const EmptyOption = { value: "", label: "" };
const EMPTY_FILTER_STYLES = {
  color: "gray.900",
  borderColor: "#3182CE",
  borderWidth: 1.5,
  backgroundColor: "#EBF8FF",
};
const NON_EMPTY_FILTER_STYLES = {
  color: "gray.900",
  borderColor: "black",
  borderWidth: 1.5,
  ":hover": {
    color: "gray.900",
  },
};

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

const customSearchStyles = {
  option: (provided: any) => ({
    ...provided,
    display: "flex",
    paddingLeft: "5%",
    justifyContent: "space-between",
  }),
  control: (provided: any) => ({
    ...provided,
    color: "gray.900",
    borderColor: "black",
    borderWidth: 1.5,
    ":hover": {
      color: "gray.900",
    },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "gray.900",
  }),
  multiValueRemove: (provided: any, data: any) => ({
    ...provided,
    ":hover": {
      backgroundColor: data.color,
      color: "white",
    },
  }),
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    color: "gray.900",
    transform: state.isFocused ? "rotate(180deg)" : "rotate(0deg)",
  }),
};

interface AddMultiSelectProps {
  id: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  maxWidth?: string;
  options: Option[]; // Gives list of all possible options to choose from (comes from DB)
  setOptions: any; // Setting the list of options from the DB
  optionsSelected: Option[]; // List of options that's been selected
  setOptionsSelected: any; // Setting the list of options to be selected
  allowDeleteOption?: boolean;
  allowAddOption?: boolean;
  allowMultiSelectOption?: boolean;
  searchStyle?: boolean;
  p?: string;
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
  allowDeleteOption,
  allowAddOption,
  allowMultiSelectOption,
  searchStyle,
  p
}: AddMultiSelectProps): React.ReactElement => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [optionToDelete, setOptionToDelete] = useState<Option>(EmptyOption);

  const onClose = () => setShowModal(false);

  customSearchStyles.control = useMemo(
    () =>
      optionsSelected.length > 0
        ? (provided: any) => ({
            ...provided,
            ...EMPTY_FILTER_STYLES,
          })
        : (provided: any) => ({
            ...provided,
            ...NON_EMPTY_FILTER_STYLES,
          }),
    [optionsSelected],
  );

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
        {allowDeleteOption ? (
          <IconButton
            aria-label="Delete Button"
            size="xs"
            icon={<CloseIcon />}
            onClick={(e: any) => confirmDelete(e, data)}
          />
        ) : null}
      </components.Option>
    );
  };

  const SearchCustomOption = (optionProps: any) => {
    const { children, data } = optionProps;

    return (
      <components.Option {...optionProps}>
        <Checkbox borderColor="gray.900">{children}</Checkbox>
        {allowDeleteOption ? (
          <IconButton
            aria-label="Delete Button"
            size="xs"
            icon={<CloseIcon />}
            onClick={(e: any) => confirmDelete(e, data)}
          />
        ) : null}
      </components.Option>
    );
  };

  const MultiValueContainer = (props: any) => {
    const isFirst = props.selectProps.value[0] === props.data;
    if (isFirst) {
      return (
        <Text>
          {placeholder} ({props.selectProps.value.length})
        </Text>
      );
    }
    return null;
  };

  const BlankComponent = () => {
    return <span />;
  };

  const selectComponents = searchStyle
    ? {
        Option: SearchCustomOption,
        IndicatorSeparator: BlankComponent,
        MultiValueContainer,
        ClearIndicator: BlankComponent,
      }
    : { Option: CustomOption };

  return (
    <>
      <ConfirmationModal
        showModal={showModal}
        onClose={onClose}
        handleDelete={() => handleDelete}
        itemToDelete={optionToDelete}
        deleteType="Tag"
      />
      <FormControl id={id} isRequired={required} width={maxWidth || "100%"} p={p}>
        <FormLabel>{label}</FormLabel>
        <Creatable
          isMulti={allowMultiSelectOption}
          isClearable
          placeholder={placeholder || "Select some options..."}
          closeMenuOnSelect={!allowMultiSelectOption}
          options={options}
          onCreateOption={handleCreate}
          styles={searchStyle ? customSearchStyles : customStyles}
          value={optionsSelected}
          onChange={setOptionsSelected}
          components={selectComponents}
          formatCreateLabel={(optionType: string) => `Add ${optionType}`}
          isSearchable={allowAddOption}
        />
      </FormControl>
    </>
  );
};

export default AddMultiSelect;
