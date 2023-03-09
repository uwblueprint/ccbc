import React from "react";

import { presentationsTest } from "./CreatorProfile/Carousel";
import CreatorPresentations from "./CreatorProfile/CreatorPresentations";

const Profile = (): React.ReactElement => {
  return (
    <div style={{ width: "55%", margin: "0px auto" }}>
      <CreatorPresentations presentations={presentationsTest} />
    </div>
  );
};

export default Profile;
