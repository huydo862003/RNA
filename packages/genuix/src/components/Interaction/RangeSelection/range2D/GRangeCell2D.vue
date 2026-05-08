<template>
  <div
    tabindex="0"
    style="user-select: none;"
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

const props = defineProps<{
  row: number;
  col: number;
}>();

const context = inject(RANGE_SELECTION_2D_KEY)!;

const selected = computed(() => context.isSelected(props.row, props.col));
const position = computed(() => context.getPosition(props.row, props.col));
const isPosition = (query: Position2D) => context.isPosition(props.row, props.col, query);

function onPointerDown (event: PointerEvent) {
  window.getSelection()?.removeAllRanges();
  (event.currentTarget as HTMLElement)?.focus();

  if (event.shiftKey) {
    context.extendSelection(props.row, props.col);
  } else {
    context.setAnchor(props.row, props.col);
    window.addEventListener('pointerup', onPointerUp);
  }
}

function onPointerUp () {
  context.endSelection();
  window.removeEventListener('pointerup', onPointerUp);
}

function onPointerEnter () {
  if (!context.dragging.value) return;
  context.extendSelection(props.row, props.col);
}

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

defineExpose({
  selected,
  position,
});
</script>
