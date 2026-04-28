<template>
  <div
    v-bind="$attrs"
    :class="['tab-root', `tab-root--${placement}`]"
  >
    <div
      ref="tabBarRef"
      :class="['tab-bar', `tab-bar--${placement}`]"
      role="tablist"
    >
      <button
        v-for="[name, tab] in tabPanels"
        :key="name"
        :ref="(element) => triggerRefs.set(name, element as HTMLElement)"
        :class="[
          'tab-trigger',
          {
            'tab-trigger--active': activeTab === name,
          },
        ]"
        role="tab"
        :tabindex="activeTab === name ? 0 : -1"
        :aria-selected="activeTab === name"
        @click="selectTab(name)"
      >
        <GIcon
          v-if="tab.icon"
          :name="tab.icon"
          class="tab-trigger-icon"
        />
        {{ tab.label }}
      </button>
      <!-- This is used to create the sliding tab underline animation -->
      <span
        class="tab-indicator"
        :style="indicatorStyle"
      />
    </div>
    <div class="tab-panels">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  computed,
  nextTick,
  onMounted,
  provide,
  reactive,
  readonly,
  ref,
  watch,
} from 'vue';
import type {
  TabPanelRegistration,
} from './types';
import {
  TAB_KEY,
  TabPlacement,
} from './types';
import GIcon from '@/components/Display/Icon/GIcon.vue';

defineOptions({
  inheritAttrs: false,
});

const emit = defineEmits<{
  select: [name: string];
}>();

const {
  default: defaultTab = undefined,
  placement = TabPlacement.Top,
} = defineProps<{
  /** Name of the tab to activate by default */
  default?: string;
  /** Position of the tab bar */
  placement?: TabPlacement;
}>();

const tabPanels = reactive<Map<string, TabPanelRegistration>>(new Map());
const panelNames = computed(() => [...tabPanels.keys()]);

const activeTab = ref<string | undefined>(defaultTab);
const tabBarRef = ref<HTMLElement | null>(null);

/* Sliding animation */
// Track all triggers for sliding animation
const triggerRefs = reactive(new Map<string, HTMLElement>());

// Sliding indicator position
const indicatorStyle = ref<Record<string, string>>({});
const isHorizontal = computed(
  () => placement === TabPlacement.Top
    || placement === TabPlacement.Bottom,
);

// Slide the indicator
function updateIndicator () {
  if (!activeTab.value) return;
  const element = triggerRefs.get(activeTab.value);
  const bar = tabBarRef.value;
  if (!element || !bar) return;

  if (isHorizontal.value) {
    indicatorStyle.value = {
      width: `${element.offsetWidth}px`, // equal to tab button width
      transform: `translateX(${element.offsetLeft}px)`, // equal to tab button X offset
    };
  } else {
    indicatorStyle.value = {
      height: `${element.offsetHeight}px`, // equal to tab button height
      transform: `translateY(${element.offsetTop}px)`, // equal to tab button Y offset
    };
  }
}

/* Init */
watch(tabPanels, () => {
  if (activeTab.value === undefined || !tabPanels.has(activeTab.value)) {
    activeTab.value = panelNames.value[0];
  }
  nextTick(updateIndicator);
});

watch(activeTab, () => nextTick(updateIndicator));

onMounted(() => nextTick(updateIndicator));

/* Provided */
function registerTab (name: string, registration: TabPanelRegistration) {
  tabPanels.set(name, registration);
}

function unregisterTab (name: string) {
  tabPanels.delete(name);
}

function selectTab (name: string) {
  activeTab.value = name;
  emit('select', name);
}

provide(TAB_KEY, {
  activeTab: readonly(activeTab),
  register: registerTab,
  unregister: unregisterTab,
});
</script>

<style scoped>
@reference '@/style.css';

@layer components {
/* Root layout */
.tab-root--top,
.tab-root--bottom {
  @apply flex flex-col;
}

.tab-root--left,
.tab-root--right {
  @apply flex flex-row;
}

.tab-root--bottom .tab-bar { order: 1; }
.tab-root--bottom .tab-panels { order: 0; }
.tab-root--right .tab-bar { order: 1; }
.tab-root--right .tab-panels { order: 0; }

/* Tab bar */
.tab-bar {
  @apply flex gui-neutral-bg-subtle overflow-auto relative;
  scrollbar-width: none;
}

.tab-bar::-webkit-scrollbar {
  display: none;
}

.tab-bar--top {
  @apply flex-row border-b gui-neutral-border-subtle;
}

.tab-bar--bottom {
  @apply flex-row border-t gui-neutral-border-subtle;
}

.tab-bar--left {
  @apply flex-col border-r gui-neutral-border-subtle;
}

.tab-bar--right {
  @apply flex-col border-l gui-neutral-border-subtle;
}

/* Tab trigger */
.tab-trigger {
  @apply inline-flex items-center gap-xs px-md py-sm text-xs font-bold gui-neutral-fg-muted cursor-pointer bg-transparent shrink-0 whitespace-nowrap;
  border: none;
  transition: color var(--duration-fast) var(--ease-default), border-color var(--duration-fast) var(--ease-default);
}

.tab-trigger:hover {
  @apply gui-neutral-fg;
}

.tab-trigger--active {
  @apply gui-primary-fg;
}

/* Sliding indicator */
.tab-indicator {
  @apply absolute;
  background: var(--gui-primary-solid);
  transition: transform var(--duration-fast) var(--ease-default), width var(--duration-fast) var(--ease-default), height var(--duration-fast) var(--ease-default);
}

.tab-bar--top .tab-indicator {
  @apply bottom-0 left-0;
  height: 2px;
}

.tab-bar--bottom .tab-indicator {
  @apply top-0 left-0;
  height: 2px;
}

.tab-bar--left .tab-indicator {
  @apply top-0 right-0;
  width: 2px;
}

.tab-bar--right .tab-indicator {
  @apply top-0 left-0;
  width: 2px;
}

.tab-trigger-icon {
  @apply shrink-0;
}

/* Panels */
.tab-panels {
  @apply gui-neutral-bg-subtle flex-1;
}
}
</style>
