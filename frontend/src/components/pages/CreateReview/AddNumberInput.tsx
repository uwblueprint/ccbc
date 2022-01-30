import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React from "react";

type AddNumberInputProps = {
  placeholder?: string;
  maxWidth?: string;
  mb?: number;
};

const AddNumberInput = ({
  placeholder,
  maxWidth,
  mb,
}: AddNumberInputProps): React.ReactElement => {
  return (
    <NumberInput maxWidth={maxWidth || "100%"} mb={mb || 0} step={1} flex="1">
      <NumberInputField placeholder={placeholder || "#"} />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default AddNumberInput;
