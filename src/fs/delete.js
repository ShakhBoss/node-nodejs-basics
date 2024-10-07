import fs from "fs/promises";
import { constants } from "fs";

const remove = async () => {
  const fileToRemove = "./files/fileToRemove.txt";

  try {
    await fs.access(fileToRemove, constants.F_OK);

    await fs.unlink(fileToRemove);
    console.log("File deleted successfully.");
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

await remove();
