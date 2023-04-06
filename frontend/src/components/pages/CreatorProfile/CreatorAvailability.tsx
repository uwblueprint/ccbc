import { Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import Moment from "moment";
import MomentTimezone from "moment-timezone";
import React from "react";

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
    width: "100%",
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
        style={styles.slotStyle(available ?? false)}
      />
    );
  };

  const timezone = currentCreator?.timezone;
  const now = MomentTimezone.tz.guess();
  const userOffset = Moment().tz(now).utcOffset();
  const creatorOffset = Moment()
    .tz(timezone ?? "America/Toronto")
    .utcOffset();
  const diffInHours = (creatorOffset - userOffset) / 60;

  const timeDifferenceNegative = diffInHours < 0;

  return (
    <Flex flex="1" direction="column" justify="start">
      <Text textStyle="h2" textAlign="left" fontWeight="bold">
        General availability
      </Text>
      <Text textAlign="left" mb="5">
        This is to help you get a sense of scheduling. Please contact the
        creator to inquire about details.
      </Text>
      <Grid
        templateRows="repeat(4, 1fr)"
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
        <GridItem />
        <GridItem textAlign="left" colSpan={2}>
          <Button
            bg="white"
            size="xs"
            minWidth="0"
            height="15px"
            width="15px"
            borderRadius="4px"
          />
          <Text as="span" paddingRight="20px">
            {" Busy"}
          </Text>
          <Button
            bg="#C4F1F9"
            size="xs"
            minWidth="0"
            height="15px"
            width="15px"
            borderRadius="4px"
          />
          <Text as="span">{" Available"}</Text>
        </GridItem>
        <GridItem textAlign="right" colSpan={5}>
          {timeDifferenceNegative
            ? `Note: this authors timezone is ${Math.abs(
                diffInHours,
              )}h behind of you`
            : `Note: this authors timezone is ${Math.abs(
                diffInHours,
              )}h ahead of you`}
        </GridItem>
      </Grid>
    </Flex>
    //
  );
};

export default CreatorAvailability;
