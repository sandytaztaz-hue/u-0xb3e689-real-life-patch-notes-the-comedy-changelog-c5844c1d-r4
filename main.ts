import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const LINE =
  "v2.1.0: fixed a bug where the knee cracked loud enough to wake a baby sleeping 3 rooms away.";

function outputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv) return resolve(fromEnv);
  const flagIndex = process.argv.indexOf("--output");
  if (flagIndex !== -1 && process.argv[flagIndex + 1]) {
    return resolve(process.argv[flagIndex + 1]);
  }
  return "/output";
}

const text = LINE.trim();
if (text.length < 1 || text.length > 160) {
  throw new Error(`entry must be 1-160 characters, got ${text.length}`);
}
const dir = outputDir();
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "entry.txt"), text, "utf8");
