import { CloseIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";

type InputFieldProps = {
  id: number;
  name: string;
  placeholder: string;
  required: boolean;
  handleDelete: (id: number) => void;
};

const InputField = ({
  id,
  name,
  placeholder,
  required,
  handleDelete,
}: InputFieldProps): React.ReactElement => {
  const [value, setValue] = useState("");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <InputGroup>
      <Input
        mb="9px"
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        isRequired={required}
      />
      <InputRightElement>
        <IconButton
          aria-label="Remove field"
          icon={<CloseIcon />}
          onClick={() => {
            handleDelete(id);
          }}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default InputField;
