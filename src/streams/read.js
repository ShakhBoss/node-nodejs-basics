import { createReadStream } from "fs";

const read = async () => {
  const filePath = "./files/fileToRead.txt";

  const fileStream = createReadStream(filePath, "utf-8");

  fileStream.on("error", (err) => {
    console.error("Error reading the file:", err);
  });

  fileStream.pipe(process.stdout);
};

await read();
