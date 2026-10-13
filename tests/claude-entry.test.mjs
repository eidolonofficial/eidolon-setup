import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, resolve, join} from 'node:path';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = name => readFileSync(join(root, name), 'utf8');
test('CLAUDE.md is the Claude Code maintenance guide', () => {
  const text = read('CLAUDE.md');
  assert.match(text, /^# .+ for Claude Code/m);
  for (const phrase of ["The one place a work session starts from.", "write the least, and verify it the most", "references/interview.md", "The warmth stays the same at every level.", ".claude/session.yaml", "active index"]) assert.ok(text.includes(phrase), phrase);
});
test('CLAUDE.md reference paths resolve in the shipped repository', () => {
  const text = read('CLAUDE.md');
  for (const match of text.matchAll(/`(references\/[a-zA-Z0-9/_-]+\.md)`/g)) {
    assert.ok(existsSync(join(root, match[1])), match[1]);
  }
});
