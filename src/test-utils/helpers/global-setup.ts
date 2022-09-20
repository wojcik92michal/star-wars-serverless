import { spawn } from "child_process";

const wait = async (): Promise<void> => {
  return new Promise((r) => setTimeout(r, 10000));
};

module.exports = async () => {
  console.log("Waiting to start the serverless offline process...");
  const process = spawn("yarn", ["start:dev"]);

  global.__jestSpawnProcess__ = process;

  await wait();
};
