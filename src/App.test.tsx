import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("Does something", () => {
  render(<App />);
  const linkElement = screen.getAllByText(/Deep Review/i)[0];
  expect(linkElement).toBeInTheDocument();
});
