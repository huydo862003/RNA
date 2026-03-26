# Differential Dataflow

Delta propagation applied to dataflow systems. Instead of propagating values, these systems propagate collections of differences through a dataflow graph.

## Key works

- McSherry, Murray, Isaacs, Isard, "Differential Dataflow" (CIDR 2013)
  - Operators consume and produce streams of differences (deltas) rather than full collections. Supports iterative computations. The key insight: if every operator can process differences, the entire pipeline becomes incremental without per-operator special-casing.
  - [CIDR Paper](http://cidrdb.org/cidr2013/Papers/CIDR13_Paper111.pdf)

- Murray, McSherry, Isaacs, Isard, Barham, Abadi, "Naiad: A Timely Dataflow System" (SOSP 2013)
  - The runtime system underlying differential dataflow. Introduces timely dataflow - a model that supports both streaming and iterative computation with consistent progress tracking.
  - [ACM Digital Library](https://dl.acm.org/doi/10.1145/2517349.2522738)
