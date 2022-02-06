import { Button, FormControl, FormLabel } from "@chakra-ui/react";
import React, { useState } from "react";

import InputField from "./InputField";

type AddNewInputProps = {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  required: boolean;
};

const AddNewInput = ({
  id,
  label,
  name,
  placeholder,
  required,
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

  return (
    <FormControl id={id} isRequired={required}>
      <FormLabel mb={2}>{label}(s)</FormLabel>
      {inputFields.map((field, index) => (
        <InputField
          id={index}
          key={index}
          name={name}
          placeholder={placeholder}
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

export default AddNewInput;
