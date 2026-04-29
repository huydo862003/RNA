<template>
  <div
    v-bind="$attrs"
    :id="id"
    :class="'math-block'"
    role="math"
    :aria-label="tex"
    :style="{
      '--_border': tokens.border,
      '--_bg': tokens.subtleBg,
    }"
    v-html="rendered"
  />
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  computed,
} from 'vue';
import DOMPurify from 'dompurify';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import {
  prominenceTokens,
} from '@/utils/prominence';
import {
  Prominence,
  Semantic,
} from '@/types';

defineOptions({
  inheritAttrs: false,
});

const {
  id = undefined,
  tex,
  prominence = Prominence.Tertiary,
  semantic = Semantic.Neutral,
} = defineProps<{
  id?: string;
  /** LaTeX expression to render as block */
  tex: string;
  /** Visual prominence */
  prominence?: Prominence;
  /** Color role */
  semantic?: Semantic;
}>();

const tokens = computed(() => prominenceTokens(prominence, semantic));

const rendered = computed(() => {
  try {
    const html = katex.renderToString(tex, {
      displayMode: true,
      throwOnError: false,
      trust: false,
    });
    return DOMPurify.sanitize(html);
  } catch {
    return DOMPurify.sanitize(tex);
  }
});
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.math-block {
  @apply py-md px-lg rounded-md overflow-x-auto;
  border: 1px solid var(--_border);
  background-color: var(--_bg);
}
}
</style>
