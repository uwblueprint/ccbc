import { Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { BiFileBlank } from "react-icons/bi";
import { BsBook } from "react-icons/bs";
import { IoBrushOutline } from "react-icons/io5";

import Carousel, { Presentations } from "./Carousel";

interface CreatorPresentationsProps {
  presentations: Presentations[];
}

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
  "gradeLevels",
  "audienceSize",
  "locations",
  "languages",
  "avSetup",
  "remote",
  "saleOrSigning",
  "price",
];

const CreatorPresentations = ({
  presentations,
}: CreatorPresentationsProps): React.ReactElement => {
  return (
    <div>
      <Text fontSize="30px" fontWeight={700}>
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
                {(pres.name === "Readings" && <BsBook />) ||
                  (pres.name === "Workshops" && <IoBrushOutline />) || (
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
                <Text mb="16px">{pres.description}</Text>
                <Flex>
                  <Flex direction="column" width="30%" mr="10px">
                    <Text textStyle="h2" fontWeight={700} mb="17px">
                      Additional Information
                    </Text>
                    {additionalInfoNames.map((name, index) => {
                      const res =
                        pres[
                          additionalInfoFields[index] as keyof Presentations
                        ];
                      return (
                        <Text key={name} mb="6px">
                          <b>{name}:</b>{" "}
                          {(Array.isArray(res) && res.join(", ")) ||
                            (res === true && "Yes") ||
                            (res === false && "No") ||
                            res}
                        </Text>
                      );
                    })}
                  </Flex>
                  <Flex direction="column" width="70%">
                    <Text textStyle="h2" fontWeight={700} mb="17px">
                      Media Gallery
                    </Text>
                    <Carousel images={pres.mediaGallery} />
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
