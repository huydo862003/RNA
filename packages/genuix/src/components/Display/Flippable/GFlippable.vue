<template>
  <div
    :id="id"
    :class="[
      'flippable',
      {
        'is-flipped': isFlipped,
        'is-vertical': direction === FlipDirection.Vertical,
        'is-horizontal': direction === FlipDirection.Horizontal,
        'is-disabled': disabled,
        'trigger-on-click': trigger === FlipTrigger.Click,
      },
      _class,
    ]"
    :style="_style"
    @click="trigger === FlipTrigger.Click && flip()"
    @mouseenter="trigger === FlipTrigger.Hover && showBack()"
    @mouseleave="trigger === FlipTrigger.Hover && showFront()"
  >
    <div class="flippable-front">
      <slot name="front" />
    </div>
    <div class="flippable-back">
      <slot name="back" />
    </div>
  </div>
</template>

<script setup lang="ts">
/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  readonly,
  ref,
  watch,
} from 'vue';
import {
  FlipDirection,
  FlipTrigger,
} from './types';

defineOptions({
  inheritAttrs: false,
});

const {
  id = undefined,
  class: _class = '',
  style: _style = undefined,
  flipped: initialState = false,
  disabled = false,
  direction = FlipDirection.Horizontal,
  trigger = FlipTrigger.Click,
} = defineProps<{
  id?: string;
  class?: string;
  style?: Record<string, string>;
  flipped?: boolean;
  disabled?: boolean;
  direction?: FlipDirection;
  trigger?: FlipTrigger;
}>();

const isFlipped = ref(initialState);
watch(() => initialState, () => {
  isFlipped.value = initialState;
});

function flip (): boolean {
  if (disabled) return isFlipped.value;
  const oldValue = isFlipped.value;
  isFlipped.value = !isFlipped.value;
  return oldValue;
}

function showFront (): boolean {
  const oldValue = isFlipped.value;
  isFlipped.value = false;
  return oldValue;
}

function showBack (): boolean {
  const oldValue = isFlipped.value;
  isFlipped.value = true;
  return oldValue;
}

defineExpose({
  flip,
  showFront,
  showBack,
  state: readonly(isFlipped),
});
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.flippable {
  @apply relative; /* Content should be stacked inside flippable, not floating out */
  perspective: max(100vw, 100vh); /* ensure the flippable is suffiently far from the screen */
}

.flippable-front,
.flippable-back {
  @apply backface-hidden; /* Hide the back face of the front and back div (so when flipped, the front div would show its back to the user) */
  transition-property: transform;
  transition-duration: var(--duration-slow, 300ms);
  transition-timing-function: var(--ease-default, ease);
}

.flippable-front,
.flippable-back {
  @apply w-full h-full;
}

.flippable-back {
  @apply absolute inset-0;
}

.trigger-on-click {
  @apply cursor-pointer;
}

.is-horizontal {
  &.flippable .flippable-back {
    transform: rotateY(180deg);
  }

  &.flippable.is-flipped .flippable-front {
    transform: rotateY(180deg);
  }

  &.flippable.is-flipped .flippable-back {
    transform: rotateY(0deg);
  }
}

.is-vertical {
  &.flippable .flippable-back {
    transform: rotateX(180deg);
  }

  &.flippable.is-flipped .flippable-front {
    transform: rotateX(180deg);
  }

  &.flippable.is-flipped .flippable-back {
    transform: rotateX(0deg);
  }
}

.flippable.is-disabled {
  @apply cursor-not-allowed;
  filter: brightness(0.95);
}
}
</style>
