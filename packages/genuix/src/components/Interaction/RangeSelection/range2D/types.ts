/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  InjectionKey,
  Ref,
} from 'vue';

export interface Range2D {
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
}

export type Position2D =
  | 'top-left' | 'top-edge' | 'top-right'
  | 'left-edge' | 'inner' | 'right-edge'
  | 'bottom-left' | 'bottom-edge' | 'bottom-right'
  | 'only';

export interface RangeSelectionContext2D {
  selection: Ref<Range2D | undefined>;
  dragging: Ref<boolean>;
  isSelected (row: number, col: number): boolean;
  getPosition (row: number, col: number): Position2D | undefined;
  isPosition (row: number, col: number, query: Position2D): boolean;
  setAnchor (row: number, col: number): void;
  extendSelection (row: number, col: number): void;
  endSelection (): void;
  moveUp (extend: boolean): void;
  moveDown (extend: boolean): void;
  moveLeft (extend: boolean): void;
  moveRight (extend: boolean): void;
  selectAll (): void;
  clearSelection (): void;
}

export const RANGE_SELECTION_2D_KEY: InjectionKey<RangeSelectionContext2D> = Symbol('GRangeSelection2D');
