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
  RANGE_SELECTION_1D_KEY,
} from './types';
import type {
  Position1D,
} from './types';
import {
  GKbdKeyName,
} from '@/components/Display/Kbd/types';

const {
  index,
} = defineProps<{
  /** The index of the range 1D */
  index: number;
}>();

const context = inject(RANGE_SELECTION_1D_KEY)!;

const selected = computed(() => context.isSelected(index));
const position = computed(() => context.getPosition(index));
const isPosition = (query: Position1D) => context.isPosition(index, query);

function onKeyDown (event: KeyboardEvent) {
  switch (event.key) {
  case GKbdKeyName.ArrowLeft:
  case GKbdKeyName.ArrowUp:
    event.preventDefault();
    context.movePrevious(event.shiftKey);
    break;
  case GKbdKeyName.ArrowRight:
  case GKbdKeyName.ArrowDown:
    event.preventDefault();
    context.moveNext(event.shiftKey);
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
  // Clear any existing text selection and focus for keyboard nav
  window.getSelection()?.removeAllRanges();
  (event.currentTarget as HTMLElement)?.focus();

  if (event.shiftKey) {
    context.extendSelection(index);
  } else {
    context.setAnchor(index);
    window.addEventListener('pointerup', onPointerUp);
  }
}

function onPointerEnter () {
  if (!context.dragging.value) return;
  context.extendSelection(index);
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
