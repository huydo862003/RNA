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
  value: string;
  label?: string;
}>();

const ctx = inject(FILTERABLE_KEY)!;

onMounted(() => {
  ctx.registerItem(label, value);
});

onBeforeUnmount(() => {
  ctx.unregisterItem(value);
});

const visible = computed(() => ctx.isVisible(value));
</script>
