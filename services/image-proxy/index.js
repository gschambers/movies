const cache = require("apicache").middleware;
const express = require("express");
const proxy = require("http-proxy-middleware");

const app = express();

app.use(cache("10 minutes"), proxy({
    target: process.env.IMAGES_UPSTREAM,
    changeOrigin: true,
}));

app.listen(process.env.PORT, process.env.HOST);
