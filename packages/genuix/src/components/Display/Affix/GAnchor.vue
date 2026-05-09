<template>
  <GAffix
    v-bind="$attrs"
    :position="GAffixPosition.InlineStart"
    class="anchor"
  >
    <template #affix>
      <a
        :href="`#${id}`"
        class="anchor-link"
      >
        <slot name="icon">
          #
        </slot>
      </a>
    </template>
    <div :id="id">
      <slot />
    </div>
  </GAffix>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import GAffix from './GAffix.vue';
import {
  GAffixPosition,
} from './types';

defineOptions({
  inheritAttrs: false,
});

const {
  id,
} = defineProps<{
  /** ID of the element this anchor links to */
  id: string;
}>();
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.anchor-link {
  color: var(--gui-neutral-fg-muted);
  text-decoration: none;
  opacity: 0;
  transition: opacity var(--duration-fast) var(--ease-default);
}

.anchor:hover .anchor-link {
  opacity: 1;
}

.anchor-link:hover {
  color: var(--gui-info-fg);
}
}
</style>
