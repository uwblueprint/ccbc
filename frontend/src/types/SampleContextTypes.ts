export type SampleContextType = {
  teamName: string;
  numTerms: number;
  members: string[];
  isActive: boolean;
};

export type SampleContextAction =
  | {
      type: "EDIT_NAME";
      value: string;
    }
  | {
      type: "EDIT_NUM_TERMS";
      value: number;
    }
  | {
      type: "EDIT_MEMBERS";
      value: string[];
    }
  | {
      type: "EDIT_IS_ACTIVE";
      value: boolean;
    };
