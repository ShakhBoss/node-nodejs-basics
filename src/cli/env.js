
import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const parseEnv = async () => {
  const fileName = fileURLToPath(import.meta.url);
  const __dirname = dirname(fileName);
  const envPath = join(__dirname,"..","..", ".env");

  try {
    const data = await readFile(envPath,"utf-8");
    const lines = data.split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const [key, ...valueParts] = trimmed.split("=");
      const value = valueParts.join("=").trim().replace(/^"|"$/g, "");
      process.env[key.trim()] = value;
    }
    const rssEnvVars = Object.entries(process.env)
      .filter(([key, _]) => key.startsWith("RSS_"))
      .map(([key, value]) => `${key}=${value}`)
      .join("; ");
    console.log(rssEnvVars);
  } catch (error) {
    console.error('Error reading .env file:', error.message);
  }
 
};

parseEnv();
