import { createReadStream, createWriteStream, unlink } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createGzip } from "node:zlib";
import { pipeline } from "node:stream/promises";

const compress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const sourcePath = join(__dirname, "files", "fileToCompress.txt");
  const destinationPath = join(__dirname, "files", "archive.gz");

  try {
    await pipeline(
      createReadStream(sourcePath),
      createGzip(),
      createWriteStream(destinationPath)
    );

    unlink(sourcePath, (err) => {
      if (err) throw err;
      console.log("fileToCompress.txt deleted");
    });
  } catch (err) {
    console.error("Compression failed:", err.message);
  }
};

await compress();
