// Two Days of Excuses — entry writer.
// Zero-dependency TypeScript, Node 22/24, no network.
//
// Design notes:
// - The entry lives in entry.txt next to this file. Its location is derived
//   from import.meta.url, so the program works from any working directory.
// - Bytes are the source of truth: the file is read as raw bytes, decoded
//   with a strict UTF-8 decoder, and the very same bytes are written out.
//   The output is read back and compared byte for byte before success.
// - Length is counted in Unicode code points (one code point per character
//   the reader sees), matching the bounty gate of 1-199 characters.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

const sourcePath = join(dirname(fileURLToPath(import.meta.url)), "entry.txt");
let raw;
try {
  raw = readFileSync(sourcePath);
} catch (error) {
  fail(`cannot read ${sourcePath}: ${error.message}`);
}

let text;
try {
  text = new TextDecoder("utf-8", { fatal: true }).decode(raw);
} catch {
  fail("entry.txt is not valid UTF-8");
}

// The entry must be exactly one line: no carriage return, no line feed.
if (text.includes("\r") || text.includes("\n")) {
  fail("entry must be exactly one line — found a CR or LF character");
}
const charCount = [...text].length;
if (charCount < 1 || charCount > 199) {
  fail(`entry must be 1-199 characters (Unicode code points), got ${charCount}`);
}
if (text.trim().length === 0) {
  fail("entry must not be empty or whitespace-only");
}

// An explicitly set but empty MAKEFUN_OUTPUT_DIR is treated as unset,
// so a stray empty variable cannot silently write to the current directory.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR?.trim() || "/output";
mkdirSync(outputDir, { recursive: true });
const outputPath = join(outputDir, "entry.txt");
writeFileSync(outputPath, raw);

// Read the output back and confirm it matches the source byte for byte.
const written = readFileSync(outputPath);
if (!written.equals(raw)) {
  fail("output does not match source byte for byte");
}

console.log(`Output: ${outputPath}`);
console.log(`Characters: ${charCount}`);
console.log(`Bytes: ${raw.length}`);
console.log(`Entry: ${text}`);
