<template>
  <GDropdown
    ref="dropdownRef"
    :arrow="false"
    placement="bottom-start"
    :distance="-(triggerHeight || 0)"
    width="trigger"
    class="overflow-hidden"
    @hide="handleClose"
    @show-end="focusSearchBox"
  >
    <template #default="{ isOpen }">
      <button
        :id="id"
        ref="triggerRef"
        v-bind="$attrs"
        :class="[
          'select-trigger',
          `select-trigger-${size}`,
          `select-trigger--${isOpen ? 'open' : 'closed'}`,
        ]"
        :style="{
          '--_bg': tokens.bg,
          '--_bg-hover': tokens.bgHover,
          '--_fg': disabled ? tokens.mutedFg : tokens.fg,
          '--_border': tokens.border,
        }"
        :data-state="state"
        :disabled="disabled"
        type="button"
        role="combobox"
        aria-haspopup="listbox"
      >
        <span class="select-value">
          <slot
            v-if="selected"
            name="value"
            :value="selected"
            :label="displayValue!"
          >
            <GPill
              class="max-w-full"
              :size="size"
              :color="colors.get(selected)"
            >
              <template #left>
                <span
                  class="select-dot"
                  :style="{ background: dotColor(colors.get(selected)) }"
                />
              </template>
              {{ displayValue }}
            </GPill>
          </slot>
          <span
            v-else
            class="gui-neutral-fg-muted"
          >
            {{ placeholder }}
          </span>
        </span>
      </button>
    </template>
    <template
      #popper
    >
      <div
        class="contents"
        @keydown="handleKeydown"
      >
        <div
          :class="['select-search-row', `select-search-row-${size}`]"
          @click="focusSearchBox"
        >
          <slot
            v-if="selected"
            name="value"
            :value="selected"
            :label="displayValue"
          >
            <GPill
              class="max-w-full cursor-default"
              :size="size"
              :color="colors.get(selected)"
            >
              <template #left>
                <span
                  class="select-dot"
                  :style="{ background: dotColor(colors.get(selected)) }"
                />
              </template>
              {{ displayValue }}
            </GPill>
          </slot>
          <!-- size must be set here because browser set size to 20 by default, causing min-width: 0 to have no effect -->
          <input
            ref="searchRef"
            v-model="search"
            class="select-search"
            type="text"
            size="1"
            :placeholder="selected ? '' : searchPlaceholder"
            @keydown.backspace="handleBackspaceWhenEmpty"
          >
        </div>
        <p class="text-xs m-sm mb-xs font-extralight gui-neutral-fg-muted select-none">
          {{ visibleCount > 0 ? 'Select an option' : 'No option found' }}
        </p>
        <div
          ref="menuRef"
          :class="{
            'select-menu': true,
            'select-menu--empty': visibleCount === 0,
          }"
          role="listbox"
        />
      </div>
    </template>
  </GDropdown>
  <!-- Options always render for label/color registration, teleported into popper menu when available -->
  <div v-show="false">
    <Teleport
      :to="menuElement"
      :disabled="!menuElement"
    >
      <slot />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  computed,
  provide,
  reactive,
  readonly,
  ref,
  useTemplateRef,
  watch,
} from 'vue';
import {
  SelectSize,
  SelectState,
  SELECT_KEY,
} from './types';
import type {
  SelectOptionRegistration,
} from './types';
import {
  GKbdKeyName,
} from '@/components/Display/Kbd/types';
import {
  prominenceTokens,
} from '@/utils/prominence';
import {
  Prominence,
  Semantic,
} from '@/types';
import GDropdown from '@/components/Overlay/Dropdown/GDropdown.vue';
import GPill from '@/components/Display/Pill/GPill.vue';
import {
  PillColor,
  PILL_COLORS,
} from '@/components/Display/Pill/types';
import {
  useHeight,
} from '@/composables/useHeight';

defineOptions({
  inheritAttrs: false,
});

const selected = defineModel<string | undefined>();

const {
  id = undefined,
  size = SelectSize.Md,
  state = SelectState.Default,
  disabled = false,
  placeholder = 'Empty',
  searchPlaceholder = 'Search for an option...',
} = defineProps<{
  id?: string;
  size?: SelectSize;
  state?: SelectState;
  disabled?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
}>();

const tokens = prominenceTokens(Prominence.Ghost, Semantic.Neutral);

const triggerRef = useTemplateRef('triggerRef');
const triggerHeight = useHeight(triggerRef);

const dropdownRef = useTemplateRef<InstanceType<typeof GDropdown> | null>('dropdownRef');
const searchRef = useTemplateRef('searchRef');
const menuElement = useTemplateRef<HTMLElement>('menuRef');

const search = ref('');

const visibleValues = reactive(new Set<string>());
const visibleCount = computed(() => visibleValues.size);

const labels = reactive(new Map<string, string>());
const colors = reactive(new Map<string, PillColor | undefined>());

function dotColor (pillColor?: PillColor) {
  return PILL_COLORS[pillColor ?? PillColor.Gray].solid;
}

// Ordered list of visible values for keyboard navigation
const visibleList = computed(() => [...labels.keys()].filter((v) => visibleValues.has(v)));
const focusedValue = ref<string | undefined>(undefined);

watch(visibleList, (list) => {
  if (focusedValue.value !== undefined && !list.includes(focusedValue.value)) {
    focusedValue.value = undefined;
  }
});

const displayValue = computed(() => {
  if (!selected.value) return undefined;
  return labels.get(selected.value) ?? selected.value;
});

function select (value: string) {
  selected.value = value;
  search.value = '';
  focusSearchBox();
}

function handleClose () {
  search.value = '';
  focusedValue.value = undefined;
}

function register (value: string, options: SelectOptionRegistration) {
  labels.set(value, options.label);
  colors.set(value, options.color);
  if (options.visible) {
    visibleValues.add(value);
  }
}

function update (value: string, options: SelectOptionRegistration) {
  labels.set(value, options.label);
  colors.set(value, options.color);

  const wasVisible = visibleValues.has(value);

  if (options.visible && !wasVisible) {
    visibleValues.add(value);
  } else if (!options.visible && wasVisible) {
    visibleValues.delete(value);
  }
}

function unregister (value: string) {
  labels.delete(value);
  colors.delete(value);
  visibleValues.delete(value);
}

provide(SELECT_KEY, {
  size,
  selectedValue: readonly(selected),
  searchValue: readonly(search),
  focusedValue: readonly(focusedValue),
  select,
  register,
  update,
  unregister,
});

function handleKeydown (e: KeyboardEvent) {
  const list = visibleList.value;
  if (!list.length) return;

  const idx = focusedValue.value !== undefined ? list.indexOf(focusedValue.value) : -1;

  if (e.key === GKbdKeyName.ArrowDown) {
    e.preventDefault();
    focusedValue.value = list[list.length - 1 <= idx ? 0 : idx + 1];
  } else if (e.key === GKbdKeyName.ArrowUp) {
    e.preventDefault();
    focusedValue.value = list[idx <= 0 ? list.length - 1 : idx - 1];
  } else if (e.key === GKbdKeyName.Enter) {
    e.preventDefault();
    if (focusedValue.value !== undefined) {
      select(focusedValue.value);
    }
  }
}

function handleBackspaceWhenEmpty (e: KeyboardEvent) {
  const target = e.target;
  if (!(target instanceof HTMLInputElement) || target.value !== '') {
    return;
  }
  if (selected.value !== undefined) {
    selected.value = undefined;
  }
}

function focusSearchBox () {
  requestAnimationFrame(() => {
    searchRef.value?.focus();
  });
}
</script>

<style scoped>
@reference '@/style.css';

@layer components {
/* Trigger */
.select-trigger {
  @apply inline-flex items-center justify-between rounded-md cursor-pointer gap-sm overflow-hidden;
  width: 15rem;
  background: var(--_bg);
  color: var(--_fg);
  border-color: var(--_border);
  transition: border-color var(--duration-fast) var(--ease-default);
}

.select-trigger:hover:not(:disabled) {
  background: var(--_bg-hover);
}

.select-trigger:disabled {
  @apply cursor-not-allowed opacity-50;
}

/* Merge trigger with dropdown when open */
.select-trigger--open {
  opacity: 0;
}

.select-value {
  @apply max-w-full overflow-hidden text-ellipsis;
  min-width: 0;
}

.select-dot {
  @apply inline-block w-2 h-2 rounded-full shrink-0;
}

/* States */
.select-trigger[data-state="error"] {
  @apply gui-danger-border;
}

.select-trigger[data-state="warning"] {
  @apply gui-warning-border;
}

.select-trigger[data-state="success"] {
  @apply gui-success-border;
}

/* Sizes */
.select-trigger-xs {
  @apply min-h-7 text-xs px-xs;
}

.select-trigger-sm {
  @apply min-h-8 text-sm px-sm;
}

.select-trigger-md {
  @apply min-h-9 text-md px-sm;
}

.select-trigger-lg {
  @apply min-h-10 text-lg px-md;
}

.select-trigger-xl {
  @apply min-h-12 text-xl px-md;
}

/* Search row */
.select-search-row {
  @apply gui-neutral-bg-hover rounded-none gui-neutral-fg-muted;
  @apply border-b gui-neutral-border;
  @apply flex items-center flex-wrap gap-sm max-w-full cursor-text;
}

.select-search-row-xs {
  @apply text-xs px-xs py-xs;
}

.select-search-row-sm {
  @apply text-sm px-sm py-xs;
}

.select-search-row-md {
  @apply text-sm px-sm py-2;
}

.select-search-row-lg {
  @apply text-lg px-md py-2;
}

.select-search-row-xl {
  @apply text-lg px-md py-2;
}

.select-search {
  @apply border-none outline-none bg-transparent gui-neutral-fg font-mono max-w-full text-ellipsis;
  font-size: inherit;
}

.select-search-row:focus-within {
  @apply gui-info-border;
}

.select-search::placeholder {
  @apply text-sm gui-neutral-fg-muted opacity-50;
}

/* Menu */
.select-menu {
  @apply mb-sm;
}
}
</style>
