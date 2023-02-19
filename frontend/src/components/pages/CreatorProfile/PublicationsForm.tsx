/* eslint-disable react/jsx-props-no-spreading */
import { AddIcon } from "@chakra-ui/icons";
import { Button, Divider, Flex, IconButton, Text } from "@chakra-ui/react";
import { makeStyles } from "@material-ui/core";
import { filesize } from "filesize";
import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { DropzoneRootProps, FileWithPath, useDropzone } from "react-dropzone";
import { CgClose } from "react-icons/cg";
import { IoReorderTwoOutline } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";

import { BibliographyEntry } from "../../../types/CreatorProfileTypes";
import BibliographyInputField from "./BibliographyInputField";

const useStyles = makeStyles({
  fileUploadArea: {
    padding: "60px 0px",
    border: "1px #718096 dashed",
    borderRadius: "4px",
    height: "155px",
    backgroundColor: "#F7FAFC",
    margin: "16px 0px",
    "&:hover": {
      backgroundColor: "#EBF8FF",
      borderColor: "3182CE",
      cursor: "pointer",
    },
  },
});

interface PublicationsFormProps {
  submitted: boolean;
}

const PublicationsForm = ({
  submitted,
}: PublicationsFormProps): React.ReactElement => {
  const classes = useStyles();
  const [bibliography, setBibliography] = useState<BibliographyEntry[]>([]);
  const [acceptedCovers, setAcceptedCovers] = useState<FileWithPath[]>([]);
  const [curBookAdded, setCurBookAddded] = useState<boolean>(false);

  const [titleInput, setTitleInput] = useState<string>("");
  const [publisherInput, setPublisherInput] = useState<string>("");
  const [publicationYearInput, setPublicationYearInput] = useState<
    number | undefined
  >();
  const [additionalNotesInput, setAdditionalNotesInput] = useState<string>("");

  // const fileStorageService = new FileStorageService("test");

  // Handle cover upload
  const onDrop = (acceptedFiles: any) => {
    setAcceptedCovers((oldAcceptedCovers) =>
      oldAcceptedCovers.concat(...acceptedFiles),
    );
    acceptedFiles.forEach((file: any) => {
      // fileStorageService.createFile(file.name, file.path, file.type)
    });
  };

  const Dropzone = ({ ...props }: DropzoneRootProps) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      noDragEventsBubbling: true,
    });

    return (
      <div>
        <div
          {...getRootProps({ className: "dropzone" })}
          className={classes.fileUploadArea}
        >
          <input {...getInputProps()} />
          <Flex justifyContent="center">
            {isDragActive ? (
              <p>Release to drop the files here</p>
            ) : (
              <Flex alignItems="center">
                <p>Drag and drop files, or </p>
                <Text
                  textDecoration="underline"
                  color="#4299E1"
                  p="2px"
                  mx="2px"
                >
                  browse
                </Text>
                <p>to upload</p>
              </Flex>
            )}
          </Flex>
        </div>
      </div>
    );
  };

  // Handle bibliography list reordering
  const handleOnDragEnd = (res: DropResult) => {
    if (!res.destination) return;

    const items = Array.from(bibliography);
    const [reorderedItem] = items.splice(res.source.index, 1);
    items.splice(res.destination.index, 0, reorderedItem);

    setBibliography(items);
  };

  // Add new bibliography entry
  const handleAddBibEntry = () => {
    if (titleInput && publisherInput && publicationYearInput) {
      setBibliography([
        ...bibliography,
        {
          title: titleInput,
          publisher: publisherInput,
          publicationYear: publicationYearInput,
          additionalNotes: additionalNotesInput,
        },
      ]);
      setTitleInput("");
      setPublisherInput("");
      setPublicationYearInput("");
      setAdditionalNotesInput("");
      setCurBookAddded(false);
    } else {
      setCurBookAddded(true);
    }
  };

  return (
    <Flex flex="1" direction="column" justify="start" width="776px">
      <Text textStyle="heading" textAlign="left" fontWeight="bold">
        Publications
      </Text>
      <Text textAlign="left" mb="5">
        Here you can add book covers to be displayed on your profile and build
        your bibliography.
      </Text>
      <Text textStyle="h2" textAlign="left" fontWeight="bold">
        Book Covers
      </Text>
      <Dropzone onDrop={onDrop} accept={"image/*"} />
      {acceptedCovers.map((cover, index) => {
        return (
          <Flex
            direction="row"
            key={index}
            justifyContent="space-between"
            flexWrap="wrap"
            alignItems="center"
          >
            <Flex
              direction="row"
              gap="8px"
              flexWrap="wrap"
              alignItems="flex-end"
            >
              <Text color="#4299E1" textDecoration="underline">
                {cover.name}
              </Text>
              <Text color="#718096" fontSize="13px">
                {filesize(cover.size)}
              </Text>
            </Flex>
            <IconButton
              aria-label="Delete file"
              icon={<CgClose />}
              onClick={() => {
                const temp = acceptedCovers;
                temp.splice(index, 1);
                setAcceptedCovers([...temp]);
              }}
              size="sm"
            />
          </Flex>
        );
      })}
      <Text
        textStyle="h2"
        textAlign="left"
        fontWeight="bold"
        mb="16px"
        mt="36px"
      >
        Bibliography
      </Text>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="bibliography">
          {(provided: any) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ listStyleType: "none" }}
            >
              {bibliography.map(
                (
                  { title, publisher, publicationYear, additionalNotes },
                  index,
                ) => {
                  return (
                    <Draggable key={title} draggableId={title} index={index}>
                      {(x: any, snapshot: any) => (
                        <li
                          ref={x.innerRef}
                          {...x.draggableProps}
                          {...x.dragHandleProps}
                        >
                          <Flex
                            justifyContent="space-between"
                            style={{
                              backgroundColor: snapshot.isDragging
                                ? "#d8f5f3"
                                : "",
                            }}
                            mb="16px"
                          >
                            <Flex alignItems="center">
                              <Divider
                                orientation="vertical"
                                height="62px"
                                borderWidth="0px 3px"
                                mr="22px"
                              />
                              <Text>
                                <b>
                                  {title}, {publisher}, {publicationYear}
                                </b>
                                <br />
                                <i>{additionalNotes}</i>
                              </Text>
                            </Flex>
                            <Flex alignItems="center">
                              <IconButton
                                aria-label="Delete entry"
                                icon={
                                  <MdOutlineDeleteOutline
                                    style={{ scale: "130%" }}
                                  />
                                }
                                onClick={() => {
                                  const tempBib = bibliography;
                                  setBibliography(
                                    tempBib.filter(
                                      (entry) => entry.title !== title,
                                    ),
                                  );
                                }}
                              />
                              <IoReorderTwoOutline style={{ scale: "130%" }} />
                            </Flex>
                          </Flex>
                        </li>
                      )}
                    </Draggable>
                  );
                },
              )}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <Flex>
        <Divider
          orientation="vertical"
          height="196px"
          borderWidth="3px"
          mr="22px"
        />
        <Flex direction="column" width="100%" alignSelf="center">
          <Flex gap="3" width="100%">
            <BibliographyInputField
              name="Title"
              placeholder="Enter the book title"
              value={titleInput}
              error={submitted || curBookAdded}
              onChange={(e) => {
                setTitleInput(e.target.value);
              }}
            />
            <Flex w="1" />
            <Flex w="66%">
              <BibliographyInputField
                name="Publisher"
                placeholder="Enter the publisher name"
                value={publisherInput}
                error={submitted || curBookAdded}
                onChange={(e) => {
                  setPublisherInput(e.target.value);
                }}
              />
            </Flex>
          </Flex>
          <Flex gap="3">
            <Flex w="26%">
              <BibliographyInputField
                name="Publication Year"
                placeholder="Enter the year"
                value={publicationYearInput}
                // value={creatorProfile?.publicationYear}
                error={submitted || curBookAdded}
                numberInput
                onChange={(e) => {
                  setPublicationYearInput(e.target.value);
                }}
              />
            </Flex>
            <Flex w="1" />
            <BibliographyInputField
              name="Additional Notes"
              placeholder="Enter any additional details (ex. awards, formats, availability)"
              value={additionalNotesInput}
              // value={creatorProfile?.additionalNotes}
              optional
              onChange={(e) => {
                setAdditionalNotesInput(e.target.value);
              }}
            />
          </Flex>
        </Flex>
      </Flex>
      <Button
        leftIcon={<AddIcon />}
        color="#4299E1"
        fontWeight={400}
        alignSelf="flex-start"
        px="6px"
        mt="8px"
        onClick={handleAddBibEntry}
      >
        Another book
      </Button>
    </Flex>
  );
};

export default PublicationsForm;
