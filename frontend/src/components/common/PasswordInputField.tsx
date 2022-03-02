import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormHelperText,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import React, { useState } from "react";

export type PasswordInputProps = {
  isInvalid: boolean;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
  errorMessage: string;
};

const PasswordInputField = (props: PasswordInputProps): React.ReactElement => {
  const {
    isInvalid,
    value,
    placeholder,
    onChangeHandler,
    errorMessage,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const styles = useMultiStyleConfig("PasswordInputFieldStyle", {});

  const onShowPasswordClick = () => setShowPassword(false);

  const onHidePasswordClick = () => setShowPassword(true);

  const visiblePasswordEye = (
    <IconButton
      __css={styles.eyeButton}
      aria-label="Show Password"
      icon={<ViewIcon />}
      onClick={onShowPasswordClick}
    />
  );

  const hiddenPasswordEye = (
    <IconButton
      __css={styles.eyeButton}
      aria-label="Hide Password"
      icon={<ViewOffIcon />}
      onClick={onHidePasswordClick}
    />
  );

  return (
    <Flex direction="column">
      <InputGroup>
        <Input
          id={placeholder}
          isInvalid={isInvalid}
          value={value}
          type={showPassword ? "text" : "password"}
          name="passwordInputField"
          placeholder={placeholder}
          onChange={onChangeHandler}
          errorBorderColor="crimson"
        />
        <InputRightElement>
          {showPassword ? visiblePasswordEye : hiddenPasswordEye}
        </InputRightElement>
      </InputGroup>

      {isInvalid ? (
        <FormHelperText color="crimson">{errorMessage}</FormHelperText>
      ) : null}
    </Flex>
  );
};

export default PasswordInputField;
