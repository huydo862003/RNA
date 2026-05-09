<template>
  <GInternalLink
    v-bind="$attrs"
    :as="as"
    class="back-link"
  >
    <template #icon-before>
      <slot name="icon">
        <GIcon
          :name="GIconName.ArrowDownLeft"
          :size="14"
        />
      </slot>
    </template>
    <slot />
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
