/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import {
  ref,
} from 'vue';
import GTextInput from './GTextInput.vue';
import {
  TextInputSize,
  TextInputState,
} from './types';

const meta = {
  title: 'Components/Input/GTextInput',
  tags: ['autodocs'],
  component: GTextInput,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(TextInputSize),
    },
    state: {
      control: 'select',
      options: Object.values(TextInputState),
    },
    disabled: {
      control: 'boolean',
    },
    readonly: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicTextInputStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic text input with v-model binding.',
      },
      source: {
        code: '<GTextInput v-model="value" placeholder="Type something..." />',
      },
    },
  },
  render: () => ({
    components: {
      GTextInput,
    },
    setup () {
      const value = ref('');
      return {
        value,
      };
    },
    template: `
      <div class="p-spacing-4">
        <p class="text-xs gui-neutral-fg-muted mb-spacing-2">
          Value: "{{ value }}"
        </p>
        <GTextInput v-model="value" placeholder="Type something..." />
      </div>
    `,
  }),
};

export const SizesTextInputStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All size variants from xs to xl.',
      },
      source: {
        code: '<GTextInput v-model="value" size="md" />',
      },
    },
  },
  render: () => ({
    components: {
      GTextInput,
    },
    setup () {
      const value = ref('Hello');
      return {
        value,
        TextInputSize,
      };
    },
    template: `
      <div class="p-spacing-4 flex flex-col gap-spacing-2 items-start">
        <GTextInput v-model="value" :size="TextInputSize.Xs" />
        <GTextInput v-model="value" :size="TextInputSize.Sm" />
        <GTextInput v-model="value" :size="TextInputSize.Md" />
        <GTextInput v-model="value" :size="TextInputSize.Lg" />
        <GTextInput v-model="value" :size="TextInputSize.Xl" />
      </div>
    `,
  }),
};

export const StatesTextInputStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'State variants via data-state attribute. Consumer can also override with class prop.',
      },
      source: {
        code: '<GTextInput v-model="value" state="error" placeholder="Error" />',
      },
    },
  },
  render: () => ({
    components: {
      GTextInput,
    },
    setup () {
      return {
        TextInputState,
      };
    },
    template: `
      <div class="p-spacing-4 flex flex-col gap-spacing-3 items-start">
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-spacing-1">Default</p>
          <GTextInput :state="TextInputState.Default" placeholder="Default" />
        </div>
        <div>
          <p class="text-xs gui-danger-fg mb-spacing-1">Error</p>
          <GTextInput :state="TextInputState.Error" placeholder="Error" />
        </div>
        <div>
          <p class="text-xs gui-warning-fg mb-spacing-1">Warning</p>
          <GTextInput :state="TextInputState.Warning" placeholder="Warning" />
        </div>
        <div>
          <p class="text-xs gui-success-fg mb-spacing-1">Success</p>
          <GTextInput :state="TextInputState.Success" placeholder="Success" />
        </div>
      </div>
    `,
  }),
};

export const DisabledTextInputStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled input cannot be edited.',
      },
      source: {
        code: '<GTextInput v-model="value" disabled />',
      },
    },
  },
  render: () => ({
    components: {
      GTextInput,
    },
    setup () {
      const value = ref('Cannot edit this');
      return {
        value,
      };
    },
    template: `
      <div class="p-spacing-4">
        <GTextInput v-model="value" disabled />
      </div>
    `,
  }),
};

export const ReadonlyTextInputStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Readonly input can be selected and copied but not edited.',
      },
      source: {
        code: '<GTextInput v-model="value" readonly />',
      },
    },
  },
  render: () => ({
    components: {
      GTextInput,
    },
    setup () {
      const value = ref('Read only text');
      return {
        value,
      };
    },
    template: `
      <div class="p-spacing-4">
        <GTextInput v-model="value" readonly />
      </div>
    `,
  }),
};

export const RequiredTextInputStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Required input shows error when empty after first interaction.',
      },
      source: {
        code: '<GTextInput v-model="value" required placeholder="Required field" />',
      },
    },
  },
  render: () => ({
    components: {
      GTextInput,
    },
    setup () {
      const value = ref('');
      return {
        value,
      };
    },
    template: `
      <div class="p-spacing-4">
        <p class="text-xs gui-neutral-fg-muted mb-spacing-2">Type something, then clear it.</p>
        <GTextInput v-model="value" required placeholder="Required field" />
      </div>
    `,
  }),
};

export const ValidationTextInputStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Validation with pattern and minLength as inline props.',
      },
      source: {
        code: `<GTextInput v-model="email" pattern="email" placeholder="Email" />
<GTextInput v-model="name" :min-length="3" placeholder="Min 3 chars" />`,
      },
    },
  },
  render: () => ({
    components: { GTextInput },
    setup () {
      const email = ref('');
      const url = ref('');
      const name = ref('');
      return { email, url, name };
    },
    template: `
      <div class="p-spacing-4 flex flex-col gap-spacing-3 items-start">
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-spacing-1">Email pattern</p>
          <GTextInput v-model="email" pattern="email" placeholder="user@example.com" />
        </div>
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-spacing-1">URL pattern</p>
          <GTextInput v-model="url" pattern="url" placeholder="https://..." />
        </div>
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-spacing-1">Min length: 3</p>
          <GTextInput v-model="name" :min-length="3" placeholder="At least 3 chars" />
        </div>
      </div>
    `,
  }),
};
