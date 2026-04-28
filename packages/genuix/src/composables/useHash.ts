/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue';

// Return a reactive value synced with the window hash
export function useHash (defaultValue = '') {
  const hash = ref(defaultValue);

  function readHash () {
    return window.location.hash.slice(1) || defaultValue;
  }

  function onHashChange () {
    hash.value = readHash();
  }

  watch(hash, (value) => {
    const current = window.location.hash.slice(1);
    if (value !== current) {
      history.replaceState(null, '', value ? `#${value}` : window.location.pathname);
    }
  });

  onMounted(() => {
    hash.value = readHash();
    window.addEventListener('hashchange', onHashChange);
  });

  onUnmounted(() => {
    window.removeEventListener('hashchange', onHashChange);
  });

  return hash;
}
