import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GBreadcrumb from './GBreadcrumb.vue';
import GBreadcrumbItem from './GBreadcrumbItem.vue';
import {
  GIconName,
} from '@/components/Display/Icon/types';

const meta = {
  title: 'Components/Display/GBreadcrumb',
  tags: ['autodocs'],
  component: GBreadcrumb,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const VariantsStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Short path, deep path (ellipsis collapse), single item, icon separator.',
      },
      source: {
        code: `<GBreadcrumb>
  <GBreadcrumbItem as="a" href="/">Home</GBreadcrumbItem>
  <GBreadcrumbItem as="a" href="/docs">Docs</GBreadcrumbItem>
  <GBreadcrumbItem>Getting Started</GBreadcrumbItem>
</GBreadcrumb>`,
      },
    },
  },
  render: () => ({
    components: {
      GBreadcrumb,
      GBreadcrumbItem,
    },
    setup () {
      return {
        GIconName,
      };
    },
    template: `
      <div class="flex flex-col gap-lg">
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-xs font-bold">Short path</p>
          <GBreadcrumb>
            <GBreadcrumbItem as="a" href="/">Home</GBreadcrumbItem>
            <GBreadcrumbItem as="a" href="/docs">Docs</GBreadcrumbItem>
            <GBreadcrumbItem>Getting Started</GBreadcrumbItem>
          </GBreadcrumb>
        </div>
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-xs font-bold">Deep path (ellipsis collapse)</p>
          <GBreadcrumb>
            <GBreadcrumbItem as="a" href="/">Home</GBreadcrumbItem>
            <GBreadcrumbItem as="a" href="/journeys">Journeys</GBreadcrumbItem>
            <GBreadcrumbItem as="a" href="/journeys/papers">Papers</GBreadcrumbItem>
            <GBreadcrumbItem as="a" href="/journeys/papers/attention">Attention Is All You Need</GBreadcrumbItem>
            <GBreadcrumbItem>Notes</GBreadcrumbItem>
          </GBreadcrumb>
        </div>
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-xs font-bold">Single item</p>
          <GBreadcrumb>
            <GBreadcrumbItem>Home</GBreadcrumbItem>
          </GBreadcrumb>
        </div>
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-xs font-bold">Icon separator</p>
          <GBreadcrumb :separator="GIconName.ChevronRight">
            <GBreadcrumbItem as="a" href="/">Home</GBreadcrumbItem>
            <GBreadcrumbItem as="a" href="/settings">Settings</GBreadcrumbItem>
            <GBreadcrumbItem>Profile</GBreadcrumbItem>
          </GBreadcrumb>
        </div>
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-xs font-bold">Custom separator (›)</p>
          <GBreadcrumb separator="›">
            <GBreadcrumbItem as="a" href="/">Home</GBreadcrumbItem>
            <GBreadcrumbItem as="a" href="/api">API Reference</GBreadcrumbItem>
            <GBreadcrumbItem>parse()</GBreadcrumbItem>
          </GBreadcrumb>
        </div>
      </div>
    `,
  }),
};

export const SlotsStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Available slots: `#separator`, `#ellipsis`, `#dropdown="{ ids }"`. Items are composed via `GBreadcrumbItem`.',
      },
      source: {
        code: `<GBreadcrumb>
  <GBreadcrumbItem as="a" href="/">Home</GBreadcrumbItem>
  <GBreadcrumbItem as="a" href="/docs">Docs</GBreadcrumbItem>
  <GBreadcrumbItem>Guide</GBreadcrumbItem>
  <template #separator>
    <span>-></span>
  </template>
</GBreadcrumb>`,
      },
    },
  },
  render: () => ({
    components: {
      GBreadcrumb,
      GBreadcrumbItem,
    },
    template: `
      <div class="flex flex-col gap-lg">
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-xs font-bold">#separator slot</p>
          <GBreadcrumb>
            <GBreadcrumbItem as="a" href="/">Home</GBreadcrumbItem>
            <GBreadcrumbItem as="a" href="/docs">Docs</GBreadcrumbItem>
            <GBreadcrumbItem>Guide</GBreadcrumbItem>
            <template #separator>
              <span class="mx-1 gui-primary-fg">-></span>
            </template>
          </GBreadcrumb>
        </div>
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-xs font-bold">#ellipsis slot</p>
          <GBreadcrumb>
            <GBreadcrumbItem as="a" href="/">Home</GBreadcrumbItem>
            <GBreadcrumbItem as="a" href="/a">A</GBreadcrumbItem>
            <GBreadcrumbItem as="a" href="/a/b">B</GBreadcrumbItem>
            <GBreadcrumbItem as="a" href="/a/b/c">C</GBreadcrumbItem>
            <GBreadcrumbItem>Current</GBreadcrumbItem>
            <template #ellipsis>
              <span class="text-xs gui-info-fg">+more</span>
            </template>
          </GBreadcrumb>
        </div>
      </div>
    `,
  }),
};
