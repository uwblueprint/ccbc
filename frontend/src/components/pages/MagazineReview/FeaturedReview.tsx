/* eslint-disable no-nested-ternary */
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  chakra,
  Flex,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { Review } from "../../../types/ReviewTypes";

interface CategoryReviewsProps {
  name: string;
  link: string;
  reviews: Review[];
}

interface CaroselItemProps {
  item: Review;
  index: number;
  toTranslate: number;
}

const CarouselItem = ({
  item,
  index,
  toTranslate,
}: CaroselItemProps): JSX.Element => {
  const onDisplay = {
    width: { base: "110px", md: "240px", lg: "310px" },
    height: { base: "70px", md: "190px", lg: "290px" },
  };

  const background = {
    width: { base: "90px", md: "180px", lg: "302px" },
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
      <chakra.div
        display="flex"
        borderRadius="5px"
        boxShadow={index === toTranslate + 1 ? "md" : "xl"}
        overflow="hidden"
      >
        <chakra.div
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
        </chakra.div>
        <Image
          h="100%"
          w="100%"
          flexGrow={1}
          maxHeight="320px"
          src="https://upload.wikimedia.org/wikipedia/en/1/10/The_Cat_in_the_Hat.png"
          fit="cover"
        />
      </chakra.div>
    </Box>
  );
};

const MobileFeaturedReview = (): JSX.Element => {
  return (
    <chakra.div
      h="200px"
      w="216px"
      display="flex"
      boxShadow="xl"
      borderRadius="5px"
      overflow="hidden"
    >
      <chakra.div
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
        <Text color="gray" fontSIze={16}>
          yyyy-mm-dd
        </Text>

        <Box display="inline" fontSize={16}>
          genre
        </Box>
      </chakra.div>
      <Image
        h="100%"
        w="100%"
        flexGrow={2}
        maxHeight="320px"
        src="https://upload.wikimedia.org/wikipedia/en/1/10/The_Cat_in_the_Hat.png"
        fit="cover"
      />
    </chakra.div>
  );
};

const CategoryReviews = ({
  name,
  link,
  reviews,
}: CategoryReviewsProps): React.ReactElement => {
  const history = useHistory();
  const displayReviews = useBreakpointValue(
    {
      base: 2,
      lg: 5,
      md: 3,
      sm: 3,
    },
    "lg",
  );

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
              <chakra.div
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
                      item={item}
                      index={index}
                      toTranslate={toTranslate}
                    />
                  );
                })}
              </chakra.div>
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

export default CategoryReviews;
