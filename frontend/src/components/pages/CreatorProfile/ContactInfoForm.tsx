import {
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";

import CreatorInputField from "./CreatorInputField";

interface ContactInfoProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  setProvince: React.Dispatch<React.SetStateAction<string>>;
  setPostalCode: React.Dispatch<React.SetStateAction<string>>;
  submitted: boolean;
}

const ContactInfoForm = ({
  firstName,
  lastName,
  email,
  phone,
  address,
  city,
  province,
  postalCode,
  setFirstName,
  setLastName,
  setEmail,
  setPhone,
  setAddress,
  setCity,
  setProvince,
  setPostalCode,
  submitted,
}: ContactInfoProps): React.ReactElement => {
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
          value={firstName}
          setter={setFirstName}
          error={submitted}
          width="33%"
        />
        <CreatorInputField
          name="Last name"
          value={lastName}
          setter={setLastName}
          error={submitted}
          width="33%"
        />
        <CreatorInputField
          name="Email address"
          placeholder="ex. johndoe@gmail.com"
          value={email}
          setter={setEmail}
          error={submitted}
          width="50%"
        />
        <CreatorInputField
          name="Phone number"
          placeholder="ex. (123)456-7890"
          value={phone}
          setter={setPhone}
          error={submitted}
          width="25%"
        />
        <CreatorInputField
          name="Street Address"
          placeholder="ex. 121 Alphabet Street"
          value={address}
          setter={setAddress}
          error={submitted}
        />

        <Flex gap="3">
          <CreatorInputField
            name="City"
            value={city}
            setter={setCity}
            error={submitted}
          />
          <Flex w="10" />
          <CreatorInputField
            name="Province"
            value={province}
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
            setter={setProvince}
            error={submitted}
          />
          <Flex w="10" />
          <CreatorInputField
            name="Postal code"
            placeholder="ex. A1B 2C3"
            value={postalCode}
            setter={setPostalCode}
            error={submitted}
          />
        </Flex>
      </div>
    </Flex>
  );
};

export default ContactInfoForm;
