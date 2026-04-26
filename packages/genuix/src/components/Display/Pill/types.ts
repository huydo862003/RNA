/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

export {
  Size as PillSize,
  Prominence as PillProminence,
} from '@/types';

export enum PillColor {
  Gray = 'gray',
  Red = 'red',
  Pink = 'pink',
  Purple = 'purple',
  Blue = 'blue',
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

/* Radix UI Colors v3.0.0
 * bg = step 3 (tinted surface)
 * fg = step 12 (high-contrast text)
 * solid = step 9 (solid accent)
 */
export const PILL_COLORS: Record<PillColor, PillColorTokens> = {
  [PillColor.Gray]: {
    bg: '#f0f0f3',
    fg: '#1c2024',
    solid: '#8b8d98',
  },
  [PillColor.Red]: {
    bg: '#feebec',
    fg: '#641723',
    solid: '#e5484d',
  },
  [PillColor.Pink]: {
    bg: '#feeef8',
    fg: '#651249',
    solid: '#d6409f',
  },
  [PillColor.Purple]: {
    bg: '#f3e7fc',
    fg: '#402060',
    solid: '#8e4ec6',
  },
  [PillColor.Blue]: {
    bg: '#e6f4fe',
    fg: '#113264',
    solid: '#0090ff',
  },
  [PillColor.Teal]: {
    bg: '#e0f8f3',
    fg: '#0d3d38',
    solid: '#12a594',
  },
  [PillColor.Green]: {
    bg: '#e9f6e9',
    fg: '#203c25',
    solid: '#46a758',
  },
  [PillColor.Yellow]: {
    bg: '#fff7c2',
    fg: '#4f3422',
    solid: '#ffc53d',
  },
  [PillColor.Orange]: {
    bg: '#ffefd6',
    fg: '#582d1d',
    solid: '#f76b15',
  },
  [PillColor.Brown]: {
    bg: '#f2ede8',
    fg: '#43302b',
    solid: '#a18072',
  },
};
