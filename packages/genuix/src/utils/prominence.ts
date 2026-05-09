/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  GSemantic,
} from '@/types';
import {
  GProminence,
} from '@/types';

export interface GProminenceTokens {
  bg: string;
  bgHover: string;
  subtleBg: string;
  fg: string;
  mutedFg: string;
  border: string;
}

/* Compute consistent design-token CSS var references for a given
 * prominence level and semantic role.
 *
 * Primary   -> solid bg, contrast fg
 * Secondary -> tinted bg (bg-hover), semantic fg
 * Tertiary  -> transparent bg, semantic fg, subtle border
 * Ghost     -> transparent bg, semantic fg, no border
 */
export function prominenceTokens (prominence: GProminence, semantic: GSemantic): GProminenceTokens {
  switch (prominence) {
    case GProminence.Primary:
      return {
        bg: `var(--gui-${semantic}-solid)`,
        bgHover: `var(--gui-${semantic}-solid-hover)`,
        subtleBg: `var(--gui-${semantic}-bg-subtle)`,
        fg: `var(--gui-${semantic}-bg)`,
        mutedFg: `var(--gui-${semantic}-bg-subtle)`,
        border: 'transparent',
      };
    case GProminence.Secondary:
      return {
        bg: `var(--gui-${semantic}-bg-hover)`,
        bgHover: `var(--gui-${semantic}-bg-active)`,
        subtleBg: `var(--gui-${semantic}-bg-subtle)`,
        fg: `var(--gui-${semantic}-fg)`,
        mutedFg: `var(--gui-${semantic}-fg-muted)`,
        border: 'transparent',
      };
    case GProminence.Tertiary:
      return {
        bg: 'transparent',
        bgHover: `var(--gui-${semantic}-bg-hover)`,
        subtleBg: `var(--gui-${semantic}-bg-subtle)`,
        fg: `var(--gui-${semantic}-fg)`,
        mutedFg: `var(--gui-${semantic}-fg-muted)`,
        border: `var(--gui-${semantic}-border-subtle)`,
      };
    case GProminence.Ghost:
      return {
        bg: 'transparent',
        bgHover: `var(--gui-${semantic}-bg-hover)`,
        subtleBg: `var(--gui-${semantic}-bg-subtle)`,
        fg: `var(--gui-${semantic}-fg)`,
        mutedFg: `var(--gui-${semantic}-fg-muted)`,
        border: 'transparent',
      };
  }
}
