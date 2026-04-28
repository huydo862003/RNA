/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GTab from './GTab.vue';
import GTabPanel from './GTabPanel.vue';
import {
  TabPlacement,
} from './types';
import {
  GIconName,
} from '@/components/Display/Icon/types';

const meta = {
  title: 'Components/Display/GTab',
  tags: ['autodocs'],
  component: GTab,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultTabStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GTab>
  <GTabPanel name="Overview">
    <p>Overview content.</p>
  </GTabPanel>
  <GTabPanel name="Activity">
    <p>Activity content.</p>
  </GTabPanel>
  <GTabPanel name="Settings">
    <p>Settings content.</p>
  </GTabPanel>
</GTab>`,
      },
    },
  },
  render: () => ({
    components: {
      GTab,
      GTabPanel,
    },
    template: `
      <GTab>
        <GTabPanel name="Overview">
          <div class="p-md">
            <h3 class="text-md font-bold gui-neutral-fg mb-sm">Overview</h3>
            <p class="text-sm gui-neutral-fg-muted leading-relaxed">Project summary, recent activity, and key metrics.</p>
          </div>
        </GTabPanel>
        <GTabPanel name="Activity">
          <div class="p-md">
            <h3 class="text-md font-bold gui-neutral-fg mb-sm">Activity</h3>
            <p class="text-sm gui-neutral-fg-muted leading-relaxed">Recent changes and updates from your team.</p>
          </div>
        </GTabPanel>
        <GTabPanel name="Settings">
          <div class="p-md">
            <h3 class="text-md font-bold gui-neutral-fg mb-sm">Settings</h3>
            <p class="text-sm gui-neutral-fg-muted leading-relaxed">Configure project preferences and integrations.</p>
          </div>
        </GTabPanel>
      </GTab>
    `,
  }),
};

export const WithIconsStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GTab>
  <GTabPanel name="home" label="Home" :icon="GIconName.Home">
    <p>Welcome home.</p>
  </GTabPanel>
  <GTabPanel name="settings" label="Settings" :icon="GIconName.Gear">
    <p>Settings content.</p>
  </GTabPanel>
</GTab>`,
      },
    },
  },
  render: () => ({
    components: {
      GTab,
      GTabPanel,
    },
    setup () {
      return {
        GIconName,
      };
    },
    template: `
      <GTab>
        <GTabPanel name="home" label="Home" :icon="GIconName.Home">
          <div class="p-md">
            <h3 class="text-md font-bold gui-neutral-fg mb-sm">Welcome home</h3>
            <p class="text-sm gui-neutral-fg-muted leading-relaxed">Your dashboard at a glance.</p>
          </div>
        </GTabPanel>
        <GTabPanel name="settings" label="Settings" :icon="GIconName.Gear">
          <div class="p-md">
            <h3 class="text-md font-bold gui-neutral-fg mb-sm">Settings</h3>
            <p class="text-sm gui-neutral-fg-muted leading-relaxed">Manage account preferences and security.</p>
          </div>
        </GTabPanel>
        <GTabPanel name="profile" label="Profile" :icon="GIconName.User">
          <div class="p-md">
            <h3 class="text-md font-bold gui-neutral-fg mb-sm">Profile</h3>
            <p class="text-sm gui-neutral-fg-muted leading-relaxed">Update your display name and avatar.</p>
          </div>
        </GTabPanel>
      </GTab>
    `,
  }),
};

export const CustomLabelStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GTab>
  <GTabPanel name="parse" label="Parse SQL">
    <p>Turn any SQL string into a clean AST.</p>
  </GTabPanel>
  <GTabPanel name="transpile" label="Transpile SQL">
    <p>Convert SQL between 33+ dialects.</p>
  </GTabPanel>
</GTab>`,
      },
    },
  },
  render: () => ({
    components: {
      GTab,
      GTabPanel,
    },
    template: `
      <GTab>
        <GTabPanel name="parse" label="Parse SQL">
          <div class="p-md">
            <p class="text-sm gui-neutral-fg-muted">Turn any SQL string into a clean AST.</p>
          </div>
        </GTabPanel>
        <GTabPanel name="transpile" label="Transpile SQL">
          <div class="p-md">
            <p class="text-sm gui-neutral-fg-muted">Convert SQL between 33+ dialects.</p>
          </div>
        </GTabPanel>
        <GTabPanel name="optimize" label="Optimize SQL">
          <div class="p-md">
            <p class="text-sm gui-neutral-fg-muted">Predicate pushdown, subquery elimination.</p>
          </div>
        </GTabPanel>
      </GTab>
    `,
  }),
};

export const ManyTabsStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GTab>
  <GTabPanel name="Overview" :icon="GIconName.Home">
    <p>Project overview.</p>
  </GTabPanel>
  <GTabPanel name="Activity" :icon="GIconName.Clock">
    <p>Activity feed.</p>
  </GTabPanel>
</GTab>`,
      },
    },
  },
  render: () => ({
    components: {
      GTab,
      GTabPanel,
    },
    setup () {
      return {
        GIconName,
      };
    },
    template: `
      <GTab>
        <GTabPanel name="Overview" :icon="GIconName.Home">
          <div class="p-md"><p class="text-sm gui-neutral-fg-muted">Project overview.</p></div>
        </GTabPanel>
        <GTabPanel name="Activity" :icon="GIconName.Clock">
          <div class="p-md"><p class="text-sm gui-neutral-fg-muted">Activity feed.</p></div>
        </GTabPanel>
        <GTabPanel name="Members" :icon="GIconName.Users">
          <div class="p-md"><p class="text-sm gui-neutral-fg-muted">Team members.</p></div>
        </GTabPanel>
        <GTabPanel name="Settings" :icon="GIconName.Gear">
          <div class="p-md"><p class="text-sm gui-neutral-fg-muted">Configuration.</p></div>
        </GTabPanel>
        <GTabPanel name="Billing" :icon="GIconName.ChartBar">
          <div class="p-md"><p class="text-sm gui-neutral-fg-muted">Billing info.</p></div>
        </GTabPanel>
        <GTabPanel name="Integrations" :icon="GIconName.Link">
          <div class="p-md"><p class="text-sm gui-neutral-fg-muted">Connected services.</p></div>
        </GTabPanel>
      </GTab>
    `,
  }),
};

export const DefaultTabStoryWithDefault: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GTab default-tab="Settings">
  <GTabPanel name="Overview">
    <p>Overview content.</p>
  </GTabPanel>
  <GTabPanel name="Settings">
    <p>Settings opens by default.</p>
  </GTabPanel>
</GTab>`,
      },
    },
  },
  render: () => ({
    components: {
      GTab,
      GTabPanel,
    },
    template: `
      <GTab default-tab="Settings">
        <GTabPanel name="Overview">
          <div class="p-md"><p class="text-sm gui-neutral-fg-muted">Overview content.</p></div>
        </GTabPanel>
        <GTabPanel name="Settings">
          <div class="p-md"><p class="text-sm gui-neutral-fg-muted">Settings opens by default.</p></div>
        </GTabPanel>
      </GTab>
    `,
  }),
};

export const PlacementStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GTab :placement="TabPlacement.Left">
  <GTabPanel name="Tab A" :icon="GIconName.Home">
    <p>Left placement content A.</p>
  </GTabPanel>
  <GTabPanel name="Tab B" :icon="GIconName.Gear">
    <p>Left placement content B.</p>
  </GTabPanel>
</GTab>`,
      },
    },
  },
  render: () => ({
    components: {
      GTab,
      GTabPanel,
    },
    setup () {
      return {
        TabPlacement,
        GIconName,
      };
    },
    template: `
      <div class="flex flex-col gap-lg">
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-sm font-bold">Top (default)</p>
          <GTab :placement="TabPlacement.Top">
            <GTabPanel name="Tab A"><div class="p-md text-sm gui-neutral-fg-muted">Top placement content A.</div></GTabPanel>
            <GTabPanel name="Tab B"><div class="p-md text-sm gui-neutral-fg-muted">Top placement content B.</div></GTabPanel>
          </GTab>
        </div>
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-sm font-bold">Bottom</p>
          <GTab :placement="TabPlacement.Bottom">
            <GTabPanel name="Tab A"><div class="p-md text-sm gui-neutral-fg-muted">Bottom placement content A.</div></GTabPanel>
            <GTabPanel name="Tab B"><div class="p-md text-sm gui-neutral-fg-muted">Bottom placement content B.</div></GTabPanel>
          </GTab>
        </div>
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-sm font-bold">Left</p>
          <GTab :placement="TabPlacement.Left" class="h-40">
            <GTabPanel name="Tab A" :icon="GIconName.Home"><div class="p-md text-sm gui-neutral-fg-muted">Left placement content A.</div></GTabPanel>
            <GTabPanel name="Tab B" :icon="GIconName.Gear"><div class="p-md text-sm gui-neutral-fg-muted">Left placement content B.</div></GTabPanel>
          </GTab>
        </div>
        <div>
          <p class="text-xs gui-neutral-fg-muted mb-sm font-bold">Right</p>
          <GTab :placement="TabPlacement.Right" class="h-40">
            <GTabPanel name="Tab A" :icon="GIconName.Home"><div class="p-md text-sm gui-neutral-fg-muted">Right placement content A.</div></GTabPanel>
            <GTabPanel name="Tab B" :icon="GIconName.Gear"><div class="p-md text-sm gui-neutral-fg-muted">Right placement content B.</div></GTabPanel>
          </GTab>
        </div>
      </div>
    `,
  }),
};
