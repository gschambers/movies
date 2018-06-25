const path = require("path");
const mode = "development";

module.exports = {
    mode,

    entry: "./src/client/index.tsx",

    output: {
        filename: "client.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
    },

    resolve: {
        alias: {
            "~modules": path.resolve(__dirname, "src/client/modules"),
        },

        extensions: [".ts", ".tsx", ".js", ".json"],
    },

    module: {
        rules: [
            { test: /\.tsx?$/, exclude: /node_modules/, use: "ts-loader" },
            { test: /\.css$/, exclude: /node_modules/, use: ["style-loader", "css-loader"] },
        ],
    },
};
