# Finite Differencing

The core technique behind splice.js. The idea: given a program that computes \\(f(x)\\), systematically derive a maintenance program \\(\Delta f\\) that updates the result when \\(x\\) changes, without rerunning \\(f\\) from scratch.

## Foundational

- Paige & Koenig, "Finite Differencing of Computable Expressions" (1982)
  - The original paper. Introduces the idea of systematically deriving maintenance code from a program by computing "finite differences" of expressions - analogous to derivatives in calculus but for discrete program transformations.
  - [ACM Digital Library](https://dl.acm.org/doi/10.1145/357162.357165)

## Higher-order extensions

- Cai, Giarrusso, Rendel, Ostermann, "A Theory of Changes for Higher-Order Languages - Incrementalizing Lambda-Calculi by Static Differentiation" (PLDI 2014)
  - Formalizes delta propagation for higher-order functions. Introduces change structures (a type paired with a notion of delta) and program derivatives (given \\(f\\), mechanically derive its delta propagator \\(\Delta f\\)). The most directly relevant formalization of what splice.js does.
  - [ACM Digital Library](https://dl.acm.org/doi/10.1145/2594291.2594304)

- Giarrusso, "Optimizing and Incrementalizing Higher-Order Collection Queries by AST Transformation" (PhD thesis, 2020)
  - Extends the incremental lambda-calculus work toward practical use, with focus on collection operations. Covers both the theory and compilation strategies for deriving efficient delta propagators.

## Applied

- Koch, Ahmad, Kennedy, Nikolic, Lupei, Olteanu, "DBToaster: Higher-Order Delta Processing for Dynamic, Frequently Fresh Views" (VLDB 2014)
  - Finite differencing applied to database view maintenance. Given a SQL query, DBToaster derives higher-order delta programs that maintain the query result as the underlying tables change. Demonstrates that finite differencing can be practical and performant.
  - [VLDB Paper](https://vldb.org/pvldb/vol7/p325-koch.pdf)
