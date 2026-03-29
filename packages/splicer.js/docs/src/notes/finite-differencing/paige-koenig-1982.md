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

### Extensions

1. Cocke and Schwarts later extended this strength reduction idea (also called as finite differencing by the authors) to all arithmetic operations having appropriate distributive properties.
2. Earley suggest applying finite differencing in a set theoretic context.
3. Fong and Ullman later proved that Earley's method can improve the asymptotic behavior of an algorithm. A theoretical characterization could then be developed to determine when this technique can be applied.
4. Finite differencing was generalized further by Paige to allow its application in many type of expressions with various operations and data types.

## Definitions and Notations

### Language

Finite differencing is language-agnostic, but SETL is used in this paper for illustrative purposes.

SETL seems to allow the programmer to work on many levels of abstractions, ranging from concrete FORTRAN to set-theory level.

Data types in SETL: heterogeneous tuples, sets and maps.

- Tuples: Ordered from first to the last component.
- Sets: Unordered and can only contain unique elements.
- Maps: Sets of pairs \\(([x, y]\\)), each associating a domain value \\(x\\) to a range value \\(y\\).

Primitive operations:

| Primitive operations            | Remarks                                                                                             |
| ------------------------------- | --------------------------------------------------------------------------------------------------- |
| \\(x + y\\)                     | Addition for integers/reals. Union for sets. Concatenation for strings and tuples.                  |
| \\(x - y\\)                     | Subtraction for integers/reals. Difference for sets.                                                |
| \\(x \* y\\)                    | Multiplication for integers/reals. Intersection for sets.                                           |
| \\(x \in y\\), \\(x \notin y\\) | Tests membership in a set or tuple.                                                                 |
| \\(\#x\\)                       | Returns the cardinality of a set, or the length of a tuple or string.                               |
| **arb** \\(x\\)                 | Picks an arbitrary element from set \\(x\\). **arb** \\(\\{\\}\\) yields the undefined atom **om**. |
| \\(x\\) **incs** \\(y\\)        | Returns whether set \\(x\\) includes set \\(y\\).                                                   |
| \\(x\\) **with** \\(y\\)        | Equivalent to \\(x + \\{y\\}\\) if \\(x\\) is a set, or \\(x + [y]\\) if \\(x\\) is a tuple.        |
| \\(x\\) **less** \\(y\\)        | Equivalent to \\(x - \\{y\\}\\).                                                                    |
| \\(\\{x, y, \ldots\\}\\)        | Set literal.                                                                                        |
| \\([x, y, \ldots]\\)            | Tuple literal.                                                                                      |

- C-like convention: \\(x := x \text{op} \textit{exp}\\) can be abbreviated as \\(x \text{op}:= \text{exp}\\).

- APL reduction operation: \\(\text{binop}/Q\\), which folds a **binary associative operator** \\(\text{binop}\\) over all elements of a set or tuple \\(Q\\).

- Powerful iterators: Allow constrained search through sets and tuples.
  - Can be combined.
  - Can be used as arguments to various iterative operations.

- The most basic example to illustrate iterators is the **forall loop** (\\(\forall\\)-loop):

  ```
  (∀x ∈ s | x mod 2 = 0)
    block(x)
  end ∀;
  ```

  This executes `block` for each even number in `s`.

  Internal implementation:
  1. Iterate through `s` selecting each value without repetition into the bound variable `x`.
  2. Execute the predicate.
  3. Run the block when it holds.

  If `s` is a set, iteration order is unspecified; if `s` is a tuple, iteration is from first to last component.

- **forall** loops can implement many high-level iterator-involving expressions:
  - **Set former**: Computes a subset satisfying a predicate. For example, \\(\\{x \in s \mid x \bmod 2 \neq 0\\}\\) gives all odd elements of \\(s\\). A variant \\(\\{x^2 : x \in s \mid x \bmod 2 \neq 0\\}\\) gives the set of squares of odd elements.

- **Range specifications**: \\([2 .. n-1]\\) produces a tuple \\([2, 3, \ldots, n-1]\\). \\(\\{1, 3 .. 11\\}\\) produces all odd numbers from 1 to 11.

- **Bounded existential and universal quantifiers**: A universal quantifier \\(\forall j \in [2..n-1] \mid n \bmod j \neq 0\\) tests primality. If it evaluates to false, \\(j\\) is assigned a witness as a side effect.

- **Map retrieval** comes in three forms:
  1. \\(f(a)\\): Function application. Returns **om** if \\(a\\) is not in the domain or \\(f\\) is multivalued at \\(a\\).
  2. \\(f\\{a\\}\\): Image set of \\(\\{a\\}\\) under \\(f\\). Returns \\(\\{\\}\\) if \\(a\\) is not in the domain.
  3. \\(f[S]\\): Image of set \\(S\\) under \\(f\\), equivalent to \\(+/\\{f(a) : a \in S\\}\\).

- **Map modification** via indexed assignment:
  - \\(f(a) := \textbf{om}\\) removes \\(a\\) from the domain.
  - \\(f(a) := z\\) first removes \\(a\\), then adds the pair \\([a, z]\\).
  - \\(f\\{a\\} \mathrel{+}:= \text{delta}\\) modifies the image set at a domain point.

> So map here is like a relation.

- \\(n\\)-parameter maps are sets of pairs whose first component is an \\(n\\)-tuple. Notational shorthand: \\(f(x, y, z)\\) abbreviates \\(f([x, y, z])\\).

- SETL uses **copy value semantics**, as in mathematics.

### Verification

The authors extend SETL with two annotation statements for verification purposes:

- **assume** _cond_: A no-op during execution; marks a condition that is expected to hold.
- **assert** _cond_: Also a no-op; marks a condition that must hold.

An encounter with either statement is **satisfied** if the condition holds at that point.

An execution is **valid** if:

1. Whenever an unsatisfied **assert** encounter occurs, it was preceded by an unsatisfied **assume** encounter.
2. Whenever all **assume** encounters are satisfied, execution terminates normally.

A program is valid if all possible executions are valid. The **domain** of a valid program \\(P\\) is the set of inputs for which every assumption encounter is satisfied.

Every program includes **output assertions** at normal exit points. A transformation \\(T\\) is:

- **Validity preserving** if \\(T(P)\\) preserves output assertions and remains valid whenever \\(P\\) is valid.
- **Semantics preserving** if additionally the domain of \\(T(P)\\) includes the domain of \\(P\\).

These notions also apply to single-entry, single-exit code blocks: replacing block \\(B\\) with \\(B'\\) is validity/semantics preserving when the same conditions hold within the enclosing program.

An **achieve statement** `achieve E = f(x1, ..., xn)` has the same semantics as an assignment `E := f(x1, ..., xn)`.

### Complexity

The complexity model is based on SETL's runtime: sets are expandable hash tables (unit-time membership test, linear-time full scan), and maps use hash tables for domains with fast access to range elements via domain elements.

| Operation                             | Estimated cost                                 |
| ------------------------------------- | ---------------------------------------------- |
| \\(s\\) **with**:= \\(x\\)            | \\(O(1)\\) \*                                  |
| \\(s\\) **less**:= \\(x\\)            | \\(O(1)\\) \*                                  |
| \\(x \in s\\)                         | \\(O(1)\\)                                     |
| \\(s +\\!:= \text{delta}\\)           | \\(O(\\#\text{delta})\\) \*                    |
| \\(f(x) := y\\)                       | \\(O(1)\\) \*                                  |
| \\(f(x_1, \ldots, x_n)\\)             | \\(O(n)\\)                                     |
| \\(\forall x \in s\\): Block(\\(x\\)) | \\(O(\\#s \times \text{cost}(\text{Block}))\\) |
| \\(\\{x \in s \mid k(x)\\}\\)         | \\(O(\\#s \times \text{cost}(k))\\)            |
| \\(\exists x \in s \mid k(x)\\)       | \\(O(\\#s \times \text{cost}(k))\\)            |
| \\(\forall x \in s \mid k(x)\\)       | \\(O(\\#s \times \text{cost}(k))\\)            |
| \\(s + t\\)                           | \\(O(\\#s + \\#t)\\)                           |
| \\(f[s]\\)                            | \\(O(\\#\\{[x,y] \in f \mid x \in s\\})\\)     |

\* These estimates hold when set copy operations are avoided.

### Miscellaneous Definitions

Some definitions borrowed from program optimization literature.

- **Virtual variable**: Given a text expression \\(f\\) with \\(n\\) free variables \\(x_1, \ldots, x_n\\), we write \\(C = f(x_1, \ldots, x_n)\\) to associate a variable \\(C\\) (the virtual variable) with \\(f\\). Whenever \\(f\\) is executed, its value is placed in \\(C\\). We assume \\(f\\) and all subexpressions are **applicative** (behave like finite maps).

- **Available**: \\(C\\) is available on exit from a program point \\(p\\) if \\(C\\) equals the value \\(f\\) would have if evaluated right after \\(p\\). Available on entrance to \\(p\\) means available on exit from all predecessor points.

- **Spoiled**: \\(C\\) is spoiled at \\(p\\) if \\(C\\) is available on entrance to \\(p\\) but not on exit (because \\(p\\) modifies some parameter \\(x_i\\) that \\(f\\) depends on).

- **Redundant**: An occurrence of \\(f\\) at point \\(p\\) is redundant if \\(C\\) is already available on entrance to \\(p\\). In that case, \\(f\\) can be replaced by \\(C\\) while preserving semantics. This replacement is called **redundant code elimination**.

- **Well defined**: \\(f\\) is well defined at \\(p\\) if, in every valid execution passing through \\(p\\) with all prior assumptions satisfied, the values of \\(x_1, \ldots, x_n\\) at \\(p\\) belong to the domain of \\(f\\).

- **Control flow path**: A sequence of program points representing a logical sequence of primitive operations that might be performed, assuming each predicate encountered evaluates to either true or false.

- **Uses and definitions**: A use of variable \\(v\\) retrieves but does not modify \\(v\\). A definition modifies \\(v\\) (left side of assignment, read statement, iterator bound variable).

- **Reaches**: A definition \\(d\\) of \\(v\\) reaches program point \\(p\\) if there exists a control flow path from \\(d\\) to \\(p\\) with no other definitions of \\(v\\).

- **Live**: A use \\(u\\) of \\(v\\) is live at \\(p\\) if there exists a control flow path from \\(p\\) to \\(u\\) free of definitions to \\(v\\).

- **Data flow maps**: Built from reaches and live relations.
  - **defTouse**\\(\\{d\\}\\): The set of uses of \\(v\\) reached by definition \\(d\\).
  - **useToDef**\\(\\{u\\}\\): The set of definitions of \\(v\\) that reach use \\(u\\).

- **Dead-code elimination**: A semantics-preserving transformation that removes code not contributing directly or indirectly to the value of any variables used in **print**, sequential **read**, **assume**, or **assert** statements. Uses the data flow maps above.
