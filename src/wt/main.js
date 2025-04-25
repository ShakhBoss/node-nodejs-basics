import { cpus } from "node:os";
import { Worker } from "node:worker_threads";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const performCalculations = async () => {
  const numOfCores = cpus().length;
  const results = [];

  for (let i = 0; i < numOfCores; i++) {
    const workerData = 10 + i;
    const workerPath = resolve(__dirname, "worker.js");

    const result = new Promise((resolveWorker) => {
      const worker = new Worker(workerPath);

      worker.postMessage(workerData);

      worker.on("message", (msg) => {
        resolveWorker({ status: msg.status, data: msg.data });
      });

      worker.on("error", () => {
        resolveWorker({ status: "error", data: null });
      });

      worker.on("exit", (code) => {
        if (code !== 0) {
          resolveWorker({ status: "error", data: null });
        }
      });
    });

    results.push(result);
  }

  const finalResults = await Promise.all(results);
  console.log(finalResults);
};

await performCalculations();
