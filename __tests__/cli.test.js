/* eslint-disable @typescript-eslint/no-require-imports */

const { spawnSync } = require("child_process");
const path = require("path");

test("Logs the current version of the command-line application.", () => {
  const cliPath = path.resolve(__dirname, "../bin/index.js");
  const result = spawnSync("node", [cliPath, "test"], { encoding: "utf-8" });
  expect(result.stdout).toMatch("Hello BotForge!");
  expect(result.stderr).toBe("");
  expect(result.status).toBe(0);
});
