/* eslint-disable react/jsx-props-no-spreading */
import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Divider,
  Flex,
  IconButton,
  Link,
  Progress,
  Text,
} from "@chakra-ui/react";
import { makeStyles } from "@material-ui/core";
import { filesize } from "filesize";
import React, { useContext, useState } from "react";
import { DropzoneRootProps, useDropzone } from "react-dropzone";
import { CgClose } from "react-icons/cg";

import uploadImage from "../../../../APIClients/StorageAPIClient";
import CreatorProfileContext from "../../../../contexts/CreatorProfileContext";
import {
  BookCoverFile,
  CreatorProfile,
} from "../../../../types/CreatorProfileTypes";
import { Publication } from "../../../../types/CreatorTypes";
import CreatorProfileNav from "../CreatorProfileNav";
import BibliographyDragAndDrop from "./BibliographyDragAndDrop";
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
  handleNav: (direction: number) => void;
}

const PublicationsForm = ({
  handleNav,
}: PublicationsFormProps): React.ReactElement => {
  const classes = useStyles();
  const { creatorProfile, setCreatorProfile } = useContext(
    CreatorProfileContext,
  );

  const [error, setError] = useState<boolean>(false);

  const [formInputs, setFormInputs] = useState<Publication>({
    title: "",
    publisher: "",
    publication_year: String(new Date().getFullYear()),
    notes: "",
  });

  // Cover upload status
  const [curLoading, setCurLoading] = useState<number>(1);
  const [totalLoading, setTotalLoading] = useState<number>(0);

  const setBookCovers = (covers: BookCoverFile[]) => {
    const creatorProfileObj: CreatorProfile = {
      ...creatorProfile,
    };
    creatorProfileObj.bookCovers = [...covers];
    setCreatorProfile(creatorProfileObj);
  };

  const handleCoverUpload = async (acceptedFiles: any) => {
    const newCovers: BookCoverFile[] = [];
    setTotalLoading(acceptedFiles.length);

    for (let i = 0; i < acceptedFiles.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const url = await uploadImage(acceptedFiles[i]);
      newCovers[i] = {
        url,
        name: acceptedFiles[i].name,
        fileSize: acceptedFiles[i].size,
      };
      setCurLoading((count) => count + 1);
    }
    setBookCovers([...(creatorProfile?.bookCovers ?? [])].concat(newCovers));

    setCurLoading(1);
    setTotalLoading(0);
  };

  const handleCoverDelete = (cover: BookCoverFile, index: number) => {
    const temp = creatorProfile?.bookCovers ?? [];
    temp.splice(index, 1);
    setBookCovers([...temp]);
  };

  const setBibliography = (bib: Publication[]) => {
    const creatorProfileObj: CreatorProfile = {
      ...creatorProfile,
    };
    creatorProfileObj.publications = [...bib];
    setCreatorProfile(creatorProfileObj);
  };

  const handleAddBibEntry = (): boolean => {
    if (
      formInputs.title &&
      formInputs.publisher &&
      formInputs.publication_year
    ) {
      setBibliography([
        ...(creatorProfile?.publications ?? []),
        {
          title: formInputs.title,
          publisher: formInputs.publisher,
          publication_year: formInputs.publication_year,
          notes: formInputs.notes,
        },
      ]);
      setFormInputs({
        title: "",
        publisher: "",
        publication_year: String(new Date().getFullYear()),
        notes: "",
      });
      setError(false);
      return true;
    }
    setError(true);
    return false;
  };

  const Dropzone = ({ ...props }: DropzoneRootProps) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: handleCoverUpload,
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

  return (
    <>
      <Center borderLeftWidth="thin" borderLeftColor="gray.200" px="16">
        <Flex flex="1" direction="column" justify="start" width="776px">
          <Text textStyle="heading" textAlign="left" fontWeight="bold">
            Publications
          </Text>
          <Text textAlign="left" mb="5">
            Here you can add book covers to be displayed on your profile and
            build your bibliography.
          </Text>
          <Text textStyle="h2" textAlign="left" fontWeight="bold">
            Book Covers
          </Text>
          <Dropzone onDrop={handleCoverUpload} accept={"image/*"} />
          {(creatorProfile?.bookCovers ?? []).map((cover, index) => {
            return (
              <Flex
                direction="row"
                key={`cover-${index}`}
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
                  <Link
                    color="#4299E1"
                    textDecoration="underline"
                    href={cover.url}
                    target="_blank"
                  >
                    {cover.name}
                  </Link>
                  <Text color="#718096" fontSize="13px">
                    {filesize(cover.fileSize)}
                  </Text>
                </Flex>
                <IconButton
                  aria-label="Delete file"
                  icon={<CgClose />}
                  onClick={() => {
                    handleCoverDelete(cover, index);
                  }}
                  size="sm"
                />
              </Flex>
            );
          })}
          {totalLoading > 0 && (
            <>
              <Text mt="8px">
                Uploading: {curLoading} of {totalLoading}
              </Text>
              <Progress value={(curLoading / totalLoading) * 100} />
            </>
          )}
          <Text
            textStyle="h2"
            textAlign="left"
            fontWeight="bold"
            mb="16px"
            mt="36px"
          >
            Bibliography
          </Text>
          <BibliographyDragAndDrop />
          <Flex>
            <Divider
              orientation="vertical"
              height="196px"
              borderWidth="3px"
              mr="22px"
            />
            <Flex direction="column" width="100%" gap="12px">
              <Flex gap="3" width="100%">
                <BibliographyInputField
                  name="Title"
                  placeholder="Enter the book title"
                  value={formInputs.title}
                  error={error}
                  onChange={(e) => {
                    setFormInputs({
                      ...formInputs,
                      title: e.target.value,
                    });
                  }}
                />
                <Flex w="1" />
                <Flex w="66%">
                  <BibliographyInputField
                    name="Publisher"
                    placeholder="Enter the publisher name"
                    value={formInputs.publisher}
                    error={error}
                    onChange={(e) => {
                      setFormInputs({
                        ...formInputs,
                        publisher: e.target.value,
                      });
                    }}
                  />
                </Flex>
              </Flex>
              <Flex gap="3">
                <Flex w="26%">
                  <BibliographyInputField
                    name="Publication Year"
                    placeholder="Enter the year"
                    value={formInputs.publication_year}
                    error={error}
                    numberInput
                    onChange={(e) => {
                      setFormInputs({
                        ...formInputs,
                        publication_year: e.target.value,
                      });
                    }}
                  />
                </Flex>
                <Flex w="1" />
                <BibliographyInputField
                  name="Additional Notes"
                  placeholder="Enter any additional details (ex. awards, formats, availability)"
                  value={formInputs.notes}
                  optional
                  onChange={(e) => {
                    setFormInputs({
                      ...formInputs,
                      notes: e.target.value,
                    });
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
            Save book
          </Button>
        </Flex>
      </Center>
      <CreatorProfileNav
        activeForm={3}
        handleNav={handleNav}
        saveAndExit={() => {
          let addedNew = false;
          if (
            // Check for unsaved changes
            formInputs.title ||
            formInputs.publisher ||
            formInputs.publication_year !== String(new Date().getFullYear()) ||
            formInputs.notes
          ) {
            addedNew = handleAddBibEntry();
          }
          if (
            // Check for missing covers or info
            creatorProfile?.bookCovers?.length !==
            (creatorProfile?.publications?.length ?? 0)
          ) {
            // eslint-disable-next-line no-alert
            alert(
              "Please ensure the number of book covers uploaded matches the number of bibliography entries or try again.",
            );
            return false;
          }
          return true;
        }}
      />
    </>
  );
};

export default PublicationsForm;
