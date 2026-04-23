<template>
  <Tooltip
    v-if="$slots.popper"
    class="g-tooltip-trigger"
    :placement="placement"
    :shown="shown"
    :triggers="triggers"
    :popper-triggers="['hover']"
    :popper-class="popperClass"
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
  computed,
  getCurrentInstance,
} from 'vue';
import {
  getId,
} from '@hdnax/stdx';

type Side = 'top' | 'bottom' | 'left' | 'right';
type Alignment = 'start' | 'end';
type Placement = Side | `${Side}-${Alignment}`;

defineOptions({
  inheritAttrs: false,
});

const {
  class: _class = '',
  placement = 'bottom',
  shown = undefined,
  arrow = true,
  triggers = [
    'hover',
    'focus',
  ],
} = defineProps<{
  /** CSS classes applied to the popper element */
  class?: string;
  /** Positioning of the tooltip relative to the trigger */
  placement?: Placement;
  /** Programmatically show/hide the tooltip */
  shown?: boolean;
  /** Show arrow/triangle pointing to trigger */
  arrow?: boolean;
  /** Events that trigger the tooltip */
  triggers?: ('hover' | 'click' | 'focus' | 'touch')[];
}>();

const popperUid = `g-tooltip-${getId(Tooltip, getCurrentInstance()!)}`; // A unique id so we can query the child of the current tooltip

const popperClass = computed(() => [
  popperUid,
  _class,
  !arrow && 'g-popper--no-arrow',
].filter(Boolean).join(' '));

const popper = computed(() => document.querySelector(`.${popperUid}.v-popper__popper`));

defineExpose({
  popper,
});
</script>

<style>
@reference '../../style.css';

.g-tooltip-trigger {
  display: inline;
}

.v-popper {
  @apply inline;
}

.g-popper--no-arrow .v-popper__arrow-container {
  display: none;
}
</style>
