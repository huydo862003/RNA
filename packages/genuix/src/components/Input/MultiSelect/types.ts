/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  DeepReadonly,
  InjectionKey,
  Ref,
} from 'vue';
import type {
  GPillColor,
} from '@/components/Display/Pill/types';
import type {
  GSize,
} from '@/types';

export {
  GSize as GMultiSelectSize,
} from '@/types';

export enum GMultiSelectState {
  Default = 'default',
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
}

export enum GMultiSelectVariant {
  Pill = 'pill',
  Box = 'box',
}

export interface MultiSelectOptionRegistration {
  label: string;
  color?: GPillColor;
  visible: boolean;
}

export interface MultiSelectContext {
  size: GSize;
  variant: GMultiSelectVariant;
  selectedValues: DeepReadonly<Ref<string[]>>;
  searchValue: DeepReadonly<Ref<string>>;
  focusedValue: DeepReadonly<Ref<string | undefined>>;

  toggle (value: string): void;
  register (value: string, options: MultiSelectOptionRegistration): void;
  update (value: string, options: MultiSelectOptionRegistration): void;
  unregister (value: string): void;
}

export const MULTI_SELECT_KEY: InjectionKey<MultiSelectContext> = Symbol('GMultiSelect');
