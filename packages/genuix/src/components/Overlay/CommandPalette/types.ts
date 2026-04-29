/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  GKbdKeyName,
} from '@/components/Display';
import type {
  GIconName,
} from '@/components/Display/Icon/types';

export const COMMAND_PALETTE_KEY = Symbol('GCommandPalette');

export interface CommandItem {
  id: string;
  label: string;
  icon?: GIconName;
  /** Group name for organizing commands */
  group?: string;
  /** Keyboard shortcut */
  shortcut?: GKbdKeyName[];
  /** Action to run when selected or shortcut is pressed */
  action?: () => void;
}
