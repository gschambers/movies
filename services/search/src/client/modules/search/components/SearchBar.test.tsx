import { shallow } from "enzyme";
import * as React from "react";
import { SearchBar } from "./SearchBar";

const noop = () => null;

interface MockChangeEvent {
    currentTarget: {
        value: string;
    };
}

type OnChangeHandler = (evt: MockChangeEvent) => void;

describe("SearchBar", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    describe("given initial state", () => {
        it("should show an empty input on first render", () => {
            const searchBar = shallow(<SearchBar onChange={noop} />);
            const input = searchBar.find("input");
            expect(searchBar.state("value")).toEqual("");
            expect(input.prop("value")).toEqual("");
        });

        it("should show help text as placeholder, if provided", () => {
            const searchBar = shallow(<SearchBar helpText="Enter query..." onChange={noop} />);
            const input = searchBar.find("input");
            expect(input.prop("placeholder")).toEqual("Enter query...");
        });

        it("should update the input value on every character keypress", () => {
            const searchBar = shallow(<SearchBar onChange={noop} />);
            const onChange = searchBar
                .find("input")
                .prop("onChange") as any as OnChangeHandler;

            onChange({
                currentTarget: {
                    value: "a",
                },
            });

            expect(searchBar.state("value")).toEqual("a");

            searchBar.update();
            expect(searchBar.find("input").prop("value")).toEqual("a");
        });

        it("should not emit any value while the state is below minimum query length", () => {
            const changeSpy = jest.fn();
            const searchBar = shallow(<SearchBar onChange={changeSpy} />);
            const onChange = searchBar
                .find("input")
                .prop("onChange") as any as OnChangeHandler;

            onChange({
                currentTarget: {
                    value: "ab",
                },
            });

            jest.runAllTimers();

            expect(searchBar.state("value")).toEqual("ab");
            expect(changeSpy).not.toHaveBeenCalled();
        });

        it("should start emitting values once state is greater than minimum query length", () => {
            const changeSpy = jest.fn();
            const searchBar = shallow(<SearchBar onChange={changeSpy} />);
            const onChange = searchBar
                .find("input")
                .prop("onChange") as any as OnChangeHandler;

            onChange({
                currentTarget: {
                    value: "abc",
                },
            });

            jest.runAllTimers();

            expect(searchBar.state("value")).toEqual("abc");
            expect(changeSpy).toHaveBeenCalledTimes(1);
            expect(changeSpy).toHaveBeenCalledWith("abc");
        });
    });

    describe("given state greater than the minimum query length", () => {
        it("should emit a value for a single character keypress", () => {
            const changeSpy = jest.fn();
            const searchBar = shallow(<SearchBar onChange={changeSpy} />);

            searchBar.setState({
                value: "foo",
            });

            const onChange = searchBar
                .find("input")
                .prop("onChange") as any as OnChangeHandler;

            onChange({
                currentTarget: {
                    value: "foot",
                },
            });

            jest.runAllTimers();

            expect(changeSpy).toHaveBeenCalledTimes(1);
            expect(changeSpy).toHaveBeenCalledWith("foot");
        });

        it("should correctly debounce consecutive character keypresses and emit the final value only", () => {
            const changeSpy = jest.fn();
            const searchBar = shallow(<SearchBar onChange={changeSpy} />);

            searchBar.setState({
                value: "foo",
            });

            const onChange = searchBar
                .find("input")
                .prop("onChange") as any as OnChangeHandler;

            const values = ["foot", "footb", "footba"];

            for (let value of values) {
                onChange({
                    currentTarget: { value },
                });
            }

            jest.runAllTimers();

            onChange({
                currentTarget: {
                    value: "footbal",
                },
            });

            jest.runAllTimers();

            expect(changeSpy).toHaveBeenCalledTimes(2);
            expect(changeSpy).toHaveBeenNthCalledWith(1, "footba");
            expect(changeSpy).toHaveBeenNthCalledWith(2, "footbal");
        });

        it("should emit an empty value if the state falls below the minimum query length", () => {
            const changeSpy = jest.fn();
            const searchBar = shallow(<SearchBar onChange={changeSpy} />);

            searchBar.setState({
                value: "fo",
            });

            const onChange = searchBar
                .find("input")
                .prop("onChange") as any as OnChangeHandler;

            onChange({
                currentTarget: {
                    value: "foo",
                },
            });

            jest.runAllTimers();

            onChange({
                currentTarget: {
                    value: "fo",
                },
            });

            jest.runAllTimers();

            expect(changeSpy).toHaveBeenCalledTimes(2);
            expect(changeSpy).toHaveBeenNthCalledWith(1, "foo");
            expect(changeSpy).toHaveBeenNthCalledWith(2, null);
        });
    });
});
