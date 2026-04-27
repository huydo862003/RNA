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
  Size as SelectSize,
} from '@/types';

export enum SelectState {
  Default = 'default',
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
}

export interface SelectOptionRegistration {
  label: string;
  color?: PillColor;
  visible: boolean;
}

export interface SelectContext {
  size: Size;
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
