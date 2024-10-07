import fs from "fs/promises";
import { constants } from "fs";
import path from "path";

const copy = async () => {
  const srcFolder = "./files";
  const destFolder = "./files_copy";

  try {
    await fs.access(srcFolder, constants.F_OK);

    try {
      await fs.access(destFolder, constants.F_OK);

      throw new Error("FS operation failed: files_copy already exists");
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }

    await fs.mkdir(destFolder);

    const items = await fs.readdir(srcFolder, { withFileTypes: true });

    for (const item of items) {
      const srcPath = path.join(srcFolder, item.name);
      const destPath = path.join(destFolder, item.name);

      if (item.isDirectory()) {
        await copyFolder(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }

    console.log("Folder copied successfully.");
  } catch (error) {
    throw new Error("FS operation failed");
  }
};

const copyFolder = async (src, dest) => {
  await fs.mkdir(dest);

  const items = await fs.readdir(src, { withFileTypes: true });

  for (const item of items) {
    const srcPath = path.join(src, item.name);
    const destPath = path.join(dest, item.name);

    if (item.isDirectory()) {
      await copyFolder(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
};

await copy();
