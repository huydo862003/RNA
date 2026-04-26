<template>
  <Tooltip
    v-if="$slots.popper"
    ref="popperRef"
    :id="id"
    class="g-tooltip-trigger"
    :placement="placement"
    :shown="shown"
    :distance="distance"
    :triggers="triggers"
    :popper-triggers="['hover']"
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
  </Tooltip>
  <slot
    v-else
    :is-open="false"
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
  ref,
  useTemplateRef,
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
  distance = 0,
  shown = undefined,
  arrow = true,
  triggers = [
    'hover',
    'focus',
  ],
} = defineProps<{
  id?: string;
  /** CSS classes applied to the popper element */
  class?: string;
  /** Positioning of the tooltip relative to the trigger */
  placement?: Placement;
  /** Distance between the trigger and the popper */
  distance?: number;
  /** Programmatically show/hide the tooltip */
  shown?: boolean;
  /** Show arrow/triangle pointing to trigger */
  arrow?: boolean;
  /** Events that trigger the tooltip */
  triggers?: ('hover' | 'click' | 'focus' | 'touch')[];
}>();

// A unique id so we can query the child of the current tooltip
const popperUid = `g-tooltip-${getId(Tooltip, getCurrentInstance()!)}`;

const popperClass = computed(() => [
  popperUid,
  _class,
  !arrow && 'g-popper--no-arrow',
].filter(Boolean).join(' '));

const isOpen = ref(false);

// floating-vue mixin types unresolvable by TS
const popperRef = useTemplateRef<InstanceType<typeof Tooltip> | null>('popperRef');

function show () {
  popperRef.value?.show();
}

function hide () {
  popperRef.value?.hide();
}

function toggle () {
  if (isOpen.value) {
    hide();
  } else {
    show();
  }
}

defineExpose({
  isOpen,
  show,
  hide,
  toggle,
});
</script>

<style>
@reference '@/style.css';

@layer components {
.g-tooltip-trigger {
  @apply inline-block;
}

.v-popper {
  @apply inline-block;
}

.g-popper--no-arrow .v-popper__arrow-container {
  @apply hidden;
}
}
</style>
