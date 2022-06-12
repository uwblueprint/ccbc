import { Search2Icon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";

const SearchBox = (): React.ReactElement => {
  return (
    <div style={{ textAlign: "center", padding: "10px 20px" }}>
      <InputGroup borderColor="#110A23">
        <InputLeftElement pointerEvents="none" color="#110A23">
          <Search2Icon />
        </InputLeftElement>
        <Input
          focusBorderColor="#110A23"
          _hover={{ borderColor: "#110A23" }}
          fontSize="14px"
          textStyle="body"
          pr="4.5rem"
          placeholder="Search"
        />
        <InputRightElement width="4.5rem">
          <Button
            h="full"
            bg="#110A23"
            color="white"
            padding="0 26px"
            fontSize="14px"
            textStyle="body"
            borderRadius="0 8px 8px 0"
            _hover={{ bg: "#110A23", borderColor: "#110A23" }}
            _active={{ bg: "#110A23", borderColor: "#110A23" }}
          >
            Search
          </Button>
        </InputRightElement>
      </InputGroup>
    </div>
  );
};
export default SearchBox;
