import { createWriteStream } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const write = async () => {
  const fileName = fileURLToPath(import.meta.url);
  const __dirname = dirname(fileName);
  const filePath = join(__dirname, "files", "fileToWrite.txt");

  const writableStream = createWriteStream(filePath, "utf-8");

  process.stdin.pipe(writableStream);

  writableStream.on("finish", () => {
    console.log("Finished writing");
  });
  writableStream.on("error", (err) => {
    console.error(err.message);
  });
};

await write();
