import { AxiosResponse } from "axios";
import { MovieDBSearchResponse } from "../api";

export default {
    get(_url: string): Promise<AxiosResponse<MovieDBSearchResponse>> {
        return Promise.resolve({
            status: 200,
            statusText: "OK",
            headers: null,
            config: {},
            data: {
                page: 1,
                total_pages: 1,
                total_results: 1,
                results: [{
                    poster_path: "foo.jpg",
                    adult: false,
                    overview: "Overview of the movie",
                    release_date: "2000-07-31",
                    genre_ids: [1, 2, 3],
                    id: 1,
                    original_title: "Foo",
                    original_language: "en",
                    title: "Foo",
                    backdrop_path: "foo2.jpg",
                    popularity: 10,
                    vote_count: 100,
                    video: false,
                    vote_average: 7.5,
                }],
            },
        });
    },
};
