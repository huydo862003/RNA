/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  DeepReadonly,
  InjectionKey,
  Ref,
} from 'vue';
import type {
  GIconName,
} from '@/components/Display/Icon/types';

export {
  Size as TabSize,
} from '@/types';

export enum TabPlacement {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
}

export interface TabPanelRegistration {
  label: string;
  icon?: GIconName;
}

export interface TabContext {
  activeTab: DeepReadonly<Ref<string | undefined>>;
  register (name: string, registration: TabPanelRegistration): void;
  unregister (name: string): void;
  select (name: string): void;
}

export const TAB_KEY: InjectionKey<TabContext> = Symbol('GTab');
