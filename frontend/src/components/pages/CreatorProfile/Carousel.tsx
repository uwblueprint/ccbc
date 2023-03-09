import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Flex, IconButton, Image } from "@chakra-ui/react";
import { makeStyles } from "@material-ui/core";
import React from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";

interface CarouselProps {
  images: string[];
}

export type Presentations = {
  name: string;
  description: string;
  gradeLevels: string[];
  audienceSize: number;
  locations: string[];
  languages: string[];
  avSetup: string;
  remote: boolean;
  saleOrSigning: boolean;
  price: string;
  mediaGallery: string[];
};

// SAMPLE DATA FOR TESTING ------------------------------
export const presentationsTest: Presentations[] = [
  {
    name: "Readings",
    description:
      "Creator’s description here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque accumsan, commodo lacus massa vulputate pellentesque urna. Enim sed tellus viverra mattis convallis sit elit aliquam. Magnis a rhoncus amet, morbi laoreet. Dignissim lobortis sapien, et et. Sollicitudin cursus et lacus aenean vel feugiat volutpat enim. Dui vitae eget ullamcorper ornare enim nisi. Sed fermentum curabitur viverra nisl.",
    gradeLevels: ["Primary"],
    audienceSize: 30,
    locations: ["Libraries", "Schools"],
    languages: ["English", "French"],
    avSetup: "Projector for powerpoints",
    remote: true,
    saleOrSigning: true,
    price: "$200",
    mediaGallery: [
      "https://images.unsplash.com/photo-1612852098516-55d01c75769a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
      "https://images.unsplash.com/photo-1627875764093-315831ac12f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
      "https://images.unsplash.com/photo-1571432248690-7fd6980a1ae2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
      "https://images.unsplash.com/photo-1612852098516-55d01c75769a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
      "https://images.unsplash.com/photo-1627875764093-315831ac12f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
      "https://images.unsplash.com/photo-1571432248690-7fd6980a1ae2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
    ],
  },
  {
    name: "Workshops",
    description:
      "Creator’s description here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque accumsan, commodo lacus massa vulputate pellentesque urna. Enim sed tellus viverra mattis convallis sit elit aliquam. Magnis a rhoncus amet, morbi laoreet. Dignissim lobortis sapien, et et. Sollicitudin cursus et lacus aenean vel feugiat volutpat enim. Dui vitae eget ullamcorper ornare enim nisi. Sed fermentum curabitur viverra nisl.",
    gradeLevels: ["Primary"],
    audienceSize: 30,
    locations: ["Libraries", "Schools"],
    languages: ["English", "French"],
    avSetup: "Projector for powerpoints",
    remote: true,
    saleOrSigning: true,
    price: "$200",
    mediaGallery: [
      "https://images.unsplash.com/photo-1612852098516-55d01c75769a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
      "https://images.unsplash.com/photo-1627875764093-315831ac12f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
      "https://images.unsplash.com/photo-1571432248690-7fd6980a1ae2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
    ],
  },
  {
    name: "[other presentation]",
    description:
      "Creator’s description here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque accumsan, commodo lacus massa vulputate pellentesque urna. Enim sed tellus viverra mattis convallis sit elit aliquam. Magnis a rhoncus amet, morbi laoreet. Dignissim lobortis sapien, et et. Sollicitudin cursus et lacus aenean vel feugiat volutpat enim. Dui vitae eget ullamcorper ornare enim nisi. Sed fermentum curabitur viverra nisl.",
    gradeLevels: ["Primary"],
    audienceSize: 30,
    locations: ["Libraries", "Schools"],
    languages: ["English", "French"],
    avSetup: "Projector for powerpoints",
    remote: true,
    saleOrSigning: true,
    price: "$200",
    mediaGallery: [
      "https://images.unsplash.com/photo-1612852098516-55d01c75769a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
      "https://images.unsplash.com/photo-1627875764093-315831ac12f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
      "https://images.unsplash.com/photo-1571432248690-7fd6980a1ae2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60",
    ],
  },
];
// ------------------------------------------------------

const useStyles = makeStyles({
  carouselArrows: {
    position: "absolute",
    zIndex: 2,
    top: "0",
    width: 70,
    cursor: "pointer",
    height: "100%",
    borderRadius: "0px",
    filter:
      "invert(0%) sepia(0%) saturate(0%) hue-rotate(320deg) brightness(97%) contrast(104%)",
  },
  prevArrow: {
    background: "linear-gradient(to left, #FFFFFF00, #FFFFFF)",
    "&:hover": {
      background: "linear-gradient(to left, #FFFFFF00 0%, #FFFFFF 100%)",
    },
  },
  nextArrow: {
    background: "linear-gradient(to right, #FFFFFF00 0%, #FFFFFF 100%)",
    "&:hover": {
      background: "linear-gradient(to right, #FFFFFF00 0%, #FFFFFF 100%)",
    },
  },
});

const Carousel = ({ images }: CarouselProps): React.ReactElement => {
  const { carouselArrows, prevArrow, nextArrow } = useStyles();

  return (
    <div className="box">
      <ResponsiveCarousel
        useKeyboardArrows
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        autoPlay={false}
        centerMode
        centerSlidePercentage={40}
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <IconButton
              aria-label="next-button"
              onClick={onClickHandler}
              className={`${carouselArrows} ${prevArrow}`}
            >
              <FcPrevious
                transform="scale(2.5, 3)"
                filter="brightness(0) saturate(100%) invert(0%) sepia(100%) saturate(7500%) hue-rotate(203deg) brightness(111%) contrast(109%)"
              />
            </IconButton>
          )
        }
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && (
            <IconButton
              aria-label="next-button"
              onClick={onClickHandler}
              right={0}
              className={`${carouselArrows} ${nextArrow}`}
            >
              <FcNext
                transform="scale(2.5, 3)"
                filter="brightness(0) saturate(100%) invert(0%) sepia(100%) saturate(7500%) hue-rotate(203deg) brightness(111%) contrast(109%)"
              />
            </IconButton>
          )
        }
      >
        {images.map((URL, index) => (
          <Flex key={index} mr="16px">
            <Image
              alt={`media_gallery_${index}`}
              src={URL}
              key={index}
              height="230px"
            />
          </Flex>
        ))}
      </ResponsiveCarousel>
    </div>
  );
};
export default Carousel;
