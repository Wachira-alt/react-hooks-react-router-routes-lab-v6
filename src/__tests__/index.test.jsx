import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Actors from "../pages/Actors";
import Directors from "../pages/Directors";
import Movie from "../pages/Movie";
import ErrorPage from "../pages/ErrorPage";

// Utility function to render components with routing
const renderWithRouter = (ui, { route = "/" } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/actors" element={<Actors />} />
        <Route path="/directors" element={<Directors />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("Routing Tests", () => {
  test("renders the Home component on route '/'", () => {
    renderWithRouter(<Home />, { route: "/" });
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  test("renders the Actors component on route '/actors'", () => {
    renderWithRouter(<Actors />, { route: "/actors" });
    expect(screen.getByText("Actors Page")).toBeInTheDocument();
  });

  test("renders the Directors component on route '/directors'", () => {
    renderWithRouter(<Directors />, { route: "/directors" });
    expect(screen.getByText("Directors Page")).toBeInTheDocument();
  });

  test("renders the Movie component on route '/movie/:id'", async () => {
    renderWithRouter(<Movie />, { route: "/movie/1" });

    await waitFor(() => {
      expect(screen.getByText("Doctor Strange")).toBeInTheDocument();
    });
  });

  test("renders an error page when given a bad URL", () => {
    renderWithRouter(<ErrorPage />, { route: "/nonexistent" });
    expect(screen.getByText("Oops! Looks like something went wrong.")).toBeInTheDocument();
  });
});
