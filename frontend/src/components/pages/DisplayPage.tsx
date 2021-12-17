import React from "react";

import MainPageButton from "../common/MainPageButton";

const GetPage = (): React.ReactElement => {
  return (
    <div style={{ textAlign: "center", width: "25%", margin: "0px auto" }}>
      <h1>Default Page</h1>
      <MainPageButton />
    </div>
  );
};

export default GetPage;
