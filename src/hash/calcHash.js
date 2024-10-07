import { createHash } from "crypto";
import { createReadStream } from "fs";
import { pipeline } from "stream";
import { promisify } from "util";

const pipelineAsync = promisify(pipeline);

const calculateHash = async () => {
  const filePath = "./files/fileToCalculateHashFor.txt";

  const hash = createHash("sha256");

  const fileStream = createReadStream(filePath);

  try {
    await pipelineAsync(fileStream, hash.setEncoding("hex"));

    console.log(hash.read());
  } catch (err) {
    console.error("Error while calculating hash:", err);
  }
};

await calculateHash();
