/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  ref, watch, onMounted,
  readonly,
} from 'vue';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}

export function useTheme () {
  const theme = ref<Theme>(Theme.System);
  onMounted(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored) {
      theme.value = stored;
    }
    applyTheme(theme.value);

    // If theme is system,
    // Watch the changes to the color scheme preferences
    // And then apply the theme
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => {
        if (theme.value === Theme.System) {
          applyTheme(Theme.System);
        }
      });
  });

  watch(theme, (value) => {
    localStorage.setItem(STORAGE_KEY, value);
    applyTheme(value);
  });

  function setTheme (newTheme: Theme) {
    theme.value = newTheme;
  }

  return {
    theme: readonly(theme),
    setTheme,
  };
}

const STORAGE_KEY = '[genuix]-theme';

function getSystemPreference (): Theme.Light | Theme.Dark {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.Dark : Theme.Light;
}

function applyTheme (value: Theme) {
  const resolved = value === Theme.System ? getSystemPreference() : value;
  document.documentElement.classList.toggle('dark', resolved === Theme.Dark);
}
