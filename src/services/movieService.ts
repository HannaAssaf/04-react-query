import axios from "axios";
import { Movie } from "../types/movie";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface FetchMoviesResp {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}
export const fetchMovies = async (
  query: string,
  page: number
): Promise<FetchMoviesResp> => {
  const config = {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page,
    },
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  };

  const response = await axios.get<FetchMoviesResp>(`/search/movie`, config);
  return response.data;
};
