import { Button, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React, { useContext } from "react";

import checkMarkActive from "../../../assets/checkmark-active.svg";
import checkMarkInactive from "../../../assets/checkmark-inactive.svg";
import CreatorProfileContext from "../../../contexts/CreatorProfileContext";
import { CreatorProfile } from "../../../types/CreatorProfileTypes";
import CreatorInputField from "./CreatorInputField";

interface AvailabilityFormProps {
  submitted: boolean;
}

const availableSlots = [
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
  button: (active: boolean) => ({
    backgroundColor: active ? "#EBF8FF" : "#F7FAFC",
    border: active ? "1px solid #4299E1" : "1px solid #CBD5E0",
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

const AvailabilityForm = ({
  submitted,
}: AvailabilityFormProps): React.ReactElement => {
  const { creatorProfile, setCreatorProfile } = useContext(
    CreatorProfileContext,
  );

  const onClick = (data: string) => {
    let updatedAvailability;
    if (creatorProfile?.availability) {
      updatedAvailability = [...creatorProfile?.availability];
      if (creatorProfile?.availability.includes(data)) {
        updatedAvailability = updatedAvailability.filter(
          (slot) => slot !== data,
        );
      } else {
        updatedAvailability.push(data);
      }
    }

    const updatedCreatorProfile: CreatorProfile = {
      ...creatorProfile,
      availability: creatorProfile?.availability ? updatedAvailability : [data],
    };
    setCreatorProfile(updatedCreatorProfile);
  };

  const createAvailabilityButton = (slot: string) => {
    const active = creatorProfile?.availability?.includes(slot);
    return (
      // eslint-disable-next-line react/jsx-key
      <GridItem textAlign="center">
        <Button
          style={styles.button(active ?? false)}
          width="100%"
          borderRadius="4px"
          onClick={() => onClick(slot)}
        >
          <Image src={active ? checkMarkActive : checkMarkInactive} />
        </Button>
      </GridItem>
    );
  };

  return (
    <Flex flex="1" direction="column" justify="start">
      <Text textStyle="heading" textAlign="left" fontWeight="bold">
        Availability
      </Text>
      <Text textAlign="left" mb="7">
        Provide general details around your geographic location and time
        availbility.
      </Text>

      <CreatorInputField
        name="Geographic reach"
        value={creatorProfile?.location}
        selectOptions={["Locally", "Regionally", "Provincially", "Nationally"]}
        field="location"
        error={submitted}
        width="33%"
      />
      <CreatorInputField
        name="Primary timezone"
        value={creatorProfile?.timezone}
        selectOptions={[
          "(GMT-7) Pacific Time",
          "(GMT-6) Mountain Time",
          "(GMT-5) Central Time",
          "(GMT-4) Eastern Time",
          "(GMT-3) Atlantic Time",
          "(GMT-2:30) Newfoundland Time",
        ]}
        field="timezone"
        error={submitted}
        width="33%"
        mb="7"
      />
      <Text textStyle="h2" textAlign="left" fontWeight="bold">
        General availability
      </Text>
      <Text textAlign="left" mb="5">
        Please select your preferred availability for bookings below. Note that
        this serves just to help bookers gauge your schedule and is not a
        calendar booker. <span style={{ color: "red" }}>*</span>
      </Text>
      <Grid
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(8, 1fr)"
        gap="2"
        width="90%"
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
        {availableSlots.slice(0, 7).map((slot) => {
          return createAvailabilityButton(slot);
        })}
        <GridItem style={styles.gridSideHeader}>Afternoon</GridItem>
        {availableSlots.slice(7).map((slot) => {
          return createAvailabilityButton(slot);
        })}
      </Grid>
    </Flex>
    //
  );
};

export default AvailabilityForm;
