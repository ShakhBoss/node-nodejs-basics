import fs from "fs/promises";

const create = async () => {
  try {
    const data = await fs.readFile("././files/fresh.txt", "utf-8");
    if (data) {
      throw new Error("FS operation failed");
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile("./files/fresh.txt", "I am fresh and young");
    } else {
      throw error;
    }
  }
};

await create();
