<template>
  <GTooltip
    placement="right"
    :show-delay="500"
  >
    <button
      v-show="visible"
      :id="id"
      v-bind="$attrs"
      :class="[
        'select-option',
        `select-option-${ctx.size}`,
        isFocused && 'select-option--focused',
      ]"
      role="option"
      :aria-selected="isSelected"
      @click="ctx.select(value)"
    >
      <slot>
        <GPill
          class="max-w-full"
          :size="ctx.size"
          :color="pillColor"
        >
          <template #left>
            <span
              class="select-dot"
              :style="{ background: dotColor }"
            />
          </template>
          {{ label ?? value }}
        </GPill>
      </slot>
    </button>
    <template #popper>
      <p class="line-clamp-3 max-w-72 md:max-w-96">
        {{ label ?? value }}
      </p>
    </template>
  </GTooltip>
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
  SELECT_KEY,
} from './types';
import {
  PillColor,
  PILL_COLORS,
} from '@/components/Display/Pill/types';
import GPill from '@/components/Display/Pill/GPill.vue';
import GTooltip from '@/components/Overlay/Tooltip/GTooltip.vue';

defineOptions({
  inheritAttrs: false,
});

const ctx = inject(SELECT_KEY)!;

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

// Detect current state of the option
const isSelected = computed(() => ctx.selectedValue.value === value);
const isFocused = computed(() => ctx.focusedValue.value === value);

const visible = computed(() => {
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
.select-option {
  display: block;
  width: calc(100% - 2 * var(--spacing-sm));
  margin: 0 var(--spacing-sm);
  text-align: left;
  cursor: pointer;
  border: none;
  border-radius: var(--radius-md);
  color: var(--gui-neutral-fg);
  padding: var(--spacing-sm) var(--spacing-sm);
  white-space: nowrap;
  text-overflow: ellipsis;
}

.select-option-xs {
  @apply text-xs;
  padding: var(--spacing-xs) var(--spacing-xs);
}

.select-option-sm {
  @apply text-sm;
}

.select-option-md {
  @apply text-md;
}

.select-option-lg {
  @apply text-lg;
  padding: var(--spacing-sm) var(--spacing-md);
}

.select-option-xl {
  @apply text-xl;
  padding: var(--spacing-sm) var(--spacing-md);
}

.select-option:hover,
.select-option--focused {
  background: var(--gui-neutral-bg-hover);
}

.select-dot {
  @apply inline-block w-2 h-2 rounded-full shrink-0;
}
}
</style>
