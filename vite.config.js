import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

function getEnvValue(env, key) {
  return env[`VITE_${key}`] || env[`REACT_APP_${key}`] || "";
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    build: {
      chunkSizeWarningLimit: 700,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) {
              return;
            }

            if (id.includes("react-router") || id.includes("history")) {
              return "router";
            }

            if (
              id.includes("node_modules/react/") ||
              id.includes("node_modules/react-dom/") ||
              id.includes("/scheduler/")
            ) {
              return "react";
            }

            if (id.includes("@mui") || id.includes("@emotion")) {
              return "mui";
            }

            if (id.includes("@material-tailwind")) {
              return "tailwind-ui";
            }

            if (id.includes("flowbite-react")) {
              return "flowbite";
            }

            if (id.includes("styled-components")) {
              return "styled";
            }

            if (
              id.includes("@heroicons") ||
              id.includes("@radix-ui") ||
              id.includes("react-icons")
            ) {
              return "icons";
            }

            if (id.includes("framer-motion")) {
              return "motion";
            }

            if (id.includes("@ckeditor") || id.includes("ckeditor5")) {
              return "ckeditor";
            }

            return "vendor";
          },
        },
      },
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
      "process.env.REACT_APP_BASE_URL": JSON.stringify(getEnvValue(env, "BASE_URL")),
      "process.env.REACT_APP_IMAGE_URL": JSON.stringify(getEnvValue(env, "IMAGE_URL")),
      "process.env.REACT_APP_SERVICE_ID": JSON.stringify(getEnvValue(env, "SERVICE_ID")),
      "process.env.REACT_APP_TEMPLATE_ID": JSON.stringify(getEnvValue(env, "TEMPLATE_ID")),
      "process.env.REACT_APP_PUBLIC_KEY": JSON.stringify(getEnvValue(env, "PUBLIC_KEY")),
    },
  };
});
