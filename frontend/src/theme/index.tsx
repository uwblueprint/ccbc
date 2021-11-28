import "@fontsource/open-sans";
import "@fontsource/coustard";

import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  textStyles: {
    heading: {
      fontFamily: "Coustard",
      fontSize: "2vw",
    },
    body: {
      fontFamily: "Open Sans",
      fontSize: "1vw",
    },
  },
  colors: {
    gray: {
      100: "##E2E8F0",
    },
    blue: {
      100: "#90CDF4",
    },
  },
  components: {
    Button: {
      variants: {
        submit: {
          width: "100%",
          bg: "teal.500",
          color: "white",
          size: "md",
        },
      },
    },
  },
  config: {
    initialColorMode: "light",
  },
});

export default customTheme;
