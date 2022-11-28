/* eslint-disable no-nested-ternary */
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

import { Review } from "../../../types/ReviewTypes";

interface FeaturedReviewsProps {
  reviews: Review[];
}

interface CaroselItemProps {
  index: number;
  toTranslate: number;
}

const CarouselItem = ({
  index,
  toTranslate,
}: CaroselItemProps): JSX.Element => {
  const onDisplay = {
    width: { base: "110px", md: "210px", lg: "310px" },
    height: { base: "70px", md: "190px", lg: "290px" },
  };

  const background = {
    width: { base: "102px", md: "202px", lg: "302px" },
    height: { base: "70px", md: "160px", lg: "250px" },
  };

  return (
    <Box
      display="flex"
      mb={index === toTranslate + 1 ? "150px" : "0px"}
      flexShrink={0}
      h={index === toTranslate + 1 ? onDisplay.height : background.height}
      w={index === toTranslate + 1 ? onDisplay.width : background.width}
      pr="15px"
      boxSizing="border-box"
      border="0px"
      transition="all 0.5s ease-out"
      cursor="pointer"
    >
      <Box
        display="flex"
        borderRadius="5px"
        boxShadow={index === toTranslate + 1 ? "md" : "xl"}
        overflow="hidden"
      >
        <Box
          h="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          px={2}
          bg="white"
        >
          <Text fontSize={{ base: 20, md: 20, lg: 32 }} fontWeight={500}>
            title
          </Text>
          <Text>author</Text>
          <Text color="gray">yyyy-mm-dd</Text>

          <Box display="inline">genre</Box>
        </Box>
        <Image
          h="100%"
          w="100%"
          flexGrow={1}
          maxHeight="320px"
          src="https://upload.wikimedia.org/wikipedia/en/1/10/The_Cat_in_the_Hat.png"
          fit="cover"
        />
      </Box>
    </Box>
  );
};

const MobileFeaturedReview = (): JSX.Element => {
  return (
    <Box
      h="200px"
      w="216px"
      display="flex"
      boxShadow="xl"
      borderRadius="5px"
      overflow="hidden"
    >
      <Box
        h="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        px={2}
        bg="white"
      >
        <Text fontSize={20} fontWeight={500}>
          name
        </Text>
        <Text fontSize={16}>author</Text>
        <Text color="gray" fontSize={16}>
          yyyy-mm-dd
        </Text>

        <Box display="inline" fontSize={16}>
          genre
        </Box>
      </Box>
      <Image
        h="100%"
        w="100%"
        flexGrow={2}
        maxHeight="320px"
        src="https://upload.wikimedia.org/wikipedia/en/1/10/The_Cat_in_the_Hat.png"
        fit="cover"
      />
    </Box>
  );
};

const FeaturedReviews = ({
  reviews,
}: FeaturedReviewsProps): React.ReactElement => {
  const [toTranslate, setToTranslate] = useState(0);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const lengthCarousel = reviews.length;

  const updateIndex = (newIndex: number) => {
    let index = newIndex;
    if (newIndex < -1) {
      index = -1;
    } else if (newIndex >= lengthCarousel - 1) {
      index = lengthCarousel - 2;
    }
    setToTranslate(index);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box mt="20px" maxW="100vw">
      {reviews.length > 0 ? (
        windowWidth < 768 ? (
          <MobileFeaturedReview />
        ) : (
          <Flex gap={20} alignItems="center">
            <button
              type="button"
              ref={prevRef}
              onClick={() => updateIndex(toTranslate - 1)}
            >
              <ChevronLeftIcon h={50} w={50} cursor="pointer" />
            </button>
            <Box
              overflow="hidden"
              w={{ base: "300px", md: "600px", lg: "900px" }}
              h={{ base: "300px", md: "300px", lg: "420px" }}
              pt="30px"
            >
              <Box
                display="flex"
                alignItems="center"
                transition="transform 0.55s ease-out"
                transform={`translateX(${toTranslate < 0 ? "" : "-"}${
                  toTranslate < 0
                    ? toTranslate * -33.3333
                    : toTranslate * 33.3333
                }%)`}
              >
                {reviews.map((item, index) => {
                  return (
                    <CarouselItem
                      key={item.reviewId}
                      index={index}
                      toTranslate={toTranslate}
                    />
                  );
                })}
              </Box>
            </Box>

            <button
              type="button"
              ref={nextRef}
              onClick={() => updateIndex(toTranslate + 1)}
            >
              <ChevronRightIcon h={50} w={50} cursor="pointer" />
            </button>
          </Flex>
        )
      ) : (
        <Text>No reviews found</Text>
      )}
    </Box>
  );
};

export default FeaturedReviews;
