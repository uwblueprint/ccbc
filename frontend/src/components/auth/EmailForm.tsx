import {
  Box,
  Button,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { LOGIN_PAGE } from "../../constants/Routes";

type EmailFormProps = {
  onSendEmailClick: (email: string) => void;
  isEmailInvalid: boolean;
  setIsEmailInvalid: (invalid: boolean) => void; // is there react types for useState?
};

const EmailForm = ({
  onSendEmailClick,
  isEmailInvalid,
  setIsEmailInvalid,
}: EmailFormProps): React.ReactElement => {
  const [email, setEmail] = useState("");
  return (
    <>
      <Box mt="4%" mb="4%">
        <FormLabel>Email address</FormLabel>
        <Input
          value={email}
          name="email"
          placeholder="example@gmail.com"
          isInvalid={isEmailInvalid}
          onChange={(event) => {
            setEmail(event.target.value);
            setIsEmailInvalid(false);
          }}
        />
      </Box>
      <Button
        variant="submit"
        type="button"
        onClick={() => onSendEmailClick(email)}
      >
        Sign Up
      </Button>
      <Box display="flex" mt="3">
        <Box mr="1">
          <Text textStyle="body" color="gray.700">
            Already have an account?
          </Text>
        </Box>
        <Link href={`${LOGIN_PAGE}`}>
          <Text fontWeight="bold" color="gray.700" as="u">
            Log In
          </Text>
        </Link>
      </Box>
    </>
  );
};

export default EmailForm;
