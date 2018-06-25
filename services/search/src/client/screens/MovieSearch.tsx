import * as React from "react";
import { Subject, Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";

import { Movie, MovieService, Showcase } from "~modules/movie";
import { SearchBar, SearchResult } from "~modules/search";

import "./MovieSearch.css";

interface State {
    loading: boolean;
    query: string | null;
    movies: Movie[];
}

export class MovieSearch extends React.Component<{}, State> {
    private query$ = new Subject<string | null>();
    private subscription = new Subscription();

    state: State = {
        loading: false,
        query: null,
        movies: [],
    };

    componentDidMount() {
        const searchResult$ = this.query$.pipe(
            switchMap((query) => {
                return query !== null
                    ? MovieService.searchMovies(query)
                    : Promise.resolve<SearchResult<Movie>>({ results: [] });
            }),
        );

        this.subscription.add(
            searchResult$.subscribe((searchResult) => {
                this.setState({
                    loading: false,
                    movies: searchResult.results,
                });
            })
        );
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    handleQueryChange = (query: string | null) => {
        this.query$.next(query);
        this.setState({
            loading: true,
            query,
        });
    };

    render() {
        return (
            <div className="MovieSearch">
                <div className="MovieSearch-searchBar">
                    <SearchBar
                        helpText="Search for movies by title..."
                        onChange={this.handleQueryChange}
                    />
                </div>

                {this.state.movies.length ? (
                    <div className="MovieSearch-showcase">
                        <Showcase movies={this.state.movies} />
                    </div>
                ) : null}
            </div>
        );
    }
}
