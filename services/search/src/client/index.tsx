import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "~modules/application";
import { MovieSearch } from "./screens/MovieSearch";

ReactDOM.render(
    <App><MovieSearch /></App>,
    document.querySelector("#root"),
);
