import { useState, useEffect } from "react";
import { Movie, FetchMoviesResp } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import { Toaster, toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import "./App.module.css";

function App() {
  const [page, setPage] = useState<number>(1);
  const [searchMovies, setSearchMovies] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<Movie | null>(null);

  const { data, isLoading, isError } = useQuery<FetchMoviesResp>({
    queryKey: ["movies", searchMovies, page],
    queryFn: () => fetchMovies(searchMovies, page),
    enabled: searchMovies !== "",
  });

  const movies: Movie[] = data?.results ?? [];
  const pageCount: number = data?.total_pages ?? 0;

  useEffect(() => {
    setPage(1);
  }, [searchMovies]);

  useEffect(() => {
    if (!isLoading && !isError && searchMovies && movies.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [isLoading, isError, movies, searchMovies]);

  const handleSubmit = (newSearchMovie: string) => {
    setSearchMovies(newSearchMovie);
  };

  const handleSelect = (movie: Movie) => {
    setIsModalOpen(movie);
  };

  const handleClose = () => setIsModalOpen(null);

  return (
    <>
      <Toaster />
      <SearchBar onSearch={handleSubmit} />
      {pageCount > 1 && (
        <Pagination
          currentPage={page}
          pageCount={pageCount}
          onPageChange={setPage}
        />
      )}
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
