import { CheckIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
  Button,
  Checkbox,
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

import genreAPIClient from "../../../APIClients/GenreAPIClient";
import tagAPIClient from "../../../APIClients/TagAPIClient";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BookFormats } from "../../../constants/Enums";
import {
  Author,
  Book,
  BookFormat,
  Genre,
  Option,
  Publisher,
  Tag,
} from "../../../types/BookTypes";
import AddProfilePictureMode from "../../../types/Types";
import AddProfilePicture from "../CreatorProfile/AddProfilePictureField";
import AddMultiSelect from "./AddMultiSelect";
import AddNumberInput from "./AddNumberInput";
import AddSelect from "./AddSelect";
import AddSelectList from "./AddSelectList";
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
const kMaxPrice = Number.MAX_SAFE_INTEGER;
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
  const [coverImage, setCoverImage] = useState<string>("");
  const [minAge, setMinAge] = useState<number>(0);
  const [maxAge, setMaxAge] = useState<number>(0);

  const [bookformats, setBookformats] = useState<string[]>([]);
  const [prices, setPrices] = useState<string[]>([]);
  const [isbns, setIsbns] = useState<string[]>([]);

  // optional book fields
  const [seriesName, setSeriesName] = useState<string>("");
  const [isOrdered, setIsOrdered] = useState(false);
  const [seriesOrder, setSeriesOrder] = useState<number>(0);
  const [illustrators, setIllustrator] = useState<string[]>([]);
  const [translators, setTranslator] = useState<string[]>([]);
  const [tags, setTags] = useState<Option[]>([]);
  const [tagOptions, setTagOptions] = useState<Option[]>([]);
  const [genres, setGenres] = useState<Option[]>([]);
  const [genreOptions, setGenreOptions] = useState<Option[]>([]);

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
    // Grab all possible genres from DB
    genreAPIClient.getGenreOptions().then((genreOpts) => {
      setGenreOptions(genreOpts);
    });

    // Grab all possible tags from DB
    tagAPIClient.getTagOptions().then((tagOpts) => {
      setTagOptions(tagOpts);
    });

    /** Clears book data */
    const clearBookData = () => {
      setCurrBook(null);

      setTitle("");
      setCoverImage("");
      setPrefix("");
      setSeriesOrder(0);
      setIllustrator([]);
      setTranslator([]);
      setGenres([]);
      setTags([]);
      setMinAge(0);
      setMaxAge(0);
      setAuthors([]);
      setPublisher("");
      setSeriesName("");
      setPublicationYear("");
      setBookformats([""]);
      setPrices([""]);
      setIsbns([""]);
    };

    /** Sets the book data in the modal */
    const setBookData = (book: Book) => {
      setTitle(book.title);
      setCoverImage(book.coverImage);
      setPrefix(book.titlePrefix ? book.titlePrefix : "");
      setSeriesOrder(book.seriesOrder);
      setIllustrator(book.illustrator);
      setTranslator(book.translator ? book.translator : []);

      const tagOpts: Option[] = [];
      book.tags.forEach((tag) => {
        tagOpts.push({
          label: tag.name,
          value: tag.name,
        });
      });
      setTags(tagOpts);

      const genresOpts: Option[] = [];
      book.genres.forEach((genre) => {
        genresOpts.push({
          label: genre.name,
          value: genre.name,
        });
      });
      setGenres(genresOpts);

      // setGenres(book.genres.map((genre) => genre.name));
      setMinAge(book.minAge);
      setMaxAge(book.maxAge);
      setAuthors(book.authors.map((author) => author.fullName));
      setSeriesName(book.seriesName ? book.seriesName : "");

      const bookPublisher = book.publishers[0];
      setPublisher(bookPublisher.fullName);
      setPublicationYear(bookPublisher.publishYear.toString());

      const bookformatsList = book.formats.map(
        (formatItem) => formatItem.format,
      );
      setBookformats(bookformatsList);
      const pricesList = book.formats.map((formatItem) =>
        !Number.isNaN(formatItem.price)
          ? Number(formatItem.price).toFixed(2)
          : "0.00",
      );
      setPrices(pricesList);
      const isbnsList = book.formats.map((formatItem) => formatItem.isbn);
      setIsbns(isbnsList);
    };
    if (!isOpen) {
      clearBookData();
    } else if (currBook) {
      setBookData(currBook);
    }
  }, [isOpen, currBook, setCurrBook]);

  /** Ensures that all formats are filled in */
  const hasRequiredFormats = bookformats.every(
    (bookformatItem, index) =>
      bookformatItem &&
      prices[index] &&
      isbns[index] &&
      Number(prices[index]) < kMaxPrice,
  );

  /** Ensures that all authors are none empty */
  const hasAuthors = authors.every((author) => author);

  /** Check that all required modal fields are properly filled out */
  const hasRequired =
    title !== "" &&
    authors.length > 0 &&
    hasAuthors &&
    publisher !== "" &&
    publicationYear !== "" &&
    coverImage !== "" &&
    (!isOrdered || (isOrdered && seriesOrder > 0 && seriesName !== "")) &&
    // genre !== "" &&
    minAge >= 0 &&
    maxAge >= 0 &&
    maxAge >= minAge &&
    hasRequiredFormats;

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

    const genreObjs: Genre[] = [];
    genres.forEach((genre) => {
      genreObjs.push({
        name: genre.label,
      });
    });

    const TagObjs: Tag[] = [];
    tags.forEach((tag) => {
      TagObjs.push({
        name: tag.label,
      });
    });

    const publisherObj: Publisher[] = [
      {
        fullName: publisher,
        publishYear: parseInt(publicationYear, 10),
      },
    ];

    const formatObjs: BookFormat[] = [];

    bookformats.forEach((bookformatObject, i) => {
      formatObjs.push({
        format: bookformatObject,
        price: Number(prices[i]) || 0,
        isbn: isbns[i],
      });
    });

    const newBook: Book = {
      title,
      coverImage,
      titlePrefix: prefix,
      seriesOrder,
      illustrator: illustrators,
      translator: translators,
      formats: formatObjs,
      minAge,
      maxAge,
      authors: authorObjs,
      publishers: publisherObj,
      seriesName,
      genres: genreObjs,
      tags: TagObjs,
    };

    if (currBook) {
      Object.assign(currBook, newBook);
    } else {
      handleBooksAdded([...booksAdded, newBook]);
    }
    onClose();
  };

  /** Adds or deletes a format object with specified index */
  const updateFormat = (index?: number) => {
    if (index) {
      setPrices(prices.filter((_, i) => i !== index));
      setIsbns(isbns.filter((_, i) => i !== index));
      setBookformats(bookformats.filter((_, i) => i !== index));
    } else {
      setBookformats([...bookformats, ""]);
      setPrices([...prices, ""]);
      setIsbns([...isbns, ""]);
    }
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
                    maxWidth="50%"
                    required={false}
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
                    required={isOrdered}
                    inputFieldValue={seriesName}
                    setInputField={setSeriesName}
                  />
                  {isOrdered ? (
                    <div>
                      <FormLabel mb={2}>
                        Book number
                        <span style={{ color: "red" }}> * </span>
                      </FormLabel>
                      <AddNumberInput
                        placeholder="#"
                        mb={1}
                        numberInputFieldValue={
                          seriesOrder >= 1 ? seriesOrder : ""
                        }
                        setNumberField={setSeriesOrder}
                        minNum={kMinBookNum}
                        maxNum={kMaxBookNum}
                      />
                    </div>
                  ) : null}
                </Stack>
                <Checkbox
                  isChecked={isOrdered}
                  onChange={(e) => {
                    if (!e.target.checked) setSeriesOrder(0);
                    else setSeriesOrder(1);
                    setIsOrdered(e.target.checked);
                  }}
                >
                  Ordered
                </Checkbox>
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
                  <AddSelectList
                    id="formats"
                    label="Format"
                    required
                    maxWidth="100%"
                    selectFields={bookformats}
                    values={Object.values(BookFormats)}
                    setSelectFields={setBookformats}
                    updateFormat={updateFormat}
                    hasRequiredFormats={hasRequiredFormats}
                  />
                  <AddStringInputList
                    id="isbn"
                    label="ISBN"
                    name="isbn"
                    required
                    inputFields={isbns}
                    setInputFields={setIsbns}
                    regexPattern={/^([0-9]|[-])*$/}
                    isFormat
                    isIsbn
                    updateFormat={updateFormat}
                  />
                  <AddStringInputList
                    id="price"
                    label="Price"
                    name="price"
                    required
                    placeholder="$"
                    inputFields={prices}
                    setInputFields={setPrices}
                    regexPattern={/^[0-9]*(?:\.[0-9]{0,2})?$/}
                    isFormat
                  />
                </Stack>
              </Stack>
            </GridItem>
            <GridItem>
              <Stack spacing={4} direction="column">
                <AddProfilePicture
                  name="Book Cover"
                  value={coverImage}
                  field="profilePictureLink"
                  mode={AddProfilePictureMode.bookModal}
                  setInputField={setCoverImage}
                  required
                />
                <AddMultiSelect
                  id="genre"
                  label="Genres"
                  placeholder="Add genres here"
                  options={genreOptions}
                  setOptions={setGenreOptions}
                  optionsSelected={genres}
                  setOptionsSelected={setGenres}
                  allowMultiSelectOption
                />
                <AddMultiSelect
                  id="tag"
                  label="Tags"
                  placeholder="Add tags here"
                  options={tagOptions}
                  setOptions={setTagOptions}
                  optionsSelected={tags}
                  setOptionsSelected={setTags}
                  allowMultiSelectOption
                />
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
