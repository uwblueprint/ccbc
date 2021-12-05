import { CloseIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";

type InputFieldProps = {
  id: number;
  name: string;
  placeholder: string;
  required: boolean;
  handleDelete: (id: number) => void;
  value: string;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => void;
};

const InputField = ({
  id,
  name,
  placeholder,
  required,
  handleDelete,
  value,
  handleInputChange,
}: InputFieldProps): React.ReactElement => {
  return (
    <InputGroup>
      <Input
        mb="9px"
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={(e) => handleInputChange(e, id)}
        isRequired={required}
      />
      <InputRightElement>
        {id !== 0 && (
          <IconButton
            aria-label="Remove field"
            icon={<CloseIcon />}
            onClick={() => {
              handleDelete(id);
            }}
          />
        )}
      </InputRightElement>
    </InputGroup>
  );
};

export default InputField;
