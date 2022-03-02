import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";

import { Book } from "../../../types/BookTypes";

/**
 * The model defining the props for the Single Book component
 */
interface SingleBookProps {
  /** The book being displayed by the component */
  book: Book;
  /** The index of the current book */
  index: number;
  /** A function that sets showDeleteBookModal */
  showModal: (showDeleteBookModal: boolean) => void;
  /** A function that sets deleteBookIndex */
  setIndex: (deleteBookIndex: number) => void;
}

/**
 * This component displays a single book and allows the user to delete or edit a book via the corresponding modals
 */
const SingleBook = (props: SingleBookProps): React.ReactElement => {
  const { book, index, showModal, setIndex } = props;
  const [hovering, setHovering] = useState<boolean>(false);

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
        zIndex={2}
        onClick={() => {
          showModal(true);
          setIndex(index);
        }}
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
        role="img"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {hovering && (
          <Box
            w="130px"
            h="180px"
            borderRadius={5}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgColor="rgba(66,153,225,0.9)"
            position="absolute"
          >
            <EditIcon h={10} w={10} color="white" />
          </Box>
        )}
        <Image minH="180px" minW="130px" src={book.coverImage} />
      </Box>
      <Text fontWeight="semibold">{book.title}</Text>
    </Box>
  );
};

export default SingleBook;
