// src/index.js
import React from "react";
import { ThemeProvider } from "@material-tailwind/react";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { isBrowser } from "./utils/helper";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");

if (isBrowser()) {
  const root = createRoot(rootElement);
  root.render(
    <BrowserRouter>
      <ThemeProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
} else {
  hydrateRoot(
    rootElement,
    <ThemeProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ThemeProvider>
  );
}