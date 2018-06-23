import { always, equals, identity, ifElse } from "ramda";
import * as React from "react";
import { Observable, Subject, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged, map, skip, startWith } from "rxjs/operators";

import "./SearchBar.css";

interface Props {
    helpText?: string;
    onChange(query: string | null): void;
}

interface State {
    value: string;
}

const INPUT_DEBOUNCE_DURATION = 250;
const MIN_QUERY_LENGTH = 3;

const exceedsMinLength = (query: string) => query.length >= MIN_QUERY_LENGTH;

export class SearchBar extends React.Component<Props, State> {
    state: State = {
        value: "",
    };

    private input$ = new Subject<string>();
    private subscription = new Subscription();

    componentDidMount() {
        const stream$: Observable<string | null> = this.input$.pipe(
            debounceTime(INPUT_DEBOUNCE_DURATION),
            map(ifElse(exceedsMinLength, identity, always(null))),
            startWith(null),
            distinctUntilChanged<string | null>(equals),
            skip(1),
        );

        this.subscription.add(
            stream$.subscribe(
                (query) => this.props.onChange(query)
            ),
        );
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const value = evt.currentTarget.value;

        this.setState({ value }, () => {
            this.input$.next(value);
        });
    };

    render() {
        return (
            <div className="SearchBar">
                <input
                    className="SearchBar-input"
                    placeholder={this.props.helpText}
                    value={this.state.value}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}
