import { createReadStream, createWriteStream, unlink } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createGunzip } from "node:zlib";
import { pipeline } from "node:stream/promises";

const decompress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const sourcePath = join(__dirname, "files", "archive.gz");
  const destinationPath = join(__dirname, "files", "fileToCompress.txt");

  try {
    await pipeline(
      createReadStream(sourcePath),
      createGunzip(),
      createWriteStream(destinationPath)
    );

    unlink(sourcePath, (err) => {
      if (err) throw err;
      console.log("archive.gz deleted");
    });
  } catch (err) {
    console.error("Decompression failed:", err.message);
  }
};

await decompress();
