import { Button, FormControl, FormLabel, Image } from "@chakra-ui/react";
import React, { useState } from "react";

import InputField from "./InputField";

type AddNewInputProps = {
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  required: boolean;
  canAddNewInput?: boolean;
  maxWidth?: string;
  bookCover?: boolean;
};

const AddNewInput = ({
  id,
  label,
  name,
  placeholder,
  required,
  canAddNewInput,
  maxWidth,
  bookCover,
}: AddNewInputProps): React.ReactElement => {
  const [inputFields, setInputFields] = useState<string[]>([""]);

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

  const formLabel = canAddNewInput ? label.concat("(s)") : label;
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
      {bookCover ? (
        <Image
          src={inputFields[0]}
          maxW="150px"
          maxH="200px"
          // TO DO: Get local fallback image
          fallbackSrc="https://via.placeholder.com/150x200"
        />
      ) : null}
      {canAddNewInput ? (
        <Button colorScheme="blue" variant="link" onClick={handleAddField}>
          + Add new {label.toLowerCase()}
        </Button>
      ) : null}
    </FormControl>
  );
};

export default AddNewInput;
