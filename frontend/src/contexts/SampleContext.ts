import { createContext } from "react";
import { SampleContextType } from "../types/SampleContextTypes";

export const DEFAULT_SAMPLE_CONTEXT = {
  teamName: "Internal Tools",
  numTerms: 3,
  members: ["Sherry", "Alex", "Carelynn", "Bruce", "Richard", "Raveen", "Xin"],
  isActive: true,
};

const SampleContext = createContext<SampleContextType>(DEFAULT_SAMPLE_CONTEXT);

export default SampleContext;
