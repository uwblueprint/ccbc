import React from "react";

import MainPageButton from "../common/MainPageButton";
import CreateForm from "../crud/CreateForm";

const CreatePage = (): React.ReactElement => {
  return (
    <div style={{ textAlign: "center", width: "25%", margin: "0px auto" }}>
      <h1>Default Page</h1>
      <MainPageButton />
      <CreateForm />
    </div>
  );
};

export default CreatePage;
