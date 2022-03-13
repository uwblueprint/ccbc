import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import React from "react";

import InputField from "./InputField";

type AddStringInputProps = {
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  required: boolean;
  maxWidth?: string;
  inputFieldValue: string;
  setInputField: (s: string) => void;
  isInvalid?: boolean;
  errorMessage?: string;
};

/**
 * String input field that takes state hook prop
 * @param setInputField state hook passed by parent
 * @param isInvalid check passed parent if state is valid
 * @param errorMessage displayed error message if input is invalid
 */
const AddStringInput = ({
  id,
  label,
  name,
  placeholder,
  required,
  maxWidth,
  inputFieldValue = "",
  setInputField,
  isInvalid,
  errorMessage,
}: AddStringInputProps): React.ReactElement => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputField(e.target.value);
  };

  return (
    <FormControl
      id={id}
      isRequired={required}
      width={maxWidth || "100%"}
      isInvalid={isInvalid}
    >
      <FormLabel mb={2}>{label}</FormLabel>
      <InputField
        id={0}
        key={0}
        name={name}
        placeholder={placeholder || "Text Here"}
        required={required}
        handleDelete={() => {}}
        value={inputFieldValue}
        handleInputChange={handleInputChange}
      />
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};

export default AddStringInput;
