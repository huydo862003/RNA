/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
*/

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GCollapsible from './GCollapsible.vue';

const meta = {
  title: 'Components/GCollapsible',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Toggleable content, similar to `<details>` and `<summary>`',
      },
    },
  },
  component: GCollapsible,
  argTypes: {
    summary: {
      control: false,
      description: 'Clickable header that toggles content visibility',
      table: {
        category: 'Slots',
        type: {
          summary: 'slot',
        },
      },
    },
    'collapsible-content': {
      control: false,
      description: 'Content shown when expanded',
      table: {
        category: 'Slots',
        type: {
          summary: 'slot',
        },
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic collapsible section. Click summary to toggle.',
      },
    },
  },
  render: () => ({
    components: {
      GCollapsible,
    },
    template: `
      <GCollapsible>
        <template #summary>Click to expand</template>
        <template #collapsible-content>
          <p style="padding: 8px 0;">Hidden content revealed on toggle.</p>
        </template>
      </GCollapsible>
    `,
  }),
};

export const OpenByDefault: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The collapsible set to open by default.',
      },
    },
  },
  render: () => ({
    components: {
      GCollapsible,
    },
    template: `
      <GCollapsible open>
        <template #summary>Already open</template>
        <template #collapsible-content>
          <p style="padding: 8px 0;">Visible on load.</p>
        </template>
      </GCollapsible>
    `,
  }),
};

export const NestedColapsible: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Collapsible sections can nest.',
      },
    },
  },
  render: () => ({
    components: {
      GCollapsible,
    },
    template: `
      <GCollapsible>
        <template #summary>Outer</template>
        <template #collapsible-content>
          <p style="padding: 8px 0;">Outer content</p>
          <GCollapsible>
            <template #summary>Inner</template>
            <template #collapsible-content>
              <p style="padding: 8px 0;">Inner content</p>
            </template>
          </GCollapsible>
        </template>
      </GCollapsible>
    `,
  }),
};

export const MultipleCollapsible: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Multiple collapsible sections stacked.',
      },
    },
  },
  render: () => ({
    components: {
      GCollapsible,
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <GCollapsible>
          <template #summary>Section 1</template>
          <template #collapsible-content>
            <p style="padding: 8px 0;">Content for section 1.</p>
          </template>
        </GCollapsible>
        <GCollapsible>
          <template #summary>Section 2</template>
          <template #collapsible-content>
            <p style="padding: 8px 0;">Content for section 2.</p>
          </template>
        </GCollapsible>
        <GCollapsible>
          <template #summary>Section 3</template>
          <template #collapsible-content>
            <p style="padding: 8px 0;">Content for section 3.</p>
          </template>
        </GCollapsible>
      </div>
    `,
  }),
};
