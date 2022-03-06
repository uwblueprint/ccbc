import React from "react";
import { useParams } from "react-router-dom";

import CreateReview from "./CreateReview/CreateReview";

interface Params {
  id: string;
}
const EditReviewPage = (): React.ReactElement => {
  const { id } = useParams<Params>();

  return <CreateReview id={id} />;
};

export default EditReviewPage;
