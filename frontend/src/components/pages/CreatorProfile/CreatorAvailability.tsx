

import { Button, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React, { useContext } from "react";

import checkMarkActive from "../../../assets/checkmark-active.svg";
import checkMarkInactive from "../../../assets/checkmark-inactive.svg";
import { Creator } from "../../../types/CreatorTypes";

interface CreatorPublicationsProps {
    currentCreator: Creator;
  }

const slots = [
  "SundayMorning",
  "MondayMorning",
  "TuesdayMorning",
  "WednesdayMorning",
  "ThursdayMorning",
  "FridayMorning",
  "SaturdayMorning",
  "SundayAfternoon",
  "MondayAfternoon",
  "TuesdayAfternoon",
  "WednesdayAfternoon",
  "ThursdayAfternoon",
  "FridayAfternoon",
  "SaturdayAfternoon",
];

const styles = {
  slotStyle: (available: boolean) => ({
    backgroundColor: available ? "#C4F1F9" : "#FFFFFF",
    height: "46px",
    width: "100%"
  }),
  gridTopHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  gridSideHeader: {
    display: "flex",
    alignItems: "center",
  },
};

const CreatorAvailability = ({
    currentCreator,
}: CreatorPublicationsProps): React.ReactElement => {

  const createAvailabilitySlot = (slot: string) => {
    const available = currentCreator?.availability?.includes(slot);
    return (
      <GridItem 
        textAlign="center" 
        style={styles.slotStyle(available ?? false) } 
      />
    );
  };

  return (
    <Flex flex="1" direction="column" justify="start">
      <Text textStyle="h2" textAlign="left" fontWeight="bold">
        General availability
      </Text>
      <Text textAlign="left" mb="5">
        This is to help you get a sense of scheduling. Please contact the creator to inquire about details.
      </Text>
      <Grid
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(8, 1fr)"
        gap="4px"
        width="100%"
      >
        <GridItem />
        <GridItem style={styles.gridTopHeader}>Sun</GridItem>
        <GridItem style={styles.gridTopHeader}>Mon</GridItem>
        <GridItem style={styles.gridTopHeader}>Tues</GridItem>
        <GridItem style={styles.gridTopHeader}>Wed</GridItem>
        <GridItem style={styles.gridTopHeader}>Thurs</GridItem>
        <GridItem style={styles.gridTopHeader}>Fri</GridItem>
        <GridItem style={styles.gridTopHeader}>Sat</GridItem>
        <GridItem style={styles.gridSideHeader}>Morning</GridItem>
        {slots.slice(0, 7).map((slot) => {
          return createAvailabilitySlot(slot);
        })}
        <GridItem style={styles.gridSideHeader}>Afternoon</GridItem>
        {slots.slice(7).map((slot) => {
          return createAvailabilitySlot(slot);
        })}
      </Grid>
    </Flex>
    //
  );
};

export default CreatorAvailability;
