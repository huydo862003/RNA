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
  (name: 'dismiss', event: Event): void; // event is the one that causes the dismiss
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

async function onDismiss (event: Event) {
  let focusedElement: unknown = null;
  if (event.type === 'click' || event.type === 'pointerdown') {
    focusedElement = event.target;
  } else if (event.type === 'focusout') {
    await nextTick();
    focusedElement = document.activeElement;
  }

  if (focusedElement instanceof HTMLElement) {
    for (const element of options.ignore || []) {
      if (element?.contains(focusedElement)) {
        return; // ignore
      }
    }
  }

  emit('dismiss', event);
}
</script>
