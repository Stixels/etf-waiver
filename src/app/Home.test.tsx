import { render, screen } from "@testing-library/react";
import Home from "./page";

test("renders get started", () => {
  render(<Home />);
  const getStarted = screen.getByText(/Get started/i);
  expect(getStarted).toBeInTheDocument();
});
