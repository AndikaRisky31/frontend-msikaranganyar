import express from "express";
import axios from "axios";
import path from "path";
import fs from "fs";
import { PassThrough } from "stream";
import { render } from "../src/entry-server.jsx";

const app = express();
const distPath = path.resolve(__dirname, "../dist");
const siteUrl = process.env.SITE_URL || "https://msikaranganyar.com";
const apiBaseUrl = process.env.REACT_APP_BASE_URL || "";

app.use(express.static(distPath));

const indexFilePath = path.resolve(distPath, "index.html");
let indexFileData;
try {
  indexFileData = fs.readFileSync(indexFilePath, "utf8");
} catch (err) {
  console.error("Error reading index.html:", err);
  process.exit(1);
}

function injectHead(template, helmet) {
  const title = helmet?.title?.toString() || "";
  const meta = helmet?.meta?.toString() || "";
  const link = helmet?.link?.toString() || "";
  const script = helmet?.script?.toString() || "";
  const sanitizedTemplate = template
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/i, "")
    .replace(
      /<meta\b[^>]*name=["'](?:description|keywords|twitter:card|twitter:title|twitter:description|twitter:image)["'][^>]*>\s*/gi,
      "",
    )
    .replace(
      /<meta\b[^>]*property=["'](?:og:title|og:description|og:image|og:url|og:type)["'][^>]*>\s*/gi,
      "",
    );

  return sanitizedTemplate.replace(
    "</head>",
    `${title}${meta}${link}${script}</head>`,
  );
}

function injectInitialData(template, initialData) {
  const serialized = JSON.stringify(initialData || {})
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");

  return template.replace(
    "</body>",
    `<script>window.__INITIAL_DATA__=${serialized};</script></body>`,
  );
}

function getRequestPageUrl(req) {
  const protocol = req.headers["x-forwarded-proto"] || req.protocol || "https";
  const host = req.headers.host || new URL(siteUrl).host;
  return `${protocol}://${host}${req.originalUrl}`;
}

async function fetchInitialData(req) {
  const newsMatch = req.path.match(/^\/news\/([^/]+)$/);
  if (!newsMatch || !apiBaseUrl) {
    return {};
  }

  const newsUrl = decodeURIComponent(newsMatch[1]);
  const [newsResponse, listResponse] = await Promise.all([
    axios.get(`${apiBaseUrl}/news/${newsUrl}`),
    axios.get(`${apiBaseUrl}/news/?page=1&limit=5`),
  ]);

  return {
    newsPage: {
      url: newsUrl,
      pageUrl: getRequestPageUrl(req),
      currentPage: 1,
      newsContent: newsResponse.data?.data || null,
      lastNews: listResponse.data?.data || null,
      totalPages: listResponse.data?.totalPages || 1,
    },
  };
}

app.get("/*", async (req, res) => {
  const template = indexFileData;
  if (!template) {
    res.status(500).send("Internal Server Error");
    return;
  }

  const bodyStream = new PassThrough();
  let appHtml = "";
  let didError = false;

  bodyStream.on("data", (chunk) => {
    appHtml += chunk.toString();
  });

  bodyStream.on("end", () => {
    const [head, tail] = injectHead(
      injectInitialData(template, initialData),
      helmetContext.helmet
    ).split('<div id="root"></div>');

    res.status(didError ? 500 : 200).set("Content-Type", "text/html").send(
      `${head}<div id="root">${appHtml}</div>${tail}`
    );
  });

  let initialData = {};
  try {
    initialData = await fetchInitialData(req);
  } catch (err) {
    console.error("Failed to fetch SSR initial data:", err);
  }

  const { stream, helmetContext } = render(req.originalUrl, initialData, {
    onAllReady() {
      stream.pipe(bodyStream);
    },
    onError(err) {
      didError = true;
      console.error("Rendering error:", err);
    },
    onShellError(err) {
      console.error("Shell rendering error:", err);
      res.status(500).send("Internal Server Error");
    },
  });
});

app.listen(3002, () => {
  console.log("App is running on http://localhost:3002");
});
