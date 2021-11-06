import "@fontsource/open-sans";
import "@fontsource/coustard";

import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  textStyles: {
    heading: {
      fontFamily: "Coustard",
      fontSize: "30px",
    },
    body: {
      fontFamily: "Open Sans",
      fontSize: "15px"
    },
  },
  config: {
    initialColorMode: "light",
  },
});

export default customTheme;
