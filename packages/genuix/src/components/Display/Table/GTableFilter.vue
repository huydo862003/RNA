<template>
  <div class="table-filter">
    <GIcon
      :name="GIconName.Search"
      class="table-filter-icon"
    />
    <GTextInput
      v-bind="$attrs"
      v-model="filter"
      :placeholder="placeholder"
      :size="GTextInputSize.Sm"
      class="table-filter-input"
    />
  </div>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  computed,
  inject,
} from 'vue';
import {
  TABLE_KEY,
} from './types';
import GIcon from '@/components/Display/Icon/GIcon.vue';
import {
  GIconName,
} from '@/components/Display/Icon/types';
import GTextInput from '@/components/Input/TextInput/GTextInput.vue';
import {
  GTextInputSize,
} from '@/components/Input';

defineOptions({
  inheritAttrs: false,
});

const context = inject(TABLE_KEY)!;

const {
  placeholder = 'Filter...',
} = defineProps<{
  placeholder?: string;
}>();

const filter = computed({
  get: () => context.filter.value,
  set: (value) => context.setFilter(value),
});
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.table-filter {
  @apply flex items-center gap-xs px-sm py-xs rounded-md border gui-neutral-border-subtle gui-neutral-bg-hover w-full;
  margin-bottom: var(--spacing-sm);
}

.table-filter-icon {
  @apply gui-neutral-fg-muted shrink-0;
}

.table-filter-input {
  @apply bg-transparent border-none outline-none text-xs gui-neutral-fg w-full;
}
}
</style>
