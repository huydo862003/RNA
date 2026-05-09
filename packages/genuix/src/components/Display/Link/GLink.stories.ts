/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GInternalLink from './GInternalLink.vue';
import GExternalLink from './GExternalLink.vue';
import GBackLink from './GBackLink.vue';
import GForwardLink from './GForwardLink.vue';
import GIcon from '@/components/Display/Icon/GIcon.vue';
import {
  GIconName,
} from '@/components/Display/Icon/types';

const meta = {
  title: 'Components/Display/GLink',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Link components: internal, external, back, forward. All support `as` prop for custom components.',
      },
    },
  },
  component: GInternalLink,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Internal: Story = {
  render: () => ({
    components: {
      GInternalLink,
    },
    template: '<GInternalLink href="/docs">Documentation</GInternalLink>',
  }),
};

export const InternalWithIcon: Story = {
  render: () => ({
    components: {
      GInternalLink,
      GIcon,
    },
    setup: () => ({
      GIconName,
    }),
    template: `
      <GInternalLink href="/settings">
        <template #icon-before>
          <GIcon :name="GIconName.Gear" :size="14" />
        </template>
        Settings
      </GInternalLink>
    `,
  }),
};

export const External: Story = {
  render: () => ({
    components: {
      GExternalLink,
    },
    template: '<GExternalLink href="https://github.com">GitHub</GExternalLink>',
  }),
};

export const ForwardRef: Story = {
  render: () => ({
    components: {
      GForwardLink,
    },
    template: '<GForwardLink href="/design-tokens">Design Tokens</GForwardLink>',
  }),
};

export const BackRef: Story = {
  render: () => ({
    components: {
      GBackLink,
    },
    template: '<GBackLink href="/getting-started">Getting Started</GBackLink>',
  }),
};

export const CrossReferences: Story = {
  render: () => ({
    components: {
      GForwardLink,
      GBackLink,
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <p style="font-size: 12px; color: var(--gui-neutral-fg-muted); margin-bottom: 4px;">Referenced in</p>
          <div style="display: flex; gap: 8px;">
            <GBackLink href="/intro">Introduction</GBackLink>
            <GBackLink href="/setup">Setup Guide</GBackLink>
          </div>
        </div>
        <div>
          <p style="font-size: 12px; color: var(--gui-neutral-fg-muted); margin-bottom: 4px;">See also</p>
          <div style="display: flex; gap: 8px;">
            <GForwardLink href="/api">API Reference</GForwardLink>
            <GForwardLink href="/examples">Examples</GForwardLink>
          </div>
        </div>
      </div>
    `,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    components: {
      GInternalLink,
      GExternalLink,
      GBackLink,
      GForwardLink,
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
        <GInternalLink href="/page">Internal link</GInternalLink>
        <GExternalLink href="https://example.com">External link</GExternalLink>
        <GBackLink href="/intro">Referenced from: Introduction</GBackLink>
        <GForwardLink href="/api">See also: API Reference</GForwardLink>
      </div>
    `,
  }),
};
