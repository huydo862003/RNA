/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GLogo from './GLogo.vue';
import {
  Size,
} from '@/types';

const meta = {
  title: 'Components/Display/GLogo',
  tags: ['autodocs'],
  component: GLogo,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(Size),
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ImageWithTextStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GLogo src="https://huydo862003.github.io/sqlingo.js/icon.svg" alt="sqlingo.js" text="sqlingo.js" />',
      },
    },
  },
  render: () => ({
    components: {
      GLogo,
    },
    template: `
      <GLogo
        src="https://huydo862003.github.io/sqlingo.js/icon.svg"
        alt="sqlingo.js"
        text="sqlingo.js"
      />
    `,
  }),
};

export const ImageOnlyStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GLogo src="https://huydo862003.github.io/sqlingo.js/icon.svg" alt="sqlingo.js" />',
      },
    },
  },
  render: () => ({
    components: {
      GLogo,
    },
    template: `
      <GLogo
        src="https://huydo862003.github.io/sqlingo.js/icon.svg"
        alt="sqlingo.js"
      />
    `,
  }),
};

export const TextOnlyStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GLogo text="genuix" />',
      },
    },
  },
  render: () => ({
    components: {
      GLogo,
    },
    template: `
      <GLogo text="genuix" />
    `,
  }),
};

export const WithLinkStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GLogo src="https://huydo862003.github.io/sqlingo.js/icon.svg" alt="sqlingo.js" text="sqlingo.js" href="https://huydo862003.github.io/sqlingo.js/" />',
      },
    },
  },
  render: () => ({
    components: {
      GLogo,
    },
    template: `
      <GLogo
        src="https://huydo862003.github.io/sqlingo.js/icon.svg"
        alt="sqlingo.js"
        text="sqlingo.js"
        href="https://huydo862003.github.io/sqlingo.js/"
      />
    `,
  }),
};

export const SlotContentStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GLogo>
  <span>🗃️</span>
  <template #text>
    <span>sqlingo.js</span>
  </template>
</GLogo>`,
      },
    },
  },
  render: () => ({
    components: {
      GLogo,
    },
    template: `
      <GLogo>
        <span class="text-2xl">🗃️</span>
        <template #text>
          <span class="font-black tracking-tight">sqlingo.js</span>
        </template>
      </GLogo>
    `,
  }),
};

export const SizesStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GLogo :size="Size.Md" src="icon.svg" alt="logo" text="sqlingo.js" />',
      },
    },
  },
  render: () => ({
    components: {
      GLogo,
    },
    setup () {
      return {
        Size,
      };
    },
    template: `
      <div class="flex flex-col gap-md items-start">
        <GLogo v-for="s in Object.values(Size)" :key="s" :size="s"
          src="https://huydo862003.github.io/sqlingo.js/icon.svg"
          alt="sqlingo.js"
          :text="'sqlingo.js (' + s + ')'"
        />
      </div>
    `,
  }),
};

export const BorderedStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GLogo class="border rounded-lg p-xs" src="icon.svg" alt="sqlingo.js" text="sqlingo.js" />',
      },
    },
  },
  render: () => ({
    components: {
      GLogo,
    },
    template: `
      <div class="flex gap-md items-center">
        <GLogo
          class="border gui-neutral-border-subtle rounded-lg p-xs"
          src="https://huydo862003.github.io/sqlingo.js/icon.svg"
          alt="sqlingo.js"
          text="sqlingo.js"
        />
        <GLogo
          src="https://huydo862003.github.io/sqlingo.js/icon.svg"
          alt="sqlingo.js"
          text="sqlingo.js"
        />
      </div>
    `,
  }),
};
