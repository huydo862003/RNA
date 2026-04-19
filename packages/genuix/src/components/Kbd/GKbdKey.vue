<template>
  <GTooltip class="text-xs">
    <span>
      <kbd
        v-if="keyMeta.component"
        class="kbd"
        tabindex="-1"
        :aria-label="keyMeta.tooltipContent ?? keyMeta.label"
      >
        <component :is="keyMeta.component" />
      </kbd>
      <kbd
        v-else
        class="kbd"
        tabindex="-1"
      >
        {{ keyMeta.label }}
      </kbd>
    </span>
    <template
      v-if="keyMeta.tooltipContent"
      #popper
    >
      {{ keyMeta.tooltipContent }}
    </template>
  </GTooltip>
</template>

<script setup lang="ts">
/* #human-slop
 * https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  computed,
  type Component,
} from 'vue';
import {
  PhArrowDown,
  PhArrowFatLinesUp,
  PhArrowFatUp,
  PhArrowLeft,
  PhArrowRight,
  PhArrowUp,
  PhBackspace,
  PhCommand,
  PhKeyReturn,
  PhOption,
  PhWindowsLogo,
} from '@phosphor-icons/vue';
import {
  getPlatform,
  PlatformKind,
} from '@hdnax/stdx';
import GTooltip from '../Tooltip/GTooltip.vue';
import {
  GKbdKeyName,
} from './types';

const {
  name,
} = defineProps<{
  /** Key name following the W3C KeyboardEvent.key spec */
  name: GKbdKeyName;
}>();

const platform = getPlatform();
const isMac = platform === PlatformKind.Mac;

interface KeyMeta {
  label?: string;
  component?: Component;
  tooltipContent?: string;
}

const keyMeta = computed((): KeyMeta => {
  switch (name) {
  // Arrows
  case GKbdKeyName.ArrowDown:
    return {
      component: PhArrowDown,
      tooltipContent: 'Arrow Down',
    };
  case GKbdKeyName.ArrowUp:
    return {
      component: PhArrowUp,
      tooltipContent: 'Arrow Up',
    };
  case GKbdKeyName.ArrowLeft:
    return {
      component: PhArrowLeft,
      tooltipContent: 'Arrow Left',
    };
  case GKbdKeyName.ArrowRight:
    return {
      component: PhArrowRight,
      tooltipContent: 'Arrow Right',
    };

  // Whitespace
  case GKbdKeyName.Enter:
    return {
      component: PhKeyReturn,
      tooltipContent: 'Enter',
    };
  case GKbdKeyName.Tab:
    return {
      label: 'Tab',
    };
  case GKbdKeyName.Space:
    return {
      label: '␣',
      tooltipContent: 'Space',
    };

  // Modifier keys
  case GKbdKeyName.Control:
    return {
      label: '⌃',
      tooltipContent: 'Control',
    };
  case GKbdKeyName.Alt:
    return isMac
      ? {
        component: PhOption,
        tooltipContent: 'Option',
      }
      : {
        label: 'Alt',
      };
  case GKbdKeyName.Shift:
    return {
      component: PhArrowFatUp,
      tooltipContent: 'Shift',
    };
  case GKbdKeyName.Meta:
    return {
      component: isMac ? PhCommand : PhWindowsLogo,
      tooltipContent: isMac ? 'Command' : 'Windows',
    };
  case GKbdKeyName.Escape:
    return {
      label: 'Esc',
      tooltipContent: 'Escape',
    };

  // Edit keys
  case GKbdKeyName.Backspace:
    return {
      component: PhBackspace,
      tooltipContent: 'Backspace',
    };
  case GKbdKeyName.Delete:
    return {
      label: 'Del',
      tooltipContent: 'Delete',
    };
  case GKbdKeyName.Insert:
    return {
      label: 'Ins',
      tooltipContent: 'Insert',
    };

  // Lock keys
  case GKbdKeyName.CapsLock:
    return {
      component: PhArrowFatLinesUp,
      tooltipContent: 'Caps Lock',
    };
  case GKbdKeyName.NumLock:
    return {
      label: 'Num',
      tooltipContent: 'Num Lock',
    };

  // Navigation
  case GKbdKeyName.End:
    return {
      label: 'End',
    };
  case GKbdKeyName.Home:
    return {
      label: 'Home',
    };
  case GKbdKeyName.PageDown:
    return {
      label: 'PgDn',
      tooltipContent: 'Page Down',
    };
  case GKbdKeyName.PageUp:
    return {
      label: 'PgUp',
      tooltipContent: 'Page Up',
    };

  // Function keys
  case GKbdKeyName.F1:
  case GKbdKeyName.F2:
  case GKbdKeyName.F3:
  case GKbdKeyName.F4:
  case GKbdKeyName.F5:
  case GKbdKeyName.F6:
  case GKbdKeyName.F7:
  case GKbdKeyName.F8:
  case GKbdKeyName.F9:
  case GKbdKeyName.F10:
  case GKbdKeyName.F11:
  case GKbdKeyName.F12:
    return {
      label: name,
    };

  // Everything else (letters, digits, punctuation) are displayed as-is
  default:
    return {
      label: name,
    };
  }
});
</script>

<style scoped>
@reference '../../style.css';

.kbd {
  @apply inline-flex items-center justify-center;
  @apply w-xl h-lg text-xs border gui-neutral-border gui-neutral-bg-subtle rounded-1 font-mono leading-none align-middle;
  @apply shadow-primary-1 shadow-sm inset-shadow-sm;
  @apply cursor-default select-none;
  outline: none;
}

.kbd :deep(svg) {
  width: var(--size-1);
  height: var(--size-1);
}
</style>
