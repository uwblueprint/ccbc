import { Button } from "@chakra-ui/react";
import React, { useState } from "react";

import { Option } from "../../../types/TagTypes";
import AddNewInput from "./AddNewInput";
import BookModal from "./BookModal";

const CreateReview = (): React.ReactElement => {
  const [tagsSelected, setTagsSelected] = useState<Option[]>([]);
  const [showBookModal, setShowBookModal] = useState<boolean>(false);

  const onClose = () => setShowBookModal(false);

  const handleTagSelected = (e: Option[]) => {
    setTagsSelected(e);
  };

  return (
    <div style={{ textAlign: "left", width: "25%", margin: "0px auto" }}>
      <h1>Create Review Page!</h1>
      <Button onClick={() => setShowBookModal(true)}>Add new book</Button>

      <BookModal
        isOpen={showBookModal}
        onClose={onClose}
        tagsSelected={tagsSelected}
        handleSelected={handleTagSelected}
      />

      <AddNewInput
        id="authors"
        label="Author"
        name="author-name"
        required
        canAddNewInput
      />
    </div>
  );
};

export default CreateReview;
