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
  RANGE_SELECTION_1D_KEY,
} from './types';
import type {
  Position1D,
} from './types';
import {
  GKbdKeyName,
} from '@/components/Kbd/types';

const props = defineProps<{
  index: number;
}>();

const ctx = inject(RANGE_SELECTION_1D_KEY)!;

const selected = computed(() => ctx.isSelected(props.index));
const position = computed(() => ctx.getPosition(props.index));
const isPos = (query: Position1D) => ctx.isPosition(props.index, query);

function onPointerDown (event: PointerEvent) {
  // Clear any existing text selection and focus for keyboard nav
  window.getSelection()?.removeAllRanges();
  (event.currentTarget as HTMLElement)?.focus();

  if (event.shiftKey) {
    ctx.extendSelection(props.index);
  } else {
    ctx.setAnchor(props.index);
    window.addEventListener('pointerup', onPointerUp);
  }
}

function onPointerUp () {
  ctx.endSelection();
  window.removeEventListener('pointerup', onPointerUp);
}

function onPointerEnter () {
  if (!ctx.dragging.value) return;
  ctx.extendSelection(props.index);
}

function onKeyDown (e: KeyboardEvent) {
  switch (e.key) {
  case GKbdKeyName.ArrowLeft:
  case GKbdKeyName.ArrowUp:
    e.preventDefault();
    ctx.movePrev(e.shiftKey);
    break;
  case GKbdKeyName.ArrowRight:
  case GKbdKeyName.ArrowDown:
    e.preventDefault();
    ctx.moveNext(e.shiftKey);
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
