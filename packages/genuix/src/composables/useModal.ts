/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  computed,
  ref,
} from 'vue';

export interface ModalEntry {
  name: string | symbol;
  [key: string]: unknown;
}

const stack = ref<ModalEntry[]>([]);

export function useModal () {
  function push (name: string | symbol, data: Record<string, unknown> = {}) {
    // Don't push if already in stack
    if (stack.value.some((m) => m.name === name)) return;
    stack.value = [
      ...stack.value,
      {
        name,
        ...data,
      },
    ];
  }

  function pop (name: string | symbol) {
    stack.value = stack.value.filter((m) => m.name !== name);
  }

  function isOpen (name: string | symbol) {
    return computed(() => stack.value.some((m) => m.name === name));
  }

  function get (name: string | symbol) {
    return computed(() => stack.value.find((m) => m.name === name));
  }

  // The topmost modal
  const top = computed(() => stack.value[stack.value.length - 1]);

  return {
    stack,
    push,
    pop,
    isOpen,
    get,
    top,
  };
}
