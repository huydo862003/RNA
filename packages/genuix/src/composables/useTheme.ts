/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  computed,
  ref,
} from 'vue';
import {
  defineStore,
} from 'pinia';

export enum GTheme {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}

const DEFAULT_STORAGE_KEY = '[genuix]-theme';

export interface ThemeStoreOptions {
  storageKey?: string;
}

export const useTheme = defineStore('genuix-theme', () => {
  const theme = ref<GTheme>(GTheme.System);
  const storageKey = ref(DEFAULT_STORAGE_KEY);
  let initialized = false;

  const effectiveTheme = computed(() =>
    theme.value === GTheme.System ? getSystemPreference() : theme.value);

  function configure (options: ThemeStoreOptions) {
    if (options.storageKey) {
      storageKey.value = options.storageKey;
    }
  }

  function setTheme (newTheme: GTheme) {
    theme.value = newTheme;
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey.value, newTheme);
    }
    applyTheme(newTheme);
  }

  function initialize () {
    if (initialized || typeof window === 'undefined') return;
    initialized = true;

    const stored = localStorage.getItem(storageKey.value);
    const validThemes: string[] = Object.values(GTheme);

    theme.value = stored && validThemes.includes(stored)
      ? stored as GTheme
      : GTheme.System;
    applyTheme(theme.value);

    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => {
        if (theme.value === GTheme.System) {
          applyTheme(GTheme.System);
        }
      });
  }

  initialize();

  return {
    theme,
    effectiveTheme,
    configure,
    setTheme,
  };
});

function applyTheme (value: GTheme) {
  if (typeof document === 'undefined') return;
  const resolved = value === GTheme.System ? getSystemPreference() : value;

  document.documentElement.classList.toggle('dark', resolved === GTheme.Dark);
}

function getSystemPreference (): GTheme.Light | GTheme.Dark {
  if (typeof window === 'undefined') return GTheme.Light;

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? GTheme.Dark : GTheme.Light;
}
