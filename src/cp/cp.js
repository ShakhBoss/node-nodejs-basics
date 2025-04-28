import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const spawnChildProcess = (args) => {
  const scriptPath = join(__dirname, 'files',"script.js");

  const child = spawn("node", [scriptPath, ...args], {
    stdio: ["pipe", "pipe", "inherit"],
  });

  process.stdin.pipe(child.stdin);

  child.stdout.pipe(process.stdout);
};
spawnChildProcess(['hello', 'world']);