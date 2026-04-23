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
 *
 * Headless 1D range selection root
 * Supports:
 * - Simple click
 * - Shift + Click for range selection
 * - Drag
 * - Touch then long-press drag
 */
import {
  provide,
  ref,
} from 'vue';
import {
  RANGE_SELECTION_1D_KEY,
} from './types';
import type {
  Position1D,
  Range1D,
} from './types';

const {
  count,
} = defineProps<{
  count: number;
}>();

// The current 1D range selection
const selection = defineModel<Range1D | undefined>('selection');

// The first selected item (used as the anchor for the next selects)
const anchor = ref<number | undefined>(undefined);

// Keyboard cursor position (moves independently of normalized start/end)
const cursor = ref<number | undefined>(undefined);

// Whether we're dragging
const dragging = ref(false);

// Ranges can be selected out of order, so we need to normalize
function normalizeRange (a: number, b: number): Range1D {
  return {
    start: Math.min(a, b),
    end: Math.max(a, b),
  };
}

// Check if an item falls within the current selection
function isSelected (index: number): boolean {
  if (!selection.value) return false;
  return selection.value.start <= index && index <= selection.value.end;
}

// Determine where an item sits in the selection (start, end, middle, only)
function getPosition (index: number): Position1D | undefined {
  if (!selection.value || !isSelected(index)) return undefined;
  const {
    start, end,
  } = selection.value;
  if (start === end) return 'only';
  if (index === start) return 'start';
  if (index === end) return 'end';
  return 'middle';
}

// Check if an item matches a position. 'only' matches both 'start' and 'end'.
function isPosition (index: number, query: Position1D): boolean {
  const pos = getPosition(index);
  if (!pos) return false;
  if (pos === query) return true;
  switch (pos) {
  case 'only': return query === 'start' || query === 'end';
  case 'start':
  case 'end':
  case 'middle':
    return false;
  default: {
    const _exhaustive: never = pos;
    throw new Error(`Unknown position: ${_exhaustive}`);
  }
  }
}

// Begin a new selection from this item
function setAnchor (index: number) {
  anchor.value = index;
  cursor.value = index;
  dragging.value = true;
  selection.value = {
    start: index,
    end: index,
  };
}

// Stop drag interaction
function endSelection () {
  dragging.value = false;
}

// Grow or extend selection from anchor to this item
function extendSelection (index: number) {
  if (anchor.value === undefined) {
    setAnchor(index);
  } else {
    cursor.value = index;
    selection.value = normalizeRange(anchor.value, index);
  }
}

// Move cursor one step backward (left/up)
function movePrev (extend: boolean) {
  if (cursor.value === undefined) return;
  const next = Math.max(0, cursor.value - 1);
  cursor.value = next;
  if (extend) {
    selection.value = normalizeRange(anchor.value!, next);
  } else {
    anchor.value = next;
    selection.value = {
      start: next,
      end: next,
    };
  }
}

// Move cursor one step forward (right/down)
function moveNext (extend: boolean) {
  if (cursor.value === undefined) return;
  const next = Math.min(count - 1, cursor.value + 1);
  cursor.value = next;
  if (extend) {
    selection.value = normalizeRange(anchor.value!, next);
  } else {
    anchor.value = next;
    selection.value = {
      start: next,
      end: next,
    };
  }
}

// Select all items
function selectAll () {
  anchor.value = 0;
  selection.value = {
    start: 0,
    end: count - 1,
  };
}

// Reset selection
function clearSelection () {
  anchor.value = undefined;
  cursor.value = undefined;
  selection.value = undefined;
}

provide(RANGE_SELECTION_1D_KEY, {
  selection,
  dragging,
  isSelected,
  getPosition,
  isPosition,
  setAnchor,
  extendSelection,
  endSelection,
  movePrev,
  moveNext,
  selectAll,
  clearSelection,
});
</script>
