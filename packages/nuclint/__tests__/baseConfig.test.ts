import fs from 'node:fs';
import path from 'node:path';
import {
  ESLint,
  Linter,
} from 'eslint';
import {
  describe, it, expect,
} from 'vitest';
import {
  baseConfig,
} from '@/configs';

const fixturesDir = path.join(__dirname, 'fixtures');

interface Fixture {
  name: string;
  code: string;
  path: string;
}

function loadFixtures (dir: string): Fixture[] {
  if (!fs.existsSync(dir)) return [
  ];

  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.js') || f.endsWith('.ts'))
    .map((f) => ({
      name: f,
      code: fs.readFileSync(path.join(dir, f), 'utf-8'),
      path: path.join(dir, f),
    }));
}

function getRules (): string[] {
  return fs.readdirSync(fixturesDir)
    .filter((f) => fs.statSync(path.join(fixturesDir, f)).isDirectory());
}

function formatMessages (messages: Linter.LintMessage[]): string {
  return messages
    .map((msg) => `${msg.line}:${msg.column} ${msg.ruleId} ${msg.message}`)
    .join('\n');
}

getRules().forEach((ruleName) => {
  describe(`Rule: ${ruleName}`, () => {
    const ruleFixturesDir = path.join(fixturesDir, ruleName);
    const validDir = path.join(ruleFixturesDir, 'valid');
    const invalidDir = path.join(ruleFixturesDir, 'invalid');

    if (fs.existsSync(validDir)) {
      const validFixtures = loadFixtures(validDir);
      it.each(validFixtures)(
        'valid: $name has no errors',
        async (fixture) => {
          const eslint = new ESLint({
            overrideConfigFile: true,
            overrideConfig: baseConfig,
          });
          const results = await eslint.lintText(fixture.code, {
            filePath: fixture.path,
          });
          const ruleMessages = results[0].messages.filter((m) => m.ruleId?.endsWith(ruleName));
          expect(ruleMessages).toHaveLength(0);
        },
      );
    }

    if (fs.existsSync(invalidDir)) {
      const invalidFixtures = loadFixtures(invalidDir);
      it.each(invalidFixtures)(
        'invalid: $name matches snapshot',
        async (fixture) => {
          const eslint = new ESLint({
            overrideConfigFile: true,
            overrideConfig: baseConfig,
          });
          const results = await eslint.lintText(fixture.code, {
            filePath: fixture.path,
          });
          const ruleMessages = results[0].messages.filter((m) => m.ruleId?.endsWith(ruleName));
          const snapshotPath = path.join(path.dirname(fixture.path), `${fixture.name}.snap`);
          await expect(formatMessages(ruleMessages)).toMatchFileSnapshot(snapshotPath);
        },
      );
    }
  });
});
