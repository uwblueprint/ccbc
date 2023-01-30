import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import React from "react";

interface CreatorInputFieldProps {
  name: string;
  value: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  error?: boolean;
  selectOptions?: Array<string>;
  width?: string;
}

const CreatorInputField = ({
  name,
  placeholder,
  error = false,
  selectOptions,
  width = "full",
  value,
  setter,
}: CreatorInputFieldProps): React.ReactElement => {
  const handleOnChange = (
    func: React.Dispatch<React.SetStateAction<string>>,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    func(e.target.value);
  };

  return (
    <FormControl isRequired isInvalid={error && value === ""}>
      <FormLabel mb="1" mt="3">
        {name}
      </FormLabel>
      {selectOptions ? (
        <Select
          placeholder={placeholder || `Enter your ${name.toLowerCase()}`}
          value={value}
          onChange={(e) => handleOnChange(setter, e)}
        >
          {selectOptions.map((item, index) => {
            return <option key={index}>{item}</option>;
          })}
        </Select>
      ) : (
        <Input
          placeholder={placeholder || `Enter your ${name.toLowerCase()}`}
          value={value}
          onChange={(e) => handleOnChange(setter, e)}
          width={width}
        />
      )}
      {error && value === "" && (
        <FormErrorMessage>
          Please enter you {name.toLowerCase()}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default CreatorInputField;
