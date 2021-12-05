import {
  Box,
  Button,
  Center,
  Flex,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import MUIDataTable, { MUIDataTableColumn } from "mui-datatables";
import React from "react";

import Author from "./Author";
import data from "./mockData";

type ReviewRow = {
  title: string;
  authors: string;
  updated: string;
  featured: string;
  published: string;
};

const AdminDashboard = (): React.ReactElement => {
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
        name: "title",
        label: "Title",
        options: {},
      },
      {
        name: "authors",
        label: "Author",
        options: {
          setCellProps: () => ({ style: { maxWidth: "400px" } }),
          customBodyRender: (val) => {
            return <Author val={val} />;
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
        options: {},
      },
      {
        name: "published",
        label: "Published",
        options: {},
      },
    ];

    columns.forEach((column) => {
      if (column.options) {
        column.options.setCellHeaderProps = () => ({ style: { backgroundColor: "#EDF2F7" }})
        column.options.customHeadLabelRender = (columnMeta) => {
          return (
            <Text style={{ fontFamily: "Coustard", fontSize: "18px" }}>
              {columnMeta.label}
            </Text>
          );
        }
        if (column.name !== "authors") {
          column.options.customBodyRender = (val) => {
            return (
              <Text
                style={{
                  fontFamily: "Open Sans",
                  fontSize: "16px"
                }}
              >
                {val}
              </Text>
            );
          }
        }
      }
    });
    return columns;
  };

  const getTableRows = (): ReviewRow[] => {
    const rows: ReviewRow[] = [];
    let title;
    let authors;
    let updated;
    let featured;
    let published;

    data.forEach((review) => {
      const names: string[] = [];
      if (review.books[0].seriesName === null) {
        title = review.books[0].title;
      } else {
        title = review.books[0].seriesName;
      }
      review.books[0].authors.forEach((author: any) => {
        if (author.displayName === null) {
          names.push(author.fullName);
        } else {
          names.push(author.displayName);
        }
      });
      authors = names.join(", ");
      updated = new Date(review.updatedAt).toDateString().substring(4);
      featured = review.featured ? "Yes" : "No";
      published = review.publishedAt ? "Yes" : "No";

      const row: ReviewRow = { title, authors, updated, featured, published };
      rows.push(row);
    });
    return rows;
  };

  return (
    <Box>
      <Center>
        <Stack w="90%" mb="50">
          <Flex mt="50" mb="25">
            <Text textStyle="heading">Admin dashboard</Text>
            <Spacer />
            <Button w="159px" h="48px" colorScheme="teal">
              + Add review
            </Button>
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
      </Center>
    </Box>
  );
};

export default AdminDashboard;
