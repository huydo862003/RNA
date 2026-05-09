/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  ref,
  watch,
} from 'vue';
import type {
  Ref,
} from 'vue';

export function useLocalStorage<T> (key: string, defaultValue: T): Ref<T> {
  const stored = localStorage.getItem(key);
  const value = ref<T>(stored !== null ? JSON.parse(stored) as T : defaultValue) as Ref<T>;

  watch(value, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  }, {
    deep: true,
  });

  return value;
}
