<template>
  <li v-if="visible">
    <slot :value="value" />
  </li>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  computed,
  inject,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import {
  FILTERABLE_KEY,
} from './types';

const {
  value,
  label = '',
} = defineProps<{
  /** Value used for filtering and identification */
  value: string;
  /** Display label for this item */
  label?: string;
}>();

const context = inject(FILTERABLE_KEY)!;

onMounted(() => {
  context.registerItem(label, value);
});

onBeforeUnmount(() => {
  context.unregisterItem(value);
});

const visible = computed(() => context.isVisible(value));
</script>
