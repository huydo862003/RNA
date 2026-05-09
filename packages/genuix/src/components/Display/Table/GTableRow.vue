<template>
  <tr v-bind="$attrs">
    <slot />
  </tr>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
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
  /** Data record for this row */
  rowData?: Record<string, unknown>;
}>();

const context = inject(TABLE_KEY, null);
const rowKey = ref<number>(-1);

onMounted(() => {
  if (context) {
    rowKey.value = context.registerRow(rowData);
  }
});

onBeforeUnmount(() => {
  if (context && 0 <= rowKey.value) {
    context.unregisterRow(rowData);
  }
});

</script>

<style scoped>
@reference '@/style.css';

@layer components {
tr {
  transition: background-color var(--duration-fast) var(--ease-default);
}
}
</style>
