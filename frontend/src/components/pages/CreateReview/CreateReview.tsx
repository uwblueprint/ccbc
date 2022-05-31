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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import reviewAPIClient from "../../../APIClients/ReviewAPIClient";
import AuthContext from "../../../contexts/AuthContext";
import NotificationContext from "../../../contexts/NotificationContext";
import NotificationContextDispatcherContext from "../../../contexts/NotificationContextDispatcherContext";
import { Book } from "../../../types/BookTypes";
import { ReviewResponse } from "../../../types/ReviewTypes";
import {
  mapBookResponseToBook,
  mapBookToBookRequest,
} from "../../../utils/MappingUtils";
import BookModal from "./BookModal";
import DeleteModal from "./DeleteBookModal";
import DeleteReviewModal from "./DeleteReviewModal";
import LoadingSpinner from "./LoadingSpinner";
import data from "./mockData";
import PublishModal from "./PublishModal";
import ReviewEditor from "./ReviewEditor";
import SingleBook from "./SingleBook";

/**
 * The model defining the props for the Create Review Component
 */
interface CreateReviewProps {
  /**
   * The unique identifer for the Review. This prop is optional
   * and is used to pre-populate the component if a value is set.
   */
  id?: string;
}
/**
 * The component for the page where the user creates, edits, and publishes their review.
 */
const CreateReview = ({ id }: CreateReviewProps): React.ReactElement => {
  // State hooks to be used by the BookModal component
  const {
    isOpen: isOpenBookModal,
    onOpen: onOpenBookModal,
    onClose: onBookModalClose,
  } = useDisclosure();
  const [currBook, setCurrBook] = useState<Book | null>(null);

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
  const [reviewerByline, setReviewerByline] = useState("");

  const cannotPublish =
    review === "" || reviewerByline === "" || books.length === 0;

  const [reviewError, setReviewError] = useState(false);
  const [bylineError, setBylineError] = useState(false);

  const [isLoading, setLoading] = useState(false);

  // const onBookModalClose = () => setShowBookModal(false);
  const onDeleteBookModalClose = () => setShowDeleteBookModal(false);
  const onPublishModalClose = () => setShowPublishModal(false);
  const onDeleteReviewModalClose = () => setShowDeleteReviewModal(false);

  const history = useHistory();

  const toast = useToast();

  const { authenticatedUser } = useContext(AuthContext);
  const { notifications } = useContext(NotificationContext);
  const dispatchNotifications = useContext(
    NotificationContextDispatcherContext,
  );

  useEffect(() => {
    if (notifications.includes("error")) {
      toast({
        title: "Error publishing review.",
        description:
          "Something went wrong, please refresh the page and try again.",
        status: "error",
        duration: 10000,
        isClosable: true,
        position: "bottom-right",
      });
      notifications.filter((n) => n !== "published");
    }
  }, [notifications, toast]);

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

  /**
   * Function to be called when the user clicks the publish button.
   */
  const handlePublish = () => {
    setReviewError(false);
    setBylineError(false);

    // Check if all fields are filled in
    if (review !== "" && review !== "<p><br></p>" && reviewerByline !== "") {
      setShowPublishModal(true);
    } else {
      if (review === "" || review === "<p><br></p>") {
        setReviewError(true);
      }
      if (reviewerByline === "") {
        setBylineError(true);
      }
    }
  };

  /**
   * Function to be called when the review is published.
   */
  const onPublish = () => {
    // check if all fields have been filled in
    if (review !== "" || reviewerByline !== "" || books.length !== 0) {
      // publish review
      if (authenticatedUser?.id) {
        const book = {
          body: review,
          byline: reviewerByline,
          featured: featured === "1",
          createdBy: parseInt(authenticatedUser?.id, 10),
          publishedAt: new Date().getTime(),
          books: mapBookToBookRequest(books),
          tags: [],
        };
        const reviewId = id ? parseInt(id, 10) : undefined;
        reviewAPIClient.handleReview(book, reviewId).then((response) => {
          if (response) {
            dispatchNotifications({
              type: "EDIT_NOTIFICATIONS",
              value: ["published"],
            });
            history.push("/dashboard");
          } else {
            dispatchNotifications({
              type: "EDIT_NOTIFICATIONS",
              value: ["error"],
            });
          }
        });
      }
    }
  };

  /**
   * A callback function that maps a list of BookResponse objects
   * to a list of Book objects and sets them in the component state
   */
  const setBooksFromBookResponse = useCallback(
    (reviewResponse: ReviewResponse) => {
      const result: Book[] = mapBookResponseToBook(reviewResponse.books);
      setBooks(result);
      setLoading(false);
    },
    [setBooks],
  );

  // useEffect hook adds dummy data to the books array
  useEffect(() => {
    if (id) {
      setLoading(true);
      reviewAPIClient
        .getReviewById(id)
        .then((reviewResponse: ReviewResponse) => {
          setReview(reviewResponse.body);
          setFeatured(reviewResponse.featured ? "1" : "0");
          setReviewerByline(reviewResponse.byline);
          setBooksFromBookResponse(reviewResponse);
        })
        .catch(() => {
          // history.push("/404");
          history.replace("/404");
        });
    } else {
      setBooks(data);
    }
  }, [history, id, setBooksFromBookResponse]);

  return (
    <Box>
      <BookModal
        isOpen={isOpenBookModal}
        onClose={onBookModalClose}
        booksAdded={books}
        handleBooksAdded={setBooks}
        currBook={currBook}
        setCurrBook={setCurrBook}
      />
      <DeleteModal
        isOpen={showDeleteBookModal}
        onClose={onDeleteBookModalClose}
        bookIndex={deleteBookIndex}
        deleteBook={deleteBook}
      />
      <PublishModal
        isOpen={showPublishModal}
        onClose={onPublishModalClose}
        onPublish={onPublish}
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
            <Button variant="ghost" onClick={() => {}}>
              Save
            </Button>
            <Button
              colorScheme="teal"
              bg="#0EBCBD"
              variant="solid"
              onClick={handlePublish}
              disabled={cannotPublish}
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
      {isLoading ? (
        <LoadingSpinner />
      ) : (
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
                const seriesOrderA = a.seriesOrder ? a.seriesOrder : 0;
                const seriesOrderB = b.seriesOrder ? b.seriesOrder : 0;

                return seriesOrderA - seriesOrderB;
              })
              .map((book, i) => (
                <SingleBook
                  key={i}
                  index={i}
                  book={book}
                  showDeleteBookModal={setShowDeleteBookModal}
                  setDeleteBookIndex={setDeleteBookIndex}
                  showBookModal={onOpenBookModal}
                  setCurrBook={setCurrBook}
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
              onClick={onOpenBookModal}
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
              <ReviewEditor
                value={review}
                setValue={setReview}
                isInvalid={reviewError}
              />
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
                value={reviewerByline}
                onChange={(event) => setReviewerByline(event.target.value)}
                isInvalid={bylineError}
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
      )}
    </Box>
  );
};

export default CreateReview;
