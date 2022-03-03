import "./editor.css";

import { Box } from "@chakra-ui/react";
import React from "react";
import ReactQuill from "react-quill";

const ReviewEditor = ({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}): React.ReactElement => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ header: [1, 2, 3, false] }],
      ["link", "blockquote", "image", { list: "bullet" }, { list: "ordered" }],
    ],
  };

  return (
    <Box>
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
