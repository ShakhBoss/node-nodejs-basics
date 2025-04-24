import { access, constants, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const list = async () => {
  const fileName = fileURLToPath(import.meta.url);
  const __dirname = dirname(fileName);
  const folderFiles = join(__dirname, "files");
  try {
    await access(folderFiles, constants.F_OK);
    const files = await readdir(folderFiles);
    files.forEach((file) => {
      console.log(file);
    });
  } catch (error) {
    throw new Error("FS operation failed");
    
  }
};

await list();
