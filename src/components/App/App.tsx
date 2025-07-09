import { useState, useEffect } from "react";
import { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import { Toaster, toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import "./App.module.css";

function App() {
  const [searchMovies, setSearchMovies] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<Movie | null>(null);

  const {
    data: movies = [],
    isLoading,
    isError,
  } = useQuery<Movie[]>({
    queryKey: ["movies", searchMovies],
    queryFn: () => fetchMovies(searchMovies),
    enabled: searchMovies !== "",
  });

  useEffect(() => {
    if (!isLoading && !isError && searchMovies && movies.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [isLoading, isError, movies, searchMovies]);

  const handleSubmit = (newSearchMovie: string) => {
    setSearchMovies(newSearchMovie);
    // }
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
