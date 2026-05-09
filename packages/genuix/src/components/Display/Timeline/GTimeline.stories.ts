/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GTimeline from './GTimeline.vue';
import GTimelineItem from './GTimelineItem.vue';

const meta = {
  title: 'Components/Display/GTimeline',
  tags: ['autodocs'],
  component: GTimeline,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GTimeline>
  <GTimelineItem title="Created" meta="Jan 1, 2025">
    Issue was created.
  </GTimelineItem>
</GTimeline>`,
      },
    },
  },
  render: () => ({
    components: {
      GTimeline,
      GTimelineItem,
    },
    template: `
      <GTimeline class="w-80">
        <GTimelineItem title="Issue created" meta="Jan 1, 2025">
          Alice opened the issue and assigned it to the team.
        </GTimelineItem>
        <GTimelineItem title="Under review" meta="Jan 3, 2025">
          Bob started reviewing the implementation.
        </GTimelineItem>
        <GTimelineItem title="Resolved" meta="Jan 7, 2025">
          Fix merged and deployed to production.
        </GTimelineItem>
      </GTimeline>
    `,
  }),
};

export const NoBodyStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GTimeline>
  <GTimelineItem title="Step A" meta="Day 1" />
  <GTimelineItem title="Step B" meta="Day 2" />
</GTimeline>`,
      },
    },
  },
  render: () => ({
    components: {
      GTimeline,
      GTimelineItem,
    },
    template: `
      <GTimeline class="w-72">
        <GTimelineItem title="Kicked off" meta="Mon" />
        <GTimelineItem title="Design approved" meta="Tue" />
        <GTimelineItem title="Development started" meta="Wed" />
        <GTimelineItem title="QA testing" meta="Fri" />
      </GTimeline>
    `,
  }),
};
