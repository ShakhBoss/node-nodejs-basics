import fs from "fs/promises";
import { constants } from "fs";

const read = async () => {
  const filePath = "./files/fileToRead.txt";

  try {
    await fs.access(filePath, constants.F_OK);

    const data = await fs.readFile(filePath, "utf-8");

    console.log(data);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await read();
