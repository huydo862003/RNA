/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GNavbar from './GNavbar.vue';
import GNavBrand from './GNavBrand.vue';
import GNavLink from './GNavLink.vue';
import GNavMenu from './GNavMenu.vue';
import {
  GIconName,
} from '@/components/Display/Icon/types';

const meta = {
  title: 'Components/Display/GNavbar',
  tags: ['autodocs'],
  component: GNavbar,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GNavbar>
  <template #left>
    <GNavBrand href="/">My App</GNavBrand>
  </template>
  <template #right>
    <GNavLink href="/docs" label="Docs" />
    <GNavLink href="/about" label="About" />
  </template>
</GNavbar>`,
      },
    },
  },
  render: () => ({
    components: {
      GNavbar,
      GNavBrand,
      GNavLink,
    },
    template: `
      <GNavbar>
        <template #left>
          <GNavBrand href="/">My App</GNavBrand>
        </template>
        <template #right>
          <GNavLink href="/docs" label="Docs" />
          <GNavLink href="/about" label="About" />
          <GNavLink href="/blog" label="Blog" />
        </template>
      </GNavbar>
    `,
  }),
};

export const WithIconsStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GNavLink href="/" :icon="GIconName.Home" label="Home" />',
      },
    },
  },
  render: () => ({
    components: {
      GNavbar,
      GNavBrand,
      GNavLink,
    },
    setup () {
      return {
        GIconName,
      };
    },
    template: `
      <GNavbar>
        <template #left>
          <GNavBrand href="/">
            <span class="text-lg">🗃️</span>
            sqlingo.js
          </GNavBrand>
        </template>
        <template #right>
          <GNavLink href="/" :icon="GIconName.Home" label="Home" />
          <GNavLink href="/api" :icon="GIconName.Book" label="API" />
          <GNavLink href="/playground" :icon="GIconName.Play" label="Playground" />
        </template>
      </GNavbar>
    `,
  }),
};

export const WithMenuStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GNavMenu label="More">
  <GNavLink href="/settings" label="Settings" />
  <GNavLink href="/help" label="Help" />
</GNavMenu>`,
      },
    },
  },
  render: () => ({
    components: {
      GNavbar,
      GNavBrand,
      GNavLink,
      GNavMenu,
    },
    setup () {
      return {
        GIconName,
      };
    },
    template: `
      <GNavbar>
        <template #left>
          <GNavBrand href="/">App</GNavBrand>
        </template>
        <template #right>
          <GNavLink href="/docs" label="Docs" />
          <GNavMenu label="More">
            <GNavLink href="/settings" :icon="GIconName.Gear" label="Settings" />
            <GNavLink href="/help" :icon="GIconName.Info" label="Help" />
            <GNavLink href="/about" :icon="GIconName.User" label="About" />
          </GNavMenu>
        </template>
      </GNavbar>
    `,
  }),
};

export const NestedMenuStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GNavMenu label="Products">
  <GNavLink href="/a" label="Product A" />
  <GNavMenu label="More Products">
    <GNavLink href="/b" label="Product B" />
  </GNavMenu>
</GNavMenu>`,
      },
    },
  },
  render: () => ({
    components: {
      GNavbar,
      GNavBrand,
      GNavLink,
      GNavMenu,
    },
    template: `
      <GNavbar>
        <template #left>
          <GNavBrand href="/">App</GNavBrand>
        </template>
        <template #right>
          <GNavMenu label="Products">
            <GNavLink href="/product-a" label="Product A" />
            <GNavLink href="/product-b" label="Product B" />
            <GNavMenu label="More">
              <GNavLink href="/product-c" label="Product C" />
              <GNavLink href="/product-d" label="Product D" />
            </GNavMenu>
          </GNavMenu>
          <GNavLink href="/pricing" label="Pricing" />
        </template>
      </GNavbar>
    `,
  }),
};
