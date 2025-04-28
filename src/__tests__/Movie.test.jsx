import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";  // Importing MemoryRouter to handle routing
import Movie from "../pages/Movie";  // Import the Movie page component

// Mock the global fetch function using vi.fn() (for Vitest)
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        id: 1,
        title: "Doctor Strange",
        time: 115,
        genres: ["Action", "Adventure", "Fantasy"]
      })
  })
);

const renderWithRouter = (ui, { route = "/movie/1" } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  );
};

describe("Movie Page Tests", () => {
  test("renders the Movie component on route '/movie/:id'", async () => {
    // Render the Movie component at the route /movie/1
    renderWithRouter(<Movie />, { route: "/movie/1" });

    // Wait for the movie data to be fetched and rendered
    await waitFor(() => {
      // Check if the movie title and other details are rendered
      expect(screen.getByText("Doctor Strange")).toBeInTheDocument();
      expect(screen.getByText("Time: 115 minutes")).toBeInTheDocument();
      expect(screen.getByText("Genres: Action Adventure Fantasy")).toBeInTheDocument();
    });
  });
});
