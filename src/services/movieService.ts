import axios from "axios";
import { FetchMoviesResp } from "../types/movie";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

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
