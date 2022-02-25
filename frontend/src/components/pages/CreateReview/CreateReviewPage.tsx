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
import { Option } from "../../../types/TagTypes";
// import BookModal from "./BookModal";
import DeleteModal from "./DeleteBookModal";
import DeleteReviewModal from "./DeleteReviewModal";
import PublishModal from "./PublishModal";
import ReviewEditor from "./ReviewEditor";
import SingleBook from "./SingleBook";

const CreateReview = (): React.ReactElement => {
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
  const [featured, setFeatured] = useState("0");

  // const onBookModalClose = () => setShowBookModal(false);
  const onDeleteBookModalClose = () => setShowDeleteBookModal(false);
  const onPublishModalClose = () => setShowPublishModal(false);
  const onDeleteReviewModalClose = () => setShowDeleteReviewModal(false);

  // const handleTagSelected = (e: Option[]) => {
  //   setTagsSelected(e);
  // };

  // adds a book to the list of books
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const addBook = (book: Book) => {
    setBooks([...books, book]);
  };

  // deletes a book with the given index from the list of books
  const deleteBook = (index: number) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  // updates a book with the given index from the list of books
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const editBook = (book: Book, index: number) => {
    deleteBook(index);
    addBook(book);
  };

  // useEffect hook adds dummy data to the books array
  useEffect(() => {
    setBooks([
      {
        title: "Shadow Chasers",
        coverImage:
          "https://images-na.ssl-images-amazon.com/images/I/51WCelNAo1L.jpg",
        titlePrefix: "The",
        seriesOrder: "1",
        illustrator: ["Spencer Fencer"],
        translator: ["Translator Alligator"],
        formats: [
          {
            format: "Soft cover",
            isbn: "42069",
            price: "13",
          },
        ],
        minAge: 4,
        maxAge: 8,
        authors: [
          {
            fullName: "Sophia Spencer",
            displayName: "Sophia Spencer",
            attribution: "Author",
          },
        ],
        publishers: [
          {
            fullName: "Publisher Fisher",
            publishYear: 2012,
          },
        ],
        seriesName: "The Amazing Series",
      },
    ]);
  }, []);

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
        publishBook={() => {}}
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
        m="0"
        mb="60px"
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
            onClick={() => window.history.back()}
          />
          <Text fontSize="18px" fontWeight="semibold">
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
          {/* Current books display */}
          {books.map((book, i) => (
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
            <Input placeholder="Text here" />
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
