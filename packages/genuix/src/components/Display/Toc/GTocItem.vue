<template>
  <li
    v-bind="$attrs"
    class="toc-item"
  >
    <div
      class="block"
    >
      <div class="toc-item-row">
        <div
          v-if="$slots.leading"
          class="toc-item-leading"
        >
          <slot name="leading" />
        </div>
        <div class="toc-item-body">
          <div class="toc-item-title">
            <slot />
          </div>
          <div
            v-if="$slots.meta"
            class="toc-item-meta"
          >
            <slot name="meta" />
          </div>
          <ul
            v-if="$slots.children"
            class="toc-item-children"
            :class="{
              'toc-item-children--no-leading': !$slots.leading,
            }"
          >
            <slot name="children" />
          </ul>
        </div>
        <div
          v-if="$slots.trailing"
          class="toc-item-trailing"
        >
          <slot name="trailing" />
        </div>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

defineOptions({
  inheritAttrs: false,
});
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.toc-item {
  @apply mt-2;
  list-style: none;
}

.toc-item-row {
  @apply flex items-baseline gap-sm;
}

.toc-item-leading {
  @apply size-1;
  flex-shrink: 0;
  color: var(--gui-neutral-fg-muted);
}

.toc-item-body {
  flex: 1;
  min-width: 0;
}

.toc-item-title {
  @apply gui-neutral-fg text-sm;
}

.toc-item-meta {
  font-size: var(--text-xs);
  color: var(--gui-neutral-fg-muted);
  margin-top: var(--spacing-2xs);
}

.toc-item-trailing {
  flex-shrink: 0;
  font-size: var(--text-xs);
  color: var(--gui-neutral-fg-muted);
}

.toc-item-children {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item-children--no-leading {
  @apply ml-4;
}
}
</style>
