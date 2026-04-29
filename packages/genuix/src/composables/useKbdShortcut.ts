/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Ref,
} from 'vue';
import {
  onMounted,
  onUnmounted,
  watch,
} from 'vue';
import {
  GKbdKeyName,
} from '@/components/Display/Kbd/types';

const MODIFIERS: Map<string, keyof KeyboardEvent> = new Map([
  [
    GKbdKeyName.Control,
    'ctrlKey',
  ],
  [
    GKbdKeyName.Alt,
    'altKey',
  ],
  [
    GKbdKeyName.Shift,
    'shiftKey',
  ],
  [
    GKbdKeyName.Meta,
    'metaKey',
  ],
]);

function matchesKeys (e: KeyboardEvent, keys: GKbdKeyName[]): boolean {
  const modifiers = keys.filter((k) => MODIFIERS.has(k));
  const nonModifiers = keys.filter((k) => !MODIFIERS.has(k));

  // Must have exactly 1 non-modifier key
  if (nonModifiers.length !== 1) return false;

  // Check non-modifier key
  if (e.key.toLowerCase() !== nonModifiers[0].toLowerCase()) return false;

  // Check each modifier is pressed
  for (const mod of modifiers) {
    if (!e[MODIFIERS.get(mod)!]) return false;
  }

  // Check no extra modifiers are pressed
  if (e.ctrlKey && !modifiers.includes(GKbdKeyName.Control)) return false;
  if (e.altKey && !modifiers.includes(GKbdKeyName.Alt)) return false;
  if (e.shiftKey && !modifiers.includes(GKbdKeyName.Shift)) return false;
  if (e.metaKey && !modifiers.includes(GKbdKeyName.Meta)) return false;

  return true;
}

interface ShortcutEntry {
  keys: GKbdKeyName[];
  handler: (e: KeyboardEvent) => void;
}

/*
 * For registering global keyboard shortcut.
 */
export function useKbdShortcut (
  keys: GKbdKeyName[],
  handler: (e: KeyboardEvent) => void,
) {
  function onKeydown (e: KeyboardEvent) {
    if (matchesKeys(e, keys)) {
      e.preventDefault();
      handler(e);
    }
  }

  onMounted(() => window.addEventListener('keydown', onKeydown));
  onUnmounted(() => window.removeEventListener('keydown', onKeydown));
}

/*
 * Local keyboard shortcut registry bound to an element
 */
export function useLocalKbdShortcuts (element: Ref<HTMLElement | null | undefined>) {
  const entries: ShortcutEntry[] = [];

  function register (keys: GKbdKeyName[], handler: (e: KeyboardEvent) => void) {
    entries.push({
      keys,
      handler,
    });
  }

  function onKeydown (e: KeyboardEvent) {
    for (const entry of entries) {
      if (matchesKeys(e, entry.keys)) {
        e.preventDefault();
        e.stopPropagation();
        entry.handler(e);
        return;
      }
    }
  }

  // Watch for element availability
  watch(element, (newEl, oldEl) => {
    oldEl?.removeEventListener('keydown', onKeydown);
    newEl?.addEventListener('keydown', onKeydown);
  }, {
    immediate: true,
  });

  onUnmounted(() => {
    element.value?.removeEventListener('keydown', onKeydown);
  });

  return {
    register,
  };
}
