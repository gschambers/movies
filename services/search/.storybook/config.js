import { addDecorator, configure } from "@storybook/react";
import React from "react";

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 16px)",
        fontFamily: "Fira Sans Condensed, sans-serif",
        backgroundColor: "hsl(220, 21%, 16%)",
        backgroundImage: "linear-gradient(hsl(220, 21%, 24%), hsl(220, 21%, 10%))",
        color: "white",
    },

    story: {
        display: "flex",
        justifyContent: "center",
        width: "50vw",
    },
};

const Container = ({ children }) => (
    <div style={styles.container}>
        {children}
    </div>
);

const Story = ({ children }) => (
    <div style={styles.story}>
        {children}
    </div>
);

const withContainer = (story) => (
    <Container>
        <Story>{story()}</Story>
    </Container>
);

addDecorator(withContainer);

const req = require.context("../stories", true, /.stories.tsx$/);

function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
