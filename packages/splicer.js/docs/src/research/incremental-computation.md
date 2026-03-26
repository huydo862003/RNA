# Incremental Computation

General incremental computation builds a dependency graph at runtime, traces which subcomputations read which inputs, and selectively re-executes stale nodes. Included here for contrast with the finite differencing approach.

## Key works

- Acar, "Self-Adjusting Computation" (PhD thesis, Carnegie Mellon, 2005)
  - The foundational work on runtime dependency tracking for incremental computation. Programs are written normally; the runtime records a dynamic dependency graph and replays only the affected parts when inputs change.
  - [CMU Tech Report](https://www.cs.cmu.edu/~umut/papers/thesis.pdf)

- Hammer, Phang, Hicks, Foster, "Adapton: Composable, Demand-Driven Incremental Computation" (PLDI 2014)
  - Introduces lazy, demand-driven incremental computation. Unlike self-adjusting computation (which eagerly propagates changes), Adapton only re-evaluates nodes when their results are demanded. Composable - subcomputations can be independently incremental.
  - [ACM Digital Library](https://dl.acm.org/doi/10.1145/2594291.2594324)

- Acar, Blelloch, Harper, "Adaptive Functional Programming" (POPL 2002)
  - Earlier work on the same theme. Introduces modifiables (mutable inputs) and the change propagation algorithm that re-executes only affected code.
  - [ACM Digital Library](https://dl.acm.org/doi/10.1145/503272.503279)
