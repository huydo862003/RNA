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
    if (stack.value.some((modal) => modal.name === name)) return;
    stack.value = [
      ...stack.value,
      {
        name,
        ...data,
      },
    ];
  }

  function pop (name: string | symbol) {
    stack.value = stack.value.filter((modal) => modal.name !== name);
  }

  function isOpen (name: string | symbol) {
    return computed(() => stack.value.some((modal) => modal.name === name));
  }

  function get (name: string | symbol) {
    return computed(() => stack.value.find((modal) => modal.name === name));
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
