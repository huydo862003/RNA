<template>
  <div
    v-bind="$attrs"
    :id="id"
    v-dismiss="onDismiss"
    :class="'contents'"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */
import {
  nextTick,
} from 'vue';
import {
  vDismiss,
} from '@/directives';

defineOptions({
  inheritAttrs: false,
});

// A more customizable version of v-dismiss
const emit = defineEmits<{
  (e: 'dismiss', event: Event): void; // event is the one that causes the dismiss
}>();

const {
  id = undefined,
  options = {},
} = defineProps<{
  id?: string;
  options?: {
    ignore?: (HTMLElement | null)[];
  };
}>();

async function onDismiss (e: Event) {
  let focusedElement: unknown = null;
  if (e.type === 'click' || e.type === 'pointerdown') {
    focusedElement = e.target;
  } else if (e.type === 'focusout') {
    await nextTick();
    focusedElement = document.activeElement;
  }

  if (focusedElement instanceof HTMLElement) {
    for (const el of options.ignore || []) {
      if (el?.contains(focusedElement)) {
        return; // ignore
      }
    }
  }

  emit('dismiss', e);
}
</script>
