import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  chakra,
  Flex,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { Review } from "../../../types/ReviewTypes";

interface CategoryReviewsProps {
  name: string;
  link: string;
  reviews: Review[];
}

// const CarouselItem = (): JSX.Element => {
//   return (
//     <Box
//       display="flex"
//       mx={50}
//       style={{
//         backgroundColor: "black",
//         transform: "translateX(`300px)",
//       }}
//     >
//       <Box
//         boxSize="xs"
//         bg="red.200"
//         display="flex"
//         flexDirection="column"
//         justifyContent="center"
//         gap="20px"
//         pl={3}
//       >
//         <Text fontSize={32} fontWeight={500}>
//           title
//         </Text>
//         <Text>author</Text>
//         <Text color="gray">yyyy-mm-dd</Text>
//         <Box bg="blue.400" display="inline">
//           genre
//         </Box>
//       </Box>
//       <Image
//         h="100%"
//         w="70%"
//         src="https://upload.wikimedia.org/wikipedia/en/1/10/The_Cat_in_the_Hat.png"
//         fit="cover"
//       />
//     </Box>
//   );
// };

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

  // console.log(reviews);

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

  return (
    <Box mt="20px" maxW="100vw">
      {reviews.length > 0 ? (
        // -------------------------Buttons and Track---------------------------
        <Flex gap={20} alignItems="center">
          {/* -------------------------------Left Arrow------------------------- */}
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
            {/* -----------------------Track-------------------------- */}
            <chakra.div
              display="flex"
              alignItems="center"
              transition="transform 0.6s ease-in-out"
              transform={`translateX(${toTranslate < 0 ? "" : "-"}${
                toTranslate < 0 ? toTranslate * -33.3333 : toTranslate * 33.3333
              }%)`}
            >
              {reviews.map((item, index) => {
                return (
                  // -----------------------Card-------------------------
                  // <CarouselItem key={item.reviewId} />
                  <Box
                    key={item.reviewId}
                    display="flex"
                    mb={index === toTranslate + 1 ? "150px" : "0px"}
                    flexShrink={0}
                    h={{ base: "70px", md: "170px", lg: "270px" }}
                    w={{ base: "100px", md: "200px", lg: "300px" }}
                    pr="15px"
                    boxSizing="border-box"
                    borderRadius="10px"
                    border="0px"
                    transition="margin-bottom 0.6s ease-in-out"
                    boxShadow="base"
                  >
                    {/* <Box
                      w="100%"
                      h="100%"
                      bg="blue.400"
                      border="0px"
                      borderColor="gray.200"
                      cursor="pointer"
                      fontSize="32px"
                      textAlign="center"
                    >
                      {index}
                    </Box> */}
                    <Box h="100%" w={{ base: "35px", md: "60px", lg: "130px" }}>
                      <chakra.div
                        h="100%"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        // gap="20  px"
                        px={2}
                        bg="white"
                      >
                        <Text fontSize={32} fontWeight={500}>
                          title
                        </Text>
                        <Text>author</Text>
                        <Text color="gray">yyyy-mm-dd</Text>

                        <Box
                          // bg={index === 1 ? "red.400" : "blue.400"}
                          display="inline"
                        >
                          genre
                        </Box>
                      </chakra.div>
                    </Box>
                    <Image
                      h="100%"
                      w={{ base: "65px", md: "120px", lg: "180px" }}
                      maxHeight="320px"
                      src="https://upload.wikimedia.org/wikipedia/en/1/10/The_Cat_in_the_Hat.png"
                      fit="cover"
                    />
                  </Box>
                );
              })}
            </chakra.div>
          </Box>

          {/* ----------------------Right Arrow---------------------------- */}
          <button
            type="button"
            ref={nextRef}
            onClick={() => updateIndex(toTranslate + 1)}
          >
            <ChevronRightIcon h={50} w={50} cursor="pointer" />
          </button>
        </Flex>
      ) : (
        <Text>No reviews found</Text>
      )}
    </Box>
  );
};

export default CategoryReviews;
