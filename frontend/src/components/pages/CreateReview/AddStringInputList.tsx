import { Button, FormControl, FormLabel } from "@chakra-ui/react";
import React from "react";

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
};

/** String list input field that takes state hook prop */
const AddStringInputList = ({
  id,
  label,
  name,
  placeholder,
  required,
  maxWidth,
  inputFields = [""],
  setInputFields,
}: AddStringInputListProps): React.ReactElement => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const list = [...inputFields];
    list[index] = e.target.value;
    setInputFields(list);
  };

  const handleRemoveField = (index: number) => {
    setInputFields(inputFields.filter((_, i) => i !== index));
  };

  const handleAddField = () => {
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
        />
      ))}
      <Button colorScheme="blue" variant="link" onClick={handleAddField}>
        + Add new {label.toLowerCase()}
      </Button>
    </FormControl>
  );
};

export default AddStringInputList;
