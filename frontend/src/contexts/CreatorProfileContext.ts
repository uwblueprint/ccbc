import React, { createContext } from "react";

import { CreatorProfile } from "../types/CreatorProfileTypes";

type CreatorProfileContextType = {
  creatorProfile: CreatorProfile;
  setCreatorProfile: React.Dispatch<React.SetStateAction<CreatorProfile>>;
};

const CreatorProfileContext = createContext<CreatorProfileContextType>({
  creatorProfile: null,
  setCreatorProfile: () => {},
});

export default CreatorProfileContext;
