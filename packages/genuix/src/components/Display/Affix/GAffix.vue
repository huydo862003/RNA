<template>
  <div
    v-bind="$attrs"
    class="affix"
    :class="[`affix--${position}`]"
  >
    <div
      class="affix-icon"
      :class="[`affix-icon--${position}`]"
    >
      <slot name="affix" />
    </div>
    <div class="affix-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  GAffixPosition,
} from './types';

defineOptions({
  inheritAttrs: false,
});

const {
  position = GAffixPosition.InlineStart,
} = defineProps<{
  /** Position of the affix relative to its sibling content */
  position?: GAffixPosition;
}>();
</script>

<style scoped>
@reference '@/style.css';

@layer components {
/* Inline positions: flex row, icon aligned to first baseline */
.affix--inline-start,
.affix--inline-end {
  display: flex;
  align-items: first baseline;
  gap: var(--spacing-xs);
}

.affix--inline-end {
  flex-direction: row-reverse;
}

/* Corner + middle positions: relative container with absolute icon */
.affix--top-left,
.affix--top-right,
.affix--bottom-left,
.affix--bottom-right,
.affix--middle-left,
.affix--middle-right {
  position: relative;
}

.affix-icon--top-left,
.affix-icon--top-right,
.affix-icon--bottom-left,
.affix-icon--bottom-right,
.affix-icon--middle-left,
.affix-icon--middle-right {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}

.affix-icon--top-left {
  top: 0;
  left: 0;
  transform: translate(-100%, 0);
}

.affix-icon--top-right {
  top: 0;
  right: 0;
  transform: translate(100%, 0);
}

.affix-icon--bottom-left {
  bottom: 0;
  left: 0;
  transform: translate(-100%, 0);
}

.affix-icon--bottom-right {
  bottom: 0;
  right: 0;
  transform: translate(100%, 0);
}

.affix-icon--middle-left {
  top: 50%;
  left: 0;
  transform: translate(-100%, -50%);
}

.affix-icon--middle-right {
  top: 50%;
  right: 0;
  transform: translate(100%, -50%);
}
}
</style>
