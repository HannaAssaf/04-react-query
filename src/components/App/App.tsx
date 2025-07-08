import { useState } from "react";
import { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import { Toaster, toast } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import "./App.module.css";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<Movie | null>(null);

  const handleSubmit = async (searchTopic: string) => {
    try {
      setIsError(false);
      setIsLoading(true);
      setMovies([]);
      const newMovies = await fetchMovies(searchTopic);
      if (newMovies.length === 0) {
        toast.error("No movies found for your request.");
      }
      setMovies(newMovies);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (movie: Movie) => {
    setIsModalOpen(movie);
  };
  const handleClose = () => setIsModalOpen(null);

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}
      {isModalOpen && <MovieModal movie={isModalOpen} onClose={handleClose} />}
    </>
  );
}

export default App;
