/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

/*
 * Detect the occasions where the component is no longer of the user's focus
 *
 * Currently triggered on:
 *  - Click outside (pointerdown outside composedPath)
 *  - Focusout on the element
 *  - Escape key pressed while element has focus
 *
 * Example usages:
 *   v-dismiss="handler" // all three triggers
 *   v-dismiss.click="handler" // click outside only
 *   v-dismiss.focus="handler" // focus leaves only
 *   v-dismiss.escape="handler" // ESC only
 *   v-dismiss.click.escape="handler" // click outside + ESC
 */

import type {
  ObjectDirective,
} from 'vue';
import {
  GKbdKeyName,
} from '@/components/Display/Kbd/types';

interface DismissState {
  listeners: {
    target: EventTarget;
    event: string;
    listener: (e: Event) => void;
  }[];
}

const states = new WeakMap<HTMLElement, DismissState>();

function isEventTriggeredOutside (el: HTMLElement, e: Event): boolean {
  return !e.composedPath().includes(el);
}

function setup (element: HTMLElement, handler: (e: Event) => void) {
  cleanup(element);

  const listeners: DismissState['listeners'] = [];

  // Dismiss handler
  function dismiss (event: Event) {
    handler(event);
    // Remove focus from the element after dismissing
    if (element.contains(document.activeElement)) {
      (document.activeElement as HTMLElement)?.blur();
    }
  }

  // Click: Detect pointerdown triggered on document but outside the element
  Click: {
    const listener = (event: Event) => {
      if (isEventTriggeredOutside(element, event)) dismiss(event);
    };
    document.addEventListener('pointerdown', listener, true); // Triggered during the "capturing phase", so the listener is triggered first before the event ever reaches the element, allowing us to peak into the path before the event ever triggers anything else. This is needed because we don't want the listener to trigger on the bubbled event
    listeners.push({
      target: document,
      event: 'pointerdown',
      listener,
    });
  }

  // Focusout: Detect focus leaving the element
  Focusout: {
    const listener = (e: Event) => {
      // focusout fires before the new element receives focus
      // Use requestAnimationFrame to check if focus landed outside
      requestAnimationFrame(() => {
        if (!element.contains(document.activeElement)) {
          dismiss(e);
        }
      });
    };
    element.addEventListener('focusout', listener);
    listeners.push({
      target: element,
      event: 'focusout',
      listener,
    });
  }

  // Escape: Detect ESC press
  Esc: {
    const listener = (e: Event) => {
      if (!(e instanceof KeyboardEvent)) return;
      if (e.key !== GKbdKeyName.Escape) return;
      if (element.contains(document.activeElement)) {
        dismiss(e);
      }
    };
    document.addEventListener('keydown', listener, true); // Similar
    listeners.push({
      target: document,
      event: 'keydown',
      listener,
    });
  }

  states.set(element, {
    listeners,
  });
}

function cleanup (element: HTMLElement) {
  const state = states.get(element);
  if (!state) return;
  for (const {
    target, event, listener,
  } of state.listeners) {
    target.removeEventListener(event, listener);
  }
  states.delete(element);
}

export const vDismiss: ObjectDirective<HTMLElement, (event: Event) => void> = {
  mounted (element, binding) {
    setup(element, binding.value);
  },

  updated (element, binding) {
    setup(element, binding.value);
  },

  unmounted (element) {
    cleanup(element);
  },
};
