import { reverse, splitAt } from "ramda";
import * as React from "react";

import { Movie } from "../types";
import { Poster } from "./Poster";

import "./Showcase.css";

interface Props {
    movies: Movie[];
}

interface State {
    selectedIndex: number;
}

export class Showcase extends React.Component<Props, State> {
    state: State = {
        selectedIndex: 0,
    };

    handleMovePrev = () => {
        const { selectedIndex } = this.state;

        this.setState({
            selectedIndex: Math.max(0, selectedIndex - 1),
        });
    };

    handleMoveNext = () => {
        const { movies } = this.props;
        const { selectedIndex } = this.state;

        this.setState({
            selectedIndex: Math.min(movies.length - 1, selectedIndex + 1),
        });
    };

    getMoviesFromSelectedIndex() {
        const [ , trailing ] = splitAt(this.state.selectedIndex, this.props.movies);
        return reverse(trailing);
    }

    render() {
        const { selectedIndex } = this.state;
        let movies = this.getMoviesFromSelectedIndex();
        const length = movies.length;

        const hasNext = selectedIndex < length - 1;
        const hasPrev = selectedIndex > 0;

        return (
            <div className="Showcase">
                <div className="Showcase-nav">
                    <div className={`Showcase-navLeft ${!hasPrev && "is-disabled"}`} onClick={this.handleMovePrev}>
                        <i className="fa fa-arrow-left" />
                    </div>

                    <div className={`Showcase-navRight ${!hasNext && "is-disabled"}`} onClick={this.handleMoveNext}>
                        <i className="fa fa-arrow-right" />
                    </div>
                </div>

                <div className="Showcase-posters">
                    {movies.map((movie, i) => {
                        const index = length - i - 1;
                        const translate = index * 60;
                        const scale = 1 - (index * 0.05);

                        return (
                            <div
                                key={movie.id}
                                className="Showcase-poster"
                                style={{ transform: `translateX(${translate}px) scale(${scale})` }}
                            >
                                <Poster
                                    movie={movie}
                                    showStrapline={index === 0}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
