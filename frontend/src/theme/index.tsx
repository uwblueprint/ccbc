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
    h4: {
      fontFamily: "Coustard",
      color: "#fff",
      margin: "30px",
      fontSize: "1vw",
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
    Heading: {
      variants: {
        nav: {
          color: "#fff",
          margin: "30px",
        },
      },
    },
  },
  config: {
    initialColorMode: "light",
  },
});

export default customTheme;
