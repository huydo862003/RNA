/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GBreadcrumb from './GBreadcrumb.vue';
import {
  GIconName,
} from '@/components/Display/Icon/types';

const meta = {
  title: 'Components/Display/GBreadcrumb',
  tags: ['autodocs'],
  component: GBreadcrumb,
  args: {
    items: [],
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const VariantsStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Short path, deep path (with ellipsis collapse), single item, icon separator, icons on crumbs, and icon ellipsis.',
      },
    },
  },
  render: () => ({
    components: {
      GBreadcrumb,
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
          <GBreadcrumb :items="[
            { label: 'Home', href: '/' },
            { label: 'Docs', href: '/docs' },
            { label: 'Getting Started' },
          ]" />
        </div>
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-xs font-bold">Deep path (ellipsis collapse)</p>
          <GBreadcrumb :items="[
            { label: 'Home', href: '/' },
            { label: 'Journeys', href: '/journeys' },
            { label: 'Papers', href: '/journeys/papers' },
            { label: 'Attention Is All You Need', href: '/journeys/papers/attention' },
            { label: 'Notes' },
          ]" />
        </div>
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-xs font-bold">Single item</p>
          <GBreadcrumb :items="[{ label: 'Home' }]" />
        </div>
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-xs font-bold">Icon separator + crumb icons</p>
          <GBreadcrumb :separator="GIconName.ChevronRight" :items="[
            { label: 'Home', href: '/', icon: GIconName.Home },
            { label: 'Settings', href: '/settings', icon: GIconName.Gear },
            { label: 'Profile', icon: GIconName.User },
          ]" />
        </div>
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-xs font-bold">Icon ellipsis + icon separator</p>
          <GBreadcrumb
            :separator="GIconName.ChevronRight"
            :ellipsis="GIconName.HEllipsis"
            :items="[
              { label: 'Home', href: '/', icon: GIconName.Home },
              { label: 'Journeys', href: '/journeys' },
              { label: 'Papers', href: '/journeys/papers' },
              { label: 'Attention Is All You Need', href: '/journeys/papers/attention' },
              { label: 'Notes' },
            ]"
          />
        </div>
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-xs font-bold">Custom separator (›)</p>
          <GBreadcrumb separator="›" :items="[
            { label: 'Home', href: '/' },
            { label: 'API Reference', href: '/api' },
            { label: 'parse()' },
          ]" />
        </div>
      </div>
    `,
  }),
};

export const SlotsStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All 4 slots: `#separator`, `#ellipsis`, `#icon="{ item, index }"`, `#dropdown="{ items }"`.',
      },
    },
  },
  render: () => ({
    components: {
      GBreadcrumb,
    },
    template: `
      <div class="flex flex-col gap-lg">
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-xs font-bold">#separator slot</p>
          <GBreadcrumb :items="[
            { label: 'Home', href: '/' },
            { label: 'Docs', href: '/docs' },
            { label: 'Guide' },
          ]">
            <template #separator>
              <span class="mx-1 gui-primary-fg">→</span>
            </template>
          </GBreadcrumb>
        </div>
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-xs font-bold">#ellipsis slot</p>
          <GBreadcrumb :items="[
            { label: 'Home', href: '/' },
            { label: 'A', href: '/a' },
            { label: 'B', href: '/b' },
            { label: 'C', href: '/c' },
            { label: 'Current' },
          ]">
            <template #ellipsis>
              <span class="text-xs gui-info-fg">+2 more</span>
            </template>
          </GBreadcrumb>
        </div>
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-xs font-bold">#icon scoped slot</p>
          <GBreadcrumb :items="[
            { label: 'Home', href: '/' },
            { label: 'Projects', href: '/projects' },
            { label: 'genuix' },
          ]">
            <template #icon="{ index }">
              <span class="text-xs mr-1">{{ ['🏠', '📁', '📦'][index] }}</span>
            </template>
          </GBreadcrumb>
        </div>
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-xs font-bold">#dropdown scoped slot</p>
          <GBreadcrumb :items="[
            { label: 'Home', href: '/' },
            { label: 'A', href: '/a' },
            { label: 'B', href: '/b' },
            { label: 'C', href: '/c' },
            { label: 'Current' },
          ]">
            <template #dropdown="{ items }">
              <div class="p-sm">
                <p class="text-xs gui-neutral-fg-muted mb-xs font-bold">Hidden crumbs:</p>
                <a
                  v-for="(item, i) in items"
                  :key="i"
                  :href="item.href"
                  class="block text-xs gui-primary-fg no-underline py-xs"
                >{{ item.label }}</a>
              </div>
            </template>
          </GBreadcrumb>
        </div>
      </div>
    `,
  }),
};
