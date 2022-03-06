import { CheckIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
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
import React, { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BookFormats, Genre } from "../../../constants/Enums";
import { Author, Book, BookFormat, Publisher } from "../../../types/BookTypes";
import AddNumberInput from "./AddNumberInput";
import AddSelect from "./AddSelect";
import AddStringInput from "./AddStringInput";
import AddStringInputList from "./AddStringInputList";

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  booksAdded: Book[];
  handleBooksAdded: (b: Book[]) => void;
}

const kStartingYear = 1967;
const kMinAge = 0;
const kMaxAge = 150;
const kMinPrice = 0;
const kMaxPrice = 1000;

/**
 * Modal for user to input new book for review
 * */
const BookModal = (props: BookModalProps): React.ReactElement => {
  const { isOpen, onClose, booksAdded, handleBooksAdded } = props;

  // required Book Fields
  const [prefix, setPrefix] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [publisher, setPublisher] = useState<string>("");
  const [publicationYear, setPublicationYear] = useState<string>("");
  const [format, setFormat] = useState<string>("");
  const [isbn, setIsbn] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [coverImage, setCoverImage] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [genre, setGenre] = useState<string>("");
  const [minAge, setMinAge] = useState<number>(0);
  const [maxAge, setMaxAge] = useState<number>(0);

  // optional book fields
  const [seriesName, setSeriesName] = useState<string>("");
  const [seriesOrder, setSeriesOrder] = useState<string>("");
  const [illustrators, setIllustrator] = useState<string[]>([]);
  const [translators, setTranslator] = useState<string[]>([]);

  /** Builds array of years starting from current year */
  const generateYearsArray = () => {
    const max = new Date().getFullYear();
    const years = [];

    for (let i = kStartingYear; i <= max; i += 1) {
      years.push(i.toString());
    }
    return years.reverse();
  };

  /** Clears book data */
  const clearBookData = () => {
    setTitle("");
    setCoverImage("");
    setPrefix("");
    setSeriesOrder("");
    setIllustrator([]);
    setTranslator([]);
    setFormat("");
    setGenre("");
    setMinAge(0);
    setMaxAge(0);
    setAuthors([]);
    setPublisher("");
    setSeriesName("");
    setIsbn("");
    setPrice(0);
    setPublicationYear("");
  };

  // Calls clearBookData() whenever modal is closed
  useEffect(() => {
    if (isOpen === false) clearBookData();
  }, [isOpen]);

  /** Ensure that ISBN is valid or an empty field */
  const isEmptyOrValidISBN = () => {
    return (
      isbn === "" || // necessary to ensure that empty form won't error
      (isbn.length === 13 &&
        !Number.isNaN(Number(isbn)) &&
        Number.isInteger(Number(isbn)))
    );
  };

  /** Check that all required modal fields are properly filled out */
  const hasRequired = () => {
    return (
      prefix !== "" &&
      title !== "" &&
      authors.length > 0 &&
      publisher !== "" &&
      publicationYear !== "" &&
      format !== "" &&
      isbn !== "" &&
      price > 0 &&
      coverImage !== "" &&
      genre !== "" &&
      minAge > 0 &&
      maxAge > 0 &&
      maxAge >= minAge &&
      isEmptyOrValidISBN()
    );
  };

  /** Creates and saves a new book object, then closes the modal */
  const updateBookObj = () => {
    const authorObjs: Author[] = [];

    authors.forEach((author) => {
      authorObjs.push({
        fullName: author,
        displayName: author,
        attribution: "Author",
      });
    });

    const publisherObj: Publisher[] = [
      {
        fullName: publisher,
        publishYear: parseInt(publicationYear, 10),
      },
    ];

    const formatList: BookFormat[] = [
      {
        format,
        price: price.toString(),
        isbn,
      },
    ];

    const newBook: Book = {
      title,
      coverImage,
      titlePrefix: prefix,
      seriesOrder,
      illustrator: illustrators,
      translator: translators,
      formats: formatList,
      minAge,
      maxAge,
      authors: authorObjs,
      publishers: publisherObj,
      seriesName,
    };
    handleBooksAdded([...booksAdded, newBook]);
    onClose();
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent maxW="70%" padding="10px">
        <ModalHeader>Add a new book</ModalHeader>
        <ModalBody>
          <Grid templateColumns="repeat(2, 1fr)" gap={10}>
            <GridItem>
              <Stack spacing={4}>
                <Stack w="100%" spacing={5} isInline>
                  <AddStringInput
                    id="titlePrefix"
                    label="Prefix"
                    name="title-prefix"
                    required
                    maxWidth="50%"
                    inputField={prefix}
                    setInputField={setPrefix}
                  />
                  <AddStringInput
                    id="title"
                    label="Title"
                    name="title"
                    required
                    inputField={title}
                    setInputField={setTitle}
                  />
                </Stack>
                <Stack align="center" spacing={5} isInline>
                  <AddStringInput
                    id="seriesName"
                    label="Series"
                    name="series-name"
                    required={false}
                    inputField={seriesName}
                    setInputField={setSeriesName}
                  />
                  <AddStringInput
                    id="seriesOrder"
                    label="Book number"
                    name="series-order"
                    required={false}
                    maxWidth="50%"
                    inputField={seriesOrder}
                    setInputField={setSeriesOrder}
                  />
                </Stack>
                <AddStringInputList
                  id="authors"
                  label="Author"
                  name="author-name"
                  required
                  inputFields={authors}
                  setInputFields={setAuthors}
                />
                <AddStringInputList
                  id="illustrator"
                  label="Illustrator"
                  name="illustrator-name"
                  required={false}
                  inputFields={illustrators}
                  setInputFields={setIllustrator}
                />
                <AddStringInputList
                  id="translator"
                  label="Translator"
                  name="translator-name"
                  required={false}
                  inputFields={translators}
                  setInputFields={setTranslator}
                />
                <Stack align="center" spacing={5} isInline>
                  <AddStringInput
                    id="publishers"
                    label="Publisher"
                    name="publisher-name"
                    required
                    inputField={publisher}
                    setInputField={setPublisher}
                  />
                  <AddSelect
                    id="Publication Year"
                    label="Publication Year"
                    required
                    values={generateYearsArray()}
                    setSelectField={setPublicationYear}
                  />
                </Stack>
                <Stack
                  align="center"
                  spacing={5}
                  isInline
                  alignItems="flex-start"
                >
                  <AddSelect
                    id="formats"
                    label="Format"
                    required
                    maxWidth="100%"
                    values={Object.values(BookFormats)}
                    setSelectField={setFormat}
                  />
                  <AddStringInput
                    id="isbn"
                    label="ISBN"
                    name="isbn"
                    required
                    inputField={isbn}
                    setInputField={setIsbn}
                    isInvalid={!isEmptyOrValidISBN()}
                    errorMessage="Invalid ISBN format."
                  />
                  <FormControl id="price" isRequired width="45%">
                    <FormLabel mb={2}>Price</FormLabel>
                    <AddNumberInput
                      mb={2}
                      placeholder="$"
                      setNumberField={setPrice}
                      minNum={kMinPrice}
                      maxNum={kMaxPrice}
                    />
                  </FormControl>
                </Stack>
              </Stack>
            </GridItem>
            <GridItem>
              <Stack spacing={4} direction="column">
                <AddStringInput
                  id="bookCover"
                  label="Book Cover"
                  name="bookCover"
                  placeholder="Image link here"
                  required
                  inputField={coverImage}
                  setInputField={setCoverImage}
                />
                {/* <AddSelect
                  id="genre"
                  label="Genre"
                  required
                  values={Object.values(Genre)}
                  setSelectField={setGenre}
                /> */}
                <FormControl
                  isRequired
                  width="100%"
                  isInvalid={maxAge < minAge}
                >
                  <FormLabel mb={2}>Audience</FormLabel>
                  <Stack direction="row" width="100%" spacing={4}>
                    <AddNumberInput
                      placeholder="Min Age"
                      mb={0}
                      setNumberField={setMinAge}
                      minNum={kMinAge}
                      maxNum={kMaxAge}
                    />
                    <AddNumberInput
                      placeholder="Max Age"
                      mb={0}
                      setNumberField={setMaxAge}
                      minNum={minAge}
                      maxNum={kMaxAge}
                    />
                  </Stack>
                  <FormErrorMessage>
                    Max Age must be greater than or equal to Min Age{" "}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
            </GridItem>
          </Grid>
        </ModalBody>
        <ModalFooter pt={4}>
          <Button
            leftIcon={<CheckIcon />}
            variant="add"
            mr={4}
            onClick={updateBookObj}
            isDisabled={!hasRequired()}
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
