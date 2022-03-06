import { AddIcon, ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { Book } from "../../../types/BookTypes";
// import { Option } from "../../../types/TagTypes";
// import BookModal from "./BookModal";
import DeleteModal from "./DeleteBookModal";
import DeleteReviewModal from "./DeleteReviewModal";
import data from "./mockData";
import PublishModal from "./PublishModal";
import ReviewEditor from "./ReviewEditor";
import SingleBook from "./SingleBook";

/**
 * The component for the page where the user creates, edits, and publishes their review.
 */
const CreateReview = (): React.ReactElement => {
  // State hooks to be used by the BookModal component
  // const [tagsSelected, setTagsSelected] = useState<Option[]>([]);
  // const [showBookModal, setShowBookModal] = useState<boolean>(false);
  const [showDeleteBookModal, setShowDeleteBookModal] = useState<boolean>(
    false,
  );
  const [showPublishModal, setShowPublishModal] = useState<boolean>(false);
  const [showDeleteReviewModal, setShowDeleteReviewModal] = useState<boolean>(
    false,
  );
  const [deleteBookIndex, setDeleteBookIndex] = useState<number>(-1);
  const [books, setBooks] = useState<Book[]>([]);
  const [review, setReview] = useState("");
  const [byline, setByline] = useState("");
  const [featured, setFeatured] = useState("0");

  const [canPublish, setCanPublish] = useState(false);

  const [reviewError, setReviewError] = useState(false);
  const [bylineError, setBylineError] = useState(false);

  // const onBookModalClose = () => setShowBookModal(false);
  const onDeleteBookModalClose = () => setShowDeleteBookModal(false);
  const onPublishModalClose = () => setShowPublishModal(false);
  const onDeleteReviewModalClose = () => setShowDeleteReviewModal(false);

  // const handleTagSelected = (e: Option[]) => {
  //   setTagsSelected(e);
  // };

  /**
   * Adds a book to the list of books.
   * @param book - The book to be added.
   */
  const addBook = (book: Book) => {
    setBooks([...books, book]);
  };

  /**
   * Deletes a book with the given index from the list of books.
   * @param index - The index of the book to be deleted.
   */
  const deleteBook = (index: number) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  /**
   * Updates a book with the given index from the list of books
   * @param book - The new book containing the edits.
   * @param index - The index of the book to be updated.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const editBook = (book: Book, index: number) => {
    deleteBook(index);
    addBook(book);
  };

  const publishReview = () => {
    // check if all fields have been filled in
    if (review !== "" || byline !== "" || books.length !== 0) {
      // publish review
    }
  };

  // useEffect hook adds dummy data to the books array
  useEffect(() => {
    setBooks(data);
  }, []);

  // useEffect hook to check if the review and byline fields are filled in
  useEffect(() => {
    if (review !== "" && byline !== "") {
      setCanPublish(true);
    } else {
      setCanPublish(false);
    }
  }, [review, byline]);

  return (
    <Box>
      {/* <BookModal
        isOpen={showBookModal}
        onClose={onBookModalClose}
        tagsSelected={tagsSelected}
        handleSelected={handleTagSelected}
        booksAdded={books}
        handleBooksAdded={setBooks}
      /> */}
      <DeleteModal
        isOpen={showDeleteBookModal}
        onClose={onDeleteBookModalClose}
        bookIndex={deleteBookIndex}
        deleteBook={deleteBook}
      />
      <PublishModal
        isOpen={showPublishModal}
        onClose={onPublishModalClose}
        publishReview={publishReview}
      />
      <DeleteReviewModal
        isOpen={showDeleteReviewModal}
        onClose={onDeleteReviewModalClose}
        deleteReview={() => {}}
      />
      {/* Tool bar */}
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        m="0 0 60px 0"
        h="60px"
        w="100%"
        bgColor="#F6F6F6"
        boxShadow="lg"
        padding="0 8% 0 8%"
      >
        {/* Contains back button and title */}
        <Box display="flex" flexDirection="row" alignItems="center">
          <IconButton
            aria-label="Go back"
            variant="ghost"
            isRound
            icon={<ArrowBackIcon w={7} h={7} />}
            mr={6}
            onClick={() => window.location.assign("/dashboard")}
          />
          <Text
            fontSize="18px"
            fontWeight="semibold"
            onClick={() => window.location.assign("/dashboard")}
            cursor="pointer"
          >
            Back to Dashboard
          </Text>
        </Box>
        {/* Contains buttons */}
        <Box display="flex" flexDirection="row" alignItems="center">
          <ButtonGroup spacing={6}>
            <Button variant="ghost">Preview</Button>
            <Button variant="ghost">Save</Button>
            <Button
              colorScheme="teal"
              bg="#0EBCBD"
              variant="solid"
              onClick={() => setShowPublishModal(true)}
              disabled={!canPublish}
            >
              Publish
            </Button>
            <IconButton
              aria-label="Discard"
              variant="ghost"
              icon={<DeleteIcon w={6} h={6} color="#718096" />}
              onClick={() => setShowDeleteReviewModal(true)}
            />
          </ButtonGroup>
        </Box>
      </Box>
      {/* Main page content */}
      <Box display="flex" flexDirection="column" m="0px auto" w="70%">
        <Heading size="lg">Book Information</Heading>

        {/* Add new book and book list */}
        <Box
          display="flex"
          flexDirection="row"
          alignItems="flex-start"
          justifyContent="flex-start"
          mt="10px"
          mb="50px"
        >
          {/* Current books display (sorted by seriesOrder) */}
          {books
            .sort((a: Book, b: Book) => {
              if (a.seriesOrder < b.seriesOrder) {
                return -1;
              }
              if (a.seriesOrder > b.seriesOrder) {
                return 1;
              }
              return 0;
            })
            .map((book, i) => (
              <SingleBook
                key={i}
                index={i}
                book={book}
                showModal={setShowDeleteBookModal}
                setIndex={setDeleteBookIndex}
              />
            ))}

          {/* Add new book button */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            cursor="pointer"
            m={6}
            ml={0}
            // onClick={() => setShowBookModal(true)}
          >
            <IconButton
              aria-label="Add new book"
              variant="outline"
              h="180px"
              // should this be 112px for a 1.6:1 ratio?
              w="130px"
              mb="10px"
              color="#4299E1"
              borderColor="4299E1"
              icon={<AddIcon h={6} w={6} />}
            />
            <Text color="#4299E1">Add new book</Text>
          </Box>
        </Box>

        {/* Review Information Section */}
        <Heading size="lg">Review Information</Heading>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="flex-start"
          justifyContent="space-between"
          p="10px"
          mt="20px"
        >
          <Box w="47%">
            <Box display="flex" flexDirection="row" mb="10px">
              <Heading size="sm">Review</Heading>
              <Text color="red" ml={1} mt={-3} fontSize="1.5em">
                *
              </Text>
            </Box>
            <ReviewEditor value={review} setValue={setReview} />
          </Box>
          <Box w="47%">
            <Box display="flex" flexDirection="row" mb="10px">
              <Heading size="sm">Reviewer byline</Heading>
              <Text color="red" ml={1} mt={-3} fontSize="1.5em">
                *
              </Text>
            </Box>
            <Input
              placeholder="Text here"
              value={byline}
              onChange={(e) => setByline(e.target.value)}
            />
            <Box display="flex" flexDirection="row" mt="30px">
              <Heading size="sm">Featured</Heading>
              <Text color="red" ml={1} mt={-3} fontSize="1.5em">
                *
              </Text>
            </Box>
            <RadioGroup onChange={setFeatured} value={featured}>
              <Stack direction="column" spacing={0}>
                <Radio value="1">Yes</Radio>
                <Radio value="0">No</Radio>
              </Stack>
            </RadioGroup>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateReview;
