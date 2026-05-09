<template>
  <GInternalLink
    v-bind="$attrs"
    :as="as"
    class="forward-link"
  >
    <slot />
    <template #icon-after>
      <slot name="icon">
        <GIcon
          :name="GIconName.ArrowUpRight"
          :size="14"
        />
      </slot>
    </template>
  </GInternalLink>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Component,
} from 'vue';
import GInternalLink from './GInternalLink.vue';
import GIcon from '@/components/Display/Icon/GIcon.vue';
import {
  GIconName,
} from '@/components/Display/Icon/types';

defineOptions({
  inheritAttrs: false,
});

const {
  as = 'a' as string | Component,
} = defineProps<{
  /** Element or component to render as */
  as?: string | Component;
}>();
</script>
