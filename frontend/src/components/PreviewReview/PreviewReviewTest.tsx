import { Button, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import reviewAPIClient from "../../APIClients/ReviewAPIClient";
import { ReviewResponse } from "../../types/ReviewTypes";
import PreviewReviewModal from "./PreviewReviewModal";

/**
 * A test page for testing the PreviewReviewModal
 * TODO: Remove once PreviewReviewModal is integrated
 */
const PreviewReviewTest = (): React.ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState<ReviewResponse[]>([]);

  useEffect(() => {
    reviewAPIClient.getReviews().then((allReviews: ReviewResponse[]) => {
      setData(allReviews);
    });
  }, []);

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <PreviewReviewModal review={data[0]} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default PreviewReviewTest;
