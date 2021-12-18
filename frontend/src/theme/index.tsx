import "@fontsource/open-sans";
import "@fontsource/coustard";

import { extendTheme } from "@chakra-ui/react";

import PasswordInputFieldStyle from "./PasswordInputFieldStyle";

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
    PasswordInputFieldStyle,
  },
  config: {
    initialColorMode: "light",
  },
});

export default customTheme;
