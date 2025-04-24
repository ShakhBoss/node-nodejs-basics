import { createReadStream } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const read = async () => {
  const fileName = fileURLToPath(import.meta.url);
  const __dirname = dirname(fileName);
  const filePath = join(__dirname, "files", "fileToRead.txt");
  const stream = createReadStream(filePath, "utf-8");
  stream.on("error", (err) => {
    console.error("Error while reading file:", err.message);
  });
  stream.pipe(process.stdout);
};

await read();
