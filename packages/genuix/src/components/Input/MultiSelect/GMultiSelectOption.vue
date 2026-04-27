<template>
  <button
    v-show="visible"
    v-bind="$attrs"
    :id="id"
    :class="[
      'multiselect-option',
      isSelected && 'multiselect-option--selected',
      isFocused && 'multiselect-option--focused',
    ]"
    role="option"
    :aria-selected="isSelected"
    @click="ctx.toggle(value)"
  >
    <slot>
      <GPill
        class="max-w-full"
        :size="ctx.size"
        :color="pillColor"
      >
        <template #left>
          <span
            class="multiselect-dot"
            :style="{ background: dotColor }"
          />
        </template>
        {{ label ?? value }}
      </GPill>
    </slot>
  </button>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  computed,
  inject,
  onMounted,
  onUnmounted,
  onUpdated,
  watch,
} from 'vue';
import {
  MULTI_SELECT_KEY,
} from './types';
import {
  PillColor,
  PILL_COLORS,
} from '@/components/Display/Pill/types';
import GPill from '@/components/Display/Pill/GPill.vue';

defineOptions({
  inheritAttrs: false,
});

const ctx = inject(MULTI_SELECT_KEY)!;

const {
  id = undefined,
  value,
  label = undefined,
  color = undefined,
} = defineProps<{
  id?: string;
  /* Must be unique among the options */
  value: string;
  label?: string;
  color?: PillColor;
}>();

const PILL_COLOR_VALUES = Object.values(PillColor);

const pillColor = computed(
  () => color ?? PILL_COLOR_VALUES[value.length % PILL_COLOR_VALUES.length],
);

const dotColor = computed(() => (PILL_COLORS[pillColor.value] ?? PILL_COLORS[PillColor.Gray]).solid);

const isSelected = computed(() => ctx.selectedValues.value.includes(value));
const isFocused = computed(() => ctx.focusedValue.value === value);

const visible = computed(() => {
  if (ctx.selectedValues.value.includes(value)) return false;
  const q = ctx.searchValue.value.toLowerCase();
  if (!q) return true;
  return (label ?? value).toLowerCase().includes(q);
});

const options = computed(() => ({
  label: label ?? value,
  color: pillColor.value,
  visible: visible.value,
}));

onMounted(() => ctx.register(value, options.value));

onUpdated(() => ctx.update(value, options.value));
watch(visible, () => ctx.update(value, options.value));

onUnmounted(() => ctx.unregister(value));
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.multiselect-option {
  display: block;
  width: calc(100% - 2 * var(--spacing-sm));
  margin: 0 var(--spacing-sm);
  text-align: left;
  cursor: pointer;
  border: none;
  border-radius: var(--radius-md);
  color: var(--gui-neutral-fg);
  padding: var(--spacing-sm) var(--spacing-sm);
}

.multiselect-option:hover,
.multiselect-option--focused {
  background: var(--gui-neutral-bg-hover);
}

.multiselect-dot {
  @apply inline-block w-2 h-2 rounded-full shrink-0;
}
}
</style>
