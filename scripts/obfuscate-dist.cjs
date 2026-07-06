const fs = require("fs/promises");
const path = require("path");
const JavaScriptObfuscator = require("javascript-obfuscator");

const SHARED_CHUNK_PREFIXES = [
  "react-",
  "router-",
  "vendor-",
  "flowbite-",
  "tailwind-ui-",
  "mui-",
  "icons-",
  "ckeditor-",
  "rolldown-runtime-",
];

async function loadObfuscatorConfig() {
  const configPath = path.join(process.cwd(), "src", "obfuscator-config.json");
  const configSource = await fs.readFile(configPath, "utf8");
  const config = JSON.parse(configSource);

  if (!config.debugProtection) {
    config.debugProtectionInterval = 0;
  }

  return config;
}

function shouldObfuscate(file) {
  if (!file.endsWith(".js")) {
    return false;
  }

  return !SHARED_CHUNK_PREFIXES.some((prefix) => file.startsWith(prefix));
}

async function obfuscateDist() {
  const assetsDir = path.join(process.cwd(), "dist", "assets");
  let obfuscatorConfig;

  try {
    obfuscatorConfig = await loadObfuscatorConfig();
  } catch (error) {
    console.error("Failed to load obfuscator config:", error);
    process.exitCode = 1;
    return;
  }

  let files;
  try {
    files = await fs.readdir(assetsDir);
  } catch (error) {
    console.error("Failed to read dist/assets:", error);
    process.exitCode = 1;
    return;
  }

  const targets = files.filter((file) => file.endsWith(".js"));

  for (const file of targets) {
    if (!shouldObfuscate(file)) {
      console.log(`Skipped ${file}`);
      continue;
    }

    const filePath = path.join(assetsDir, file);

    try {
      const source = await fs.readFile(filePath, "utf8");
      const obfuscated = JavaScriptObfuscator.obfuscate(
        source,
        obfuscatorConfig,
      );

      await fs.writeFile(filePath, obfuscated.getObfuscatedCode(), "utf8");
      console.log(`Obfuscated ${file}`);
    } catch (error) {
      console.error(`Failed to obfuscate ${file}:`, error);
      process.exitCode = 1;
      return;
    }
  }
}

obfuscateDist();
