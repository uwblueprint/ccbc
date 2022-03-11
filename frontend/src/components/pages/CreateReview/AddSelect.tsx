import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import React from "react";

type AddSelectProps = {
  id: string;
  label: string;
  required: boolean;
  placeholder?: string;
  maxWidth?: string;
  values: string[];
  setSelectField: (s: string) => void;
};

/**
 * Dropdown select input field that takes state hook prop
 * @param setSelectField state hook passed from parent
 */
const AddSelect = ({
  id,
  label,
  required,
  placeholder,
  maxWidth,
  values,
  setSelectField,
}: AddSelectProps): React.ReactElement => {
  return (
    <FormControl id={id} isRequired={required} width={maxWidth || "100%"}>
      <FormLabel mb={2}>{label}</FormLabel>
      <Select
        mb={2}
        placeholder={placeholder || "Select Option"}
        onChange={(e) => setSelectField(e.target.value)}
      >
        {values.map((elem, i) => (
          <option key={i} value={elem}>
            {elem}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default AddSelect;
