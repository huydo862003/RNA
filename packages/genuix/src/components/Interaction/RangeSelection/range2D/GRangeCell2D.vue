<template>
  <div
    tabindex="0"
    class="select-none"
    @pointerdown="onPointerDown"
    @pointerenter="onPointerEnter"
    @keydown="onKeyDown"
  >
    <slot
      :selected="selected"
      :position="position"
      :is-position="isPosition"
    />
  </div>
</template>

<script setup lang="ts">
/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  computed,
  inject,
} from 'vue';
import {
  RANGE_SELECTION_2D_KEY,
} from './types';
import type {
  Position2D,
} from './types';
import {
  GKbdKeyName,
} from '@/components/Display/Kbd/types';

const {
  row,
  column,
} = defineProps<{
  /** The row number of the cell */
  row: number;
  /** The column number of the cell */
  column: number;
}>();

const context = inject(RANGE_SELECTION_2D_KEY)!;

const selected = computed(() => context.isSelected(row, column));
const position = computed(() => context.getPosition(row, column));
const isPosition = (query: Position2D) => context.isPosition(row, column, query);

function onKeyDown (event: KeyboardEvent) {
  switch (event.key) {
  case GKbdKeyName.ArrowUp:
    event.preventDefault();
    context.moveUp(event.shiftKey);
    break;
  case GKbdKeyName.ArrowDown:
    event.preventDefault();
    context.moveDown(event.shiftKey);
    break;
  case GKbdKeyName.ArrowLeft:
    event.preventDefault();
    context.moveLeft(event.shiftKey);
    break;
  case GKbdKeyName.ArrowRight:
    event.preventDefault();
    context.moveRight(event.shiftKey);
    break;
  case GKbdKeyName.a:
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();
      context.selectAll();
    }
    break;
  case GKbdKeyName.Escape:
    event.preventDefault();
    context.clearSelection();
    break;
  }
}

function onPointerDown (event: PointerEvent) {
  window.getSelection()?.removeAllRanges();
  (event.currentTarget as HTMLElement)?.focus();

  if (event.shiftKey) {
    context.extendSelection(row, column);
  } else {
    context.setAnchor(row, column);
    window.addEventListener('pointerup', onPointerUp);
  }
}

function onPointerEnter () {
  if (!context.dragging.value) return;
  context.extendSelection(row, column);
}

function onPointerUp () {
  context.endSelection();
  window.removeEventListener('pointerup', onPointerUp);
}

defineExpose({
  selected,
  position,
});
</script>
