import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";

import PreviewReviewModal from "../PreviewReviewModal";

/**
 * A test page for testing the PreviewReviewModal
 * TODO: Remove once PreviewReviewModal is integrated
 */
const PreviewReviewTest = (): React.ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <PreviewReviewModal
        title="Cat in the Hat"
        subtitle="Adventures of the Cat in the Hat"
        writtenBy="Sophia Spencer and Pencer Spencer"
        reviewedBy="Border Porterson"
        publisher="Publisher Fitzsherbur, 2014"
        isbn="Soft cover, 978-3-16-148410-0"
        bookType="Picture book"
        ageDesciption="Ages 3-6"
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute
        irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur."
        tags={["Cheerful", "Pain", "Cats"]}
        coverUrl="https://upload.wikimedia.org/wikipedia/en/1/10/The_Cat_in_the_Hat.png"
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default PreviewReviewTest;
