import { SmallCloseIcon } from "@chakra-ui/icons";
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
  handleDelete?: (id: number) => void;
  value: string;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => void;
  isFormat?: boolean;
};

const InputField = ({
  id,
  name,
  placeholder,
  required,
  handleDelete,
  value,
  handleInputChange,
  isFormat,
}: InputFieldProps): React.ReactElement => {
  return (
    <InputGroup>
      <Input
        mb={2}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={(e) => handleInputChange(e, id)}
        isRequired={required}
      />
      {id !== 0 && !isFormat && (
        <InputRightElement>
          <IconButton
            aria-label="Remove field"
            variant="remove"
            icon={<SmallCloseIcon />}
            onClick={() => {
              if (handleDelete && id) handleDelete(id);
            }}
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export default InputField;
