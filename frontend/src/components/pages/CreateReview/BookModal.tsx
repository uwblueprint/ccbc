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

/**
 * Interface defining props for BookModal component
 */
interface BookModalProps {
  /** Boolean that represents if modal is open or not */
  isOpen: boolean;
  /** Callback hook function that sets isOpen to false and closes modal */
  onClose: () => void;
  /** List of Book objects that are part of the parent CreateReview's state */
  booksAdded: Book[];
  /** State hook belonging to CreateReview that adds new books to booksAdded */
  handleBooksAdded: (b: Book[]) => void;
  /** CreateReview state variable that references a Book only when BookModal is editing said Book */
  currBook: Book | null;
  /** CreateReview state hook that modifies currBook */
  setCurrBook: (book: Book | null) => void;
}

const kStartingYear = 1967;
const kMinAge = 0;
const kMaxAge = 150;
const kMinPrice = 0;
const kMaxPrice = 1000;
const kMinBookNum = 1;
const kMaxBookNum = 1000;

/**
 * Modal for user to input new book for review
 * */
const BookModal = (props: BookModalProps): React.ReactElement => {
  const {
    isOpen,
    onClose,
    booksAdded,
    handleBooksAdded,
    currBook,
    setCurrBook,
  } = props;

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
  const [seriesOrder, setSeriesOrder] = useState<number>(1);
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

  /**
   * Calls clearBookData() whenever modal is closed,
   * otherwise calls setBookData if currBook is not null
   */
  useEffect(() => {
    /** Clears book data */
    const clearBookData = () => {
      setCurrBook(null);

      setTitle("");
      setCoverImage("");
      setPrefix("");
      setSeriesOrder(1);
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

    /** Sets the book data in the modal */
    const setBookData = (book: Book) => {
      setTitle(book.title);
      setCoverImage(book.coverImage);
      setPrefix(book.titlePrefix ? book.titlePrefix : "");
      setSeriesOrder(book.seriesOrder ? book.seriesOrder : 1);
      setIllustrator(book.illustrator);
      setTranslator(book.translator ? book.translator : []);

      setGenre("");
      setMinAge(book.minAge);
      setMaxAge(book.maxAge);
      setAuthors(book.authors.map((author) => author.fullName));
      setSeriesName(book.seriesName ? book.seriesName : "");

      const bookFormat = book.formats[0];
      setFormat(bookFormat.format);
      setPrice(parseInt(bookFormat.price, 10));
      setIsbn(bookFormat.isbn);
      const bookPublisher = book.publishers[0];
      setPublisher(bookPublisher.fullName);
      setPublicationYear(bookPublisher.publishYear.toString());
    };

    if (!isOpen) {
      clearBookData();
    } else if (currBook) {
      setBookData(currBook);
    }
  }, [isOpen, currBook, setCurrBook]);

  /** Ensure that ISBN is valid or an empty field */
  const isEmptyOrValidISBN =
    isbn === "" || // necessary to ensure that empty form won't error
    (isbn.length === 13 &&
      !Number.isNaN(Number(isbn)) &&
      Number.isInteger(Number(isbn)));

  /** Check that all required modal fields are properly filled out */
  const hasRequired =
    prefix !== "" &&
    title !== "" &&
    authors.length > 0 &&
    publisher !== "" &&
    publicationYear !== "" &&
    format !== "" &&
    isbn !== "" &&
    price > 0 &&
    coverImage !== "" &&
    // genre !== "" &&
    minAge >= 0 &&
    maxAge >= 0 &&
    maxAge >= minAge &&
    isEmptyOrValidISBN;

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

    if (currBook) {
      Object.assign(currBook, newBook);
    } else {
      handleBooksAdded([...booksAdded, newBook]);
    }
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
                    inputFieldValue={prefix}
                    setInputField={setPrefix}
                  />
                  <AddStringInput
                    id="title"
                    label="Title"
                    name="title"
                    required
                    inputFieldValue={title}
                    setInputField={setTitle}
                  />
                </Stack>
                <Stack align="center" spacing={5} isInline>
                  <AddStringInput
                    id="seriesName"
                    label="Series"
                    name="series-name"
                    required={false}
                    inputFieldValue={seriesName}
                    setInputField={setSeriesName}
                  />
                  <div>
                    <FormLabel mb={2}>Book number</FormLabel>
                    <AddNumberInput
                      placeholder="Book number"
                      mb={1}
                      numberInputFieldValue={seriesOrder >= 1 ? seriesOrder : ""}
                      setNumberField={setSeriesOrder}
                      minNum={kMinBookNum}
                      maxNum={kMaxBookNum}
                    />
                  </div>
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
                    inputFieldValue={publisher}
                    setInputField={setPublisher}
                  />
                  <AddSelect
                    id="Publication Year"
                    label="Publication Year"
                    required
                    selectField={publicationYear}
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
                    selectField={format}
                    values={Object.values(BookFormats)}
                    setSelectField={setFormat}
                  />
                  <AddStringInput
                    id="isbn"
                    label="ISBN"
                    name="isbn"
                    required
                    inputFieldValue={isbn}
                    setInputField={setIsbn}
                    isInvalid={!isEmptyOrValidISBN}
                    errorMessage="Invalid ISBN format."
                  />
                  <FormControl id="price" isRequired width="45%">
                    <FormLabel mb={2}>Price</FormLabel>
                    <AddNumberInput
                      mb={2}
                      placeholder="$"
                      numberInputFieldValue={price}
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
                  inputFieldValue={coverImage}
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
                      numberInputFieldValue={minAge >= 0 ? minAge : ""}
                      setNumberField={setMinAge}
                      minNum={kMinAge}
                      maxNum={kMaxAge}
                    />
                    <AddNumberInput
                      placeholder="Max Age"
                      mb={0}
                      numberInputFieldValue={maxAge >= 0 ? maxAge : ""}
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
            isDisabled={!hasRequired}
          >
            {currBook ? "Save Changes" : "Add Book"}
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
