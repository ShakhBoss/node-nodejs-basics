import { access, constants, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const read = async () => {
  const fileName = fileURLToPath(import.meta.url);
  const __dirname = dirname(fileName);
  const readFilePath = join(__dirname, "files", "fileToRead.txt");

  try {
    await access(readFilePath, constants.F_OK);
    const content = await readFile(readFilePath,'utf-8');
    console.log(content);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await read();
