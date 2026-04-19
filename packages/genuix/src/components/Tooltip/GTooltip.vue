<template>
  <Tooltip
    v-if="$slots.popper"
    class="g-tooltip-trigger"
    :placement="placement"
    :popper-class="`__g-tooltip-${uid} ${_class}`"
  >
    <slot />
    <template
      #popper
    >
      <slot name="popper" />
    </template>
  </Tooltip>
  <slot
    v-else
  />
</template>

<script setup lang="ts">
/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  Tooltip,
} from 'floating-vue';
import {
  useId,
} from 'vue';

type Side = 'top' | 'bottom' | 'left' | 'right';
type Alignment = 'start' | 'end';
type Placement = Side | `${Side}-${Alignment}`;

defineOptions({
  inheritAttrs: false,
});

const {
  class: _class = '',
  placement = 'bottom',
} = defineProps<{
  /** CSS classes applied to the popper element */
  class?: string;
  /** Positioning of the tooltip relative to the trigger */
  placement?: Placement;
}>();

const uid = useId();
</script>

<style>
@reference '../../style.css';

.g-tooltip-trigger {
  display: inline;
}

.v-popper {
  @apply inline;
}
</style>
