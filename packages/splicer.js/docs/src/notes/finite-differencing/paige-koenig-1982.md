# Finite Differencing of Computable Expressions

Paige & Koenig, 1982. [ACM Digital Library](https://dl.acm.org/doi/10.1145/357172.357177)

See [research material](../../research/finite-differencing.md#foundational).

Important keywords:

- Program optimization.
- Finite differencing.
- Strength reduction.
- Iterator inversion.
- Formal differentiation.

## Abstract

- The paper frames finite differencing as a "program optimization method" that generalizes strength reduction (replacing expensive operations with cheaper ones).
- Finite differencing also enables efficient implementation of other program transformations, e.g. "iterator inversion."
- The formalization works by composing basic semantics-preserving transformations.

## Introduction

- Paige developed "formal differentiation" as a global program optimization that captures a recurring pattern: replacing repeated costly calculations with inexpensive incremental updates.
- Applied to high-level but inefficient problem statements, the transformed algorithms become more complex but more efficient. The method generalizes Cocke's strength reduction and provides a framework for Earley's "iterator inversion."
- The authors prefer "finite differencing" over "formal differentiation" to place it in proper historical context: a link to 16th-century finite difference techniques invented to reduce labor in calculations.
- Language-independent algorithms to implement finite differencing were devised. Most useful for very high-level languages, so set-theoretic finite differencing was the focus.

What makes finite differencing stand out:

1. Flexible: works at very high-level or low-level language levels.
2. Can quickly converge from high-level inefficient form to a much lower-level efficient implementation.
3. Can be implemented systematically, following a well-known methodology.
4. Can be shown to yield asymptotic speedup, not just hoped-for improvement.

## Historical Perspective

This section walks us through the progression of history that leads to the author's idea.

### Finite differencing as a Mathematical Method

Henry Briggs (16th century) used finite differencing to tabulate polynomial values. The problem was that: given a polynomial \\(p(x)\\), generate an indefinite evenly spaced values \\(p(x_0)\\), \\(p(x_0 + h)\\), \\(p(x_0 + 2h)\\), ... without evaluating the polynomial from scratch each time.

The key observation, if \\(p(x)\\) has degree \\(n\\)), then, define difference polynomials as follows:

- \\(p_0(x) = p(x)\\), which has degree \\(n\\).
- \\(p_1(x) = p_0(x + h) - p_0(x)\\), which has degree \\(n - 1\\).
- ...
- \\(p_n(x) = p\_{n-1}(x+h) - p\_{n-1}(x)\\), which has a degree \\(0\\). In other words, \\(p_n\\) is constant.

Example with \\(p(x) = x^2\\), \\(h = 1\\):

| \\(x\\) | \\(p(x) = x^2\\) | 1st difference | 2nd difference |
| ------- | ---------------- | -------------- | -------------- |
| 0       | 0                |                |                |
| 1       | 1                | 1              |                |
| 2       | 4                | 3              | 2              |
| 3       | 9                | 5              | 2              |
| 4       | 16               | 7              | 2              |
| 5       | 25               | 9              | 2              |

The finite differencing method is as follows:

1. Compute initial values:
   - \\(t(1) = p(x_0)\\).
   - \\(t(2) = p_1(x_0)\\).
   - ...
   - \\(t(n+1) = p_n(x_0)\\).
2. Then iterate repeatedly until all desired values have been computed:

   ```py
   print x, t(1);
   t(1) := t(1) + t(2);
   t(2) := t(2) + t(3);
   ...
   t(n) := t(n) + t(n + 1);
   x := x + h;
   ```

Loop invariant, at iteration \\(i\\):

- \\(t(1) = p(x_i)\\).
- \\(t(2) = p_1(x_i)\\).
- ...
- \\(t(n) = p\_{n-1}(x_i)\\).
- \\(t(n+1) = p_n(x_i)\\).

Note that each loop iteration need not update \\(t(n + 1)\\) as \\(t(n+1)\\) is constant. Therefore, each iteration is just \\(n\\) additions (one per \\(t(1)\\), \\(t(2)\\), ..., \\(t(n)\\)), instead of \\(n\\) additions and \\(n\\) multiplications as in Horner's rule.

Babbage's difference engine was built to automate step 2. Note that step 2 is the same regardless of the exact polynomials, so it can be automated. Digital computers through WWII were designed for the same task: finite differencing for gunnery tables.

> There's something intriguing about the idea that the earliest computers were incremental computation machines.

### Reduction in Operator Strength

John Cocke (1960s) discovered "reduction in operator strength", a program optimization method, that highlighted the impact of finite differencing methods in the speedup of FORTRAN programs.

Before delving into the illustrative example, I researched a few concepts in the area of program optimization. Disclaimer, I don't have an expertise in this area at the time of writing.

- A strongly connected component in a directed graph is a maximal subgraph where every vertex is reachable from every other vertex within that subgraph.
- Code block: A sequence of instructions that has only one entry point and one exit point.
- Program region: Possibly a directed subgraph of code blocks.
- Strongly connected program region: I suppose that strongly connected means as it is in graph theory. This means a maximal subgraph of code block in which starting from one code block, there's a possible path to any other code blocks.

Illustrative example:

- Suppose the following situation:
  1. A strongly connected program region \\(R\\).
  2. An expression \\(i \* c \\) occurs in \\(R\\), in which \\(c\\) is a region constant (supposedly a variable that cannot change within \\(R\\)) and \\(i\\) is defined before every entry to \\(R\\), while \\(i\\) is not.
  3. \\(i \* c\\) cannot be moved out of \\(R\\) because there are redefinitions to \\(i\\).
  4. All redefinitions to \\(i\\) within \\(R\\) are of the form \\(i = i \pm \text{delta}\\), \\(\text{delta}\\) is also a region constant.

- A concrete version of the above situation:

  ```cpp
  const int c = 10; // region constant `c`
  const int delta = 1; // region constant `delta`
  int sum = 0;
  for (int i = 0; i <= 100; i = i + delta) {
    sum += i * c; // expression in question
  }
  ```

- The question: How do we move all calulations of \\(i \* c\\) out of \\(R\\)?

- Idea:
  1. Insert an initial assignment \\(T = i \* c\\), \\(T\\) is a compiler-generated variable, prior to any entry points of \\(R\\).
  2. Before each redefinition \\(i = i \pm \text{delta}\\), we can replace it with a redefinition \\(T \pm \text{delta} \* c\\).
  3. Because \\(\text{delta}\\) and \\(c\\) are region constants, \\(\text{delta} \* c\\) is invariant. Thus, it can be moved out of \\(R\\).
  4. Now replace all uses of \\(i \* c\\) with uses of \\(T\\).

- Impact: All \\(i \* c\\) are replaced with \\(T\\), other operations stay roughly the same, except for the additional initial computations.

Cocke's strength reduction technique is powerful enough that it can transform repeated polynomial calculations according to Horner's rule into one that is essentially Briggs' finite difference method. Note that Cocke's technique doesn't even treat polynomials specially, but manages to converge into a technique esstentially as finite differencing. This shows that inherently, finite differencing works due to properties of elementary operations, not exclusive properties of polynomials (say, the degree observation above).

These properties are the distributive and associative laws for sums and products.
