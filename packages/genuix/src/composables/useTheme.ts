/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  ref, watch, onMounted,
  readonly,
} from 'vue';

export enum GTheme {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}

export function useTheme () {
  const theme = ref<GTheme>(GTheme.System);
  onMounted(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as GTheme | null;
    if (stored) {
      theme.value = stored;
    }
    applyTheme(theme.value);

    // If theme is system,
    // Watch the changes to the color scheme preferences
    // And then apply the theme
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => {
        if (theme.value === GTheme.System) {
          applyTheme(GTheme.System);
        }
      });
  });

  watch(theme, (value) => {
    localStorage.setItem(STORAGE_KEY, value);
    applyTheme(value);
  });

  function setGTheme (newGTheme: GTheme) {
    theme.value = newGTheme;
  }

  return {
    theme: readonly(theme),
    setGTheme,
  };
}

const STORAGE_KEY = '[genuix]-theme';

function getSystemPreference (): GTheme.Light | GTheme.Dark {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? GTheme.Dark : GTheme.Light;
}

function applyTheme (value: GTheme) {
  const resolved = value === GTheme.System ? getSystemPreference() : value;
  document.documentElement.classList.toggle('dark', resolved === GTheme.Dark);
}
