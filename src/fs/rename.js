import { access, constants, rename as fsRename } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const rename = async () => {
  const fileName = fileURLToPath(import.meta.url);
  const __dirname = dirname(fileName);
  const oldPath = join(__dirname, "files", "wrongFilename.txt");
  const newPath = join(__dirname, "files", "properFilename.md");
  try {
    await access(newPath, constants.F_OK);
    throw new Error("FS operation failed");
  } catch (error) {
    if (error.code === "ENOENT") {
      try {
        await access(oldPath, constants.F_OK);
        await fsRename(oldPath, newPath);
      } catch (error) {
        throw new Error("FS operation failed");
      }
    } else {
      throw new Error("FS operation failed");
    }
  }
};

await rename();
