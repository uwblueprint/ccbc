import React from "react";
import { useParams } from "react-router-dom";

interface Params {
  id: string;
}
const EditReviewPage = (): React.ReactElement => {
  const { id } = useParams<Params>();

  return <div>hi {id}</div>;
};

export default EditReviewPage;
