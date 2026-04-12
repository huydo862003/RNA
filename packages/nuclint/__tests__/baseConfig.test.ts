import fs from 'node:fs';
import path from 'node:path';
import {
  ESLint,
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
            overrideConfig: baseConfig,
          });
          const results = await eslint.lintText(fixture.code, {
            filePath: fixture.path,
          });
          expect(results[0].messages).toHaveLength(0);
        },
      );
    }

    if (fs.existsSync(invalidDir)) {
      it('invalid fixtures match snapshot', async () => {
        const eslint = new ESLint({
          overrideConfig: baseConfig,
        });
        const fixtures = loadFixtures(invalidDir);

        const errors = await Promise.all(fixtures.map(async (fixture) => {
          const results = await eslint.lintText(fixture.code, {
            filePath: fixture.path,
          });
          return {
            file: fixture.name,
            messages: results[0].messages.map((msg) => ({
              line: msg.line,
              column: msg.column,
              messageId: msg.messageId,
              message: msg.message,
            })),
          };
        }));

        expect(errors).toMatchSnapshot();
      });
    }
  });
});
