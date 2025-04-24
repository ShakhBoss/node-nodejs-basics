import { access, constants, unlink } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const remove = async () => {
  const fileName = fileURLToPath(import.meta.url);
  const __dirname = dirname(fileName);
  const removeFilePath = join(__dirname, "files", "fileToRemove.txt");

  try {
    await access(removeFilePath, constants.F_OK);
    await unlink(removeFilePath);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await remove();
