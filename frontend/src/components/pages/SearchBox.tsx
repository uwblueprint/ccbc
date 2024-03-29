import { Search2Icon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

interface SearchBoxProps {
  setSearchText: (searchText: string) => void;
  searchQuery: string;
  homePage?: boolean;
}
const SearchBox = ({
  setSearchText,
  searchQuery,
  homePage = false,
}: SearchBoxProps): React.ReactElement => {
  const history = useHistory();
  const [searchText, setSearchTextState] = useState(searchQuery);

  useEffect(() => {
    setSearchTextState(searchQuery);
  }, [searchQuery]);

  const removeExtraSpace = (s: string) => s.trim().split(/ +/).join(" ");
  const onSubmitClick = async () => {
    let newSearchText = "";
    if (searchText && removeExtraSpace(searchText)) {
      newSearchText = removeExtraSpace(searchText);
    }
    setSearchText(newSearchText);
    if (homePage) {
      if (newSearchText) {
        history.push(`/magazine/search_results/?search_query=${newSearchText}`);
      } else {
        history.push(`/magazine/search_results/`);
      }
    }
  };
  return (
    <div style={{ textAlign: "center" }}>
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
          onChange={(event) => {
            setSearchTextState(event.target.value);
          }}
          value={searchText}
          onKeyDown={(e) => e.key === "Enter" && onSubmitClick()}
        />
        <InputRightElement width="4.5rem">
          <Button
            onClick={onSubmitClick}
            h="full"
            bg="#110A23"
            color="white"
            padding="0 26px"
            fontSize="14px"
            textStyle="body"
            borderRadius="0 8px 8px 0"
            _hover={{ bg: "#110A23", borderColor: "#110A23" }}
            _active={{ bg: "#110A23", borderColor: "#110A23" }}
            type="submit"
          >
            Search
          </Button>
        </InputRightElement>
      </InputGroup>
    </div>
  );
};
export default SearchBox;
