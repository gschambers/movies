const cache = require("apicache").middleware;
const express = require("express");
const proxy = require("http-proxy-middleware");

const app = express();

app.use(cache("21600 seconds"), proxy({
    target: process.env.API_UPSTREAM,
}));

app.listen(process.env.PORT, process.env.HOST);
