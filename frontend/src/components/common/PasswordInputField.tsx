import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormHelperText,
  IconButton,
  Input,
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
  const { isInvalid, value, placeholder, onChangeHandler, errorMessage } =
    props;

  const [showPassword, setShowPassword] = useState(false);

  const styles = useMultiStyleConfig("PasswordInputFieldStyle", {});

  const onShowPasswordClick = () => setShowPassword(false);

  const onHidePasswordClick = () => setShowPassword(true);

  const showPasswordButton = (
    <IconButton
      __css={styles.eyeButton}
      aria-label="Show Password"
      icon={<ViewIcon />}
      onClick={onShowPasswordClick}
    />
  );

  const hidePasswordButton = (
    <IconButton
      __css={styles.eyeButton}
      aria-label="Hide Password"
      icon={<ViewOffIcon />}
      onClick={onHidePasswordClick}
    />
  );

  const hiddenInputField = (
    <Input
      isInvalid={isInvalid}
      value={value}
      type="password"
      name="accessCodeHidden"
      placeholder={placeholder}
      onChange={onChangeHandler}
      errorBorderColor="crimson"
    />
  );

  const showInputField = (
    <Input
      isInvalid={isInvalid}
      value={value}
      type="text"
      name="passwordInputField"
      placeholder={placeholder}
      onChange={onChangeHandler}
      errorBorderColor="crimson"
    />
  );

  return (
    <Flex direction="column">
      <Flex>
        {showPassword ? showInputField : hiddenInputField}
        {showPassword ? showPasswordButton : hidePasswordButton}
      </Flex>
      {isInvalid ? (
        <FormHelperText color="crimson">{errorMessage}</FormHelperText>
      ) : null}
    </Flex>
  );
};

export default PasswordInputField;
