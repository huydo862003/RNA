<template>
  <div class="collapsible">
    <button
      class="collapsible-summary"
      type="button"
      @click="isOpen = !isOpen"
    >
      <span
        class="collapsible-toggle-icon"
        :class="{ 'is-open': isOpen }"
      >
        <GIcon :name="GIconName.ChevronRight" />
      </span>
      <slot name="summary" />
    </button>
    <Transition>
      <div
        v-show="isOpen"
      >
        <slot name="collapsible-content" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  readonly,
  ref,
  watch,
} from 'vue';
import GIcon from '@/components/Display/Icon/GIcon.vue';
import {
  GIconName,
} from '@/components/Display/Icon/types';

const {
  open: initialState = false,
} = defineProps<{
  open?: boolean;
}>();

// Allow reactive props to override the current value
const isOpen = ref(initialState);
watch(() => initialState, () => {
  isOpen.value = initialState;
}, {
  immediate: true,
});

// Close the toggle content
// And return the previous state
function collapse (): boolean {
  const oldValue = isOpen.value;
  isOpen.value = false;
  return oldValue;
}

// Open the toggle content
// And return the previous state
function expand (): boolean {
  const oldValue = isOpen.value;
  isOpen.value = true;
  return oldValue;
}

// Toggle the content
// And return the previous state
function toggle (): boolean {
  const oldValue = isOpen.value;
  isOpen.value = !isOpen.value;
  return oldValue;
}

defineExpose({
  close: collapse,
  open: expand,
  toggle,
  state: readonly(isOpen),
});
</script>

<style scoped>
@reference '@/style.css';

.collapsible {
  @apply pl-6;
}

.collapsible-summary {
  @apply flex items-center gap-1 cursor-pointer select-none relative;
  @apply bg-transparent border-none p-0 text-left;
}

.collapsible-toggle-icon {
  @apply shrink-0 absolute -left-6 inline-flex;
  width: var(--size-2);
  height: var(--size-2);
  transition-property: transform;
  transition-duration: var(--duration-fast);
  transition-timing-function: var(--ease-default, ease);
}

.collapsible-toggle-icon.is-open {
  transform: rotate(90deg);
}

.v-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}

.v-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.v-enter-active,
.v-leave-active {
  transition-property: opacity transform;
  transition-duration: var(--duration-fast);
  transition-timing-function: var(--ease-default, ease);
  cursor: pointer; /* Avoid the cursor to flash between pointer and caret on the collapsible content transition */
}

.v-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.v-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
