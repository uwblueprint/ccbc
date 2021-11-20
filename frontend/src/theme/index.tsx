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
      color: "#fff", margin: "30px",
      fontFamily: "Coustard",
      fontSize: "20px";
      fontWeight: 400;
    }
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
    NavContainer: {
      variants: {
        "default": {
          display: "flex",
          flexDirection: "row",
          height: "calc(96px - 32px)",
          width: "calc(100vw - 160px)",
          backgroundColor: "#2D5577",
          alignItems: "center",
          padding: "16px 80px",
          position: "absolute",
          justifyContent: "space-between",
          top: 0
        }
    }
  },
  config: {
    initialColorMode: "light",
  },
});

export default customTheme;
