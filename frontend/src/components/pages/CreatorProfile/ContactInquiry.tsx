import {
  Box,
  Button,
  CloseButton,
  Divider,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { HiLightBulb } from "react-icons/hi2";

import creatorAPIClient from "../../../APIClients/CreatorAPIClient";
import { Creator, CreatorBookingRequest } from "../../../types/CreatorTypes";

const MDYFormat = "MM/DD/YYYY";

export type ContactInquiryProps = {
  currentCreator: Creator;
  isOpen: boolean;
  onClose: () => void;
};

const ContactInquiry = ({
  currentCreator,
  isOpen,
  onClose,
}: ContactInquiryProps): React.ReactElement => {
  const [externalBooking, setExternalBooking] = useState<boolean>(false);
  const [tentativeDate, setTentativeDate] = useState<boolean>(true);
  const [preferredDate, setPreferredDate] = useState<boolean>(false);
  const [date1, setDate1] = useState<string>("");
  const [date2, setDate2] = useState<string>("");
  const [formView, setFormView] = useState<boolean>(true);
  const [exitCaution, setExitCaution] = useState<boolean>(false);
  const [ageGroup, setAgeGroup] = useState<string>("");
  const [audienceSize, setAudienceSize] = useState<number>(0);
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [replyEmail, setReplyEmail] = useState<string>("");
  const [contactName, setContactName] = useState<string>("");

  const ageGroups = [
    "Pre-k",
    "Kindergarten",
    "Grades 1-2",
    "Grades 3-4",
    "Grades 5-6",
    "Grades 7-8",
    "Grades 9-12",
  ];

  const submitCreatorBooking = async () => {
    let date;

    if (preferredDate || !date2) {
      date = date1;
    } else {
      date = `${date1} - ${date2}`;
    }

    const creatorBookingRequest: CreatorBookingRequest = {
      creatorId: currentCreator.id,
      name: contactName,
      email: replyEmail,
      date,
      isTentative: tentativeDate,
      isOneDay: preferredDate,
      ageGroup,
      audienceSize,
      subject,
      message,
    };

    await creatorAPIClient.addCreatorBooking(creatorBookingRequest);
    setFormView(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        minW="1181px"
        maxW="1181px"
        minH="807px"
        maxH="807px"
        borderRadius="8px"
      >
        {formView ? (
          <>
            <Box>
              <ModalHeader
                pt="54px"
                pl="69px"
                backgroundColor="#FFF8F3"
                fontFamily="DM Sans"
                height="171px"
              >
                <HStack>
                  <Box mr="140px">
                    <Text fontSize="30px" fontWeight={700}>
                      Want to get in touch?
                    </Text>
                    <Text fontSize="18px">
                      Fill out this form and we’ll help connect you!
                    </Text>
                  </Box>
                  <HStack justifyContent="space-between" width="558px">
                    <Box>
                      <Text fontSize="13px" fontWeight={400} mb="5px">
                        Inquiry for
                      </Text>
                      <HStack
                        backgroundColor="#FFFFFF"
                        width="311px"
                        height="54px"
                        py="11px"
                        pl="15px"
                      >
                        <Flex alignItems="center" justifyContent="center">
                          <Image
                            src={currentCreator.profilePictureLink}
                            boxSize="38px"
                            borderRadius="100px"
                            mr="10px"
                          />
                          <Text fontSize="18px" fontWeight={700}>
                            {`${currentCreator.firstName} ${currentCreator.lastName}`}
                          </Text>
                        </Flex>
                        <Divider
                          orientation="vertical"
                          height="18px"
                          width="3px"
                          borderColor="#A0AEC0"
                        />
                        <Text fontSize="16px" fontWeight={400}>
                          {currentCreator.craft}
                        </Text>
                      </HStack>
                    </Box>
                    <CloseButton
                      alignSelf="flex-start"
                      onClick={() => {
                        setExitCaution(true);
                      }}
                    />
                  </HStack>
                </HStack>
              </ModalHeader>
            </Box>
            <ModalBody mt="28px" ml="51px" fontFamily="DM Sans" height="636px">
              <HStack display="flex" flexWrap="wrap" alignItems="flex-start">
                <Stack spacing="28px" width="427px" mr="16px">
                  <Box>
                    <Text
                      mb="8px"
                      fontSize="16px"
                      fontWeight={500}
                      color="#000000"
                    >
                      Contact Name
                    </Text>
                    <Input
                      placeholder="Your name"
                      _placeholder={{ color: "#CBD5E0" }}
                      width="387px"
                      onChange={(event) => {
                        setContactName(event.target.value);
                      }}
                    />
                  </Box>
                  <Box>
                    <Text
                      mb="8px"
                      fontSize="16px"
                      fontWeight={500}
                      color="#000000"
                    >
                      Reply Email
                    </Text>
                    <Input
                      placeholder="Email"
                      _placeholder={{ color: "#CBD5E0" }}
                      width="387px"
                      onChange={(event) => {
                        setReplyEmail(event.target.value);
                      }}
                    />
                  </Box>
                  <HStack>
                    <Box mr="28px">
                      <Text
                        mb="8px"
                        fontSize="16px"
                        fontWeight={500}
                        color="#000000"
                      >
                        Age Group
                      </Text>
                      <Select
                        placeholder="Select age group"
                        width="192px"
                        sx={{
                          "&": {
                            color: "#CBD5E0",
                          },
                        }}
                        onChange={(event) => {
                          setAgeGroup(event.target.value);
                        }}
                      >
                        {ageGroups.map((group) => {
                          return (
                            <option key={group} value={group}>
                              {group}
                            </option>
                          );
                        })}
                      </Select>
                    </Box>
                    <Box width="186px">
                      <Text
                        mb="8px"
                        fontSize="16px"
                        fontWeight={500}
                        color="#000000"
                      >
                        Audience size
                      </Text>
                      <Input
                        type="number"
                        placeholder="Select size"
                        _placeholder={{ color: "#CBD5E0" }}
                        width="162px"
                        onChange={(event) => {
                          setAudienceSize(event.target.valueAsNumber);
                        }}
                      />
                    </Box>
                  </HStack>
                  <Box width="440px">
                    <Text
                      mb="8px"
                      fontSize="16px"
                      fontWeight={500}
                      color="#000000"
                    >
                      Booking Date Range
                    </Text>
                    <HStack justifyContent="space-between">
                      <Input
                        placeholder={MDYFormat}
                        sx={{
                          "&": {
                            color: date1 === MDYFormat && "#CBD5E0",
                          },
                        }}
                        type="date"
                        width="136px"
                        fontSize="14px"
                        padding="12px"
                        onChange={(event) => {
                          setDate1(event.target.value);
                        }}
                      />
                      {tentativeDate && (
                        <>
                          <Text>-</Text>
                          <Input
                            placeholder={MDYFormat}
                            sx={{
                              "&": {
                                color: date2 === MDYFormat && "#CBD5E0",
                              },
                            }}
                            type="date"
                            width="136px"
                            fontSize="14px"
                            padding="12px"
                            onChange={(event) => {
                              setDate2(event.target.value);
                            }}
                          />
                        </>
                      )}
                      <RadioGroup
                        onChange={(value) => {
                          setTentativeDate(value === "tentative");
                          setPreferredDate(value === "preferred");
                        }}
                      >
                        <Stack direction="column" spacing="0px">
                          <Radio value="tentative">Tentative</Radio>
                          <Radio value="preferred">Preferred date</Radio>{" "}
                        </Stack>
                      </RadioGroup>
                    </HStack>
                  </Box>
                  <Box>
                    <Text
                      mb="8px"
                      fontSize="16px"
                      fontWeight={500}
                      color="#000000"
                    >
                      Are you booking on behalf of another party?
                    </Text>
                    <RadioGroup
                      onChange={(value) => {
                        setExternalBooking(value === "yes");
                      }}
                    >
                      <Stack direction="row">
                        <Radio value="yes" mb="0px">
                          Yes
                        </Radio>
                        <Radio value="no">No</Radio>
                      </Stack>
                    </RadioGroup>
                  </Box>
                  {externalBooking && (
                    <Box>
                      <Text
                        mb="8px"
                        fontSize="16px"
                        fontWeight={500}
                        color="#000000"
                      >
                        Recipient Name
                      </Text>
                      <Input
                        placeholder="Recipient name"
                        _placeholder={{ color: "#CBD5E0" }}
                        width="387px"
                      />
                    </Box>
                  )}
                </Stack>
                <Divider
                  height="474px"
                  orientation="vertical"
                  width="2px"
                  borderColor="#A0AEC0"
                  marginInlineStart="0px"
                />
                <Stack
                  spacing="28px"
                  justifyContent="right"
                  pl="56px"
                  width="578px"
                >
                  <Box
                    backgroundColor="#FFF8F3"
                    height="124px"
                    display="flex"
                    borderTop="4px"
                    borderColor="#F9D57B"
                    pt="12px"
                    pl="16px"
                  >
                    <Icon
                      as={HiLightBulb}
                      boxSize={8}
                      color="#F9D57B"
                      mr="12px"
                    />
                    <Box
                      justifyContent="center"
                      flexDirection="column"
                      width="454px"
                    >
                      <Text fontSize="16px">Writing suggestion</Text>
                      <Text>
                        In your message, please try to include background on the
                        audience, presentation purpose, accomodations, and any
                        other important details for the creator.
                      </Text>
                    </Box>
                  </Box>
                  <Box>
                    <Text fontSize="16px" fontWeight={500} color="#000000">
                      Subject
                    </Text>
                    <Input
                      placeholder="Subject"
                      _placeholder={{ color: "#CBD5E0" }}
                      onChange={(event) => {
                        setSubject(event.target.value);
                      }}
                    />
                  </Box>
                  <Box>
                    <Text fontSize="16px" fontWeight={500} color="#000000">
                      Message
                    </Text>
                    <Textarea
                      onChange={(event) => {
                        setMessage(event.target.value);
                      }}
                      placeholder="Message"
                      _placeholder={{ color: "#CBD5E0" }}
                      height="172px"
                      maxLength={500}
                      mb="12px"
                      resize="none"
                    />
                    <Text
                      display="flex"
                      justifyContent="flex-end"
                      fontSize="13px"
                      textColor="#A0AEC0"
                    >
                      {message.length}/500 characters
                    </Text>
                  </Box>
                  <Button
                    backgroundColor="#0EBCBD"
                    width="87px"
                    textColor="#FFFFFF"
                    fontWeight={500}
                    mt="20px"
                    alignSelf="flex-end"
                    onClick={() => {
                      submitCreatorBooking();
                    }}
                  >
                    Submit
                  </Button>
                </Stack>
              </HStack>
            </ModalBody>
          </>
        ) : (
          <ModalBody mt="102px" fontFamily="DM Sans" height="636px">
            <Box
              flexDirection="column"
              alignContent="center"
              display="flex"
              flexWrap="wrap"
              textAlign="center"
            >
              <Text fontWeight={700} fontSize="48px">
                Your inquiry has been sent!
              </Text>
              <Text width="590px" fontSize="22px" mt="32px" mr="0px">
                The creator has received your message and will reply shortly. We
                hope your event is a success!
              </Text>
              <Image src="/InquirySent.png" margin="auto" />
              <Button
                backgroundColor="#0EBCBD"
                fontWeight={500}
                textColor="#FFFFFF"
                mt="45px"
                borderRadius="4px"
                width="177px"
                alignSelf="center"
                onClick={onClose}
              >
                Return to Directory
              </Button>
            </Box>
          </ModalBody>
        )}
      </ModalContent>
      <Modal isOpen={exitCaution} onClose={() => {}} isCentered>
        <ModalOverlay />
        <ModalContent width="394px" height="280px" borderRadius="16px">
          <ModalBody pt="24px" pl="40px">
            <Text fontWeight={700} fontSize="30px" mb="16px">
              Hey wait!
            </Text>
            <Text width="321px">
              Are you sure you want to exit before submitting your inquiry?
              <br />
              <br />
              Your message won’t be submitted.
            </Text>
            <Box mt="32px">
              <Button
                backgroundColor="#0EBCBD"
                textColor="#FFFFFF"
                fontWeight={500}
                mr="16px"
                onClick={() => {
                  onClose();
                  setExitCaution(false);
                }}
              >
                Yes, exit
              </Button>
              <Button
                textColor="#0EBCBD"
                border="1px solid #0EBCBD"
                onClick={() => {
                  setExitCaution(false);
                }}
              >
                No, continue
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Modal>
  );
};

export default ContactInquiry;
