import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Movie = () => {
  const { id } = useParams();  // Get the movie ID from the URL parameter
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(`http://localhost:5000/movies/${id}`);
      const data = await response.json();
      setMovie(data);
    };

    fetchMovie();
  }, [id]); // The effect depends on the movie ID

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>Time: {movie.time} minutes</p>
      <p>Genres: {movie.genres.join(" ")}</p>
    </div>
  );
};

export default Movie;
