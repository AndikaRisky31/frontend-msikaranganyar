import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import AppRoot from "./AppRoot";

export function render(url, initialData = {}, options = {}) {
  const helmetContext = {};

  const stream = renderToPipeableStream(
    <AppRoot
      Router={StaticRouter}
      routerProps={{ location: url }}
      helmetContext={helmetContext}
      initialData={initialData}
      ssr={true}
    />,
    options
  );

  return { stream, helmetContext };
}
