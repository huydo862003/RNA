<template>
  <div
    v-show="isActive"
    v-bind="$attrs"
    :id="id"
    class="tab-panel"
    role="tabpanel"
  >
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
  onMounted,
  onUnmounted,
} from 'vue';
import {
  TAB_KEY,
} from './types';
import type {
  GIconName,
} from '@/components/Display/Icon/types';

defineOptions({
  inheritAttrs: false,
});

const ctx = inject(TAB_KEY)!;

const {
  id = undefined,
  name,
  label = undefined,
  icon = undefined,
} = defineProps<{
  id?: string;
  name: string;
  /** Display label in tab bar, defaults to name */
  label?: string;
  /** Icon shown before label in tab bar */
  icon?: GIconName;
}>();

const isActive = computed(() => ctx.activeTab.value === name);

onMounted(() => ctx.register(name, {
  label: label ?? name,
  icon,
}));
onUnmounted(() => ctx.unregister(name));
</script>
