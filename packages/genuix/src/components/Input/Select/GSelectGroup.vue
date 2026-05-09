<template>
  <div
    v-if="visibleCount > 0"
    v-bind="$attrs"
    :id="id"
    class="select-group"
    role="group"
    :aria-label="label"
  >
    <span
      v-if="label"
      class="select-group-label"
    >{{ label }}</span>
    <slot />
  </div>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  computed,
  inject,
  provide,
  reactive,
} from 'vue';
import {
  SELECT_KEY,
} from './types';
import type {
  SelectOptionRegistration,
} from './types';

defineOptions({
  inheritAttrs: false,
});

const {
  id = undefined,
  label = undefined,
} = defineProps<{
  /** HTML id attribute */
  id?: string;
  /** Display label for the option group */
  label?: string;
}>();

const parent = inject(SELECT_KEY)!;

// Track which options in this group are visible
const visibleSet = reactive(new Set<string>());
const visibleCount = computed(() => visibleSet.size);

// NOTE: SELECT_KEY provided values are intercepted here
// We want GSelectOption to stay agnostic though
provide(SELECT_KEY, {
  ...parent,
  register (value: string, options: SelectOptionRegistration) {
    parent.register(value, options);
    if (options.visible) {
      visibleSet.add(value);
    }
  },
  update (value: string, options: SelectOptionRegistration) {
    parent.update(value, options);
    if (options.visible) {
      visibleSet.add(value);
    } else {
      visibleSet.delete(value);
    }
  },
  unregister (value: string) {
    parent.unregister(value);
    visibleSet.delete(value);
  },
});
</script>
