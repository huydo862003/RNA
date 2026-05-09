<template>
  <!-- no-auto-focus should not be set to prevent scenarios where the user tries to auto-focus a child element of the popper & then floating-vue steals the focus -->
  <Dropdown
    v-if="$slots.popper"
    :id="id"
    ref="popperRef"
    :placement="placement"
    :shown="shown"
    :triggers="triggers"
    :popper-class="popperClass"
    :distance="distance"
    :flip="flip"
    :delay="{
      show: showDelay,
      hide: hideDelay,
    }"
    :container="popperContainer ?? 'body'"
    no-auto-focus
    @show="handleShow"
    @apply-show="handleApplyShow"
    @hide="handleHide"
  >
    <div
      ref="triggerRef"
    >
      <slot :is-open="isOpen" />
    </div>
    <template #popper>
      <div
        :style="{
          width: width === 'trigger' && triggerWidth ? `${triggerWidth}px` : undefined,
        }"
      >
        <slot
          name="popper"
          :is-open="isOpen"
          v-bind="$attrs"
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
import {
  useWidth,
} from '@/composables/useWidth';

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
  flip = false,
  triggers = ['click'],
  showDelay = 0,
  hideDelay = 0,
  width = 'auto',
} = defineProps<{
  /** The HTML id of the dropdown wrapper */
  id?: string;
  /** CSS classes applied to the popper element */
  class?: string;
  /** Positioning of the dropdown relative to the trigger */
  placement?: Placement;
  /** Programmatically show/hide the dropdown */
  shown?: boolean;
  /** Add distance between the trigger and the popper */
  distance?: number;
  /** Show arrow/triangle pointing to trigger */
  arrow?: boolean;
  /** Allow floating-ui to flip placement when space is constrained */
  flip?: boolean;
  /** Events that trigger the dropdown */
  triggers?: ('hover' | 'click' | 'focus' | 'touch')[];
  /** Delay in ms before showing */
  showDelay?: number;
  /** Delay in ms before hiding */
  hideDelay?: number;
  /** Popper width: 'auto' (content-sized) or 'trigger' (match trigger width) */
  width?: 'auto' | 'trigger';
}>();
const emit = defineEmits<{
  'show-start': [];
  'show-end': [];
  'hide': [];
}>();
const popperContainerRef = inject(POPPER_CONTAINER_KEY, null);
const popperContainer = computed(() => popperContainerRef?.value ?? undefined);

const triggerRef = useTemplateRef<HTMLElement>('triggerRef');

// Measure the actual trigger element (first child), not the wrapper div
const triggerElement = computed(() => triggerRef.value?.firstElementChild as HTMLElement | null ?? triggerRef.value);
const triggerWidth = useWidth(triggerElement);

// A unique id for the dropdown popper, so we can query the child of the popper using query selector
const popperUid = `dropdown-${getId(Dropdown, getCurrentInstance()!)}`;

const popperClass = computed(() => [
  popperUid,
  _class,
  !arrow && 'popper--no-arrow',
].filter(Boolean).join(' '));

const isOpen = ref(false);

const popperRef = useTemplateRef<InstanceType<typeof Dropdown> | null>('popperRef');

// The trigger wrapper div can break consumer's layout if the trigger is block or inline-flex
// We read the trigger's computed display and replicate that
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
<style lang="scss">
@reference '@/style.css';

.v-popper__inner {
  @apply overflow-visible w-full h-full;
}

@layer components {
.popper--no-arrow .v-popper__arrow-container {
  @apply hidden;
}
}
</style>
<!-- eslint-enable vue/enforce-style-attribute -->
