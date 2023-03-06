import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import { DeltaStatic, Sources } from "quill";
import React, { useContext, useRef, useState } from "react";
import ReactQuill, { UnprivilegedEditor } from "react-quill";

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
  required?: boolean;
  charLimit?: number;
}

const AddRichTextEditor = ({
  name,
  field,
  placeholder,
  error = false,
  value,
  required = true,
  charLimit = Number.MAX_VALUE,
}: AddRichTextEditorProps): React.ReactElement => {
  const { creatorProfile, setCreatorProfile } = useContext(
    CreatorProfileContext,
  );

  const charCount = useRef(0);
  const quillRef = useRef<ReactQuill>(null);

  const handleOnChange = (
    content: string,
    _deltaOp: DeltaStatic,
    _sources: Sources,
    editor: UnprivilegedEditor,
  ) => {
    const creatorProfileObj: CreatorProfile = {
      ...creatorProfile,
    };
    if (content === "<p><br></p>") {
      // This content counts as empty (happens when user inputs something then deletes it)
      charCount.current = 0;
      creatorProfileObj[field] = "";
      setCreatorProfile(creatorProfileObj);
    } else if (editor.getLength() - 1 > charLimit) {
      quillRef?.current?.getEditor().deleteText(charLimit, editor.getLength());
      charCount.current = charLimit;
    } else {
      charCount.current = editor.getLength() - 1;
      creatorProfileObj[field] = content;
      setCreatorProfile(creatorProfileObj);
    }
  };

  return (
    <FormControl
      isRequired={required}
      isInvalid={required && error && value === ""}
      width="100%"
    >
      <FormLabel mb="1" mt="3">
        {name}
      </FormLabel>
      <ReactQuill
        theme="snow"
        value={value}
        placeholder={placeholder || `Enter your ${name.toLowerCase()} here`}
        ref={quillRef}
        onChange={handleOnChange}
      />

      {charLimit !== Number.MAX_VALUE && (
        <Text
          align="right"
          fontFamily="DM Sans"
          fontStyle="normal"
          fontWeight="400"
          fontSize="13px"
          color="#A0AEC0"
          lineHeight="17px"
          mt="7px"
        >
          {`${charCount.current}/${charLimit} characters`}
        </Text>
      )}
      {charLimit === Number.MAX_VALUE && (
        <Text
          align="right"
          fontFamily="DM Sans"
          fontStyle="normal"
          fontWeight="400"
          fontSize="13px"
          color="#A0AEC0"
          lineHeight="17px"
          mt="7px"
        >
          {`${charCount.current} characters`}
        </Text>
      )}

      {error && value === "" && required && (
        <FormErrorMessage>
          Please enter your {name.toLowerCase()}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default AddRichTextEditor;
