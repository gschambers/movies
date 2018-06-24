import { searchMovies } from "./service";

jest.mock("axios");

test("Movie service - searchMovies", async () => {
    const res = await searchMovies("Foo");
    expect(res.results).toHaveLength(1);
    const movie = res.results[0];
    expect(movie.id).toEqual(1);
    expect(movie.title).toEqual("Foo");
    expect(movie.imageUrl).toEqual("foo.jpg");
    expect(movie.rating).toEqual(7.5);
});
