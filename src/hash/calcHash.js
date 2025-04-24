import { createReadStream } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
const calculateHash = async () => {
  const fileName = fileURLToPath(import.meta.url);
  const __dirname = dirname(fileName);
  const filePath = join(__dirname,"files", "fileToCalculateHashFor.txt");

  const hash = createHash("sha256");
  const input = createReadStream(filePath);
  input.pipe(hash);
  hash.on("readable", () => {
    const data = hash.read();
    if (data) {
      console.log(data.toString("hex"));
    }
  });
};

await calculateHash();
