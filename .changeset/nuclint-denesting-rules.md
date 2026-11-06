---
"@hdnax/nuclint": minor
---

Add denesting, sparsification, and code clarity rules

New rules to discourage deeply nested, dense, or hard-to-follow code:

- `max-depth: warn(4)`: limits block nesting depth; deep nesting signals a need for early returns or extracted functions
- `max-params: warn(4)`: limits function parameter count; more than 4 suggests an options object
- `no-else-return: error`: removes `else` after `return`/`throw`, enforcing the guard-clause / early-return pattern
- `no-lonely-if: error`: merges a lone `if` inside `else` into `else if` for flatter control flow
- `unicorn/no-negated-condition: warn`: prefers positive conditions (`if (isReady)` over `if (!isNotReady)`)
- `unicorn/prefer-ternary: warn`: collapses simple if-else assignments and returns into ternary expressions
