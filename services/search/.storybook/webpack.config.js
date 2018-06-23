const path = require("path");

module.exports = {
    resolve: {
        alias: {
            "~modules": path.resolve(__dirname, "../src/client/modules"),
        },
        extensions: [".js", ".ts", ".tsx"],
    },

    module: {
        rules: [{
            include: path.resolve(".."),
            test: /\.(ts|tsx)$/,
            use: "ts-loader",
        }, {
            include: path.resolve(".."),
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
        }],
    },
};
