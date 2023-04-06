import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React from "react";

const PasswordRequirements = (): React.ReactElement => {
  return (
    <>
      <Text textStyle="body" color="gray.700">
        Password Must Contain:
      </Text>
      <UnorderedList listStylePosition="inside" textStyle="body" mb="20px">
        <ListItem>6 or more characters</ListItem>
      </UnorderedList>
    </>
  );
};

export default PasswordRequirements;
