import React from "react";

import MainPageButton from "../common/MainPageButton";
import DisplayTableContainer from "../crud/DisplayTableContainer";

const GetPage = (): React.ReactElement => {
  return (
    <div style={{ textAlign: "center", width: "25%", margin: "0px auto" }}>
      <h1>Default Page</h1>
      <MainPageButton />
      <DisplayTableContainer />
    </div>
  );
};

export default GetPage;
