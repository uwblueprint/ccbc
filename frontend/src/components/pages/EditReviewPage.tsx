import React from "react";
import { useParams } from "react-router-dom";

import CreateReview from "./CreateReview/CreateReviewPage";

/**
 * The model defining the route parameters that can be passed to
 * the Edit Review Page
 */
interface Params {
  /** The unique identifer for the Review that needs to be edited */
  id: string;
}

/**
 * The page that allows a user to edit an existing review
 */
const EditReviewPage = (): React.ReactElement => {
  const { id } = useParams<Params>();

  return <CreateReview id={id} />;
};

export default EditReviewPage;
