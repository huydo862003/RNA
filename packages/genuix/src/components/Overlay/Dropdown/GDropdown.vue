<template>
  <Dropdown
    v-if="$slots.popper"
    class="g-dropdown-trigger"
    :placement="placement"
    :shown="shown"
    :triggers="triggers"
    :popper-class="`${popperClass} mt-xs`"
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
  computed,
  getCurrentInstance,
  watchEffect,
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
  style: _style = undefined,
  placement = 'bottom',
  shown = undefined,
  arrow = true,
  triggers = ['click'],
} = defineProps<{
  /** CSS classes applied to the popper element */
  class?: string;
  /** Inline styles applied to the popper element */
  style?: Record<string, string>;
  /** Positioning of the dropdown relative to the trigger */
  placement?: Placement;
  /** Programmatically show/hide the dropdown */
  shown?: boolean;
  /** Show arrow/triangle pointing to trigger */
  arrow?: boolean;
  /** Events that trigger the dropdown */
  triggers?: ('hover' | 'click' | 'focus' | 'touch')[];
}>();

const popperUid = `g-dropdown-${getId(Dropdown, getCurrentInstance()!)}`; // A unique id for the dropdown popper, so we can query the child of the popper using query selector

const popperClass = computed(() => [
  popperUid,
  _class,
  !arrow && 'g-popper--no-arrow',
].filter(Boolean).join(' '));

const popper = computed(() => document.querySelector(`.${popperUid}.v-popper__popper`));

// Apply inline styles to the teleported popper element
watchEffect(() => {
  const el = popper.value;
  if (!el || !_style) return;
  for (const [
    key,
    val,
  ] of Object.entries(_style)) {
    (el as HTMLElement).style.setProperty(key, val);
  }
});

defineExpose({
  popper,
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
