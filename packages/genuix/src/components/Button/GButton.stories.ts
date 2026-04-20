/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GButton from './GButton.vue';
import {
  ButtonVariant,
  ButtonSemantic,
  ButtonSize,
} from './types';

const meta = {
  title: 'Components/GButton',
  tags: ['autodocs'],
  component: GButton,
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(ButtonVariant),
      description: 'Visual style',
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

export const SolidButtonStory: Story = {
  args: {
    variant: ButtonVariant.Solid,
    semantic: ButtonSemantic.Primary,
    size: ButtonSize.Md,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default solid button',
      },
    },
  },
  render,
};

export const SoftButtonStory: Story = {
  args: {
    variant: ButtonVariant.Soft,
    semantic: ButtonSemantic.Primary,
  },
  parameters: {
    docs: {
      description: {
        story: 'Soft tinted background',
      },
    },
  },
  render,
};

export const OutlineButtonStory: Story = {
  args: {
    variant: ButtonVariant.Outline,
    semantic: ButtonSemantic.Primary,
  },
  parameters: {
    docs: {
      description: {
        story: 'Border only, no fill',
      },
    },
  },
  render,
};

export const GhostButtonStory: Story = {
  args: {
    variant: ButtonVariant.Ghost,
    semantic: ButtonSemantic.Primary,
  },
  parameters: {
    docs: {
      description: {
        story: 'No border, no background',
      },
    },
  },
  render,
};

export const LinkButtonStory: Story = {
  args: {
    variant: ButtonVariant.Link,
    semantic: ButtonSemantic.Info,
  },
  parameters: {
    docs: {
      description: {
        story: 'Looks like a hyperlink',
      },
    },
  },
  render,
};

export const LoadingButtonStory: Story = {
  args: {
    variant: ButtonVariant.Solid,
    semantic: ButtonSemantic.Primary,
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state with spinner, button disabled',
      },
    },
  },
  render,
};

export const DangerButtonStory: Story = {
  args: {
    variant: ButtonVariant.Solid,
    semantic: ButtonSemantic.Danger,
  },
  parameters: {
    docs: {
      description: {
        story: 'Danger semantic for destructive actions',
      },
    },
  },
  render,
};

export const DisabledButtonStory: Story = {
  args: {
    variant: ButtonVariant.Solid,
    semantic: ButtonSemantic.Primary,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled state',
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
    },
  },
  render: () => ({
    components: {
      GButton,
    },
    setup () {
      return {
        sizes: Object.values(ButtonSize),
        ButtonVariant,
        ButtonSemantic,
      };
    },
    template: `
      <div class="flex items-center gap-spacing-2">
        <GButton
          v-for="s in sizes"
          :key="s"
          :variant="ButtonVariant.Solid"
          :semantic="ButtonSemantic.Primary"
          :size="s"
        >{{ s }}</GButton>
      </div>
    `,
  }),
};

export const AllVariantsButtonStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All variants with primary semantic',
      },
    },
  },
  render: () => ({
    components: {
      GButton,
    },
    setup () {
      return {
        variants: Object.values(ButtonVariant),
        ButtonSemantic,
      };
    },
    template: `
      <div class="flex items-center gap-spacing-2">
        <GButton
          v-for="v in variants"
          :key="v"
          :variant="v"
          :semantic="ButtonSemantic.Primary"
        >{{ v }}</GButton>
      </div>
    `,
  }),
};

export const AllSemanticsButtonStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All semantics with solid variant',
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
        ButtonVariant,
      };
    },
    template: `
      <div class="flex items-center gap-spacing-2 flex-wrap">
        <GButton
          v-for="s in semantics"
          :key="s"
          :variant="ButtonVariant.Solid"
          :semantic="s"
        >{{ s }}</GButton>
      </div>
    `,
  }),
};
