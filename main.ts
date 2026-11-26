// One razor-sharp excuse for skipping a pointless meeting.
// Deterministic, no network, no dependencies. Writes one text file:
//   <MAKEFUN_OUTPUT_DIR or /output>/entry.txt

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const text =
  "Sorry, I can't make it — my calendar just auto-declined on my behalf, " +
  "and honestly, I respect its judgment.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

// Validate before writing: the entry must be 1-200 Unicode code points
// (counted with [...text].length, so astral-plane characters count once)
// and not only whitespace — otherwise the grader rejects the entry.
const codePoints = [...text].length;
if (codePoints < 1 || codePoints > 200 || text.trim().length === 0) {
  throw new Error(
    `entry.txt must be 1-200 non-whitespace code points, got ${codePoints}`,
  );
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
