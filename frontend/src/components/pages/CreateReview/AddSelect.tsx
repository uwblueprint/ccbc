import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import React from "react";

type AddNumberInputProps = {
  id: string;
  label: string;
  required: boolean;
  placeholder?: string;
  maxWidth?: string;
};

const AddSelect = ({
  id,
  label,
  required,
  placeholder,
  maxWidth,
}: AddNumberInputProps): React.ReactElement => {
  return (
    <FormControl id={id} isRequired={required} width={maxWidth || "100%"}>
      <FormLabel mb={2}>{label}</FormLabel>
      <Select mb={2} placeholder={placeholder || "Select Option"}>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
    </FormControl>
  );
};

export default AddSelect;
