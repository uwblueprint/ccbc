import { CloseIcon } from "@chakra-ui/icons";
import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

import { Book } from "../../../types/BookTypes";

interface SingleBookProps {
  book: Book;
  index: number;
  deleteBook: (index: number) => void;
}

const SingleBook = (props: SingleBookProps): React.ReactElement => {
  const { book, index, deleteBook } = props;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      cursor="pointer"
      m={6}
      ml={0}
      mr={10}
      // onClick={() => setShowBookModal(true)}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        mr="-128px"
        mt="-15px"
        p={2}
        borderRadius="100%"
        bgColor="black"
        boxShadow="dark-lg"
        zIndex={1}
        onClick={() => deleteBook(index)}
      >
        <CloseIcon color="white" w={3} h={3} />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        h="180px"
        w="130px"
        mb="10px"
        borderRadius={5}
      >
        <Image
          _hover={{
            filter: "brightness(0.8)",
          }}
          h="180px"
          w="130px"
          src={book.coverImage}
        />
      </Box>
      <Text fontWeight="semibold">{book.title}</Text>
    </Box>
  );
};

export default SingleBook;
