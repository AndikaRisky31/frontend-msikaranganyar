import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "../src/App.jsx";
import path from "path";
import fs from "fs";

const app = express();

// Middleware for serving static files
app.use(express.static(path.resolve(__dirname, "../dist")));

// Read index.html synchronously at server start
const indexFilePath = path.resolve(__dirname, "../dist", "index.html");
let indexFileData;
try {
  indexFileData = fs.readFileSync(indexFilePath, "utf8");
} catch (err) {
  console.error("Error reading index.html:", err);
  process.exit(1);
}

app.get("/*", (req, res) => {
  if (!indexFileData) {
    return res.status(500).send("Internal Server Error");
  }

  const [head, tail] = indexFileData.split('<div id="root"></div>');

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");

  // Write the first part of the HTML document to the response
  res.write(head + '<div id="root">');

  const stream = ReactDOMServer.renderToPipeableStream(
    <StaticRouter location={req.originalUrl}>
      <App />
    </StaticRouter>,
    {
      onShellReady() {
        // Pipe the render stream to the response
        stream.pipe(res, { end: false });
      },
      onAllReady() {
        // After all content is rendered, write the second part of the HTML and end the response
        res.write('</div>' + tail);
        res.end();
      },
      onError(err) {
        console.error("Rendering error:", err);
        res.status(500).send("Internal Server Error");
      },
      onShellError() {
        res.status(500).send("Internal Server Error");
      },
    }
  );
});

app.listen(3002, () => {
  console.log("App is running on http://localhost:3002");
});
