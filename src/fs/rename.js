import fs from "fs/promises";
import { constants } from "fs";

const rename = async () => {
  const oldFile = "./files/wrongFilename.txt";
  const newFile = "./files/properFilename.md";

  try {
    await fs.access(oldFile, constants.F_OK);

    try {
      await fs.access(newFile, constants.F_OK);

      throw new Error("FS operation failed: properFilename.md already exists");
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }

    await fs.rename(oldFile, newFile);

    console.log("File renamed successfully.");
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await rename();
