<template>
  <tr
    v-if="visible"
    v-bind="$attrs"
  >
    <slot />
  </tr>
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
  ref,
} from 'vue';
import {
  TABLE_KEY,
} from './types';

defineOptions({
  inheritAttrs: false,
});

const {
  rowData = {},
} = defineProps<{
  rowData?: Record<string, unknown>;
}>();

const ctx = inject(TABLE_KEY, null);
const rowKey = ref<number>(-1);

onMounted(() => {
  if (ctx) {
    rowKey.value = ctx.registerRow(rowData);
  }
});

onBeforeUnmount(() => {
  if (ctx && 0 <= rowKey.value) {
    ctx.unregisterRow(rowData);
  }
});

const visible = computed(() =>
  !ctx || ctx.isVisible(rowKey.value));
</script>

<style scoped>
@reference '@/style.css';

@layer components {
tr {
  border-bottom: 1px solid var(--gui-neutral-border-subtle);
}

tr:last-child {
  border-bottom: none;
}
}
</style>
