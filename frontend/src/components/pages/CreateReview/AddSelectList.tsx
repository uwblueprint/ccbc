import { Button, FormControl, FormLabel, Select } from "@chakra-ui/react";
import React from "react";

type AddSelectListProps = {
  id: string;
  label: string;
  required: boolean;
  placeholder?: string;
  maxWidth?: string;
  values: string[];
  selectFields: string[];
  setSelectFields: (s: string[]) => void;
  updateFormat: (n?: number) => void;
  hasRequiredFormats: boolean;
};

/**
 * Form control that can dynamically
 * add or remove dropdown select fields
 * @param setSelectFields state hook passed from parent
 */
const AddSelectList = ({
  id,
  label,
  required,
  placeholder,
  maxWidth,
  values,
  selectFields,
  setSelectFields,
  updateFormat,
  hasRequiredFormats,
}: AddSelectListProps): React.ReactElement => {
  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => {
    const list = [...selectFields];
    list[index] = e.target.value;
    setSelectFields(list);
  };

  return (
    <FormControl id={id} isRequired={required} width={maxWidth || "100%"}>
      <FormLabel mb={2}>{label}</FormLabel>
      {selectFields.map((field, index) => (
        <Select
          key={index}
          mb={2}
          placeholder={placeholder || "Select Option"}
          onChange={(e) => handleSelectChange(e, index)}
          value={field}
        >
          {values.map((elem, i) => (
            <option key={i} value={elem}>
              {elem}
            </option>
          ))}
        </Select>
      ))}

      <Button
        colorScheme="blue"
        variant="link"
        onClick={() => updateFormat()}
        disabled={!hasRequiredFormats}
      >
        + Add new {label.toLowerCase()}
      </Button>
    </FormControl>
  );
};

export default AddSelectList;
