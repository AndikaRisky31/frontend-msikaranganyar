import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoot from "./AppRoot";

const rootElement = document.getElementById("root");
const initialData = window.__INITIAL_DATA__ || {};

hydrateRoot(
  rootElement,
  <AppRoot Router={BrowserRouter} initialData={initialData} />
);
