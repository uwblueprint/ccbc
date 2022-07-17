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
  minNum: number;
  maxNum: number;
  numberInputFieldValue: number | "";
  setNumberField: (n: number) => void;
};

/** Chakra NumberInputField wrapper that takes state hook prop */
const AddNumberInput = ({
  placeholder,
  maxWidth,
  mb,
  minNum,
  maxNum,
  numberInputFieldValue,
  setNumberField,
}: AddNumberInputProps): React.ReactElement => {
  return (
    <NumberInput
      maxWidth={maxWidth || "100%"}
      mb={mb || 0}
      step={1}
      flex="1"
      min={minNum}
      max={maxNum}
      onChange={(value) => {
        setNumberField(parseInt(value, 10));
      }}
      value={numberInputFieldValue}
    >
      <NumberInputField placeholder={placeholder || "#"} />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default AddNumberInput;
