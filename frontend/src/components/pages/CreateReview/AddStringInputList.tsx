import { Button, FormControl, FormLabel } from "@chakra-ui/react";
import React, { useState } from "react";

import InputField from "./InputField";

type AddStringInputListProps = {
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  required: boolean;
  maxWidth?: string;
  inputFields: string[];
  setInputFields: (s: string[]) => void;
  regexPattern?: RegExp;
  isFormat?: boolean;
  updateFormat?: (n?: number) => void;
  isIsbn?: boolean;
};

/**
 * Form control that can dynamically add or remove
 * string fields
 * @param setInputFields state hook passed by parent
 * */
const AddStringInputList = ({
  id,
  label,
  name,
  placeholder,
  required,
  maxWidth,
  inputFields = [""],
  setInputFields,
  regexPattern,
  isFormat = false,
  updateFormat,
  isIsbn = false,
}: AddStringInputListProps): React.ReactElement => {
  const [numEmptyFields, setNumEmptyFields] = useState<number>(0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const list = [...inputFields];
    const oldValEmpty = list[index].length === 0;
    const newValEmpty = e.target.value.length === 0;
    if (oldValEmpty && !newValEmpty) {
      setNumEmptyFields(numEmptyFields - 1);
    } else if (!oldValEmpty && newValEmpty) {
      setNumEmptyFields(numEmptyFields + 1);
    }
    if (!regexPattern || regexPattern?.test(e.target.value)) {
      list[index] = e.target.value;
      setInputFields(list);
    }
  };

  const handleRemoveField = (index: number) => {
    if (inputFields[index].length === 0) {
      setNumEmptyFields(numEmptyFields - 1);
    }
    setInputFields(inputFields.filter((_, i) => i !== index));
  };

  const handleAddField = () => {
    setNumEmptyFields(numEmptyFields + 1);
    setInputFields([...inputFields, ""]);
  };

  const formLabel = label.concat("(s)");
  return (
    <FormControl id={id} isRequired={required} width={maxWidth || "100%"}>
      <FormLabel mb={2}>{formLabel}</FormLabel>
      {inputFields.map((field, index) => (
        <InputField
          id={index}
          key={index}
          name={name}
          placeholder={placeholder || "Text Here"}
          required={required}
          handleDelete={handleRemoveField}
          value={field}
          handleInputChange={handleInputChange}
          isFormat={isFormat}
        />
      ))}
      {!isFormat && (
        <Button
          colorScheme="blue"
          variant="link"
          onClick={handleAddField}
          disabled={numEmptyFields > 0}
        >
          + Add new {label.toLowerCase()}
        </Button>
      )}
      {updateFormat && inputFields.length > 1 && isIsbn && (
        <Button
          colorScheme="red"
          variant="link"
          onClick={() => updateFormat(inputFields.length - 1)}
        >
          x Remove new format
        </Button>
      )}
    </FormControl>
  );
};

export default AddStringInputList;
