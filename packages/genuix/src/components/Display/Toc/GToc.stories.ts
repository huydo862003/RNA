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
import GToc from './GToc.vue';
import GTocItem from './GTocItem.vue';
import GIcon from '@/components/Display/Icon/GIcon.vue';
import {
  GIconName,
} from '@/components/Display/Icon/types';

const meta = {
  title: 'Components/Display/GToc',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Compound table of contents / hierarchy list with active item tracking.',
      },
    },
  },
  component: GToc,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: {
      GToc,
      GTocItem,
    },
    setup () {
      const active = ref('intro');

      return {
        active,
      };
    },
    template: `
      <GToc label="On this page" style="max-width: 240px">
        <GTocItem item-id="intro">Introduction</GTocItem>
        <GTocItem item-id="install">Installation</GTocItem>
        <GTocItem item-id="usage">Usage</GTocItem>
        <GTocItem item-id="api">API Reference</GTocItem>
        <GTocItem item-id="faq">FAQ</GTocItem>
      </GToc>
    `,
  }),
};

export const Nested: Story = {
  render: () => ({
    components: {
      GToc,
      GTocItem,
    },
    setup () {
      const active = ref('ch1');

      return {
        active,
      };
    },
    template: `
      <GToc label="Book" style="max-width: 240px">
        <GTocItem item-id="ch1">
          Chapter 1: Basics
          <template #children>
            <GTocItem item-id="ch1-1">1.1 Getting Started</GTocItem>
            <GTocItem item-id="ch1-2">1.2 Configuration</GTocItem>
          </template>
        </GTocItem>
        <GTocItem item-id="ch2">
          Chapter 2: Advanced
          <template #children>
            <GTocItem item-id="ch2-1">2.1 Plugins</GTocItem>
            <GTocItem item-id="ch2-2">
              2.2 Internals
              <template #children>
                <GTocItem item-id="ch2-2-1">2.2.1 Parser</GTocItem>
                <GTocItem item-id="ch2-2-2">2.2.2 Compiler</GTocItem>
              </template>
            </GTocItem>
          </template>
        </GTocItem>
        <GTocItem item-id="ch3">Chapter 3: Reference</GTocItem>
      </GToc>
    `,
  }),
};

export const BookHierarchy: Story = {
  render: () => ({
    components: {
      GToc,
      GTocItem,
      GIcon,
    },
    setup () {
      const active = ref('ch1');

      return {
        active,
        GIconName,
      };
    },
    template: `
      <GToc style="max-width: 480px">
        <GTocItem item-id="book1">
          <template #leading>
            <GIcon :name="GIconName.Book" :size="16" />
          </template>
          The design of everyday things
          <template #meta>Don Norman &middot; 2013</template>
          <template #children>
            <GTocItem item-id="ch1">
              Chapter 1. the psychopathology of everyday things
              <template #trailing>Don Norman</template>
            </GTocItem>
            <GTocItem item-id="ch2">
              Chapter 2. the psychology of everyday actions
              <template #trailing>Don Norman</template>
            </GTocItem>
          </template>
        </GTocItem>
      </GToc>
    `,
  }),
};
