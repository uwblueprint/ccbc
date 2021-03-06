import { Tooltip } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

const Author = ({ val }: { val: string }): React.ReactElement => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textElementRef = useRef<HTMLInputElement>(null);

  const compareSize = () => {
    if (textElementRef.current) {
      const compare =
        textElementRef.current.scrollWidth > textElementRef.current.clientWidth;
      setIsOverflowing(compare);
    }
  };

  useEffect(() => {
    compareSize();
    window.addEventListener("resize", compareSize);
  }, []);

  useEffect(
    () => () => {
      window.removeEventListener("resize", compareSize);
    },
    [],
  );

  return (
    <Tooltip label={isOverflowing ? val : ""}>
      <div
        ref={textElementRef}
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          fontFamily: "Open Sans",
          fontSize: "16px",
        }}
      >
        {val}
      </div>
    </Tooltip>
  );
};

export default Author;
