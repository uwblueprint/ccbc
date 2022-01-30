import "@fontsource/open-sans";
import "@fontsource/coustard";
import "@fontsource/dm-sans";

import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  textStyles: {
    heading: {
      fontFamily: "DM Sans",
      fontSize: "2vw",
    },
    body: {
      fontFamily: "DM Sans",
      fontSize: "16px",
    },
    h4: {
      fontFamily: "DM Sans",
      color: "#fff",
      margin: "30px",
      fontSize: "md",
      fontWeight: "bold",
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
