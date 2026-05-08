<template>
  <button
    v-bind="$attrs"
    class="theme-toggle"
    :title="label"
    :aria-label="label"
    @click="toggle"
  >
    <GIcon
      v-if="effectiveTheme === GTheme.Light"
      :name="GIconName.Sun"
      :size="size"
    />
    <GIcon
      v-else
      :name="GIconName.Moon"
      :size="size"
    />
  </button>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  computed,
} from 'vue';
import {
  GTheme,
  useTheme,
} from '@/composables/useTheme';
import GIcon from '@/components/Display/Icon/GIcon.vue';
import {
  GIconName,
} from '@/components/Display/Icon/types';

defineOptions({
  inheritAttrs: false,
});

const {
  size = 18,
} = defineProps<{
  size?: number;
}>();

const {
  setTheme, getEffectiveTheme,
} = useTheme();

const effectiveTheme = computed(() => getEffectiveTheme());

const label = computed(() =>
  effectiveTheme.value === GTheme.Light ? 'Switch to dark mode' : 'Switch to light mode');

function toggle () {
  setTheme(effectiveTheme.value === GTheme.Light ? GTheme.Dark : GTheme.Light);
}
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xs);
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--gui-neutral-fg-muted);
  cursor: pointer;
  transition: color var(--duration-fast) var(--ease-default),
              background-color var(--duration-fast) var(--ease-default);
}

.theme-toggle:hover {
  color: var(--gui-neutral-fg);
  background-color: var(--gui-neutral-bg-hover);
}
}
</style>
