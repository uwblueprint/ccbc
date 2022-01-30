import { CheckIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { Author, Book, BookFormat, Publisher } from "../../../types/BookTypes";
import { Option } from "../../../types/TagTypes";
import AddNewInput from "./AddNewInput";
import AddNumberInput from "./AddNumberInput";
import AddSelect from "./AddSelect";
import Tags from "./Tags";

interface BookModalProps {
  isOpen: boolean;
  onClose: any;
  tagsSelected: Option[];
  handleSelected: any;
  booksAdded: Book[];
  handleBooksAdded: any;
}

const BookModal = (props: BookModalProps): React.ReactElement => {
  const {
    isOpen,
    onClose,
    tagsSelected,
    handleSelected,
    booksAdded,
    handleBooksAdded,
  } = props;

  // Book Fields
  const [title, setTitle] = useState<string>("");
  const [coverImage, setCoverImage] = useState<string>("");
  const [titlePrefix, setTitlePrefix] = useState<string>("");
  const [seriesOrder, setSeriesOrder] = useState<string>("");
  const [illustrator, setIllustrator] = useState<string[]>([]);
  const [translator, setTranslator] = useState<string[]>([]);
  const [formats, setFormats] = useState<BookFormat[]>([]);
  const [minAge, setMinAge] = useState<number>(0);
  const [maxAge, setMaxAge] = useState<number>(0);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [seriesName, setSeriesName] = useState<string>("");

  const updateBookObj = () => {
    const newBook: Book = {
      title,
      coverImage,
      titlePrefix,
      seriesOrder,
      illustrator,
      translator,
      formats,
      minAge,
      maxAge,
      authors,
      publishers,
      seriesName,
    };
    handleBooksAdded([...booksAdded, newBook]);
    onClose();
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent maxW="70%" padding="10px">
        <ModalHeader>Add a new book</ModalHeader>
        <ModalBody>
          <Grid templateColumns="repeat(2, 1fr)" gap={10}>
            <GridItem>
              <Stack spacing={4}>
                <Stack w="100%" spacing={5} isInline>
                  <AddNewInput
                    id="titlePrefix"
                    label="Prefix"
                    name="title-prefix"
                    required
                    maxWidth="40%"
                  />
                  <AddNewInput id="title" label="Title" name="title" required />
                </Stack>
                <Stack align="center" spacing={5} isInline>
                  <AddNewInput
                    id="seriesName"
                    label="Series"
                    name="series-name"
                    required={false}
                  />
                  <AddNewInput
                    id="seriesOrder"
                    label="Book number"
                    name="series-order"
                    required={false}
                    maxWidth="40%"
                  />
                </Stack>
                <AddNewInput
                  id="authors"
                  label="Author"
                  name="author-name"
                  required
                  canAddNewInput
                />
                <AddNewInput
                  id="illustrator"
                  label="Illustrator"
                  name="illustrator-name"
                  required={false}
                  canAddNewInput
                />
                <AddNewInput
                  id="translator"
                  label="Translator"
                  name="translator-name"
                  required={false}
                  canAddNewInput
                />
                <Stack align="center" spacing={5} isInline>
                  <AddNewInput
                    id="publishers"
                    label="Publisher"
                    name="publisher-name"
                    required
                  />
                  <AddSelect
                    id="publishYear"
                    label="Publication Year"
                    required
                    maxWidth="40%"
                  />
                </Stack>
                <Stack align="center" spacing={5} isInline>
                  <AddSelect
                    id="formats"
                    label="Format"
                    required
                    maxWidth="70%"
                  />
                  <AddNewInput id="isbn" label="ISBN" name="isbn" required />
                  <FormControl id="price" isRequired width="45%">
                    <FormLabel mb={2}>Price</FormLabel>
                    <AddNumberInput mb={2} />
                  </FormControl>
                </Stack>
              </Stack>
            </GridItem>
            <GridItem>
              <Stack spacing={4} direction="column">
                <AddNewInput
                  id="bookCover"
                  label="Book Cover"
                  name="bookCover"
                  placeholder="Image link here"
                  required
                  bookCover
                />
                <AddSelect id="genre" label="Genre" required />
                <FormControl isRequired width="100%">
                  <FormLabel mb={2}>Audience</FormLabel>
                  <Stack direction="row" width="100%" spacing={4}>
                    <AddNumberInput placeholder="Min Age" mb={0} />
                    <AddNumberInput placeholder="Max Age" mb={0} />
                  </Stack>
                </FormControl>
                <Tags
                  tagsSelected={tagsSelected}
                  handleSelected={handleSelected}
                />
              </Stack>
            </GridItem>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button
            leftIcon={<CheckIcon />}
            variant="add"
            mr={4}
            onClick={updateBookObj}
          >
            Add Book
          </Button>
          <Button
            leftIcon={<SmallCloseIcon />}
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BookModal;
