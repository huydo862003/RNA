<template>
  <!-- no-auto-focus should not be set to prevent scenarios where the user tries to auto-focus a child element of the popper & then floating-vue steals the focus -->
  <Tooltip
    v-if="$slots.popper"
    :id="id"
    ref="popperRef"
    :placement="placement"
    :shown="shown"
    :distance="distance"
    :delay="{ show: showDelay, hide: hideDelay }"
    :triggers="triggers"
    :popper-triggers="['hover']"
    :popper-class="`g-tooltip-popper ${popperClass}`"
    :container="popperContainer ?? 'body'"
    no-auto-focus
    @show="isOpen = true; emit('show-start')"
    @apply-show="emit('show-end')"
    @hide="isOpen = false; emit('hide')"
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

type Side = 'top' | 'bottom' | 'left' | 'right';
type Alignment = 'start' | 'end';
type Placement = Side | `${Side}-${Alignment}`;

defineOptions({
  inheritAttrs: false,
});

// If inside a modal/dialog, render popper inside it instead of body
const popperContainerRef = inject(POPPER_CONTAINER_KEY, null);
const popperContainer = computed(() => popperContainerRef?.value ?? undefined);

const emit = defineEmits<{
  (e: 'show-start' | 'show-end' | 'hide'): void;
}>();

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
  showDelay = 0,
  hideDelay = 0,
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
  /** Delay in ms before showing */
  showDelay?: number;
  /** Delay in ms before hiding */
  hideDelay?: number;
}>();

// A unique id so we can query the child of the current tooltip
const popperUid = `g-tooltip-${getId(Tooltip, getCurrentInstance()!)}`;

const popperClass = computed(() => [
  popperUid,
  _class,
  !arrow && 'g-popper--no-arrow',
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

.g-tooltip-popper {
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
.g-popper--no-arrow .v-popper__arrow-container {
  @apply hidden;
}
}
</style>
