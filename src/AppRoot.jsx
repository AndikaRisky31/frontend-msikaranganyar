import React from "react";
import { ThemeProvider } from "@material-tailwind/react";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import AppServer from "./AppServer";
import { SSRDataProvider } from "./ssr/SSRDataContext";

function AppRoot({
  Router,
  routerProps = {},
  helmetContext,
  ssr = false,
  initialData = {},
}) {
  return (
    <Router {...routerProps}>
      <ThemeProvider>
        <HelmetProvider context={helmetContext}>
          <SSRDataProvider value={initialData}>
            {ssr ? <AppServer /> : <App />}
          </SSRDataProvider>
        </HelmetProvider>
      </ThemeProvider>
    </Router>
  );
}

export default AppRoot;
