import { Button, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

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
  const [lastFieldID, setLastFieldID] = useState<number>(0);
  const [inputFields, setInputFields] = useState<React.ReactElement[]>([]);

  const handleRemoveField = (id: number) => {
    const newFields = inputFields.filter((field) => field.props.id !== id);
    setInputFields(newFields);
  };

  const handleAddField = () => {
    setLastFieldID(lastFieldID + 1);
    setInputFields([
      ...inputFields,
      <InputField
        id={lastFieldID}
        key={lastFieldID}
        name={name}
        placeholder={placeholder}
        required={required}
        handleDelete={handleRemoveField}
      />,
    ]);
  };

  useEffect(() => {
    handleAddField();
  }, []);

  return (
    <>
      <Text>{label}</Text>
      {inputFields.map((field) => field)}
      <Button variant="link" onClick={handleAddField}>
        + Add new {label}
      </Button>
    </>
  );
};

export default AddNewInput;
