import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { IoAlertCircle } from "react-icons/io5";

interface BibliographyInputFieldProps {
  name: string;
  value?: string | number;
  placeholder: string;
  error?: boolean;
  optional?: boolean;
  numberInput?: boolean;
  onChange?: (e: any) => void;
}

const BibliographyInputField = ({
  name,
  placeholder,
  error = false,
  value,
  optional = false,
  numberInput,
  onChange,
}: BibliographyInputFieldProps): React.ReactElement => {
  return (
    <FormControl
      isRequired={!optional}
      isInvalid={error && (!value || value === "")}
    >
      <FormLabel mb="1" mt="3">
        {name}
      </FormLabel>
      <Input
        placeholder={placeholder || `Please enter a ${name.toLowerCase()}`}
        value={value}
        onChange={onChange}
        type={numberInput ? "number" : ""}
      />
      {error && (!value || value === "") && (
        <Flex>
          <IoAlertCircle
            style={{ marginTop: "8px", marginRight: "8px", color: "#e53e3e" }}
          />
          <FormErrorMessage>
            Please enter a {placeholder.split(" ").splice(2).join(" ")}
          </FormErrorMessage>
        </Flex>
      )}
    </FormControl>
  );
};

export default BibliographyInputField;
