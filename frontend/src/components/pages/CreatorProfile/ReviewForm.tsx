import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { camelize } from "humps";
import React, { useContext } from "react";
import { HiPencil } from "react-icons/hi";
import ReactQuill from "react-quill";

import CreatorProfileContext from "../../../contexts/CreatorProfileContext";
import {
  BookCoverFile,
  CreatorProfileProps,
} from "../../../types/CreatorProfileTypes";
import { Presentation, Publication } from "../../../types/CreatorTypes";

interface ContactInfoProps {
  setFormPage: (a: number) => void;
}

const ReviewData = [
  {
    topic: "Contact Info",
    fields: ["First Name", "Last Name", "Email", "Phone", "Street Address"],
    slide: 0,
  },
  {
    topic: "General Info",
    fields: ["Craft", "Genre", "Website", "Bio", "Profile Picture"],
    slide: 1,
  },
  {
    topic: "Presentations",
    fields: ["Presentations"],
    slide: 2,
  },
  {
    topic: "Publications",
    fields: ["Book Covers", "Bibliography"],
    slide: 3,
  },
  {
    topic: "Availability",
    fields: ["Location", "Timezone", "Availability"],
    slide: 4,
  },
];

const specialLists = [
  "Book Covers",
  "Bibliography",
  "Availability",
  "Presentations",
];

const specialFields = [
  "Bio",
  "Profile Picture",
  "Book Covers",
  "Bibliography",
  "Availability",
  "Presentations",
];

const ReviewForm = ({ setFormPage }: ContactInfoProps): React.ReactElement => {
  const { creatorProfile } = useContext(CreatorProfileContext);

  const handleGetFieldData = (item: string) => {
    if (!creatorProfile) {
      return "";
    }

    if (item === "Profile Picture") {
      return creatorProfile.profilePictureLink;
    }

    if (item === "Bibliography") {
      return creatorProfile?.publications;
    }

    return creatorProfile[camelize(item) as CreatorProfileProps] || "";
  };

  const capitalize = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <Flex flex="1" direction="column" justify="start">
      <Text textStyle="heading" textAlign="left" fontWeight="bold">
        Review
      </Text>
      <Text textAlign="left" mb="5">
        Please review the following information for correctness and submit when
        ready.
      </Text>
      <Accordion defaultIndex={[0]} allowMultiple>
        {ReviewData.map((section, index) => (
          <AccordionItem
            borderColor="#E2E8F0"
            borderWidth={1}
            key={index}
            mb={5}
          >
            <h2>
              <AccordionButton
                backgroundColor="#F7FAFC"
                borderColor="#E2E8F0"
                borderWidth={1}
              >
                <Box as="span" flex="1" textAlign="left" fontWeight="medium">
                  {section.topic}
                </Box>
                <Button
                  variant="ghost"
                  onClick={() => setFormPage(section.slide)}
                  leftIcon={<HiPencil />}
                >
                  Edit
                </Button>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Grid
                templateRows="repeat(8, 1fr)"
                templateColumns="repeat(6, 1fr)"
                gap={2}
              >
                {section.fields.map((item) => {
                  let fieldData: any = "";
                  if (creatorProfile) {
                    fieldData = handleGetFieldData(item);
                    if (
                      Array.isArray(fieldData) &&
                      !specialLists.includes(item)
                    ) {
                      fieldData = fieldData
                        .map(
                          (data) =>
                            data.charAt(0).toUpperCase() +
                            data
                              ?.match(/([A-Z]?[^A-Z]*)/g)
                              .slice(0, -1)
                              .join(" ")
                              .slice(1),
                        )
                        .join(",");
                    }
                  }
                  return (
                    <>
                      {item !== "Presentations" && (
                        <GridItem
                          colSpan={1}
                          fontWeight="medium"
                          rowSpan={item === "Bio" ? 1 : 4}
                        >
                          {item}
                        </GridItem>
                      )}
                      {item === "Presentations" && (
                        <>
                          {fieldData.map((pres: Presentation, i: number) => (
                            <>
                              <GridItem
                                colSpan={6}
                                fontSize="xl"
                                fontWeight="semibold"
                                mt={i !== 0 ? 5 : 0}
                              >
                                {pres.title}
                              </GridItem>
                              <GridItem colSpan={2} fontWeight="medium">
                                Offered Locations
                              </GridItem>
                              <GridItem colSpan={4}>
                                {pres.offeredLocations
                                  .map((loc) => loc.label)
                                  .join(",")}
                              </GridItem>
                              <GridItem colSpan={2} fontWeight="medium">
                                Preferred Grade Levels
                              </GridItem>
                              <GridItem colSpan={4}>
                                {pres.preferredGradeLevel
                                  .map((loc) => loc.label)
                                  .join(",")}
                              </GridItem>
                              <GridItem colSpan={2} fontWeight="medium">
                                Preferred Audience Size
                              </GridItem>
                              <GridItem colSpan={4}>
                                {pres.preferredAudienceSize}
                              </GridItem>
                              <GridItem
                                colSpan={2}
                                rowSpan={2}
                                fontWeight="medium"
                              >
                                Delivery Formats
                              </GridItem>
                              <GridItem colSpan={4} rowSpan={2}>
                                <Flex direction="column">
                                  <Text>
                                    In Person | Fee: ${pres.inPersonDeliveryFee}
                                  </Text>
                                  <Text>
                                    Virtual | Fee: ${pres.virtualDeliveryFee}
                                  </Text>
                                </Flex>
                              </GridItem>
                              <GridItem colSpan={2} fontWeight="medium">
                                AV / Special Equipment
                              </GridItem>
                              <GridItem colSpan={4}>
                                {pres.equipmentRequired}
                              </GridItem>
                              <GridItem colSpan={2} fontWeight="medium">
                                Available Languages
                              </GridItem>
                              <GridItem colSpan={4}>
                                {`${pres.languages
                                  .map((lang) => capitalize(lang))
                                  .join(",")}${
                                  pres.languages.length > 0 &&
                                  pres.otherReadingLanguages !== ""
                                    ? `, Other (${capitalize(
                                        pres.otherReadingLanguages,
                                      )})`
                                    : capitalize(pres.otherReadingLanguages)
                                }`}
                              </GridItem>
                              <GridItem colSpan={2} fontWeight="medium">
                                Book copies included?
                              </GridItem>
                              <GridItem colSpan={4}>
                                {pres.booksPurchasedAndAutoGraphed}
                              </GridItem>
                              <GridItem colSpan={2} fontWeight="medium">
                                Content of Readings
                              </GridItem>
                              <GridItem colSpan={4}>
                                {pres.contentOfReadings}
                              </GridItem>
                            </>
                          ))}
                        </>
                      )}
                      <GridItem colSpan={5} rowSpan={item === "Bio" ? 1 : 4}>
                        {!specialFields.includes(item) && fieldData}
                        {item === "Bio" && (
                          <ReactQuill
                            value={fieldData}
                            readOnly
                            theme="bubble"
                          />
                        )}
                        {item === "Profile Picture" && (
                          <Image height={200} src={fieldData} alt="Profile" />
                        )}
                        {item === "Book Covers" && (
                          <Wrap>
                            {fieldData.map((img: BookCoverFile, i: number) => (
                              <WrapItem key={i}>
                                <Image
                                  height={200}
                                  src={img.url}
                                  alt={`Book Cover ${i}`}
                                />
                              </WrapItem>
                            ))}
                          </Wrap>
                        )}
                        {item === "Bibliography" && (
                          <>
                            {fieldData.map((book: Publication, i: number) => (
                              <Flex direction="column" key={i}>
                                <Text fontWeight="medium">
                                  {book.title},{book.publisher},
                                  {book.publication_year}
                                </Text>
                                <Text as="i">{book.notes}</Text>
                              </Flex>
                            ))}
                          </>
                        )}
                        {item === "Availability" && (
                          <Flex direction="column">
                            <Text>
                              Morning -{" "}
                              {fieldData
                                .filter((date: string) =>
                                  date.includes("Morning"),
                                )
                                .map((date: string) =>
                                  date.replace("Morning", ""),
                                )
                                .join(", ")}
                            </Text>
                            <Text>
                              Afternoon -{" "}
                              {fieldData
                                .filter((date: string) =>
                                  date.includes("Afternoon"),
                                )
                                .map((date: string) =>
                                  date.replace("Afternoon", ""),
                                )
                                .join(", ")}
                            </Text>
                          </Flex>
                        )}
                      </GridItem>
                    </>
                  );
                })}
              </Grid>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Flex>
  );
};

export default ReviewForm;
