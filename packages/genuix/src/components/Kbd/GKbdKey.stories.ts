/* #human-slop
   https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
*/

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GKbdKey from './GKbdKey.vue';
import {
  GKbdKeyName,
} from './types';

const meta = {
  title: 'Components/GKbdKey',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Single keyboard key display. Renders icons for special keys, text for letters and digits. Tooltip on hover for abbreviated keys.',
      },
    },
  },
  args: {},
  argTypes: {
    name: {
      control: 'select',
      options: Object.values(GKbdKeyName),
      description: 'Key name following KeyboardEvent.key spec',
    },
  },
  component: GKbdKey,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story['render'] = (args) => ({
  components: {
    GKbdKey,
  },
  setup () {
    return {
      args,
    };
  },
  template: `
    <GKbdKey v-bind="args" />
  `,
});

export const LetterKeyStory: Story = {
  args: {
    name: GKbdKeyName.a,
  },
  parameters: {
    docs: {
      description: {
        story: 'A single letter key',
      },
    },
  },
  render,
};

export const ArrowKeyStory: Story = {
  args: {
    name: GKbdKeyName.ArrowUp,
  },
  parameters: {
    docs: {
      description: {
        story: 'Arrow key rendered as icon with tooltip',
      },
    },
  },
  render,
};

export const ModifierKeyStory: Story = {
  args: {
    name: GKbdKeyName.Shift,
  },
  parameters: {
    docs: {
      description: {
        story: 'Modifier key rendered as icon with tooltip',
      },
    },
  },
  render,
};

export const EscapeKeyStory: Story = {
  args: {
    name: GKbdKeyName.Escape,
  },
  parameters: {
    docs: {
      description: {
        story: 'Escape key with abbreviated label',
      },
    },
  },
  render,
};

export const FunctionKeyStory: Story = {
  args: {
    name: GKbdKeyName.F1,
  },
  parameters: {
    docs: {
      description: {
        story: 'Function key displayed as-is',
      },
    },
  },
  render,
};

export const SpaceKeyStory: Story = {
  args: {
    name: GKbdKeyName.Space,
  },
  parameters: {
    docs: {
      description: {
        story: 'Space key with unicode symbol and tooltip',
      },
    },
  },
  render,
};

export const ReturnKeyStory: Story = {
  args: {
    name: GKbdKeyName.Enter,
  },
  parameters: {
    docs: {
      description: {
        story: 'Enter key with icon and tooltip',
      },
    },
  },
  render,
};

export const TabKeyStory: Story = {
  args: {
    name: GKbdKeyName.Tab,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tab key',
      },
    },
  },
  render,
};

export const DeleteKeyStory: Story = {
  args: {
    name: GKbdKeyName.Delete,
  },
  parameters: {
    docs: {
      description: {
        story: 'Delete key with symbol and tooltip',
      },
    },
  },
  render,
};

export const BackspaceKeyStory: Story = {
  args: {
    name: GKbdKeyName.Backspace,
  },
  parameters: {
    docs: {
      description: {
        story: 'Backspace key with icon and tooltip',
      },
    },
  },
  render,
};

export const PunctuationKeyStory: Story = {
  args: {
    name: GKbdKeyName.LBracket,
  },
  parameters: {
    docs: {
      description: {
        story: 'Punctuation key displayed as-is',
      },
    },
  },
  render,
};
