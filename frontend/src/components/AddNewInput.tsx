import { Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";

import InputField from "./InputField";

type AddNewInputProps = {
  label: string;
  name: string;
  placeholder: string;
  required: boolean;
};

const AddNewInput = ({
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
    const list = [...inputFields];
    list.splice(index, 1);
    setInputFields(list);
  };

  const handleAddField = () => {
    setInputFields([...inputFields, ""]);
  };

  return (
    <>
      <Text>{label}</Text>
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
      <Button variant="link" onClick={handleAddField}>
        + Add New {label}
      </Button>
    </>
  );
};

export default AddNewInput;
