// src/index.jsx
import React from "react";
import { ThemeProvider } from "@material-tailwind/react";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");

const root = createRoot(rootElement);
root.render(
  React.createElement(
    BrowserRouter,
    null,
    React.createElement(
      ThemeProvider,
      null,
      React.createElement(
        HelmetProvider,
        null,
        React.createElement(App, null)
      )
    )
  )
);
