// hooks/hooks.test.mjs
//
// Functional tests for the governance gates. Each case pipes a synthetic
// PreToolUse payload into a hook and asserts the exit code (2 = block,
// 0 = pass) and, for the advisory, that context JSON is emitted.
// Run: node hooks/hooks.test.mjs   (exits nonzero on any failure)

import { spawnSync } from "node:child_process";

const cases = [
  // [hook, payload, expectedExit, mustEmitStdout]
  ["protected-paths-guard.mjs", { command: "rm -rf references/" }, 2, false],
  ["protected-paths-guard.mjs", { command: "git rm SKILL.md" }, 2, false],
  ["protected-paths-guard.mjs", { command: "grep rm references/verify.md" }, 0, false],
  ["protected-paths-guard.mjs", { command: "ls -la" }, 0, false],
  ["commit-quality-guard.mjs", { command: "git push --force origin main" }, 2, false],
  ["commit-quality-guard.mjs", { command: "git push --force-with-lease origin main" }, 2, false],
  ["commit-quality-guard.mjs", { command: "git commit --no-verify -m x" }, 2, false],
  ["commit-quality-guard.mjs", { command: "git push -u origin main" }, 0, false],
  ["doc-integrity-guard.mjs", { file_path: "docs/fixes/FIX-2026-01-01-x.md", old_string: "a\nb\nc", new_string: "a" }, 2, false],
  ["doc-integrity-guard.mjs", { file_path: "docs/fixes/FIX-2026-01-01-x.md", old_string: "a", new_string: "a\nb\nc" }, 0, false],
  ["doc-integrity-guard.mjs", { file_path: "README.md", old_string: "a\nb", new_string: "a" }, 0, false],
  ["hedge-guard.mjs", { file_path: "references/verify.md", new_string: "this probably works now" }, 0, true],
  ["hedge-guard.mjs", { file_path: "hooks/hedge-guard.mjs", new_string: "probably" }, 0, false], // META-excluded
  ["hedge-guard.mjs", { file_path: "references/verify.md", new_string: "checked and confirmed" }, 0, false],
];

let failed = 0;
for (const [hook, toolInput, wantExit, wantStdout] of cases) {
  const r = spawnSync("node", [`hooks/${hook}`], {
    input: JSON.stringify({ tool_input: toolInput }),
    encoding: "utf8",
  });
  const gotStdout = (r.stdout || "").trim().length > 0;
  const ok = r.status === wantExit && (!wantStdout || gotStdout);
  if (!ok) failed++;
  console.log(
    `${ok ? "PASS" : "FAIL"} ${hook} :: ${JSON.stringify(toolInput).slice(0, 60)} ` +
      `-> exit ${r.status} (want ${wantExit})${wantStdout ? ` stdout=${gotStdout}` : ""}`
  );
}

console.log(failed === 0 ? `\nall ${cases.length} cases pass` : `\n${failed} FAILED`);
process.exit(failed === 0 ? 0 : 1);
