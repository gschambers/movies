import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Movie, Poster } from "~modules/movie";

const movie: Movie = {
    id: 153,
    title: "Lost in Translation",
    imageUrl: "/5T8VvuFTdaawKLJk34i69Utaw7o.jpg",
    rating: 7.4,
};

storiesOf("Poster", module)
    .add("Small", () => <Poster movie={movie} size="small" />)
    .add("Medium", () => <Poster movie={movie} size="medium" />)
    .add("Large", () => <Poster movie={movie} size="large" />);
