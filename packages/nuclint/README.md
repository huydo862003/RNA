# Nuclint

![Status](https://img.shields.io/badge/status-active-brightblue)
![Version](https://img.shields.io/badge/version-0.4.0--alpha-orange)
![License](https://img.shields.io/badge/license-MIT-green)

Shared ESLint configuration for the RNA monorepo.

## Development Guides

### Commands
```
pnpm install                       # Install the dependencies

pnpm run build                     # Build the package
pnpm run test                      # Test the eslint rule
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

### Testing

The test files are actually normal code files that are linted against our rules. Write the intended code in our convention there.
