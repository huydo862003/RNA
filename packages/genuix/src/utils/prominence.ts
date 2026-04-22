/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Semantic,
} from '@/types';
import {
  Prominence,
} from '@/types';

export interface ProminenceTokens {
  bg: string;
  subtleBg: string;
  fg: string;
  mutedFg: string;
  border: string;
}

/* Compute consistent design-token CSS var references for a given
 * prominence level and semantic role.
 *
 * Primary   -> solid bg, contrast fg
 * Secondary -> semantic bg, semantic fg
 * Tertiary  -> transparent bg, semantic fg, subtle border
 * Ghost     -> transparent bg, semantic fg, no border
 */
export function prominenceTokens (prominence: Prominence, semantic: Semantic): ProminenceTokens {
  const s = semantic;

  switch (prominence) {
  case Prominence.Primary:
    return {
      bg: `var(--gui-${s}-solid)`,
      subtleBg: `var(--gui-${s}-bg-subtle)`,
      fg: `var(--gui-${s}-bg)`,
      mutedFg: `var(--gui-${s}-bg-subtle)`,
      border: `var(--gui-${s}-border)`,
    };
  case Prominence.Secondary:
    return {
      bg: `var(--gui-${s}-bg)`,
      subtleBg: `var(--gui-${s}-bg-subtle)`,
      fg: `var(--gui-${s}-fg)`,
      mutedFg: `var(--gui-${s}-fg-muted)`,
      border: `var(--gui-${s}-border-subtle)`,
    };
  case Prominence.Tertiary:
    return {
      bg: 'transparent',
      subtleBg: `var(--gui-${s}-bg-subtle)`,
      fg: `var(--gui-${s}-fg)`,
      mutedFg: `var(--gui-${s}-fg-muted)`,
      border: `var(--gui-${s}-border-subtle)`,
    };
  case Prominence.Ghost:
    return {
      bg: 'transparent',
      subtleBg: `var(--gui-${s}-bg-subtle)`,
      fg: `var(--gui-${s}-fg)`,
      mutedFg: `var(--gui-${s}-fg-muted)`,
      border: 'transparent',
    };
  }
}

/**
 * Remap `--gui-{semantic}-*` CSS custom properties on a container so
 * child components (buttons, icons, text) stay readable on a solid
 * (Primary prominence) surface. Apply the returned object as `:style`
 * on the container element.
 */
export function invertTokens (semantic: Semantic): Record<string, string> {
  const s = semantic;
  return {
    [`--gui-${s}-fg`]: `var(--gui-${s}-bg)`,
    [`--gui-${s}-fg-muted`]: `var(--gui-${s}-bg-subtle)`,
    [`--gui-${s}-border`]: 'var(--gui-neutral-border)',
    [`--gui-${s}-border-subtle`]: 'var(--gui-neutral-border-subtle)',
    [`--gui-${s}-bg-hover`]: `var(--gui-${s}-solid-hover)`,
    [`--gui-${s}-bg-active`]: `var(--gui-${s}-solid-hover)`,
  };
}
