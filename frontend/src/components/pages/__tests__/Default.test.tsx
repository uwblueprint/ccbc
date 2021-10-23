import React from "react";
import { render } from "@testing-library/react";
import Default from "../Default";

// Example React test.
// For more information on React component testing, visit:
// https://jestjs.io/docs/tutorial-react
// https://reactjs.org/docs/testing.html

describe("Default page", () => {
  it("Should render Create Entity button", () => {
    const page = render(<Default />);
    const button = page.queryByText("Create Entity");
    expect(button).toBeVisible();
  });
});
