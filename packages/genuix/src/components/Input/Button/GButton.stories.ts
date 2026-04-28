/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GButton from './GButton.vue';
import {
  ButtonProminence,
  ButtonSemantic,
  ButtonSize,
} from './types';

const meta = {
  title: 'Components/Input/GButton',
  tags: ['autodocs'],
  component: GButton,
  argTypes: {
    prominence: {
      control: 'select',
      options: Object.values(ButtonProminence),
      description: 'Prominence level',
    },
    semantic: {
      control: 'select',
      options: Object.values(ButtonSemantic),
      description: 'Color role',
    },
    size: {
      control: 'select',
      options: Object.values(ButtonSize),
      description: 'Button size',
    },
    loading: {
      control: 'boolean',
      description: 'Show spinner, disable interactions',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable interactions',
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const render: Story['render'] = (args) => ({
  components: {
    GButton,
  },
  setup () {
    return {
      args,
    };
  },
  template: `
    <GButton v-bind="args">Button</GButton>
  `,
});

export const PrimaryButtonStory: Story = {
  args: {
    prominence: ButtonProminence.Primary,
    semantic: ButtonSemantic.Neutral,
    size: ButtonSize.Md,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default primary button',
      },
      source: {
        code: '<GButton prominence="primary" semantic="neutral" size="md">Button</GButton>',
      },
    },
  },
  render,
};

export const SecondaryButtonStory: Story = {
  args: {
    prominence: ButtonProminence.Secondary,
    semantic: ButtonSemantic.Neutral,
  },
  parameters: {
    docs: {
      description: {
        story: 'Secondary tinted background',
      },
      source: {
        code: '<GButton prominence="secondary" semantic="neutral">Button</GButton>',
      },
    },
  },
  render,
};

export const TertiaryButtonStory: Story = {
  args: {
    prominence: ButtonProminence.Tertiary,
    semantic: ButtonSemantic.Neutral,
  },
  parameters: {
    docs: {
      description: {
        story: 'Border only, no fill',
      },
      source: {
        code: '<GButton prominence="tertiary" semantic="neutral">Button</GButton>',
      },
    },
  },
  render,
};

export const GhostButtonStory: Story = {
  args: {
    prominence: ButtonProminence.Ghost,
    semantic: ButtonSemantic.Neutral,
  },
  parameters: {
    docs: {
      description: {
        story: 'No border, no background',
      },
      source: {
        code: '<GButton prominence="ghost" semantic="neutral">Button</GButton>',
      },
    },
  },
  render,
};

export const LoadingButtonStory: Story = {
  args: {
    prominence: ButtonProminence.Primary,
    semantic: ButtonSemantic.Neutral,
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state with spinner, button disabled',
      },
      source: {
        code: '<GButton prominence="primary" semantic="neutral" loading>Button</GButton>',
      },
    },
  },
  render,
};

export const DangerButtonStory: Story = {
  args: {
    prominence: ButtonProminence.Primary,
    semantic: ButtonSemantic.Danger,
  },
  parameters: {
    docs: {
      description: {
        story: 'Danger semantic for destructive actions',
      },
      source: {
        code: '<GButton prominence="primary" semantic="danger">Button</GButton>',
      },
    },
  },
  render,
};

export const DisabledButtonStory: Story = {
  args: {
    prominence: ButtonProminence.Primary,
    semantic: ButtonSemantic.Neutral,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled state',
      },
      source: {
        code: '<GButton prominence="primary" semantic="neutral" disabled>Button</GButton>',
      },
    },
  },
  render,
};

export const AllSizesButtonStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All sizes side by side',
      },
      source: {
        code: '<GButton prominence="primary" semantic="primary" size="md">Button</GButton>',
      },
    },
  },
  render: () => ({
    components: {
      GButton,
    },
    setup () {
      return {
        sizes: Object.values(ButtonSize),
        ButtonProminence,
        ButtonSemantic,
      };
    },
    template: `
      <div class="flex items-center gap-spacing-2">
        <GButton
          v-for="s in sizes"
          :key="s"
          :prominence="ButtonProminence.Primary"
          :semantic="ButtonSemantic.Primary"
          :size="s"
        >{{ s }}</GButton>
      </div>
    `,
  }),
};

export const AllProminencesButtonStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All prominence levels with primary semantic',
      },
      source: {
        code: '<GButton prominence="primary" semantic="primary">Button</GButton>',
      },
    },
  },
  render: () => ({
    components: {
      GButton,
    },
    setup () {
      return {
        prominences: Object.values(ButtonProminence),
        ButtonSemantic,
      };
    },
    template: `
      <div class="flex items-center gap-spacing-2">
        <GButton
          v-for="p in prominences"
          :key="p"
          :prominence="p"
          :semantic="ButtonSemantic.Primary"
        >{{ p }}</GButton>
      </div>
    `,
  }),
};

export const AllSemanticsButtonStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All semantics with primary prominence',
      },
      source: {
        code: '<GButton prominence="primary" semantic="neutral">Button</GButton>',
      },
    },
  },
  render: () => ({
    components: {
      GButton,
    },
    setup () {
      return {
        semantics: Object.values(ButtonSemantic),
        ButtonProminence,
      };
    },
    template: `
      <div class="flex items-center gap-spacing-2 flex-wrap">
        <GButton
          v-for="s in semantics"
          :key="s"
          :prominence="ButtonProminence.Primary"
          :semantic="s"
        >{{ s }}</GButton>
      </div>
    `,
  }),
};
