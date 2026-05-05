/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

export {
  GSize as GPillSize,
  GProminence as GPillProminence,
} from '@/types';

export enum GPillColor {
  White = 'white',
  Black = 'black',
  Gray = 'gray',
  Red = 'red',
  Pink = 'pink',
  Purple = 'purple',
  Violet = 'violet',
  Blue = 'blue',
  Cyan = 'cyan',
  Teal = 'teal',
  Green = 'green',
  Yellow = 'yellow',
  Orange = 'orange',
  Brown = 'brown',
}

export interface PillColorTokens {
  bg: string;
  fg: string;
  solid: string;
}

/*
 * bg = step 3 (tinted surface)
 * fg = step 12 (high-contrast text)
 * solid = step 9 (solid accent)
 * White/Black use neutral primitive endpoints.
 */
export const PILL_COLORS: Record<GPillColor, PillColorTokens> = {
  [GPillColor.White]: {
    bg: 'var(--color-neutral-1)',
    fg: 'var(--color-neutral-12)',
    solid: 'var(--color-neutral-1)',
  },
  [GPillColor.Black]: {
    bg: 'var(--color-neutral-12)',
    fg: 'var(--color-neutral-1)',
    solid: 'var(--color-neutral-12)',
  },
  [GPillColor.Gray]: {
    bg: 'var(--color-neutral-3)',
    fg: 'var(--color-neutral-12)',
    solid: 'var(--color-neutral-9)',
  },
  [GPillColor.Red]: {
    bg: 'var(--color-accent-red-3)',
    fg: 'var(--color-accent-red-12)',
    solid: 'var(--color-accent-red-9)',
  },
  [GPillColor.Pink]: {
    bg: 'var(--color-accent-pink-3)',
    fg: 'var(--color-accent-pink-12)',
    solid: 'var(--color-accent-pink-9)',
  },
  [GPillColor.Purple]: {
    bg: 'var(--color-accent-purple-3)',
    fg: 'var(--color-accent-purple-12)',
    solid: 'var(--color-accent-purple-9)',
  },
  [GPillColor.Violet]: {
    bg: 'var(--color-accent-violet-3)',
    fg: 'var(--color-accent-violet-12)',
    solid: 'var(--color-accent-violet-9)',
  },
  [GPillColor.Blue]: {
    bg: 'var(--color-accent-blue-3)',
    fg: 'var(--color-accent-blue-12)',
    solid: 'var(--color-accent-blue-9)',
  },
  [GPillColor.Cyan]: {
    bg: 'var(--color-accent-cyan-3)',
    fg: 'var(--color-accent-cyan-12)',
    solid: 'var(--color-accent-cyan-9)',
  },
  [GPillColor.Teal]: {
    bg: 'var(--color-accent-teal-3)',
    fg: 'var(--color-accent-teal-12)',
    solid: 'var(--color-accent-teal-9)',
  },
  [GPillColor.Green]: {
    bg: 'var(--color-accent-green-3)',
    fg: 'var(--color-accent-green-12)',
    solid: 'var(--color-accent-green-9)',
  },
  [GPillColor.Yellow]: {
    bg: 'var(--color-accent-yellow-3)',
    fg: 'var(--color-accent-yellow-12)',
    solid: 'var(--color-accent-yellow-9)',
  },
  [GPillColor.Orange]: {
    bg: 'var(--color-accent-orange-3)',
    fg: 'var(--color-accent-orange-12)',
    solid: 'var(--color-accent-orange-9)',
  },
  [GPillColor.Brown]: {
    bg: 'var(--color-accent-brown-3)',
    fg: 'var(--color-accent-brown-12)',
    solid: 'var(--color-accent-brown-9)',
  },
};
