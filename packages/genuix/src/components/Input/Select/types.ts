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
  GSize as GSelectSize,
} from '@/types';

export enum GSelectVariant {
  Pill = 'pill',
  Box = 'box',
}

export enum GSelectState {
  Default = 'default',
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
}

export interface SelectOptionRegistration {
  label: string;
  color?: GPillColor;
  visible: boolean;
}

export interface SelectContext {
  size: GSize;
  variant: GSelectVariant;
  selectedValue: DeepReadonly<Ref<string | undefined>>;
  searchValue: DeepReadonly<Ref<string>>;
  focusedValue: DeepReadonly<Ref<string | undefined>>;

  // value must be unique across all options
  select (value: string): void;
  register (value: string, options: SelectOptionRegistration): void;
  update (value: string, options: SelectOptionRegistration): void;
  unregister (value: string): void;
}

export const SELECT_KEY: InjectionKey<SelectContext> = Symbol('GSelect');
