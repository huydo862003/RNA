<template>
  <Dropdown
    v-if="$slots.popper"
    :id="id"
    ref="dropdownRef"
    class="g-dropdown-trigger"
    :placement="placement"
    :shown="shown"
    :triggers="triggers"
    :popper-class="popperClass"
    @show="isOpen = true"
    @hide="isOpen = false"
  >
    <slot :is-open="isOpen" />
    <template #popper>
      <slot
        name="popper"
        :is-open="isOpen"
      />
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
  computed,
  getCurrentInstance,
  ref,
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
  id = undefined,
  class: _class = '',
  placement = 'bottom',
  shown = undefined,
  arrow = true,
  triggers = ['click'],
} = defineProps<{
  id?: string;
  /** CSS classes applied to the popper element */
  class?: string;
  /** Positioning of the dropdown relative to the trigger */
  placement?: Placement;
  /** Programmatically show/hide the dropdown */
  shown?: boolean;
  /** Show arrow/triangle pointing to trigger */
  arrow?: boolean;
  /** Events that trigger the dropdown */
  triggers?: ('hover' | 'click' | 'focus' | 'touch')[];
}>();

// A unique id for the dropdown popper, so we can query the child of the popper using query selector
const popperUid = `g-dropdown-${getId(Dropdown, getCurrentInstance()!)}`;

const popperClass = computed(() => [
  popperUid,
  _class,
  !arrow && 'g-popper--no-arrow',
].filter(Boolean).join(' '));

const isOpen = ref(false);

const popper = computed(() => document.querySelector(`.${popperUid}.v-popper__popper`));

defineExpose({
  popper,
  isOpen,
});
</script>

<style>
@layer components {
.g-dropdown-trigger {
  @apply inline;
}

.g-popper--no-arrow .v-popper__arrow-container {
  @apply hidden;
}
}
</style>
