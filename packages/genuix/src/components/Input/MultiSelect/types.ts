/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  DeepReadonly,
  InjectionKey,
  Ref,
} from 'vue';
import type {
  PillColor,
} from '@/components/Display/Pill/types';
import type {
  Size,
} from '@/types';

export {
  Size as MultiSelectSize,
} from '@/types';

export enum MultiSelectState {
  Default = 'default',
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
}

export interface MultiSelectOptionRegistration {
  label: string;
  color?: PillColor;
  visible: boolean;
}

export interface MultiSelectContext {
  size: Size;
  selectedValues: DeepReadonly<Ref<string[]>>;
  searchValue: DeepReadonly<Ref<string>>;
  focusedValue: DeepReadonly<Ref<string | undefined>>;

  toggle (value: string): void;
  register (value: string, options: MultiSelectOptionRegistration): void;
  update (value: string, options: MultiSelectOptionRegistration): void;
  unregister (value: string): void;
}

export const MULTI_SELECT_KEY: InjectionKey<MultiSelectContext> = Symbol('GMultiSelect');
