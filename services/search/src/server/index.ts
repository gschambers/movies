import * as express from "express";
import * as proxy from "http-proxy-middleware";
import * as path from "path";

export const router = express.Router();

router.use("/api", proxy({
    target: process.env.API_UPSTREAM,
    pathRewrite: {
        "^/api": "",
    },
}));

router.use("/images", proxy({
    target: process.env.IMAGES_UPSTREAM,
    pathRewrite: {
        "^/images": "",
    },
}));

router.get("/client.js", (_, res) => {
    res.setHeader("Content-Type", "text/javascript");
    res.sendFile(path.resolve(__dirname, "../client.js"));
});

router.use("/", express.static(
    path.resolve(__dirname, "../../public")
));
