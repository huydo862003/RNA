# Introduction

splicer.js is a reactive computation library based on finite differencing.

Given a source domain \\(A\\), a target domain \\(B\\), and a pure function \\(f: A \to B\\), we maintain two variables \\(x \in A\\) and \\(y \in B\\) such that \\(y = f(x)\\) always holds. When \\(x\\) changes by some delta \\(\Delta x\\), we derive a delta propagator \\(\Delta f\\) such that:

\\[
f(x + \Delta x) = f(x) + \Delta f(x, \Delta x)
\\]

This patches \\(y\\) directly - without rerunning \\(f\\) from scratch.

See the [README](https://github.com/hdnax/rna/tree/main/packages/splicer.js) for the full motivation and comparison with incremental computation and reactivity.
