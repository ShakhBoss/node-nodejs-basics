import { createReadStream, createWriteStream } from "fs";
import { createGzip } from "zlib";
import { pipeline } from "stream";
import { promisify } from "util";

const pipelineAsync = promisify(pipeline);

const compress = async () => {
  const inputFilePath = "./files/fileToCompress.txt";
  const outputFilePath = "./files/archive.gz";

  const readStream = createReadStream(inputFilePath);

  const writeStream = createWriteStream(outputFilePath);

  const gzip = createGzip();

  try {
    await pipelineAsync(readStream, gzip, writeStream);

    console.log(`File has been compressed and saved to ${outputFilePath}`);
  } catch (err) {
    console.error("Error during compression:", err);
  }
};

await compress();
