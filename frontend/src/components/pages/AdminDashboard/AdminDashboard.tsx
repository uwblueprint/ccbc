import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Spacer,
  Stack,
  Tag,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import MUIDataTable, {
  CustomHeadLabelRenderOptions,
  MUIDataTableColumn,
} from "mui-datatables";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import reviewAPIClient from "../../../APIClients/ReviewAPIClient";
import { CREATE_REVIEW_PAGE } from "../../../constants/Routes";
import NotificationContext from "../../../contexts/NotificationContext";
import { Review, ReviewResponse } from "../../../types/ReviewTypes";
import { mapReviewResponseToReview } from "../../../utils/MappingUtils";
import PreviewReviewModal from "../../PreviewReview/PreviewReviewModal";
import Author from "./Author";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

type ReviewRow = {
  id: number;
  title: string;
  authors: string;
  updated: string;
  featured: string;
  status: string;
};

const AdminDashboard = (): React.ReactElement => {
  const {
    isOpen: isPreviewModalOpen,
    onOpen: onPreviewModalOpen,
    onClose: onPreviewModalClose,
  } = useDisclosure();
  const [data, setData] = useState<Review[]>([]);
  const { notifications } = useContext(NotificationContext);
  const toast = useToast();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteReviewName, setDeleteReviewName] = useState("");
  const [deleteReviewId, setDeleteReviewId] = useState(-1);
  const [selectedReview, setSelectedReview] = useState<Review>({} as Review);
  const history = useHistory();

  useEffect(() => {
    reviewAPIClient.getReviews().then((allReviews: ReviewResponse[]) => {
      setData(mapReviewResponseToReview(allReviews));
    });
  }, []);

  useEffect(() => {
    if (notifications.includes("published")) {
      toast({
        title: "Review published.",
        description: "Your review has been published.",
        status: "info",
        duration: 10000,
        isClosable: true,
        position: "bottom-right",
      });

      // toast has been displayed, remove "published" from notifications array so it doesn't appear again
      notifications.filter((n) => n !== "published");
    }
  }, [notifications, toast]);

  const getIndex = (id: number) => {
    return data.findIndex((element) => element.reviewId === id);
  };

  const deleteReview = async () => {
    await reviewAPIClient.deleteReviewById(deleteReviewId.toString());
    const newData = [...data];
    const deleteReviewIndex = getIndex(deleteReviewId);
    newData.splice(deleteReviewIndex, 1);
    setData(newData);
  };

  const onDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const previewButtonHandler = (id: number) => {
    const previewReviewIndex = getIndex(id);
    const row: Review = data[previewReviewIndex]; // The full Review object
    setSelectedReview(row);
    onPreviewModalOpen();
  };

  const editButtonHandler = (id: number) => {
    history.push(`/edit-review/${id}`);
  };

  const getMuiTheme = () =>
    createTheme({
      overrides: {
        MUIDataTable: {
          paper: {
            boxShadow: "none",
            border: "1px solid #E2E8F0",
            borderRadius: "10px",
          },
        },
        MUIDataTableFilterList: {
          root: {
            backgroundColor: "#EDF2F7",
            margin: "0px",
            padding: "0px 16px 0px 16px",
          },
        },
        MuiToolbar: {
          root: {
            backgroundColor: "#EDF2F7",
            borderRadius: "10px 10px 0px 0px",
          },
        },
        MUIDataTableSelectCell: {
          headerCell: {
            backgroundColor: "#EDF2F7",
          },
        },
        MUIDataTableHeadCell: {
          root: {
            "& .MuiTableSortLabel-root.MuiTableSortLabel-active": {
              marginTop: "5px",
            },
          },
        },
        MuiTableFooter: {
          root: {
            "& .MuiToolbar-root": {
              backgroundColor: "white",
            },
          },
        },
      },
    });

  const getTableColumns = (): MUIDataTableColumn[] => {
    const columns: MUIDataTableColumn[] = [
      {
        name: "id",
        label: "Id",
        options: {
          display: false,
        },
      },
      {
        name: "title",
        label: "Title",
        options: {},
      },
      {
        name: "authors",
        label: "Author",
        options: {
          setCellProps: () => ({ style: { maxWidth: "420px" } }),
          customBodyRender: (value) => {
            return <Author val={value} />;
          },
        },
      },
      {
        name: "updated",
        label: "Updated",
        options: {},
      },
      {
        name: "featured",
        label: "Featured",
        options: {
          customFilterListOptions: {
            render: (v) => {
              return [`Featured: ${v}`];
            },
          },
        },
      },
      {
        name: "status",
        label: "Status",
        options: {
          customFilterListOptions: {
            render: (v) => {
              return [`Status: ${v}`];
            },
          },
          customBodyRender: (value) => {
            const colorScheme = value === "Published" ? "green" : "orange";
            return <Tag colorScheme={colorScheme}>{value}</Tag>;
          },
        },
      },
      {
        name: "actions",
        label: " ",
        options: {
          // eslint-disable-next-line
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <div>
                <Tooltip label="Edit review">
                  <IconButton
                    aria-label="edit review"
                    icon={<EditIcon color="#718096" />}
                    onClick={() => editButtonHandler(tableMeta.rowData[0])}
                  />
                </Tooltip>
                <Tooltip label="Preview">
                  <IconButton
                    aria-label="preview"
                    icon={<ViewIcon color="#718096" />}
                    onClick={() => previewButtonHandler(tableMeta.rowData[0])}
                  />
                </Tooltip>
                <Tooltip label="Delete">
                  <IconButton
                    aria-label="delete"
                    icon={<DeleteIcon color="#718096" />}
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      setDeleteReviewName(tableMeta.rowData[1]);
                      setDeleteReviewId(tableMeta.rowData[0]);
                    }}
                  />
                </Tooltip>
              </div>
            );
          },
        },
      },
    ];

    columns.forEach((column) => {
      const currColumn = column;
      const currBodyRenderFunction = (val: string) => {
        return (
          <Text
            style={{
              fontFamily: "Open Sans",
              fontSize: "16px",
            }}
          >
            {val}
          </Text>
        );
      };
      const headLabelRenderFunction = (
        columnMeta: CustomHeadLabelRenderOptions,
      ) => {
        return (
          <Text style={{ fontFamily: "Coustard", fontSize: "18px" }}>
            {columnMeta.label}
          </Text>
        );
      };
      if (currColumn.options) {
        currColumn.options.setCellHeaderProps = () => ({
          style: { backgroundColor: "#EDF2F7" },
        });
        currColumn.options.customHeadLabelRender = headLabelRenderFunction;
        if (
          currColumn.name !== "authors" &&
          currColumn.name !== "status" &&
          currColumn.name !== "actions"
        ) {
          currColumn.options.customBodyRender = currBodyRenderFunction;
        }
      }
    });
    return columns;
  };

  const getTableRows = (): ReviewRow[] => {
    const rows: ReviewRow[] = [];
    let id;
    let title;
    let authors;
    let updated;
    let featured;
    let status;

    if (data.length > 0) {
      data.forEach((review: Review) => {
        id = review.reviewId;
        const names: string[] = [];
        if (review.books.length === 1 || review.books[0].seriesName === null) {
          title = review.books[0].title;
        } else {
          title = review.books[0].seriesName;
        }
        review.books[0].authors.forEach((author) => {
          const authorDisplayName = author.displayName;
          if (authorDisplayName === null) {
            names.push(author.fullName);
          } else {
            names.push(authorDisplayName);
          }
        });
        authors = names.join(", ");
        updated = new Date(review.updatedAt).toDateString().substring(4);
        featured = review.featured ? "Yes" : "No";
        status = review.publishedAt ? "Published" : "Draft";

        const row: ReviewRow = {
          id,
          title,
          authors,
          updated,
          featured,
          status,
        };
        rows.push(row);
      });
    }
    return rows;
  };

  return (
    <Box>
      <Center>
        <Stack w="90%" mb="50">
          <Flex mt="50" mb="25">
            <Text textStyle="heading">Admin dashboard</Text>
            <Spacer />
            <Link to={CREATE_REVIEW_PAGE}>
              <Button w="159px" h="48px" colorScheme="teal">
                + Add review
              </Button>
            </Link>
          </Flex>
          <ThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={
                <Text style={{ fontFamily: "Coustard", fontSize: "22px" }}>
                  Reviews
                </Text>
              }
              data={getTableRows()}
              columns={getTableColumns()}
            />
          </ThemeProvider>
        </Stack>
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={onDeleteModalClose}
          onDelete={deleteReview}
          reviewName={deleteReviewName}
        />
        <PreviewReviewModal
          review={selectedReview}
          isOpen={isPreviewModalOpen}
          onClose={onPreviewModalClose}
        />
      </Center>
    </Box>
  );
};

export default AdminDashboard;
