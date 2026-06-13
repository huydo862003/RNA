# Nuclint

![Status](https://img.shields.io/badge/status-active-brightblue)
![Version](https://img.shields.io/npm/v/@hdnax/nuclint)
![License](https://img.shields.io/badge/license-MIT-green)

Shared ESLint configuration for the RNA monorepo.

## Development Guides

### Commands

```
pnpm install                       # Install the dependencies

pnpm run build                     # Build the package
pnpm run test                      # Run rule tests
pnpm run test:ui                   # Run tests with UI
pnpm run lint                      # Lint the project
pnpm run lint:fix                  # Automatically fix lint issues found in the project

pnpm changeset                     # Generate changeset
pnpm changeset version             # Apply the changeset
pnpm publish                       # Publish
```

### Organization

```
nuclint/
├── src/
│   ├── rules/                     # All rules are categorized here
│   │   ├── custom/
│   │   └── index.ts
│   └── index.ts                   # Expose the lint rules to external consumers
├── eslint.config.ts               # Consume the lint rules in ./src/index.ts
```

### Quick Lookup: Rule Terminology

This section outlines the stylistic/eslint rule naming convention for fast lookup.

Fast reference for eslint rule configuration:

```javascript
const array = [element, element];
//        ↑   ↑
//   bracket element (array field)

const object = { property: value, field: value };
//        ↑    ↑        ↑      ↑    ↑
//     curly property  newline field newline
```

**Term meanings**:

#### Global vs Scoped `ignores` in ESLint Flat Config

| Term       | Meaning                              |
| ---------- | ------------------------------------ |
| `array`    | square bracket container `[ ]`       |
| `element`  | item inside array (array field)      |
| `newline`  | linebreak between array/object items |
| `object`   | curly bracket container `{ }`        |
| `field`    | key-value pair in object             |
| `curly`    | opening `{` or closing `}` brace     |
| `bracket`  | opening `[` or closing `]` bracket   |
| `property` | key name in object key-value pair    |

## Findings

### Properly Ignore Files & Folders

Refer to this doc: https://eslint.org/docs/latest/use/configure/ignore

Key findings:

- A config entry with only `ignores` is global. Adding any other key (e.g. `files`) makes it scoped to that entry only. Other entries (e.g. `typescript-eslint`) still see the "ignored" paths and may try to parse them, causing parser failures on large `node_modules` files.
- Should use `globalIgnores` function to define ignores.
- File patterns can be specified using globs & Folders can be ignored simply by specifying the folder name.
- NOTE: Only folders in the same directory as the config file will be ignored.
- NOTE: ESLint-level ignores do not prevent plugins from independently resolving and parsing ignored files. For example, `eslint-plugin-import-x` follows pnpm symlinks into `node_modules` and tries to parse resolved modules, causing errors on large barrel files. Each plugin may need its own ignore config (e.g. `'import-x/ignore': ['node_modules']`).

### Testing

Rules are tested using ESLint's `RuleTester` with Vitest:

```bash
pnpm run test           # Run all tests
pnpm run test:ui        # Run tests with UI
```

**Test structure:**
Each rule has a corresponding test file in `src/__tests__/` with positive (valid) and negative (invalid) examples:

```typescript
ruleTester.run("rule-name", rule, {
  valid: ["code that should pass"],
  invalid: [
    {
      code: "code that should fail",
      errors: [{ messageId: "errorId" }],
    },
  ],
});
```
