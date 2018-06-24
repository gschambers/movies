import * as React from "react";
import * as renderer from "react-test-renderer";

import { Poster } from "./Poster";
import { Movie } from "../types";

describe("Poster", () => {
    describe("given a movie as input", () => {
        it("should render backdrop and title correctly", () => {
            const movie: Movie = {
                id: 153,
                title: "Lost in Translation",
                imageUrl: "/5T8VvuFTdaawKLJk34i69Utaw7o.jpg",
                rating: 7.4,
            };

            const poster = renderer
                .create(<Poster movie={movie} />)
                .toJSON();

            expect(poster).toMatchSnapshot();
        });
    });
});
