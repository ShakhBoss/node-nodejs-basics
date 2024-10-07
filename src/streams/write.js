import { createWriteStream } from "fs";

const write = async () => {
  const filePath = "./files/fileToWrite.txt";

  const fileStream = createWriteStream(filePath);

  fileStream.on("error", (err) => {
    console.error("Error writing to the file:", err);
  });

  process.stdin.pipe(fileStream);

  fileStream.on("finish", () => {
    console.log("Data has been written to file successfully.");
  });
};

await write();