/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

export {
  Size as TextInputSize,
} from '@/types';

export enum TextInputState {
  Default = 'default',
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
}

export const TEXT_INPUT_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  url: /^https?:\/\/.+/,
  alphanumeric: /^[a-zA-Z0-9]*$/,
  numeric: /^[0-9]*$/,
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
} as const;

export type TextInputPattern = keyof typeof TEXT_INPUT_PATTERNS;
