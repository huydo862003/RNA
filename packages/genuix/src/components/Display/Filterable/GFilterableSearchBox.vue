<template>
  <GTextInput
    v-bind="$attrs"
    v-model="search"
    :placeholder="placeholder"
    :size="GTextInputSize.Sm"
    class="border gui-neutral-border-subtle"
  />
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
  FILTERABLE_KEY,
} from './types';
import {
  GTextInputSize,
} from '@/components/Input';
import GTextInput from '@/components/Input/TextInput/GTextInput.vue';

defineOptions({
  inheritAttrs: false,
});

const ctx = inject(FILTERABLE_KEY)!;

const {
  placeholder = 'Filter...',
} = defineProps<{
  placeholder?: string;
}>();

const search = computed({
  get: () => ctx.search.value,
  set: (val) => ctx.setSearch(val),
});
</script>
