/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  ComputedRef,
  InjectionKey,
} from 'vue';

export interface GTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  class?: string;
  onSort?: (key: string) => void;
}

export enum GSortDirection {
  Asc = 'asc',
  Desc = 'desc',
  None = 'none',
}

export interface TableContext {
  sortKey: ComputedRef<string>;
  sortAsc: ComputedRef<boolean>;
  page: ComputedRef<number>;
  pages: ComputedRef<number>;
  filter: ComputedRef<string>;
  maxPages: ComputedRef<number>;
  handleSort (key: string): void;
  setPage (n: number): void;
  setFilter (value: string): void;
  registerRow (rowData: Record<string, unknown>): number;
  unregisterRow (rowData: Record<string, unknown>): void;
  isVisible (rowKey: number): boolean;
}

export const TABLE_KEY: InjectionKey<TableContext> = Symbol('GTable');
