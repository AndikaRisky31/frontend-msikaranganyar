const fs = require("fs/promises");
const path = require("path");
const JavaScriptObfuscator = require("javascript-obfuscator");

async function obfuscateDist() {
  const assetsDir = path.join(process.cwd(), "dist", "assets");

  let files;
  try {
    files = await fs.readdir(assetsDir);
  } catch (error) {
    console.error("Failed to read dist/assets:", error);
    process.exitCode = 1;
    return;
  }

  const targets = files.filter(
    (file) => file.endsWith(".js") && !file.startsWith("ckeditor-"),
  );

  for (const file of targets) {
    const filePath = path.join(assetsDir, file);

    try {
      const source = await fs.readFile(filePath, "utf8");
      const obfuscated = JavaScriptObfuscator.obfuscate(source, {
        compact: true,
        stringArray: true,
        stringArrayThreshold: 0.75,
      });

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
