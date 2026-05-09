/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  ComponentInstance,
  TemplateRef,
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

/*
 * For registering global keyboard shortcut
 */
export function useKbdShortcut (
  keys: GKbdKeyName[],
  handler: (event: KeyboardEvent) => void,
) {
  function onKeydown (event: KeyboardEvent) {
    if (matchesKeys(event, keys)) {
      event.preventDefault();
      handler(event);
    }
  }

  onMounted(() => window.addEventListener('keydown', onKeydown));
  onUnmounted(() => window.removeEventListener('keydown', onKeydown));
}

/*
 * Local keyboard shortcut registry bound to an element
 */
export function useLocalKbdShortcuts (element: TemplateRef<HTMLElement | ComponentInstance<any> | null | undefined>) {
  const entries: ShortcutEntry[] = [];

  function register (keys: GKbdKeyName[], handler: (event: KeyboardEvent) => void) {
    entries.push({
      keys,
      handler,
    });
  }

  function onKeydown (event: KeyboardEvent) {
    for (const entry of entries) {
      if (matchesKeys(event, entry.keys)) {
        event.preventDefault();
        event.stopPropagation();
        entry.handler(event);

        return;
      }
    }
  }

  // Watch for element availability
  watch(element, (newElement, oldElement) => {
    oldElement?.removeEventListener('keydown', onKeydown);
    newElement?.addEventListener('keydown', onKeydown);
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

interface ShortcutEntry {
  keys: GKbdKeyName[];
  handler: (event: KeyboardEvent) => void;
}

function matchesKeys (event: KeyboardEvent, keys: GKbdKeyName[]): boolean {
  const modifiers = keys.filter((key) => MODIFIERS.has(key));
  const nonModifiers = keys.filter((key) => !MODIFIERS.has(key));

  // Must have exactly 1 non-modifier key
  if (nonModifiers.length !== 1) return false;

  // Check non-modifier key
  if (event.key.toLowerCase() !== nonModifiers[0].toLowerCase()) return false;

  // Check each modifier is pressed
  for (const module_ of modifiers) {
    if (!event[MODIFIERS.get(module_)!]) return false;
  }

  // Check no extra modifiers are pressed
  if (event.ctrlKey && !modifiers.includes(GKbdKeyName.Control)) return false;
  if (event.altKey && !modifiers.includes(GKbdKeyName.Alt)) return false;
  if (event.shiftKey && !modifiers.includes(GKbdKeyName.Shift)) return false;
  if (event.metaKey && !modifiers.includes(GKbdKeyName.Meta)) return false;

  return true;
}
