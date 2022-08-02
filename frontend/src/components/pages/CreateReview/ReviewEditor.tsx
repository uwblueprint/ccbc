import "./editor.css";

import { Box } from "@chakra-ui/react";
import React from "react";
import ReactQuill from "react-quill";

/**
 * The model defining the props for the ReviewEditor component
 */
interface ReviewEditorProps {
  /** The value of the editor contents (HTML) */
  value: string;
  /** The function to call when the contents are updated */
  setValue: (value: string) => void;
  /** Boolean representing whether the component is invalid and should be highlighted red */
  isInvalid: boolean;
}

/**
 * This component is the editor for the review
 */
const ReviewEditor = (props: ReviewEditorProps): React.ReactElement => {
  const { value, setValue, isInvalid } = props;

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ header: [1, 2, 3, false] }],
      ["link", "blockquote", { list: "bullet" }, { list: "ordered" }],
    ],
  };

  return (
    <Box
      borderWidth="2px"
      borderColor={isInvalid ? "crimson" : "white"}
      borderRadius="6px"
    >
      <ReactQuill
        style={{
          borderRadius: "225px",
        }}
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        placeholder="Text here"
      />
    </Box>
  );
};

export default ReviewEditor;
