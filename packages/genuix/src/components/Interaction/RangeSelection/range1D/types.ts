/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  InjectionKey,
  Ref,
} from 'vue';

export interface Range1D {
  start: number;
  end: number;
}

export type Position1D = 'start' | 'end' | 'middle' | 'only';

export interface RangeSelectionContext1D {
  selection: Ref<Range1D | undefined>;
  dragging: Ref<boolean>;
  isSelected (index: number): boolean;
  getPosition (index: number): Position1D | undefined;
  isPosition (index: number, query: Position1D): boolean;
  setAnchor (index: number): void;
  extendSelection (index: number): void;
  endSelection (): void;
  movePrev (extend: boolean): void;
  moveNext (extend: boolean): void;
  selectAll (): void;
  clearSelection (): void;
}

export const RANGE_SELECTION_1D_KEY: InjectionKey<RangeSelectionContext1D> = Symbol('GRangeSelection1D');
