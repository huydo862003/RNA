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
      :is-position="isPos"
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

const ctx = inject(RANGE_SELECTION_2D_KEY)!;

const selected = computed(() => ctx.isSelected(props.row, props.col));
const position = computed(() => ctx.getPosition(props.row, props.col));
const isPos = (query: Position2D) => ctx.isPosition(props.row, props.col, query);

function onPointerDown (event: PointerEvent) {
  window.getSelection()?.removeAllRanges();
  (event.currentTarget as HTMLElement)?.focus();

  if (event.shiftKey) {
    ctx.extendSelection(props.row, props.col);
  } else {
    ctx.setAnchor(props.row, props.col);
    window.addEventListener('pointerup', onPointerUp);
  }
}

function onPointerUp () {
  ctx.endSelection();
  window.removeEventListener('pointerup', onPointerUp);
}

function onPointerEnter () {
  if (!ctx.dragging.value) return;
  ctx.extendSelection(props.row, props.col);
}

function onKeyDown (e: KeyboardEvent) {
  switch (e.key) {
  case GKbdKeyName.ArrowUp:
    e.preventDefault();
    ctx.moveUp(e.shiftKey);
    break;
  case GKbdKeyName.ArrowDown:
    e.preventDefault();
    ctx.moveDown(e.shiftKey);
    break;
  case GKbdKeyName.ArrowLeft:
    e.preventDefault();
    ctx.moveLeft(e.shiftKey);
    break;
  case GKbdKeyName.ArrowRight:
    e.preventDefault();
    ctx.moveRight(e.shiftKey);
    break;
  case GKbdKeyName.a:
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      ctx.selectAll();
    }
    break;
  case GKbdKeyName.Escape:
    e.preventDefault();
    ctx.clearSelection();
    break;
  }
}

defineExpose({
  selected,
  position,
});
</script>
