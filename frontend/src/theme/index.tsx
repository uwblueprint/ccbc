import "@fontsource/open-sans";
import "@fontsource/coustard";

import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  textStyles: {
    heading: {
      fontFamily: "Coustard",
      fontSize: "2.4vw",
    },
    body: {
      fontFamily: "Open Sans",
      fontSize: "1.2vw",
    },
  },
  config: {
    initialColorMode: "light",
  },
});

export default customTheme;
