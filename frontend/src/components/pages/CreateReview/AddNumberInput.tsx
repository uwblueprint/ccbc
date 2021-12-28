import {
  FormControl,
  FormLabel,
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
};

const AddNumberInput = ({
  placeholder,
  maxWidth,
}: AddNumberInputProps): React.ReactElement => {
  return (
    <NumberInput maxWidth={maxWidth || "100%"} mb={2} step={1}>
      <NumberInputField placeholder={placeholder || "#"} />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default AddNumberInput;
