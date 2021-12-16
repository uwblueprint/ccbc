import React from "react";

import AddNewInput from "../AddNewInput";
import Tags from "../Tags";

const CreateReview = (): React.ReactElement => {
  return (
    <div style={{ textAlign: "left", width: "25%", margin: "0px auto" }}>
      <h1>Create Review Page!</h1>
      <Tags />
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
