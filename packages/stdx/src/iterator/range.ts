/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

// Behavior mostly like Python's range
// start is inclusive, end is exclusive
export function* range (start: number, end: number, step: number = 1): Iterable<number> {
  let current = start;
  if (0 <= step) {
    while (current < end) {
      yield current;
      current += step;
    }
    return;
  }
  while (end < current) {
    yield current;
    current -= step;
  }
  return;
}
