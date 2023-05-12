import { Flex, Text } from "@chakra-ui/react";
import React, { useContext } from "react";

import CreatorProfileContext from "../../../contexts/CreatorProfileContext";
import CreatorInputField from "./CreatorInputField";

interface ContactInfoProps {
  submitted: boolean;
}

const ContactInfoForm = ({
  submitted,
}: ContactInfoProps): React.ReactElement => {
  const { creatorProfile } = useContext(CreatorProfileContext);

  return (
    <Flex flex="1" direction="column" justify="start">
      <Text textStyle="heading" textAlign="left" fontWeight="bold">
        Contact Info
      </Text>
      <Text textAlign="left" mb="5">
        This info is for CCBC record keeping purposes and will not be displayed
        on your profile.
      </Text>
      <div>
        <CreatorInputField
          name="First name"
          value={creatorProfile?.firstName}
          field="firstName"
          error={submitted}
          width="33%"
        />
        <CreatorInputField
          name="Last name"
          value={creatorProfile?.lastName}
          field="lastName"
          error={submitted}
          width="33%"
        />
        <CreatorInputField
          name="Email address"
          placeholder="ex. johndoe@gmail.com"
          value={creatorProfile?.email}
          field="email"
          error={submitted}
          width="50%"
        />
        <CreatorInputField
          name="Phone number"
          placeholder="ex. (123)456-7890"
          value={creatorProfile?.phone}
          field="phone"
          error={submitted}
          width="25%"
        />
        <CreatorInputField
          name="Street Address"
          placeholder="ex. 121 Alphabet Street"
          value={creatorProfile?.streetAddress}
          field="streetAddress"
          error={submitted}
        />

        <Flex gap="3">
          <CreatorInputField
            name="City"
            value={creatorProfile?.city}
            field="city"
            error={submitted}
          />
          <Flex w="10" />
          <CreatorInputField
            name="Province"
            value={creatorProfile?.province}
            selectOptions={[
              "Alberta",
              "British Columbia",
              "Manitoba",
              "New Brunswick",
              "Newfoundland and Labrador",
              "Northwest Territories",
              "Nova Scotia",
              "Nunavut",
              "Ontario",
              "Prince Edward Island",
              "Quebec",
              "Saskatchewan",
              "Yukon Territory",
            ]}
            field="province"
            error={submitted}
          />
          <Flex w="10" />
          <CreatorInputField
            name="Postal code"
            placeholder="ex. A1B 2C3"
            value={creatorProfile?.postalCode}
            field="postalCode"
            error={submitted}
          />
        </Flex>
      </div>
    </Flex>
  );
};

export default ContactInfoForm;
