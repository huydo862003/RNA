<template>
  <div
    v-dismiss="onDismiss"
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
  nextTick,
  type TemplateRef,
} from 'vue';
import {
  vDismiss,
} from '@/directives';

// A more customizable version of v-dismiss
const emit = defineEmits<{
  (e: 'dismiss', event: Event): void; // event is the one that causes the dismiss
}>();

const {
  options = {},
} = defineProps<{
  options?: {
    ignore?: TemplateRef<HTMLElement>[];
  };
}>();

async function onDismiss (e: Event) {
  let focusedElement: unknown = null;
  if (e.type === 'click') {
    focusedElement = e.target;
  } else if (e.type === 'focusout') {
    await nextTick();
    focusedElement = document.activeElement;
  }

  if (focusedElement instanceof HTMLElement) {
    for (const i of options.ignore || []) {
      if (i.value?.contains(focusedElement)) {
        return; // ignore
      }
    }
  }

  emit('dismiss', e);
}
</script>
