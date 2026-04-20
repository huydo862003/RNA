<template>
  <component
    :is="resolvedIcon"
    v-if="resolvedIcon"
    role="img"
    :aria-label="alt"
    :aria-hidden="!alt"
  />
</template>

<script setup lang="ts">
/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  computed,
  type Component,
} from 'vue';
import {
  type GIconName,
  iconMap,
} from './types';

const {
  name = undefined,
  icon = undefined,
  alt = undefined,
} = defineProps<{
  /** Named icon from GIconName enum */
  name?: GIconName;
  /** Custom component or SVG to render instead of named icon */
  icon?: Component;
  /** Accessible alt text. When absent, icon is decorative (aria-hidden) */
  alt?: string;
}>();

const resolvedIcon = computed(() => icon ?? (name ? iconMap[name] : undefined));
</script>
