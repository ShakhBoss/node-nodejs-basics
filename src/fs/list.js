import fs from "fs/promises";
import { constants } from "fs";

const list = async () => {
  const folderPath = "./files";

  try {
    await fs.access(folderPath, constants.F_OK);

    const files = await fs.readdir(folderPath);

    files.forEach((file) => {
      console.log(file);
    });
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await list();
