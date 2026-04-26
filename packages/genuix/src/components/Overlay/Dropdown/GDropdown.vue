<template>
  <Dropdown
    v-if="$slots.popper"
    :id="id"
    class="g-dropdown-trigger"
    :placement="placement"
    :shown="shown"
    :triggers="triggers"
    :popper-class="popperClass"
    @show="isOpen = true"
    @hide="isOpen = false"
  >
    <div
      ref="triggerRef"
      class="g-dropdown-trigger-inner"
    >
      <slot :is-open="isOpen" />
    </div>
    <template #popper>
      <div
        :style="{ minWidth: triggerWidth ? `${triggerWidth}px` : undefined }"
      >
        <slot
          name="popper"
          :is-open="isOpen"
        />
      </div>
    </template>
  </Dropdown>
  <slot
    v-else
    :is-open="isOpen"
  />
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
  useTemplateRef,
} from 'vue';
import {
  getId,
} from '@hdnax/stdx';
import {
  useWidth,
} from '@/composables/useWidth';

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

const triggerRef = useTemplateRef<HTMLElement>('triggerRef');

const triggerWidth = useWidth(triggerRef);

// A unique id for the dropdown popper, so we can query the child of the popper using query selector
const popperUid = `g-dropdown-${getId(Dropdown, getCurrentInstance()!)}`;

const popperClass = computed(() => [
  popperUid,
  _class,
  !arrow && 'g-popper--no-arrow',
].filter(Boolean).join(' '));

const isOpen = ref(false);

defineExpose({
  isOpen,
});
</script>

<style>
@reference '@/style.css';

@layer components {
.g-dropdown-trigger {
  @apply inline-block;
}

.g-dropdown-trigger-inner {
  @apply inline-block;
}

.g-popper--no-arrow .v-popper__arrow-container {
  @apply hidden;
}
}
</style>
