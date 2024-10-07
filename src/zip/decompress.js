import { createReadStream, createWriteStream } from "fs";
import { createGunzip } from "zlib";
import { pipeline } from "stream";
import { promisify } from "util";

const pipelineAsync = promisify(pipeline);

const decompress = async () => {
  const inputFilePath = "./files/archive.gz";
  const outputFilePath = "./files/fileToCompress.txt";

  const readStream = createReadStream(inputFilePath);

  const writeStream = createWriteStream(outputFilePath);

  const gunzip = createGunzip();

  try {
    await pipelineAsync(readStream, gunzip, writeStream);

    console.log(`File has been decompressed and saved to ${outputFilePath}`);
  } catch (err) {
    console.error("Error during decompression:", err);
  }
};

await decompress();
