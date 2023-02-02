import { Flex, Text } from "@chakra-ui/react";
import React, { useContext } from "react";

import CreatorProfileContext from "../../../contexts/CreatorProfileContext";
import CreatorInputField from "./CreatorInputField";

interface GeneraInfoForm {
  submitted: boolean;
}

const GeneraInfoForm = ({
  submitted,
}: GeneraInfoForm): React.ReactElement => {
  const { creatorProfile } = useContext(CreatorProfileContext);

  return (
    <Flex flex="1" direction="column" justify="start">
      <Text textStyle="heading" textAlign="left" fontWeight="bold">
        General Info
      </Text>
      <Text textAlign="left" mb="5">
        This is some caption here and is a placeholder for more information.
      </Text>
      <div>

      </div>
    </Flex>
  );
};

export default GeneraInfoForm;
