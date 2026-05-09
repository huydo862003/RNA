<template>
  <GTooltip
    arrow
    :show-delay="1000"
    :distance="8"
    placement="bottom"
  >
    <component
      :is="as"
      v-bind="$attrs"
      role="link"
      :aria-label="ariaLabel || undefined"
      class="internal-link"
      @click="navigate"
    >
      <slot name="icon-before" />
      <slot />
      <slot name="icon-after" />
    </component>
    <template
      v-if="resolvedTooltip"
      #popper
    >
      <span class="link-tooltip">{{ resolvedTooltip }}</span>
    </template>
  </GTooltip>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Component,
} from 'vue';
import {
  computed,
  useAttrs,
} from 'vue';
import GTooltip from '@/components/Overlay/Tooltip/GTooltip.vue';

defineOptions({
  inheritAttrs: false,
});

const {
  as = 'a' as string | Component,
  label = '',
  hideTooltip = false,
} = defineProps<{
  /** Element or component to render as */
  as?: string | Component;
  /** Accessible label for the link */
  label?: string;
  /** Whether to hide the tooltip on hover */
  hideTooltip?: boolean;
}>();

const attrs = useAttrs();

const destination = computed(() =>
  (attrs.href ?? attrs.to ?? '') as string);

const fullUrl = computed(() => {
  const destination_ = destination.value;

  if (!destination_) return '';
  try {
    return new URL(destination_, window.location.origin).href;
  } catch {
    return destination_;
  }
});

const resolvedTooltip = computed(() => {
  if (hideTooltip) return '';

  return label || fullUrl.value;
});

const ariaLabel = computed(() => label);

function navigate (event: MouseEvent) {
  if (as !== 'a') return;
  if (!destination.value) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  event.preventDefault();
  window.history.pushState({}, '', destination.value);
  window.dispatchEvent(new PopStateEvent('popstate'));
}
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.internal-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--gui-info-fg-muted);
  text-decoration: none;
  cursor: pointer;
  transition: color var(--duration-fast) var(--ease-default);
}

.internal-link:hover {
  color: var(--gui-info-fg);
  text-decoration: underline;
}

.link-tooltip {
  font-size: var(--text-xs);
}
}
</style>
