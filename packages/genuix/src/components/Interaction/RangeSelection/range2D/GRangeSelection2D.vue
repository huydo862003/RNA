<template>
  <div
    class="contents"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  provide,
  ref,
} from 'vue';
import {
  RANGE_SELECTION_2D_KEY,
} from './types';
import type {
  Position2D,
  Range2D,
} from './types';

// The current 2D range selection
// Contains startRow, startCol, endRow, endCol that define a 2D block
const {
  rows,
  cols,
} = defineProps<{
  rows: number;
  cols: number;
}>();

const selection = defineModel<Range2D | undefined>('selection');

// The first selected cell (used as the anchor for the next selects)
const anchorRow = ref<number | undefined>(undefined);
const anchorCol = ref<number | undefined>(undefined);

// Whether we're dragging
const dragging = ref(false);

// Keyboard cursor position (moves independently of normalized bounds)
const cursorRow = ref<number | undefined>(undefined);
const cursorCol = ref<number | undefined>(undefined);

// Ranges can be selected out of order, so we need to normalize
function normalizeRange (r1: number, c1: number, r2: number, c2: number): Range2D {
  return {
    startRow: Math.min(r1, r2),
    startCol: Math.min(c1, c2),
    endRow: Math.max(r1, r2),
    endCol: Math.max(c1, c2),
  };
}

// Check if a cell falls within the current selection
function isSelected (row: number, col: number): boolean {
  if (!selection.value) return false;
  const s = selection.value;
  return s.startRow <= row && row <= s.endRow && s.startCol <= col && col <= s.endCol;
}

// Determine where a cell sits in the selection (corner, edge, inner)
function getPosition (row: number, col: number): Position2D | undefined {
  if (!selection.value || !isSelected(row, col)) return undefined;
  const {
    startRow, startCol, endRow, endCol,
  } = selection.value;

  if (startRow === endRow && startCol === endCol) return 'only';

  const top = row === startRow;
  const bottom = row === endRow;
  const left = col === startCol;
  const right = col === endCol;

  if (top && left) return 'top-left';
  if (top && right) return 'top-right';
  if (bottom && left) return 'bottom-left';
  if (bottom && right) return 'bottom-right';
  if (top) return 'top-edge';
  if (bottom) return 'bottom-edge';
  if (left) return 'left-edge';
  if (right) return 'right-edge';
  return 'inner';
}

// Check if a cell matches a position query
// 'only' matches all corners/edges since a single cell is everything at once
// Corners match their edges (top-left matches top-edge and left-edge)
function isPosition (row: number, col: number, query: Position2D): boolean {
  const pos = getPosition(row, col);
  if (!pos) return false;
  if (pos === query) return true;
  switch (pos) {
  case 'only': return true;
  case 'top-left': return query === 'top-edge' || query === 'left-edge';
  case 'top-right': return query === 'top-edge' || query === 'right-edge';
  case 'bottom-left': return query === 'bottom-edge' || query === 'left-edge';
  case 'bottom-right': return query === 'bottom-edge' || query === 'right-edge';
  case 'top-edge':
  case 'bottom-edge':
  case 'left-edge':
  case 'right-edge':
  case 'inner':
    return false;
  default: {
    const _exhaustive: never = pos;
    throw new Error(`Unknown position: ${_exhaustive}`);
  }
  }
}

// Begin a new selection from this cell
function setAnchor (row: number, col: number) {
  anchorRow.value = row;
  anchorCol.value = col;
  cursorRow.value = row;
  cursorCol.value = col;
  dragging.value = true;
  selection.value = {
    startRow: row,
    startCol: col,
    endRow: row,
    endCol: col,
  };
}

// Stop drag interaction
function endSelection () {
  dragging.value = false;
}

// Grow or extend selection from anchor to this cell
function extendSelection (row: number, col: number) {
  if (anchorRow.value === undefined || anchorCol.value === undefined) {
    setAnchor(row, col);
  } else {
    cursorRow.value = row;
    cursorCol.value = col;
    selection.value = normalizeRange(anchorRow.value, anchorCol.value, row, col);
  }
}

// Move cursor by delta, or extend from anchor
function move (dRow: number, dCol: number, extend: boolean) {
  if (cursorRow.value === undefined || cursorCol.value === undefined) return;
  const nextRow = Math.max(0, Math.min(rows - 1, cursorRow.value + dRow));
  const nextCol = Math.max(0, Math.min(cols - 1, cursorCol.value + dCol));
  cursorRow.value = nextRow;
  cursorCol.value = nextCol;
  if (extend) {
    selection.value = normalizeRange(anchorRow.value!, anchorCol.value!, nextRow, nextCol);
  } else {
    anchorRow.value = nextRow;
    anchorCol.value = nextCol;
    selection.value = {
      startRow: nextRow,
      startCol: nextCol,
      endRow: nextRow,
      endCol: nextCol,
    };
  }
}

function moveUp (extend: boolean) {
  move(-1, 0, extend);
}
function moveDown (extend: boolean) {
  move(1, 0, extend);
}
function moveLeft (extend: boolean) {
  move(0, -1, extend);
}
function moveRight (extend: boolean) {
  move(0, 1, extend);
}

// Select all cells
function selectAll () {
  anchorRow.value = 0;
  anchorCol.value = 0;
  selection.value = {
    startRow: 0,
    startCol: 0,
    endRow: rows - 1,
    endCol: cols - 1,
  };
}

// Reset selection
function clearSelection () {
  anchorRow.value = undefined;
  anchorCol.value = undefined;
  cursorRow.value = undefined;
  cursorCol.value = undefined;
  selection.value = undefined;
}

provide(RANGE_SELECTION_2D_KEY, {
  selection,
  dragging,
  isSelected,
  getPosition,
  isPosition,
  setAnchor,
  extendSelection,
  endSelection,
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  selectAll,
  clearSelection,
});

defineExpose({
  selection,
  clearSelection,
});
</script>
