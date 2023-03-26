import { Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { BiFileBlank } from "react-icons/bi";
import { BsBook } from "react-icons/bs";
import { IoBrushOutline } from "react-icons/io5";

import { Creator, Presentation } from "../../../types/CreatorTypes";
import Carousel from "./Carousel";

const additionalInfoNames = [
  "Preferred Grade Level(s)",
  "Preferred Audience Size",
  "Offered Locations",
  "Languages Offered",
  "AV Setup",
  "Remote Option?",
  "Book Sale/Signing Session After?",
  "Price",
];

const additionalInfoFields = [
  "age_groups",
  "audience_size",
  "locations",
  "languages",
  "special_equipment",
  "is_in_person",
  "is_virtual",
  "is_bringing",
  "in_person_rate",
  "virtual_rate",
];

interface CreatorPresentationsProps {
  currentCreator: Creator;
}

const CreatorPresentations = ({
  currentCreator,
}: CreatorPresentationsProps): React.ReactElement => {
  const presentations = currentCreator.presentations ?? [];

  const READINGS_NAME = "Readings";
  const WORKSHOPS_NAME = "Workshops";

  return (
    <div>
      <Text textStyle="heading" fontSize="30px" fontWeight="bold">
        Presentations
      </Text>
      {presentations.map((pres, idx) => {
        return (
          <Flex key={idx} direction="column" mt="24px">
            <Flex flexWrap="wrap" alignItems="center">
              <Flex
                backgroundColor="#E2E8F0"
                borderRadius="100px"
                height="40px"
                width="40px"
                alignItems="center"
                justifyContent="center"
                mr="16px"
              >
                {(pres.name === READINGS_NAME && <BsBook />) ||
                  (pres.name === WORKSHOPS_NAME && <IoBrushOutline />) || (
                    <BiFileBlank />
                  )}
              </Flex>
              <Text fontSize="22px" fontWeight={500}>
                {pres.name}
              </Text>
            </Flex>
            <Flex mt="16px">
              <Divider
                orientation="vertical"
                borderWidth="1px"
                mr="36px"
                ml="20px"
                borderColor="#4A5568"
                height="400px"
              />
              <Flex direction="column">
                <Text mb="16px">{pres.details}</Text>
                <Flex>
                  <Flex direction="column" width="30%" mr="10px">
                    <Text textStyle="h2" fontWeight={700} mb="17px">
                      Additional Information
                    </Text>
                    {additionalInfoNames.map((name, index) => {
                      let value;
                      if (name === "Price") {
                        const inPersonFee =
                          pres[
                            additionalInfoFields[index] as keyof Presentation
                          ];
                        const virtualFee =
                          pres[
                            additionalInfoFields[
                              index + 1
                            ] as keyof Presentation
                          ];
                        value = `${
                          inPersonFee ? `${inPersonFee} in person` : ""
                        }${inPersonFee && virtualFee ? `, ` : ""}${
                          virtualFee ? `${virtualFee} virtual` : ""
                        }`;
                      } else {
                        value =
                          pres[
                            additionalInfoFields[index] as keyof Presentation
                          ];
                      }
                      return (
                        <Text key={name} mb="6px">
                          <b>{name}:</b>{" "}
                          {(Array.isArray(value) && value.join(", ")) ||
                            (value === true && "Yes") ||
                            (value === false && "No") ||
                            value}
                        </Text>
                      );
                    })}
                  </Flex>
                  <Flex direction="column" width="70%">
                    <Text textStyle="h2" fontWeight={700} mb="17px">
                      Media Gallery
                    </Text>
                    <Carousel images={pres.photos ?? []} />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        );
      })}
    </div>
  );
};

export default CreatorPresentations;
