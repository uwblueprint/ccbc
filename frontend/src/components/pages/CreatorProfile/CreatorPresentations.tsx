import { Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { BiFileBlank } from "react-icons/bi";
import { BsBook } from "react-icons/bs";
import { IoBrushOutline } from "react-icons/io5";

import { Option } from "../../../types/BookTypes";
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
  "preferredGradeLevel",
  "preferredAudienceSize",
  "offeredLocations",
  "languages",
  "equipmentRequired",
  "is_in_person",
  "is_virtual",
  "is_bringing",
  "inPersonDeliveryFee",
  "virtualDeliveryFee",
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

  return (presentations.length ?? 0) > 0 ? (
    <Flex mb="16px" direction="column">
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
                {(pres.title === READINGS_NAME && <BsBook />) ||
                  (pres.title === WORKSHOPS_NAME && <IoBrushOutline />) || (
                    <BiFileBlank />
                  )}
              </Flex>
              <Text fontSize="22px" fontWeight={500}>
                {pres.title}
              </Text>
            </Flex>
            <Flex mt="16px">
              <Divider
                orientation="vertical"
                borderWidth="1px"
                mr="36px"
                ml="20px"
                borderColor="#4A5568"
                height="auto"
              />
              <Flex direction="column" width="100%">
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
                          {/* If array, make join either the options array or string array */}
                          <b>{name}:</b>{" "}
                          {/* eslint-disable-next-line no-nested-ternary */}
                          {Array.isArray(value)
                            ? // If option, get values then join. Else just join
                              typeof value[0] === "string"
                              ? value.join(", ")
                              : (value as Option[])
                                  .map((v) => v.value)
                                  .join(", ")
                            : value}
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
    </Flex>
  ) : (
    <></>
  );
};

export default CreatorPresentations;
