import fs from 'node:fs';
import path from 'node:path';
import type {
  Linter,
} from 'eslint';
import {
  ESLint,
} from 'eslint';
import {
  describe, it, expect,
} from 'vitest';
import {
  baseConfig,
} from '@/configs';

const fixturesDirectory = path.join(__dirname, 'fixtures');

interface Fixture {
  name: string;
  code: string;
  path: string;
}

function loadFixtures (directory: string): Fixture[] {
  if (!fs.existsSync(directory)) return [];

  return fs.readdirSync(directory)
    .filter((file) => file.endsWith('.js') || file.endsWith('.ts'))
    .map((file) => ({
      name: file,
      code: fs.readFileSync(path.join(directory, file), 'utf-8'),
      path: path.join(directory, file),
    }));
}

function getRules (): string[] {
  return fs.readdirSync(fixturesDirectory)
    .filter((file) => fs.statSync(path.join(fixturesDirectory, file)).isDirectory());
}

function formatMessages (messages: Linter.LintMessage[]): string {
  return messages
    .map((message) => `${message.line}:${message.column} ${message.ruleId} ${message.message}`)
    .join('\n');
}

getRules().forEach((ruleName) => {
  describe(`Rule: ${ruleName}`, () => {
    const ruleFixturesDirectory = path.join(fixturesDirectory, ruleName);
    const validDirectory = path.join(ruleFixturesDirectory, 'valid');
    const invalidDirectory = path.join(ruleFixturesDirectory, 'invalid');

    if (fs.existsSync(validDirectory)) {
      const validFixtures = loadFixtures(validDirectory);
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
          const ruleMessages = results[0].messages.filter((message) => message.ruleId?.endsWith(ruleName));
          expect(ruleMessages).toHaveLength(0);
        },
      );
    }

    if (fs.existsSync(invalidDirectory)) {
      const invalidFixtures = loadFixtures(invalidDirectory);
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
          const ruleMessages = results[0].messages.filter((message) => message.ruleId?.endsWith(ruleName));
          const snapshotPath = path.join(path.dirname(fixture.path), `${fixture.name}.snap`);
          await expect(formatMessages(ruleMessages)).toMatchFileSnapshot(snapshotPath);
        },
      );
    }
  });
});
