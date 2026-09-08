import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const read = path => readFileSync(fileURLToPath(new URL('../' + path, import.meta.url)), 'utf8');
test('both Setup entrypoints preserve selected model and load the current Claude contract', () => {
  for(const path of ['SKILL.md','codex/SKILL.md']) assert.match(read(path), /references\/claude-current\.md/);
  const doc=read('references/claude-current.md');
  assert.match(doc,/model: inherit/); assert.match(doc,/Agent/); assert.match(doc,/PowerShell/);
  assert.match(doc,/never opts into usage credits/);
});
