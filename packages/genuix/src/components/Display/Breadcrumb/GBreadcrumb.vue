<template>
  <nav
    v-bind="$attrs"
    class="breadcrumb"
    aria-label="Breadcrumb"
  >
    <ol class="breadcrumb-list">
      <slot />
      <li
        v-if="hasEllipsis"
        class="breadcrumb-ellipsis-item"
        :style="{ order: 1 }"
      >
        <span
          class="breadcrumb-sep"
          aria-hidden="true"
        >
          <slot name="separator">
            <GIcon
              v-if="isIconSeparator"
              :name="separator as GIconName"
            />
            <template v-else>{{ separator }}</template>
          </slot>
        </span>
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
                aria-hidden="true"
              />
              <template v-else>
                {{ ellipsis }}
              </template>
            </slot>
          </button>
          <template #popper>
            <slot
              name="dropdown"
              :ids="collapsedIds"
            >
              <div class="breadcrumb-dropdown">
                <slot name="collapsed-items" />
              </div>
            </slot>
          </template>
        </GDropdown>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import {
  computed, provide, ref,
} from 'vue';
import {
  BREADCRUMB_KEY,
} from './types';
import GDropdown from '@/components/Overlay/Dropdown/GDropdown.vue';
import GIcon from '@/components/Display/Icon/GIcon.vue';
import {
  GIconName,
} from '@/components/Display/Icon/types';

defineOptions({
  inheritAttrs: false,
});

const {
  separator = '/',
  ellipsis = '\u2026',
  maxVisible = 3,
} = defineProps<{
  separator?: string | GIconName;
  ellipsis?: string | GIconName;
  maxVisible?: number;
}>();

const ICON_VALUES = new Set<string>(Object.values(GIconName));
const isIconSeparator = computed(() => ICON_VALUES.has(separator));
const isIconEllipsis = computed(() => ICON_VALUES.has(ellipsis));

const items = ref<symbol[]>([]);

const collapsedSet = computed(() => {
  if (items.value.length <= maxVisible) return new Set<symbol>();
  const keep = new Set([
    items.value[0],
    ...items.value.slice(-(maxVisible - 1)),
  ]);
  return new Set(items.value.filter((id) => !keep.has(id)));
});

const collapsedIds = computed(() => [...collapsedSet.value]);
const hasEllipsis = computed(() => 0 < collapsedSet.value.size);

function register (id: symbol) {
  items.value.push(id);
}

function unregister (id: symbol) {
  items.value = items.value.filter((i) => i !== id);
}

provide(BREADCRUMB_KEY, {
  items,
  collapsedSet,
  register,
  unregister,
  separator,
});
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.breadcrumb {
  @apply flex flex-wrap items-center text-sm gui-neutral-fg-muted;
}

.breadcrumb-list {
  @apply flex flex-wrap items-center list-none m-0 p-0;
}

.breadcrumb-ellipsis-item {
  @apply inline-flex items-center;
}

.breadcrumb-ellipsis {
  @apply text-sm px-1.5 py-0.5 rounded-sm cursor-pointer border-none bg-transparent gui-neutral-fg-muted inline-flex items-center;
  line-height: 1;
  transition: color var(--duration-fast) var(--ease-default);
}

.breadcrumb-ellipsis:hover {
  @apply gui-neutral-fg;
}

.breadcrumb-sep {
  @apply mx-1 gui-neutral-fg-muted opacity-50 inline-flex items-center;
}
}
</style>

<style>
@reference '@/style.css';

.breadcrumb-popper .breadcrumb-dropdown {
  @apply flex flex-col p-xs;
}
</style>
