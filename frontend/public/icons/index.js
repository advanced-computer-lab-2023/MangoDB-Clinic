const fs = require("fs");
const path = require("path");

const iconsDir = path.join(__dirname, "public", "icons"); // Update with your actual path
const files = fs.readdirSync(iconsDir);

const exports = files
  .map((file) => {
    const name = path.basename(file, path.extname(file));
    return `export { default as ${name} } from './${file}';`;
  })
  .join("\n");

fs.writeFileSync(path.join(iconsDir, "index.js"), exports);
