/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  onMounted,
  onUnmounted,
} from 'vue';

export interface KbdShortcut {
  key: string;
  ctrl?: boolean;
  meta?: boolean; // Windows or Command
  alt?: boolean;
  shift?: boolean;
}

function matches (e: KeyboardEvent, shortcut: KbdShortcut): boolean {
  if (e.key.toLowerCase() !== shortcut.key.toLowerCase()) return false;
  if (!!shortcut.ctrl !== e.ctrlKey) return false;
  if (!!shortcut.meta !== e.metaKey) return false;
  if (!!shortcut.alt !== e.altKey) return false;
  if (!!shortcut.shift !== e.shiftKey) return false;
  return true;
}

/**
 * Register a global keyboard shortcut.
 * Automatically cleans up on unmount.
 */
export function useKbdShortcut (
  shortcut: KbdShortcut,
  handler: (e: KeyboardEvent) => void,
) {
  function onKeydown (e: KeyboardEvent) {
    if (matches(e, shortcut)) {
      e.preventDefault();
      handler(e);
    }
  }

  onMounted(() => window.addEventListener('keydown', onKeydown));
  onUnmounted(() => window.removeEventListener('keydown', onKeydown));
}
