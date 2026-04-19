/* #human-slop
   https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
*/

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GKbdShortcut from './GKbdShortcut.vue';
import {
  GKbdKeyName,
} from './types';

const meta = {
  title: 'Components/GKbdShortcut',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Keyboard shortcut display. Combines multiple GKbdKey components separated by "+" signs.',
      },
    },
  },
  args: {},
  argTypes: {
    keys: {
      control: 'multi-select',
      options: Object.values(GKbdKeyName),
      description: '',
    },
  }, // Explain each prop
  component: GKbdShortcut,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story['render'] = (args) => ({
  components: {
    GKbdShortcut,
  },
  setup () {
    return {
      args,
    };
  },
  template: `
    <GKbdShortcut v-bind="args" />
  `,
});

export const OneKeyCombinationStory: Story = {
  args: {
    keys: [GKbdKeyName.a],
  },
  parameters: {
    docs: {
      description: {
        story: 'A single key',
      },
    },
  },
  render,
};

export const ModifierCombinationStory: Story = {
  args: {
    keys: [
      GKbdKeyName.Control,
      GKbdKeyName.Shift,
      GKbdKeyName.p,
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Complex modifier keys combined with a letter (Ctrl + Shift + P)',
      },
    },
  },
  render,
};

export const CtrlCombinationStory: Story = {
  args: {
    keys: [
      GKbdKeyName.Control,
      GKbdKeyName.c,
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Common copy shortcut (Ctrl+C)',
      },
    },
  },
  render,
};

export const ArrowCombinationStory: Story = {
  args: {
    keys: [
      GKbdKeyName.ArrowUp,
      GKbdKeyName.ArrowDown,
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Two arrow keys',
      },
    },
  },
  render,
};

export const AltCombinationStory: Story = {
  args: {
    keys: [
      GKbdKeyName.Alt,
      GKbdKeyName.F4,
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Alt + F4 shortcut',
      },
    },
  },
  render,
};

export const MetaCombinationStory: Story = {
  args: {
    keys: [
      GKbdKeyName.Meta,
      GKbdKeyName.LBracket,
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shortcut with Meta + [',
      },
    },
  },
  render,
};

export const SpaceCombinationStory: Story = {
  args: {
    keys: [
      GKbdKeyName.Space,
      GKbdKeyName.Enter,
      GKbdKeyName.Tab,
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shortcut with spaces',
      },
    },
  },
  render,
};

export const SpecialControlKeys: Story = {
  args: {
    keys: [
      GKbdKeyName.Insert,
      GKbdKeyName.Backspace,
      GKbdKeyName.Delete,
      GKbdKeyName.Home,
      GKbdKeyName.End,
      GKbdKeyName.Shift,
      GKbdKeyName.CapsLock,
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shortcut with spaces',
      },
    },
  },
  render,
};
