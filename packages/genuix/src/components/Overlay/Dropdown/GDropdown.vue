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
    :delay="{ show: showDelay, hide: hideDelay }"
    :container="popperContainer ?? 'body'"
    no-auto-focus
    @show="isOpen = true; emit('show-start')"
    @apply-show="emit('show-end')"
    @hide="isOpen = false; emit('hide')"
  >
    <div
      ref="triggerRef"
    >
      <slot :is-open="isOpen" />
    </div>
    <template #popper>
      <div
        :style="{ width: width === 'trigger' && triggerWidth ? `${triggerWidth}px` : undefined }"
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
  inject,
  onMounted,
  nextTick,
  ref,
  useTemplateRef,
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

type Side = 'top' | 'bottom' | 'left' | 'right';
type Alignment = 'start' | 'end';
type Placement = Side | `${Side}-${Alignment}`;

defineOptions({
  inheritAttrs: false,
});

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
  triggers = ['click'],
  showDelay = 0,
  hideDelay = 0,
  width = 'auto',
} = defineProps<{
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
  /** Events that trigger the dropdown */
  triggers?: ('hover' | 'click' | 'focus' | 'touch')[];
  /** Delay in ms before showing */
  showDelay?: number;
  /** Delay in ms before hiding */
  hideDelay?: number;
  /** Popper width: 'auto' (content-sized) or 'trigger' (match trigger width) */
  width?: 'auto' | 'trigger';
}>();

const triggerRef = useTemplateRef<HTMLElement>('triggerRef');

const triggerWidth = useWidth(triggerRef);

// The trigger wrapper div can break consumer's layout if the trigger is block or inline-flex
// We read the trigger's computed display and replicate that
onMounted(() => nextTick(() => {
  const wrapper = triggerRef.value;
  if (!wrapper) return;
  const trigger = wrapper.firstElementChild;
  if (!trigger) return;
  const display = getComputedStyle(trigger).display;
  wrapper.style.display = display === 'inline' ? 'inline' : display.startsWith('inline') ? 'inline-block' : 'block';
}));

// A unique id for the dropdown popper, so we can query the child of the popper using query selector
const popperUid = `g-dropdown-${getId(Dropdown, getCurrentInstance()!)}`;

const popperClass = computed(() => [
  popperUid,
  _class,
  !arrow && 'g-popper--no-arrow',
].filter(Boolean).join(' '));

const isOpen = ref(false);

const popperRef = useTemplateRef<InstanceType<typeof Dropdown> | null>('popperRef');

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

.v-popper__inner {
  @apply overflow-visible w-full h-full;
}

@layer components {
.g-popper--no-arrow .v-popper__arrow-container {
  @apply hidden;
}
}
</style>
