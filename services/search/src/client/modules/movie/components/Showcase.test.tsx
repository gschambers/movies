import { shallow } from "enzyme";
import * as React from "react";

import { Movie } from "../types";
import { Poster } from "./Poster";
import { Showcase } from "./Showcase";

const MOVIES: Movie[] = [
    {
        id: 1,
        title: "Foo",
        imageUrl: "/foo.jpg",
        rating: 9,
    },

    {
        id: 2,
        title: "Bar",
        imageUrl: "/bar.jpg",
        rating: 8,
    },

    {
        id: 3,
        title: "Baz",
        imageUrl: "/baz.jpg",
        rating: 7,
    },

    {
        id: 4,
        title: "Qux",
        imageUrl: "/qux.jpg",
        rating: 6,
    },
];

describe("Showcase", () => {
    describe("given initial state and a list of movies", () => {
        it("should focus the first movie and render a trailing list", () => {
            const showcase = shallow(<Showcase movies={MOVIES} />);
            const posters = showcase.find(".Showcase-poster");

            expect(posters.last().find(Poster).prop("movie")).toEqual(MOVIES[0]);
            expect(posters).toHaveLength(4);
        });

        it("should focus the second movie on right arrow and render trailing list", () => {
            const showcase = shallow(<Showcase movies={MOVIES} />);
            const navRight = showcase.find(".Showcase-navRight");

            navRight.simulate("click");
            showcase.update();

            const posters = showcase.find(".Showcase-poster");

            expect(posters.last().find(Poster).prop("movie")).toEqual(MOVIES[1]);
            expect(posters).toHaveLength(3);
        });

        it("should focus the third movie on double right arrow and render trailing list", () => {
            const showcase = shallow(<Showcase movies={MOVIES} />);
            const navRight = showcase.find(".Showcase-navRight");

            const nav = [navRight, navRight];

            for (let elem of nav) {
                elem.simulate("click");
            }

            showcase.update();

            const posters = showcase.find(".Showcase-poster");

            expect(posters.last().find(Poster).prop("movie")).toEqual(MOVIES[2]);
            expect(posters).toHaveLength(2);
        });

        it("should focus the second movie on double right arrow, left arrow and render trailing list", () => {
            const showcase = shallow(<Showcase movies={MOVIES} />);
            const navRight = showcase.find(".Showcase-navRight");
            const navLeft = showcase.find(".Showcase-navLeft");

            const nav = [navRight, navRight, navLeft];

            for (let elem of nav) {
                elem.simulate("click");
            }

            showcase.update();

            const posters = showcase.find(".Showcase-poster");

            expect(posters.last().find(Poster).prop("movie")).toEqual(MOVIES[1]);
            expect(posters).toHaveLength(3);
        });
    });
});
