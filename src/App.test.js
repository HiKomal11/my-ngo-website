import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

test("renders Home page hero heading", () => {
  render(
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );

  // Check for the hero section heading on Home page
  const headingElement = screen.getByText(/Creating Lasting Impact/i);
  expect(headingElement).toBeInTheDocument();
});

test("renders navigation links", () => {
  render(
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );

  // Check that NavBar links exist
  expect(screen.getByText(/About Us/i)).toBeInTheDocument();
  expect(screen.getByText(/Our Work/i)).toBeInTheDocument();
  expect(screen.getByText(/Projects/i)).toBeInTheDocument();
  expect(screen.getByText(/Donate/i)).toBeInTheDocument();
});
