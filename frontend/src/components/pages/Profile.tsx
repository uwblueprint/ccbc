import React from "react";

import { presentationsTest } from "./Carousel";
import CreatorPresentations from "./CreatorPresentations";

const Profile = (): React.ReactElement => {
  return (
    <div style={{ width: "55%", margin: "0px auto" }}>
      <CreatorPresentations presentations={presentationsTest} />
    </div>
  );
};

export default Profile;
