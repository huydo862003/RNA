<template>
  <!-- no-auto-focus should not be set to prevent scenarios where the user tries to auto-focus a child element of the popper & then floating-vue steals the focus -->
  <Tooltip
    v-if="$slots.popper"
    :id="id"
    ref="popperRef"
    :placement="placement"
    :shown="shown"
    :distance="distance"
    :delay="{
      show: showDelay,
      hide: hideDelay,
    }"
    :triggers="triggers"
    :popper-triggers="['hover']"
    :popper-class="`tooltip-popper ${popperClass}`"
    :container="popperContainer ?? 'body'"
    no-auto-focus
    @show="handleShow"
    @apply-show="handleApplyShow"
    @hide="handleHide"
  >
    <slot :is-open="isOpen" />
    <template #popper>
      <slot
        name="popper"
        :is-open="isOpen"
        v-bind="$attrs"
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
  inject,
  nextTick,
  ref,
  useTemplateRef,
  watch,
} from 'vue';
import {
  getId,
} from '@hdnax/stdx';
import {
  POPPER_CONTAINER_KEY,
} from '@/components/Overlay/Modal/types';

type Alignment = 'start' | 'end';
type Placement = Side | `${Side}-${Alignment}`;
type Side = 'top' | 'bottom' | 'left' | 'right';

defineOptions({
  inheritAttrs: false,
});

const {
  id = undefined,
  class: _class = '',
  placement = 'bottom',
  distance = 0,
  shown = false,
  arrow = false,
  triggers = [
    'hover',
    'focus',
  ],
  showDelay = 0,
  hideDelay = 0,
} = defineProps<{
  /** The HTML id of the tooltip wrapper */
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
  /** Delay in ms before showing */
  showDelay?: number;
  /** Delay in ms before hiding */
  hideDelay?: number;
}>();
const emit = defineEmits<{
  'show-start': [];
  'show-end': [];
  'hide': [];
}>();
// If inside a modal/dialog, render popper inside it instead of body
const popperContainerRef = inject(POPPER_CONTAINER_KEY, null);
const popperContainer = computed(() => popperContainerRef?.value ?? undefined);

// A unique id so we can query the child of the current tooltip
const popperUid = `tooltip-${getId(Tooltip, getCurrentInstance()!)}`;

const popperClass = computed(() => [
  popperUid,
  _class,
  !arrow && 'popper--no-arrow',
].filter(Boolean).join(' '));

const isOpen = ref(false);

const popperRef = useTemplateRef<InstanceType<typeof Tooltip> | null>('popperRef');

// We read the trigger's computed display and replicate that to the wrapper to not break layout
watch(popperRef, () => nextTick(() => {
  const wrapper = popperRef.value?.$el;

  if (!wrapper) return;
  const trigger = wrapper.firstElementChild;

  if (!trigger) return;
  const display = getComputedStyle(trigger).display;

  wrapper.style.display = display === 'inline' ? 'inline' : display.startsWith('inline') ? 'inline-block' : 'block';
}), {
  immediate: true,
});

function handleApplyShow () {
  emit('show-end');
}

function handleHide () {
  isOpen.value = false;
  emit('hide');
}

function handleShow () {
  isOpen.value = true;
  emit('show-start');
}

function hide () {
  popperRef.value?.hide();
}

function show () {
  popperRef.value?.show();
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

<!-- eslint-disable vue/enforce-style-attribute -->
<style>
@reference '@/style.css';

.tooltip-popper {
  &.v-popper__popper {
    @apply border-0 border-transparent;
    .v-popper__wrapper {
      @apply border-0 border-transparent;
      .v-popper__inner {
        @apply border-0 border-transparent;
      }
    }
  }
}

@layer components {
.popper--no-arrow .v-popper__arrow-container {
  @apply hidden;
}
}
</style>
<!-- eslint-enable vue/enforce-style-attribute -->
