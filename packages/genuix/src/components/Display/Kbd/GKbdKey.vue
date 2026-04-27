<template>
  <GTooltip class="text-xs">
    <span
      v-bind="$attrs"
      :id="id"
    >
      <kbd
        v-if="keyMeta.icon"
        class="kbd"
        tabindex="-1"
        :aria-label="keyMeta.tooltipContent ?? keyMeta.label"
      >
        <GIcon :name="keyMeta.icon" />
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
  getPlatform,
  PlatformKind,
} from '@hdnax/stdx';
import {
  computed,
} from 'vue';
import {
  GKbdKeyName,
} from './types';
import GTooltip from '@/components/Overlay/Tooltip/GTooltip.vue';
import GIcon from '@/components/Display/Icon/GIcon.vue';
import {
  GIconName,
} from '@/components/Display/Icon/types';

defineOptions({
  inheritAttrs: false,
});

const {
  id = undefined,
  name,
} = defineProps<{
  id?: string;
  /** Key name following the W3C KeyboardEvent.key spec */
  name: GKbdKeyName;
}>();

const platform = getPlatform();
const isMac = platform === PlatformKind.Mac;

interface KeyMeta {
  label?: string;
  icon?: GIconName;
  tooltipContent?: string;
}

const keyMeta = computed((): KeyMeta => {
  switch (name) {
  // Arrows
  case GKbdKeyName.ArrowDown:
    return {
      icon: GIconName.ArrowDown,
      tooltipContent: 'Arrow Down',
    };
  case GKbdKeyName.ArrowUp:
    return {
      icon: GIconName.ArrowUp,
      tooltipContent: 'Arrow Up',
    };
  case GKbdKeyName.ArrowLeft:
    return {
      icon: GIconName.ArrowLeft,
      tooltipContent: 'Arrow Left',
    };
  case GKbdKeyName.ArrowRight:
    return {
      icon: GIconName.ArrowRight,
      tooltipContent: 'Arrow Right',
    };

  // Whitespace
  case GKbdKeyName.Enter:
    return {
      icon: GIconName.KeyReturn,
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
        icon: GIconName.Option,
        tooltipContent: 'Option',
      }
      : {
        label: 'Alt',
      };
  case GKbdKeyName.Shift:
    return {
      icon: GIconName.ShiftKey,
      tooltipContent: 'Shift',
    };
  case GKbdKeyName.Meta:
    return {
      icon: isMac ? GIconName.Command : GIconName.WindowsLogo,
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
      icon: GIconName.Backspace,
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
      icon: GIconName.CapsLockKey,
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
@reference '@/style.css';

@layer components {
.kbd {
  @apply inline-flex items-center justify-center;
  @apply w-xl h-lg text-xs border gui-neutral-border gui-neutral-bg-subtle rounded-1 font-mono leading-none align-middle;
  @apply shadow-primary-1 shadow-sm inset-shadow-sm;
  @apply cursor-default select-none outline-none;
}

.kbd :deep(svg) {
  width: var(--size-1);
  height: var(--size-1);
}
}
</style>
