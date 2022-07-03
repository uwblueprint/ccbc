import "@fontsource/coustard";
import "@fontsource/dm-sans";
import "@fontsource/open-sans";

import { extendTheme } from "@chakra-ui/react";

import PasswordInputFieldStyle from "./Components/PasswordInputFieldStyle";

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
    bookTitle: {
      fontFamily: "DM Sans",
      color: "#000000",
      fontSize: "20px",
      fontWeight: "medium",
      lineHeight: "26px",
    },
    caption: {
      fontFamily: "DM Sans",
      color: "gray.500",
      fontSize: "13px",
    },
  },
  colors: {
    gray: {
      100: "##E2E8F0",
      500: "#718096",
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
        add: {
          color: "white",
          bg: "teal.400",
          _hover: {
            _disabled: {
              bg: "teal.400",
            },
          },
        },
        remove: {
          hover: "transparent",
          color: "gray.500",
        },
        outline: {
          border: "2px solid",
          borderColor: "teal.400",
          color: "teal.400",
        },
      },
    },
    PasswordInputFieldStyle,
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
