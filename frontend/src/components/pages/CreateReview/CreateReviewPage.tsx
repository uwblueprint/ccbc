import React, { useState } from "react";

import { Option } from "../../../types/TagTypes";
import AddNewInput from "./AddNewInput";
import Tags from "./Tags";

const CreateReview = (): React.ReactElement => {
  const [tagsSelected, setTagsSelected] = useState<Option[]>([]);

  const handleTagSelected = (e: Option[]) => {
    setTagsSelected(e);
  };

  return (
    <div style={{ textAlign: "left", width: "25%", margin: "0px auto" }}>
      <h1>Create Review Page!</h1>
      <Tags tagsSelected={tagsSelected} handleSelected={handleTagSelected} />
      <AddNewInput
        id="authors"
        label="Author"
        name="author-name"
        placeholder="Text Here"
        required
      />
    </div>
  );
};

export default CreateReview;
