import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import MUIDataTable, {
  CustomHeadLabelRenderOptions,
  MUIDataTableColumn,
} from "mui-datatables";
import React, { useEffect, useState } from "react";

import creatorAPIClient from "../../../APIClients/CreatorAPIClient";
import { Creator } from "../../../types/CreatorProfileTypes";
import LoadingSpinner from "../../common/LoadingSpinner";
import useToasts from "../../Toast";
import ApproveConfirmationModal from "./ApproveConfirmationModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

type CreatorRow = {
  id: number;
  name: string;
  email: string;
  isApproved: boolean;
  createdAt: string;
};

const AdminCreatorProfiles = (): React.ReactElement => {
  const [data, setData] = useState<Creator[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [DeleteProfileName, setDeleteProfileName] = useState("");
  const [DeleteProfileId, setDeleteProfileId] = useState(-1);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [ApproveProfileName, setApproveProfileName] = useState("");
  const [ApproveProfileId, setApproveProfileId] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const newToast = useToasts();

  useEffect(() => {
    setIsLoading(true);
    creatorAPIClient.getCreators().then((resp: Creator[]) => {
      console.log(resp);
      if (!resp) {
        setData([]);
      } else {
        setData(resp || []);
      }
      setIsLoading(false);
    });
  }, []);

  const getIndex = (id: number) => {
    return data.findIndex((element) => element.id === id);
  };

  const DeleteProfile = async () => {
    try {
      setIsLoading(true);
      await creatorAPIClient.deleteCreator(DeleteProfileId);
      const newData = [...data];
      const DeleteProfileIndex = getIndex(DeleteProfileId);
      newData.splice(DeleteProfileIndex, 1);
      setData(newData);
      newToast("success", "Creator removed", "This creator has been removed");
    } catch (e) {
      newToast(
        "error",
        "Error removing creator",
        "Something went wrong, please refresh the page and try again.",
      );
    }
    setIsLoading(false);
  };

  const ApproveProfile = async () => {
    try {
      setIsLoading(true);
      await creatorAPIClient.approveCreator(ApproveProfileId);
      const newData = [...data];
      const ApproveProfileIndex = getIndex(ApproveProfileId);
      newData[ApproveProfileIndex].isApproved = true;
      setData(newData);
      newToast("success", "Creator approved", "This creator has been approved");
    } catch (e) {
      newToast(
        "error",
        "Error approving creator",
        "Something went wrong, please refresh the page and try again.",
      );
    }
    setIsLoading(false);
  };

  const onDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
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
        name: "name",
        label: "Creator",
        options: {
          setCellProps: () => ({ style: { minWidth: "220px" } }),
        },
      },
      {
        name: "email",
        label: "Email",
        options: {
          setCellProps: () => ({ style: { minWidth: "220px" } }),
        },
      },
      {
        name: "createdAt",
        label: "Date Created",
        options: {},
      },
      {
        name: "isApproved",
        label: "Is Approved",
        options: {
          display: false,
        },
      },
      {
        name: "actions",
        label: "Actions",
        options: {
          // eslint-disable-next-line
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <div>
                {tableMeta.rowData[4] ? (
                  <>
                    <Tooltip label="Edit review">
                      <IconButton
                        aria-label="edit creator"
                        icon={<EditIcon color="#718096" />}
                        onClick={() => {}}
                      />
                    </Tooltip>
                    <Tooltip label="Delete">
                      <IconButton
                        aria-label="delete"
                        icon={<DeleteIcon color="#718096" />}
                        onClick={() => {
                          setIsDeleteModalOpen(true);
                          setDeleteProfileName(tableMeta.rowData[1]);
                          setDeleteProfileId(tableMeta.rowData[0]);
                        }}
                      />
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <Button
                      color="green.500"
                      onClick={() => {
                        setIsApproveModalOpen(true);
                        setApproveProfileName(tableMeta.rowData[1]);
                        setApproveProfileId(tableMeta.rowData[0]);
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      color="red.500"
                      onClick={() => {
                        setIsDeleteModalOpen(true);
                        setDeleteProfileName(tableMeta.rowData[1]);
                        setDeleteProfileId(tableMeta.rowData[0]);
                      }}
                    >
                      Reject
                    </Button>
                  </>
                )}
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

  const getTableRows = (): CreatorRow[] => {
    const rows: CreatorRow[] = [];
    let created;

    if (data.length > 0) {
      data.forEach((creator: Creator) => {
        created = new Date(creator.createdAt).toDateString().substring(4);

        const row: CreatorRow = {
          id: creator.id,
          name: "Full Name",
          email: "Email",
          isApproved: creator.isApproved,
          createdAt: created,
        };
        rows.push(row);
      });
    }
    return rows;
  };

  return (
    <Box>
      {isLoading ? (
        <LoadingSpinner h="20%" />
      ) : (
        <ThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title={
              <Text style={{ fontFamily: "Coustard", fontSize: "22px" }}>
                Creators
              </Text>
            }
            data={getTableRows()}
            columns={getTableColumns()}
          />
        </ThemeProvider>
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
        onDelete={DeleteProfile}
        authorName={DeleteProfileName}
      />
      <ApproveConfirmationModal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        onApprove={ApproveProfile}
        authorName={ApproveProfileName}
      />
    </Box>
  );
};

export default AdminCreatorProfiles;
