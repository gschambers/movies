import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Movie, Showcase } from "~modules/movie";

const movies: Movie[] = [
    {
        id: 153,
        title: "Lost in Translation",
        imageUrl: "/5T8VvuFTdaawKLJk34i69Utaw7o.jpg",
        rating: 7.4,
    },

    {
        id: 401,
        title: "Garden State",
        imageUrl: "/u7IASCZ02Q94SYklSIR2609inis.jpg",
        rating: 7.2,
    },

    {
        id: 38,
        title: "Eternal Sunshine of the Spotless Mind",
        imageUrl: "/7y3eYvTsGjxPYDtSnumCLIMDkrV.jpg",
        rating: 8,
    },

    {
        id: 194,
        title: "Amélie",
        imageUrl: "/f0uorE7K7ggHfr8r7pUTOHWkOlE.jpg",
        rating: 7.9,
    },
]

storiesOf("Showcase", module)
    .add("Initial", () => <Showcase movies={movies} />)
