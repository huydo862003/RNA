/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GAffix from './GAffix.vue';
import {
  GAffixPosition,
} from './types';
import GIcon from '@/components/Display/Icon/GIcon.vue';
import {
  GIconName,
} from '@/components/Display/Icon/types';

const meta = {
  title: 'Components/Display/GAffix',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Position an icon or element relative to content. Use inline-start for anchored headings, corners for badges, middle for grips.',
      },
    },
  },
  component: GAffix,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AnchoredHeading: Story = {
  render: () => ({
    components: {
      GAffix,
      GIcon,
    },
    setup: () => ({
      GAffixPosition,
      GIconName,
    }),
    template: `
      <GAffix :position="GAffixPosition.InlineStart">
        <template #affix>
          <a href="#intro" style="color: var(--gui-info-fg-muted); text-decoration: none;">#</a>
        </template>
        <h2 style="margin: 0; font-size: 1.5rem;">Introduction</h2>
      </GAffix>
    `,
  }),
};

export const InlineEnd: Story = {
  render: () => ({
    components: {
      GAffix,
      GIcon,
    },
    setup: () => ({
      GAffixPosition,
      GIconName,
    }),
    template: `
      <GAffix :position="GAffixPosition.InlineEnd">
        <template #affix>
          <GIcon :name="GIconName.Link" :size="14" style="color: var(--gui-neutral-fg-muted);" />
        </template>
        <h3 style="margin: 0;">Section with link icon</h3>
      </GAffix>
    `,
  }),
};

export const CornerPositions: Story = {
  render: () => ({
    components: {
      GAffix,
      GIcon,
    },
    setup: () => ({
      GAffixPosition,
      GIconName,
    }),
    template: `
      <div style="display: flex; gap: 48px; flex-wrap: wrap;">
        <GAffix :position="GAffixPosition.TopLeft" style="border: 1px dashed var(--gui-neutral-border); padding: 16px;">
          <template #affix>
            <GIcon :name="GIconName.Grip" :size="14" style="color: var(--gui-neutral-fg-muted);" />
          </template>
          <div style="width: 120px; height: 60px;">Top Left</div>
        </GAffix>

        <GAffix :position="GAffixPosition.TopRight" style="border: 1px dashed var(--gui-neutral-border); padding: 16px;">
          <template #affix>
            <GIcon :name="GIconName.X" :size="14" style="color: var(--gui-neutral-fg-muted);" />
          </template>
          <div style="width: 120px; height: 60px;">Top Right</div>
        </GAffix>

        <GAffix :position="GAffixPosition.MiddleLeft" style="border: 1px dashed var(--gui-neutral-border); padding: 16px;">
          <template #affix>
            <GIcon :name="GIconName.Grip" :size="14" style="color: var(--gui-neutral-fg-muted);" />
          </template>
          <div style="width: 120px; height: 60px;">Middle Left</div>
        </GAffix>
      </div>
    `,
  }),
};

export const GripOnText: Story = {
  render: () => ({
    components: {
      GAffix,
      GIcon,
    },
    setup: () => ({
      GAffixPosition,
      GIconName,
    }),
    template: `
      <GAffix :position="GAffixPosition.MiddleLeft" style="padding-left: 24px;">
        <template #affix>
          <GIcon :name="GIconName.Grip" :size="16" style="color: var(--gui-neutral-fg-muted); cursor: grab;" />
        </template>
        <p style="margin: 0; padding: 8px; border: 1px solid var(--gui-neutral-border); border-radius: 4px;">
          Draggable text block with grip handle
        </p>
      </GAffix>
    `,
  }),
};
