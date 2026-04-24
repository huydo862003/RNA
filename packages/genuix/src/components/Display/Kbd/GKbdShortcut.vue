<template>
  <span
    :class="['inline-flex items-center gap-2', _class]"
    :style="_style"
  >
    <template
      v-for="(key, i) in keys"
      :key="i"
    >
      <span
        v-if="0 < i"
        class="text-xs gui-neutral-fg-muted"
      >+</span>
      <GKbdKey :name="key" />
    </template>
  </span>
</template>

<script setup lang="ts">
/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import GKbdKey from './GKbdKey.vue';
import type {
  GKbdKeyName,
} from './types';

defineOptions({
  inheritAttrs: false,
});

const {
  class: _class = '',
  style: _style = undefined,
  keys,
} = defineProps<{
  class?: string;
  style?: Record<string, string>;
  /** Array of key names to display as a shortcut combination */
  keys: GKbdKeyName[];
}>();

</script>
