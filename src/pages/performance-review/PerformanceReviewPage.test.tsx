import React from "react";
import { render, screen } from "@testing-library/react";
import PerformanceReviewPage from "./PerformanceReviewPage";

test("Does something", () => {
  render(<PerformanceReviewPage />);
  const linkElement = screen.getAllByText(/Deep Review/i)[0];
  expect(linkElement).toBeInTheDocument();
});
