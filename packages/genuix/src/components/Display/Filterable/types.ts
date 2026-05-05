/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  ComputedRef,
  InjectionKey,
} from 'vue';

export interface FilterableContext {
  search: ComputedRef<string>;
  page: ComputedRef<number>;
  pages: ComputedRef<number>;
  maxPages: ComputedRef<number>;
  setSearch (val: string): void;
  setPage (n: number): void;
  registerItem (label: string, value: string): void;
  unregisterItem (value: string): void;
  isVisible (value: string): boolean;
}

export const FILTERABLE_KEY: InjectionKey<FilterableContext> = Symbol('GFilterable');
