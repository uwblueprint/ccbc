import "react-responsive-carousel/lib/styles/carousel.min.css";

import { IconButton, Image } from "@chakra-ui/react";
import { makeStyles } from "@material-ui/core";
import React from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";

interface CarouselProps {
  images: string[];
}

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
          <Image
            alt={`media_gallery_${index}`}
            src={URL}
            key={index}
            height="250px"
            maxWidth="175px"
            objectFit="contain"
            mr="-30px"
          />
        ))}
      </ResponsiveCarousel>
    </div>
  );
};
export default Carousel;
