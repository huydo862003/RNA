<template>
  <tbody>
    <slot :rows="context?.paginatedData.value ?? []" />
  </tbody>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  inject,
} from 'vue';
import {
  TABLE_KEY,
} from './types';

const context = inject(TABLE_KEY, null);
</script>
