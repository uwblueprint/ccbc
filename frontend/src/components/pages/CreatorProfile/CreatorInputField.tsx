import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import React, { useContext } from "react";

import CreatorProfileContext from "../../../contexts/CreatorProfileContext";
import {
  CreatorProfile,
  CreatorProfileProps,
} from "../../../types/CreatorProfileTypes";

interface CreatorInputFieldProps {
  name: string;
  value?: string;
  field: CreatorProfileProps;
  placeholder?: string;
  error?: boolean;
  selectOptions?: Array<string>;
  width?: string;
  mb?: string;
  required?: boolean;
}

const CreatorInputField = ({
  name,
  placeholder,
  error = false,
  selectOptions,
  width = "full",
  value,
  field,
  mb,
  required = true,
}: CreatorInputFieldProps): React.ReactElement => {
  const { creatorProfile, setCreatorProfile } = useContext(
    CreatorProfileContext,
  );

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const creatorProfileObj: CreatorProfile = { ...creatorProfile };
    const { availability, ...rest } = creatorProfileObj;
    rest[field] = e.target.value;
    setCreatorProfile({ ...rest, availability });
  };

  return (
    <FormControl
      isRequired={required}
      isInvalid={required && error && value === ""}
      mb={mb}
    >
      <FormLabel mb="1" mt="3">
        {name}
      </FormLabel>
      {selectOptions ? (
        <Select
          placeholder={placeholder || `Enter your ${name.toLowerCase()}`}
          value={value}
          onChange={(e) => handleOnChange(e)}
        >
          {selectOptions.map((item, index) => {
            return <option key={index}>{item}</option>;
          })}
        </Select>
      ) : (
        <Input
          placeholder={placeholder || `Enter your ${name.toLowerCase()}`}
          value={value}
          onChange={(e) => handleOnChange(e)}
          width={width}
        />
      )}
      {error && value === "" && required && (
        <FormErrorMessage>
          Please enter your {name.toLowerCase()}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default CreatorInputField;
