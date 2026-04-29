<template>
  <span
    v-bind="$attrs"
    :id="id"
    class="inline-math"
    role="math"
    :aria-label="tex"
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

defineOptions({
  inheritAttrs: false,
});

const {
  id = undefined,
  tex,
} = defineProps<{
  id?: string;
  /** LaTeX expression to render inline */
  tex: string;
}>();

const rendered = computed(() => {
  try {
    const html = katex.renderToString(tex, {
      displayMode: false,
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
.inline-math {
  @apply inline;
}
}
</style>
