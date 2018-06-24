import axios from "axios";
import { SearchResult } from "~modules/search";
import { Movie } from "./types";
import { MovieDBSearchResponse } from "./api";

export const searchMovies = (query: string): Promise<SearchResult<Movie>> =>
    axios.get<MovieDBSearchResponse>(`/api/search?query=${query}`)
        .then((res) => ({
            results: res.data.results.map(
                (result) => ({
                    id: result.id,
                    title: result.title,
                    imageUrl: result.poster_path,
                    rating: result.vote_average,
                })
            ),
        }));
