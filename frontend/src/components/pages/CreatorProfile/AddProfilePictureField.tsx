import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Link,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";

import uploadImage from "../../../APIClients/StorageAPIClient";
import CreatorProfileContext from "../../../contexts/CreatorProfileContext";
import {
  CreatorProfile,
  CreatorProfileProps,
} from "../../../types/CreatorProfileTypes";

interface AddProfilePictureProps {
  name: string;
  value?: string;
  field: CreatorProfileProps;
  error?: boolean;
  required?: boolean;
}

const AddProfilePicture = ({
  name,
  field,
  error = false,
  value,
  required = true,
}: AddProfilePictureProps): React.ReactElement => {
  const { creatorProfile, setCreatorProfile } = useContext(
    CreatorProfileContext,
  );

  const profilePicFile = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState<string>(
    localStorage.getItem("fileName") ?? "",
  );
  const [fileSize, setFileSize] = useState<string>(
    localStorage.getItem("fileSize") ?? "0",
  );

  const handleClick = () => {
    profilePicFile?.current?.click();
  };

  const handleOnChange = async () => {
    const profilePic = profilePicFile?.current?.files?.[0];
    if (profilePic) {
      const Url = await uploadImage(profilePic);

      const creatorProfileObj: CreatorProfile = {
        ...creatorProfile,
      };
      creatorProfileObj[field] = Url;
      setFileSize(profilePic.size.toString());
      setFileName(profilePic.name);
      localStorage.setItem("fileSize", profilePic.size.toString());
      localStorage.setItem("fileName", profilePic.name);
      setCreatorProfile(creatorProfileObj);
    }
  };

  return (
    <FormControl
      isRequired={required}
      isInvalid={required && error && value === ""}
    >
      <FormLabel mb="1" mt="3">
        {name}
      </FormLabel>
      <Flex alignItems="center" columnGap="12px">
        <Box
          as="button"
          display="flex"
          flexDirection="row"
          alignItems="flex-start"
          padding="5px 10px"
          gap="10px"
          width="88px"
          height="27px"
          background="#edf2f7"
          border="1px solid #a0aec0"
          borderRadius="2px"
          _hover={{ bg: "#ebedf0" }}
          _active={{
            bg: "#dddfe2",
            transform: "scale(0.98)",
            borderColor: "#bec3c9",
          }}
          _focus={{
            boxShadow:
              "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
          }}
          onClick={handleClick}
        >
          <Text
            width="68px"
            height="17px"
            fontFamily="DM Sans"
            fontStyle="normal"
            fontWeight="400"
            fontSize="13px"
            lineHeight="17px"
            color="#718096"
            flex="none"
            order={0}
            flexGrow={0}
          >
            Choose file
          </Text>
        </Box>
        <input
          type="file"
          style={{ display: "none" }}
          ref={profilePicFile}
          onChange={handleOnChange}
        />
        {!error && value === "" && required && (
          <Text
            fontFamily="DM Sans"
            fontStyle="normal"
            fontWeight="400"
            fontSize="16px"
            color="#A0AEC0"
          >
            Browse your files for a display photo
          </Text>
        )}
        {value !== "" && (
          <Link
            href={value}
            color="#4299E1"
            textDecoration="underline"
          >{`${fileName}`}</Link>
        )}
        {value !== "" && (
          <Text
            fontFamily="DM Sans"
            fontStyle="normal"
            fontWeight="400"
            fontSize="16px"
            color="#A0AEC0"
          >
            {`${(parseInt(fileSize, 10) / 1000000).toFixed(1)} MB`}
          </Text>
        )}
      </Flex>

      {error && value === "" && required && (
        <FormErrorMessage>
          Please upload a {name.toLowerCase()}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

// TODO: Keep the state once you leave to a different step

export default AddProfilePicture;
