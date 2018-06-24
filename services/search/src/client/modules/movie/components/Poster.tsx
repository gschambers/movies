import * as React from "react";
import { Movie } from "../types";

import "./Poster.css";

interface Props {
    movie: Movie;
    showStrapline?: boolean;
    size?: "small" | "medium" | "large";
}

export const Poster: React.SFC<Props> = ({ movie, showStrapline = true, size = "medium" }) => (
    <div className={`Poster Poster--${size}`}>
        <div className="Poster-backdrop" style={{ backgroundImage: `url(/images${movie.imageUrl})` }} />
        {showStrapline && (
            <div className="Poster-strapline">
                <div className="Poster-title">{movie.title}</div>
                <div className="Poster-rating">({movie.rating})</div>
            </div>
        )}
    </div>
);
