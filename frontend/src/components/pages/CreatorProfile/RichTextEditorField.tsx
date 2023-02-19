import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import ReactQuill from "react-quill";

import CreatorProfileContext from "../../../contexts/CreatorProfileContext";
import {
  CreatorProfile,
  CreatorProfileProps,
} from "../../../types/CreatorProfileTypes";

interface AddRichTextEditorProps {
  name: string;
  value?: string;
  field: CreatorProfileProps;
  placeholder?: string;
  error?: boolean;
//   width?: string;
  required?: boolean;
}

const AddRichTextEditor = ({
  name,
  field,
  placeholder,
  error = false,
  value,
  required = true,
}: AddRichTextEditorProps): React.ReactElement => {
  const { creatorProfile, setCreatorProfile } = useContext(
    CreatorProfileContext,
  );

  const handleOnChange = (content: string) => {
    const creatorProfileObj: CreatorProfile = {
      ...creatorProfile,
    };
    creatorProfileObj[field] = content;
    setCreatorProfile(creatorProfileObj);
  };

  return (
    <FormControl
      isRequired={required}
      isInvalid={required && error && value === ""}
    >
      <FormLabel mb="1" mt="3">
        {name}
      </FormLabel>
      <ReactQuill
        theme="snow"
        value={value}
        placeholder={placeholder || `Enter your ${name.toLowerCase()} here`}
        onChange={handleOnChange}
      />
      {error && value === "" && required && (
        <FormErrorMessage>
          Please enter your {name.toLowerCase()}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default AddRichTextEditor;
