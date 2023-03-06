import { Button, Container, Flex, Grid, Icon, Text } from "@chakra-ui/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import React from "react";

interface WorkshopFormContainerProps {
  title: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactJSXElement;
  icon: ReactJSXElement;
}

const WorkshopFormContainer = ({
  isOpen,
  children,
  title,
  setIsOpen,
  icon
}: WorkshopFormContainerProps): ReactJSXElement => {
  return (
    <Flex direction="column">
      <Flex alignItems="center">
        <Grid
          w="50px"
          h="50px"
          marginRight="16px"
          borderRadius="50%"
          bg="gray.300"
          placeItems="center"
        >
          {icon}
        </Grid>
        <Text as="b" fontSize="xl" marginRight="32px">
          {title}
        </Text>
        <Button
          color="blue.400"
          onClick={() => setIsOpen((open: boolean) => !open)}
        >
          {isOpen ? "Save details" : "Add details"}
        </Button>
      </Flex>
      <Container p="24px 0px 24px 48px">
        {isOpen ? (
          <Container>{children}</Container>
        ) : (
          <Flex>
            <Text color="gray.300">
              No information to display yet! Add details to populate this
              section.
            </Text>
          </Flex>
        )}
      </Container>
    </Flex>
  );
};

export default WorkshopFormContainer;
