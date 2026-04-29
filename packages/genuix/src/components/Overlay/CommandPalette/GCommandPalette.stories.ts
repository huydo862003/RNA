/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GCommandPalette from './GCommandPalette.vue';
import {
  COMMAND_PALETTE_KEY,
} from './types';
import GButton from '@/components/Input/Button/GButton.vue';
import {
  useModal,
} from '@/composables/useModal';
import {
  useKbdShortcut,
} from '@/composables/useKbdShortcut';
import {
  GIconName,
  GKbdKeyName,
} from '@/components/Display';

const meta = {
  title: 'Components/Overlay/GCommandPalette',
  tags: ['autodocs'],
  component: GCommandPalette,
  args: {
    items: [],
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `const modal = useModal();
useKbdShortcut([GKbdKeyName.Meta, GKbdKeyName.k], () => {
  modal.isOpen(COMMAND_PALETTE_KEY).value
    ? modal.pop(COMMAND_PALETTE_KEY)
    : modal.push(COMMAND_PALETTE_KEY);
});

<GCommandPalette :items="commands" @select="onSelect" />`,
      },
    },
  },
  render: () => ({
    components: {
      GCommandPalette,
      GButton,
    },
    setup () {
      const modal = useModal();

      useKbdShortcut([
        GKbdKeyName.Meta,
        GKbdKeyName.k,
      ], () => {
        if (modal.isOpen(COMMAND_PALETTE_KEY).value) {
          modal.pop(COMMAND_PALETTE_KEY);
        } else{
          modal.push(COMMAND_PALETTE_KEY);
        }
      });

      const commands = [
        {
          id: 'home',
          label: 'Go to Home',
          icon: GIconName.Home,
          group: 'Navigation',
          shortcut: [
            GKbdKeyName.Alt,
            GKbdKeyName.h,
          ],
        },
        {
          id: 'settings',
          label: 'Open Settings',
          icon: GIconName.Gear,
          group: 'Navigation',
          shortcut: [
            GKbdKeyName.Meta,
            GKbdKeyName.Comma,
          ],
        },
        {
          id: 'profile',
          label: 'View Profile',
          icon: GIconName.User,
          group: 'Navigation',
        },
        {
          id: 'search',
          label: 'Search',
          icon: GIconName.Search,
          group: 'Actions',
          shortcut: [
            GKbdKeyName.Meta,
            GKbdKeyName.f,
          ],
        },
        {
          id: 'copy',
          label: 'Copy to Clipboard',
          icon: GIconName.Copy,
          group: 'Actions',
          shortcut: [
            GKbdKeyName.Meta,
            GKbdKeyName.c,
          ],
        },
        {
          id: 'terminal',
          label: 'Open Terminal',
          icon: GIconName.Terminal,
          group: 'Tools',
        },
        {
          id: 'code',
          label: 'View Source',
          icon: GIconName.Code,
          group: 'Tools',
        },
      ];

      function onSelect (item: { id: string }) {
        console.log('Selected:', item.id);
      }

      return {
        modal,
        commands,
        onSelect,
        COMMAND_PALETTE_KEY,
      };
    },
    template: `
      <div>
        <p class="text-xs gui-neutral-fg-muted mb-sm">Press ⌘K or click the button</p>
        <GButton @click="modal.push(COMMAND_PALETTE_KEY)">Open Command Palette</GButton>
        <GCommandPalette :items="commands" @select="onSelect" />
      </div>
    `,
  }),
};
