<template>
  <GDropdown
    ref="dropdownRef"
    :arrow="false"
    placement="bottom-start"
    :distance="-(triggerHeight || 0)"
    @hide="handleClose"
    @show-end="focusSearchBox"
  >
    <template #default="{ isOpen }">
      <div
        :id="id"
        ref="triggerRef"
        v-bind="$attrs"
        :class="[
          'multiselect-trigger',
          `multiselect-trigger-${size}`,
          `multiselect-trigger--${isOpen ? 'open' : 'closed'}`,
        ]"
        :style="{
          '--_bg': tokens.bg,
          '--_bg-hover': tokens.bgHover,
          '--_fg': disabled ? tokens.mutedFg : tokens.fg,
          '--_border': tokens.border,
        }"
        :data-state="state"
      >
        <GPill
          v-for="value in selected"
          :key="value"
          class="max-w-full"
          :size="size"
          :color="colors.get(value)"
        >
          <template #left>
            <span
              class="multiselect-dot"
              :style="{ background: dotColor(colors.get(value)) }"
            />
          </template>
          {{ labels.get(value) ?? value }}
        </GPill>
        <span
          v-if="selected.length === 0"
          class="gui-neutral-fg-muted"
        >
          {{ placeholder }}
        </span>
      </div>
    </template>
    <template #popper>
      <div
        class="multiselect-popper"
        @keydown="handleKeydown"
      >
        <!-- Search row -->
        <div class="multiselect-search-row">
          <GPill
            v-for="val in selected"
            :key="val"
            class="max-w-full shrink"
            :color="colors.get(val)"
          >
            <template #left>
              <span
                class="multiselect-dot"
                :style="{ background: dotColor(colors.get(val)) }"
              />
            </template>
            {{ labels.get(val) ?? val }}
            <template #right>
              <button
                class="multiselect-pill-close"
                type="button"
                aria-label="Remove"
                @click.stop="deselect(val)"
              >
                <GIcon :name="GIconName.X" />
              </button>
            </template>
          </GPill>
          <input
            ref="searchRef"
            v-model="search"
            class="multiselect-search"
            type="text"
            :placeholder="selected.length === 0 ? searchPlaceholder : ''"
            @keydown.backspace="handleBackspaceWhenEmpty"
          >
        </div>
        <template v-if="!allSelected">
          <p class="text-xs m-sm mb-xs font-extralight gui-neutral-fg-muted select-none">
            {{ visibleCount > 0 ? 'Select an option' : 'No option found' }}
          </p>
          <div
            ref="menuRef"
            :class="{
              'multiselect-menu': true,
              'multiselect-menu--empty': visibleCount === 0,
            }"
            role="listbox"
            aria-multiselectable="true"
          />
        </template>
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
  MultiSelectSize,
  MultiSelectState,
  MULTI_SELECT_KEY,
} from './types';
import type {
  MultiSelectOptionRegistration,
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
import {
  PillColor,
  PILL_COLORS,
} from '@/components/Display/Pill/types';
import {
  GIconName,
} from '@/components/Display/Icon/types';
import GDropdown from '@/components/Overlay/Dropdown/GDropdown.vue';
import GPill from '@/components/Display/Pill/GPill.vue';
import GIcon from '@/components/Display/Icon/GIcon.vue';
import {
  useHeight,
} from '@/composables/useHeight';

defineOptions({
  inheritAttrs: false,
});

const selected = defineModel<string[]>({
  default: () => [],
});

const {
  id = undefined,
  size = MultiSelectSize.Md,
  state = MultiSelectState.Default,
  disabled = false,
  placeholder = 'Empty',
  searchPlaceholder = 'Select an option or create one',
} = defineProps<{
  id?: string;
  size?: MultiSelectSize;
  state?: MultiSelectState;
  disabled?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
}>();

const tokens = prominenceTokens(Prominence.Ghost, Semantic.Neutral);

const triggerRef = useTemplateRef('triggerRef');
const triggerHeight = useHeight(triggerRef);
const dropdownRef = useTemplateRef<InstanceType<typeof GDropdown> | null>('dropdownRef');
const searchRef = useTemplateRef<HTMLInputElement>('searchRef');
const menuElement = useTemplateRef<HTMLElement>('menuRef');

const search = ref('');

const visibleValues = reactive(new Set<string>());
const visibleCount = computed(() => visibleValues.size);
const allSelected = computed(() => 0 < labels.size && labels.size <= selected.value.length);
const labels = reactive(new Map<string, string>());
const colors = reactive(new Map<string, PillColor | undefined>());

// Ordered list of visible values for keyboard navigation
const visibleList = computed(() => [...labels.keys()].filter((v) => visibleValues.has(v)));
const focusedValue = ref<string | undefined>(undefined);

// Clear focus if the focused value is no longer visible
watch(visibleList, (list) => {
  if (focusedValue.value !== undefined && !list.includes(focusedValue.value)) {
    focusedValue.value = undefined;
  }
});

function dotColor (pillColor?: PillColor) {
  return PILL_COLORS[pillColor ?? PillColor.Gray].solid;
}

function toggle (value: string) {
  const idx = selected.value.indexOf(value);
  if (0 <= idx) {
    selected.value = selected.value.filter((v) => v !== value);
  } else {
    selected.value = [
      ...selected.value,
      value,
    ];
  }
  focusSearchBox();
}

function deselect (value: string) {
  selected.value = selected.value.filter((v) => v !== value);
}

function register (value: string, options: MultiSelectOptionRegistration) {
  labels.set(value, options.label);
  colors.set(value, options.color);
  if (options.visible) {
    visibleValues.add(value);
  }
}

function update (value: string, options: MultiSelectOptionRegistration) {
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
      toggle(focusedValue.value);
    }
  }
}

function focusSearchBox () {
  requestAnimationFrame(() => {
    searchRef.value?.focus();
  });
}

function handleClose () {
  search.value = '';
  focusedValue.value = undefined;
}

function handleBackspaceWhenEmpty (e: KeyboardEvent) {
  const target = e.target;
  if (!(target instanceof HTMLInputElement) || target.value !== '') {
    return;
  }
  if (0 < selected.value.length) {
    selected.value = selected.value.slice(0, -1);
  }
}

provide(MULTI_SELECT_KEY, {
  size,
  selectedValues: readonly(selected),
  searchValue: readonly(search),
  focusedValue: readonly(focusedValue),
  toggle,
  register,
  update,
  unregister,
});
</script>

<style scoped>
@reference '@/style.css';

@layer components {
/* Trigger */
.multiselect-trigger {
  @apply inline-flex items-center flex-wrap rounded-md cursor-pointer gap-sm overflow-hidden;
  width: 15rem;
  background: var(--_bg);
  color: var(--_fg);
  border-color: var(--_border);
  transition: border-color var(--duration-fast) var(--ease-default);
}

.multiselect-trigger:hover:not(:disabled) {
  background: var(--_bg-hover);
}

/* Merge trigger with dropdown when open */
.multiselect-trigger--open {
  opacity: 0;
}

/* States */
.multiselect-trigger[data-state="error"] {
  @apply gui-danger-border;
}

.multiselect-trigger[data-state="warning"] {
  @apply gui-warning-border;
}

.multiselect-trigger[data-state="success"] {
  @apply gui-success-border;
}

/* Sizes */
.multiselect-trigger-xs {
  @apply min-h-7 text-xs px-xs py-xs;
  --_pill-max-width: 5rem;
}

.multiselect-trigger-sm {
  @apply min-h-8 text-sm px-sm py-xs;
  --_pill-max-width: 6rem;
}

.multiselect-trigger-md {
  @apply min-h-9 text-md px-sm py-sm;
  --_pill-max-width: 8rem;
}

.multiselect-trigger-lg {
  @apply min-h-10 text-lg px-md py-sm;
  --_pill-max-width: 10rem;
}

.multiselect-trigger-xl {
  @apply min-h-12 text-xl px-md py-sm;
  --_pill-max-width: 12rem;
}

/* Pill dot */
.multiselect-dot {
  @apply inline-block w-2 h-2 rounded-full shrink-0;
}

/* Pill close button */
.multiselect-pill-close {
  @apply inline-flex items-center justify-center cursor-pointer rounded-sm border-none bg-transparent;
  color: inherit;
  opacity: 0.6;
  line-height: 1;
  padding: 0;
}

.multiselect-pill-close:hover {
  opacity: 1;
}

/* Search row */
.multiselect-search-row {
  @apply gui-neutral-bg-hover rounded-none gui-neutral-fg-muted;
  @apply border-b gui-neutral-border;
  @apply flex items-center flex-wrap gap-sm px-3 py-2 text-sm overflow-x-auto;
  --_pill-max-width: calc(var(--spacing) * 50);
}

.multiselect-search {
  @apply flex-1 border-none outline-none bg-transparent gui-neutral-fg text-sm font-mono;
  min-width: 80px;
}

.multiselect-search-row:focus-within {
  @apply gui-info-border;
}

.multiselect-search::placeholder {
  @apply gui-neutral-fg-muted opacity-50;
}

/* Menu */
.multiselect-menu {
  @apply mb-sm;
}

.multiselect-menu--empty {
  @apply mb-xs;
}
}
</style>
