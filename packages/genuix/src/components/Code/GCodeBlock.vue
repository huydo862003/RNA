<template>
  <div
    :class="['code-block', { 'code-block--scroll': !wordWrap }]"
    :style="{
      '--_border': tokens.border,
      '--_header-bg': tokens.bg,
      '--_header-fg': tokens.fg,
      '--_lang-color': tokens.mutedFg,
      '--_body-bg': tokens.subtleBg,
    }"
  >
    <div
      class="code-header"
      :style="prominence === Prominence.Primary ? invertedTokens : undefined"
    >
      <span
        v-if="title || icon"
        class="code-title"
      ><GIcon
        v-if="icon"
        :name="icon"
        class="code-title-icon"
      />{{ title }}</span>
      <div class="code-header-actions">
        <span class="code-language">{{ languageLabel }}</span>
        <GTooltip
          :shown="copied"
          :triggers="[]"
          placement="bottom-end"
        >
          <GButton
            :prominence="ButtonProminence.Tertiary"
            :semantic="semantic"
            :size="ButtonSize.Xs"
            @click="clickCopyButton"
          >
            <GIcon :name="GIconName.Copy" />
          </GButton>
          <template #popper>
            <span class="code-copy-tooltip">Copied to clipboard!</span>
          </template>
        </GTooltip>
      </div>
    </div>

    <GDismiss
      @dismiss="clearLineSelection"
    >
      <GRangeSelection1D
        v-model:selection="lineSelection"
        :count="highlightedLines.length"
      >
        <div
          class="code-content"
        >
          <!-- Do not format this as pre is format-sensitive -->
          <pre><code class="code-pre"><template
            v-for="(line, i) in highlightedLines"
            :key="i"
          >
<GRangeItem1D
              v-slot="{ selected, isPosition }"
              :index="i"
            ><span
              :id="`${id}-L${i + 1}`"
              class="code-line"
              :class="{
                'selected-code-line--start': isPosition('start'),
                'selected-code-line--end': isPosition('end'),
                'selected-code-line--middle': selected && !isPosition('start') && !isPosition('end'),
                'selected-code-line': selected,
              }"
            ><span class="code-line-gutter" /><span
              v-if="showLineNumbers"
              class="code-line-number"
            >{{ i + 1 }}</span><span
              class="code-line-content"
              v-html="line"
            /></span></GRangeItem1D></template></code></pre>
        </div>
      </GRangeSelection1D>
    </GDismiss>
  </div>
</template>

<script setup lang="ts">
/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import DOMPurify from 'dompurify';
import 'highlight.js/styles/github.css';
import {
  computed,
  ref,
} from 'vue';
import {
  hljs,
} from './hljs';
import {
  GCodeLanguageLabel,
} from './types';
import type {
  GCodeLanguage,
  CodeBlockSemantic,
} from './types';
import GRangeSelection1D from '@/components/Interaction/RangeSelection/range1D/GRangeSelection1D.vue';
import GRangeItem1D from '@/components/Interaction/RangeSelection/range1D/GRangeItem1D.vue';
import type {
  Range1D,
} from '@/components/Interaction/RangeSelection/range1D/types';
import GIcon from '@/components/Icon/GIcon.vue';
import {
  GIconName,
} from '@/components/Icon/types';
import GButton from '@/components/Button/GButton.vue';
import {
  ButtonProminence,
  ButtonSize,
} from '@/components/Button/types';
import GDismiss from '@/components/Interaction/Dismiss/GDismiss.vue';
import GTooltip from '@/components/Tooltip/GTooltip.vue';
import {
  Semantic,
  Prominence,
} from '@/types';
import {
  prominenceTokens,
  invertTokens,
} from '@/utils/prominence';

const {
  id,
  title = '',
  icon = undefined,
  code: rawCode,
  language,
  showLineNumbers = false,
  wordWrap = true,
  prominence = Prominence.Tertiary,
  semantic = Semantic.Neutral,
} = defineProps<{
  id: string;
  title?: string;
  icon?: GIconName;
  code: string;
  language: GCodeLanguage;
  showLineNumbers?: boolean;
  wordWrap?: boolean;
  /** Prominence level: tertiary (default), secondary (tinted bg), primary (filled header) */
  prominence?: Prominence;
  /** Color role for block border, header, and language label */
  semantic?: CodeBlockSemantic;
}>();

/* Theme */
const tokens = computed(() => prominenceTokens(prominence, semantic));
const invertedTokens = computed(() => invertTokens(semantic));

/* Human-friendly language label */
const languageLabel = computed(() => GCodeLanguageLabel[language]);

/* The current selected ranges of code lines */
const lineSelection = ref<Range1D | undefined>(undefined);

// Clear the line selection on dismiss
function clearLineSelection () {
  lineSelection.value = undefined;
}

/* Format the code block and highlight */
const code = computed(() => {
  let res = rawCode;
  if (rawCode.startsWith('\n')) {
    res = rawCode.slice(1);
  } else if (rawCode.startsWith('\r\n')) {
    res = rawCode.slice(2);
  }

  if (rawCode.endsWith('\n')) {
    res = rawCode.slice(-1);
  } else if (rawCode.endsWith('\r\n')) {
    res = rawCode.slice(-2);
  }
  return res;
});

const highlightedLines = computed(() => {
  const highlighted = hljs.highlight(code.value, {
    language: language,
  }).value;
  const sanitized = DOMPurify.sanitize(highlighted);
  return sanitized.split(/(?:\n|\r\n)/);
});

/* Code block content copy */
const copied = ref(false);

async function clickCopyButton () {
  await navigator.clipboard.writeText(code.value);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 1500);
}
</script>

<style scoped>
@reference '../../style.css';

.code-block {
  @apply font-mono rounded-md;
  border: 1px solid var(--_border);
  background-color: var(--_body-bg);
}

.code-block--scroll {
  overflow-x: auto;
}

.code-header {
  @apply px-3 py-xs;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--_border);
  background-color: var(--_header-bg);
}

.code-title {
  @apply text-xs font-medium;
  color: var(--_header-fg);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}

.code-title-icon {
  flex-shrink: 0;
}

.code-header-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-left: auto; /* Push right when no title */
  flex-shrink: 0;
}

.code-language {
  @apply gui-neutral-fg-muted;
  font-size: 11px;
  color: var(--_lang-color);
}

.code-copy-tooltip {
  @apply text-xs;
}

.code-pre {
  @apply m-0 leading-0;
  display: grid;
  white-space: pre-wrap;       /* Allow wrapping while preserving whitespace */
  overflow-wrap: break-word;   /* Break long tokens that exceed container */
}

.code-block--scroll .code-pre {
  white-space: pre;            /* No wrapping, horizontal scroll instead */
  overflow-wrap: normal;
}

.code-line {
  @apply leading-1 flex items-start py-xs pr-2;
}

.code-line:hover {
  @apply gui-neutral-bg-hover;
}

.code-line-gutter {
  @apply pl-3;
  user-select: none; /* Do not make code selection also select code gutter */
}

.code-line-number {
  @apply text-xs gui-neutral-fg-muted mr-6 shrink-0;
  line-height: var(--leading-3); /* Match content line-height so number aligns with first wrapped line */
  user-select: none; /* Do not make code selection also select code line number */
}

.code-pre :deep(> div) {
  outline: none;
}

.code-line-content {
  @apply text-sm;
  line-height: var(--leading-3); /* More breathing room for wrapped lines */
}

/* Create a shadow to simulate an outline running on some border */
.selected-code-line--start {
  box-shadow:
    0 2px var(--color-accent-blue-10) inset,
    -2px 0 var(--color-accent-blue-10) inset,
    2px 0 var(--color-accent-blue-10) inset;
}

.selected-code-line--end {
  box-shadow:
    0 -2px var(--color-accent-blue-10) inset,
    -2px 0 var(--color-accent-blue-10) inset,
    2px 0 var(--color-accent-blue-10) inset;
}

.selected-code-line--start.selected-code-line--end {
  box-shadow:
    0 2px var(--color-accent-blue-10) inset,
    0 -2px var(--color-accent-blue-10) inset,
    -2px 0 var(--color-accent-blue-10) inset,
    2px 0 var(--color-accent-blue-10) inset;
}

.selected-code-line--middle {
  box-shadow:
    -2px 0 var(--color-accent-blue-10) inset,
    2px 0 var(--color-accent-blue-10) inset;
}

.selected-code-line {
  @apply gui-notice-bg-subtle;
}

.selected-code-line:hover {
  @apply gui-notice-bg-hover;
}
</style>
