import { Button, FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import React, { useContext, useRef } from "react";

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

  const handleClick = () => {
    profilePicFile?.current?.click();
  };

  const handleOnChange = async () => {
    console.log("Here");
    console.log(profilePicFile)
    const profilePic = profilePicFile?.current?.files?.[0] 
    if (profilePic) {
        const Url = await uploadImage(profilePic)

        const creatorProfileObj: CreatorProfile = {
          ...creatorProfile,
        };
        creatorProfileObj[field] = Url;
        console.log(Url)
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
      <Button onClick={handleClick}>
        Choose file
      </Button>
      <input 
        type="file"
        style={{display:'none'}}
        ref={profilePicFile} 
        onChange={handleOnChange} 
      />
      {error && value === "" && required && (
        <FormErrorMessage>
          Please upload a {name.toLowerCase()}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default AddProfilePicture;
