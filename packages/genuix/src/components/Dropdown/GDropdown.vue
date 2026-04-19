<template>
  <Dropdown
    v-if="$slots.popper"
    class="g-dropdown-trigger"
    :placement="placement"
    :popper-class="`__g-dropdown-${uid} ${_class}`"
  >
    <slot />
    <template #popper>
      <slot name="popper" />
    </template>
  </Dropdown>
  <slot v-else />
</template>

<script setup lang="ts">
/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  Dropdown,
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
  /** Positioning of the dropdown relative to the trigger */
  placement?: Placement;
}>();

const uid = useId();
</script>

<style>
.g-dropdown-trigger {
  display: inline;
}
</style>
