import { createContext } from "react";
import { SampleContextAction } from "../types/SampleContextTypes";

const SampleContextDispatcherContext = createContext<
  React.Dispatch<SampleContextAction>
>(() => {});

export default SampleContextDispatcherContext;
