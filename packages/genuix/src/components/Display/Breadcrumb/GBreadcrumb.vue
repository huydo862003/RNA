<template>
  <nav
    v-bind="$attrs"
    class="breadcrumb"
    aria-label="Breadcrumb"
  >
    <!-- Short path: show all crumbs -->
    <template v-if="items.length <= maxVisible">
      <template
        v-for="(item, i) in items"
        :key="i"
      >
        <span
          v-if="i > 0"
          class="breadcrumb-sep"
        >
          <slot name="separator">
            <GIcon
              v-if="isIconSeparator"
              :name="separator as GIconName"
            />
            <template v-else>{{ separator }}</template>
          </slot>
        </span>
        <component
          :is="item.href && i < items.length - 1 ? 'a' : 'span'"
          :href="item.href && i < items.length - 1 ? item.href : undefined"
          :class="i < items.length - 1 ? 'breadcrumb-link' : 'breadcrumb-current'"
          :aria-current="i === items.length - 1 ? 'page' : undefined"
        >
          <slot
            name="icon"
            :item="item"
            :index="i"
          >
            <GIcon
              v-if="item.icon"
              :name="item.icon"
              class="breadcrumb-icon"
            />
          </slot>
          <span class="breadcrumb-label">{{ item.label }}</span>
        </component>
      </template>
    </template>

    <!-- Long path: first, ellipsis dropdown, second-to-last, current -->
    <template v-else>
      <!-- First crumb -->
      <component
        :is="items[0].href ? 'a' : 'span'"
        :href="items[0].href"
        class="breadcrumb-link"
      >
        <slot
          name="icon"
          :item="items[0]"
          :index="0"
        >
          <GIcon
            v-if="items[0].icon"
            :name="items[0].icon"
            class="breadcrumb-icon"
          />
        </slot>
        <span class="breadcrumb-label">{{ items[0].label }}</span>
      </component>

      <!-- Separator -->
      <span class="breadcrumb-sep">
        <slot name="separator">
          <GIcon
            v-if="isIconSeparator"
            :name="separator as GIconName"
          />
          <template v-else>{{ separator }}</template>
        </slot>
      </span>

      <!-- Ellipsis with dropdown -->
      <GDropdown
        placement="bottom-start"
        :distance="4"
        class="breadcrumb-popper"
      >
        <button class="breadcrumb-ellipsis">
          <slot name="ellipsis">
            <GIcon
              v-if="isIconEllipsis"
              :name="ellipsis as GIconName"
            />
            <template v-else>
              {{ ellipsis }}
            </template>
          </slot>
        </button>
        <template #popper>
          <slot
            name="dropdown"
            :items="collapsedItems"
          >
            <div class="breadcrumb-dropdown">
              <a
                v-for="(item, i) in collapsedItems"
                :key="i"
                :href="item.href ?? '#'"
                class="breadcrumb-dropdown-item"
              >
                <GIcon
                  v-if="item.icon"
                  :name="item.icon"
                  class="breadcrumb-icon"
                />
                <span class="breadcrumb-label">{{ item.label }}</span>
              </a>
            </div>
          </slot>
        </template>
      </GDropdown>

      <!-- Separator -->
      <span class="breadcrumb-sep">
        <slot name="separator">
          <GIcon
            v-if="isIconSeparator"
            :name="separator as GIconName"
          />
          <template v-else>{{ separator }}</template>
        </slot>
      </span>

      <!-- Second-to-last crumb -->
      <component
        :is="items[items.length - 2].href ? 'a' : 'span'"
        :href="items[items.length - 2].href"
        class="breadcrumb-link"
      >
        <slot
          name="icon"
          :item="items[items.length - 2]"
          :index="items.length - 2"
        >
          <GIcon
            v-if="items[items.length - 2].icon"
            :name="items[items.length - 2].icon"
            class="breadcrumb-icon"
          />
        </slot>
        <span class="breadcrumb-label">{{ items[items.length - 2].label }}</span>
      </component>

      <!-- Separator -->
      <span class="breadcrumb-sep">
        <slot name="separator">
          <GIcon
            v-if="isIconSeparator"
            :name="separator as GIconName"
          />
          <template v-else>{{ separator }}</template>
        </slot>
      </span>

      <!-- Current (last) -->
      <span
        class="breadcrumb-current"
        aria-current="page"
      >
        <slot
          name="icon"
          :item="items[items.length - 1]"
          :index="items.length - 1"
        >
          <GIcon
            v-if="items[items.length - 1].icon"
            :name="items[items.length - 1].icon"
            class="breadcrumb-icon"
          />
        </slot>
        <span class="breadcrumb-label">{{ items[items.length - 1].label }}</span>
      </span>
    </template>
  </nav>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  computed,
} from 'vue';
import type {
  BreadcrumbItem,
} from './types';
import GDropdown from '@/components/Overlay/Dropdown/GDropdown.vue';
import GIcon from '@/components/Display/Icon/GIcon.vue';
import {
  GIconName,
} from '@/components/Display/Icon/types';

defineOptions({
  inheritAttrs: false,
});

defineSlots<{
  /** Custom separator between crumbs */
  separator(): any;
  /** Custom ellipsis trigger content */
  ellipsis(): any;
  /** Custom icon per crumb */
  icon(props: {
    item: BreadcrumbItem;
    index: number;
  }): any;
  /** Custom dropdown for collapsed crumbs */
  dropdown(props: { items: BreadcrumbItem[] }): any;
}>();

const ICON_VALUES = new Set<string>(Object.values(GIconName));

const {
  items,
  separator = '/',
  ellipsis = '\u2026',
  maxVisible = 3,
} = defineProps<{
  items: BreadcrumbItem[];
  /** Separator: a string or GIconName. Overridden by #separator slot. */
  separator?: string | GIconName;
  /** Ellipsis trigger: a string or GIconName. Overridden by #ellipsis slot. */
  ellipsis?: string | GIconName;
  /** Max crumbs before collapsing middle items into ellipsis dropdown */
  maxVisible?: number;
}>();

const isIconSeparator = computed(() => ICON_VALUES.has(separator));
const isIconEllipsis = computed(() => ICON_VALUES.has(ellipsis));
const collapsedItems = computed(() => items.slice(1, -2));
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.breadcrumb {
  @apply flex flex-wrap items-center text-xs gui-neutral-fg-muted;
}

.breadcrumb-sep {
  @apply mx-1 gui-neutral-fg-muted opacity-50 inline-flex items-center;
}

.breadcrumb-link {
  @apply no-underline gui-neutral-fg-muted inline-flex items-center gap-xs max-w-48;
  transition: color var(--duration-fast) var(--ease-default);
}

.breadcrumb-link:hover {
  @apply gui-primary-fg no-underline;
}

.breadcrumb-current {
  @apply gui-neutral-fg font-medium inline-flex items-center gap-xs max-w-48;
}

.breadcrumb-label {
  @apply overflow-hidden whitespace-nowrap;
  text-overflow: ellipsis;
}

.breadcrumb-icon {
  @apply shrink-0;
}

.breadcrumb-ellipsis {
  @apply text-xs px-1.5 py-0.5 rounded-sm cursor-pointer border-none gui-neutral-fg-muted inline-flex items-center;
  line-height: 1;
  transition: background var(--duration-fast) var(--ease-default);
}

.breadcrumb-ellipsis:hover {
  @apply gui-neutral-fg;
}
}
</style>

<style>
@reference '@/style.css';

.breadcrumb-popper .breadcrumb-dropdown {
  @apply flex flex-col p-xs;
}

.breadcrumb-popper .breadcrumb-dropdown-item {
  @apply text-xs gui-neutral-fg-muted no-underline px-md py-xs inline-flex items-center gap-xs rounded-sm;
  transition: background var(--duration-fast) var(--ease-default);
}

.breadcrumb-popper .breadcrumb-dropdown-item:hover {
  @apply gui-neutral-bg-hover gui-neutral-fg no-underline;
}
</style>
