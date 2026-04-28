/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
*/

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GCollapsible from './GCollapsible.vue';

const meta = {
  title: 'Components/Display/GCollapsible',
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

export const DefaultCollapsibleStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic collapsible section. Click summary to toggle.',
      },
      source: {
        code: `<GCollapsible>
  <template #summary>Click to expand</template>
  <template #collapsible-content>
    <p>Hidden content revealed on toggle.</p>
  </template>
</GCollapsible>`,
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
          <p class="py-spacing-2">Hidden content revealed on toggle.</p>
        </template>
      </GCollapsible>
    `,
  }),
};

export const OpenByDefaultCollapsibleStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The collapsible set to open by default.',
      },
      source: {
        code: `<GCollapsible open>
  <template #summary>Already open</template>
  <template #collapsible-content>
    <p>Visible on load.</p>
  </template>
</GCollapsible>`,
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
          <p class="py-spacing-2">Visible on load.</p>
        </template>
      </GCollapsible>
    `,
  }),
};

export const NestedCollapsibleStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Collapsible sections can nest.',
      },
      source: {
        code: `<GCollapsible>
  <template #summary>Outer</template>
  <template #collapsible-content>
    <p>Outer content</p>
    <GCollapsible>
      <template #summary>Inner</template>
      <template #collapsible-content>
        <p>Inner content</p>
      </template>
    </GCollapsible>
  </template>
</GCollapsible>`,
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
          <p class="py-spacing-2">Outer content</p>
          <GCollapsible>
            <template #summary>Inner</template>
            <template #collapsible-content>
              <p class="py-spacing-2">Inner content</p>
            </template>
          </GCollapsible>
        </template>
      </GCollapsible>
    `,
  }),
};

export const MultipleCollapsibleStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Multiple collapsible sections stacked.',
      },
      source: {
        code: `<GCollapsible>
  <template #summary>Section 1</template>
  <template #collapsible-content>
    <p>Content for section 1.</p>
  </template>
</GCollapsible>`,
      },
    },
  },
  render: () => ({
    components: {
      GCollapsible,
    },
    template: `
      <div class="flex flex-col gap-spacing-1">
        <GCollapsible>
          <template #summary>Section 1</template>
          <template #collapsible-content>
            <p class="py-spacing-2">Content for section 1.</p>
          </template>
        </GCollapsible>
        <GCollapsible>
          <template #summary>Section 2</template>
          <template #collapsible-content>
            <p class="py-spacing-2">Content for section 2.</p>
          </template>
        </GCollapsible>
        <GCollapsible>
          <template #summary>Section 3</template>
          <template #collapsible-content>
            <p class="py-spacing-2">Content for section 3.</p>
          </template>
        </GCollapsible>
      </div>
    `,
  }),
};
