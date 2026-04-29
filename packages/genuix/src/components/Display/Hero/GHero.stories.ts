/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
*/

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GHero from './GHero.vue';

const meta = {
  title: 'Components/Display/GHero',
  parameters: {
    docs: {
      description: {
        component: 'Hero section with icon, title, and description slots.',
      },
    },
  },
  tags: ['autodocs'],
  component: GHero,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SqlingoStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'sqlingo.js homepage hero.',
      },
      source: {
        code: `<GHero>
  <template #icon>
    <img src="https://huydo862003.github.io/sqlingo.js/icon.svg" alt="sqlingo.js" />
  </template>
  <template #title>
    <h1>sqlingo.js: A Typescript/Javascript port of SQLGlot</h1>
  </template>
  <template #description>
    <p>A JavaScript/TypeScript SQL parser, transpiler, and optimizer.</p>
  </template>
</GHero>`,
      },
    },
  },
  render: () => ({
    components: {
      GHero,
    },
    template: `
      <GHero>
        <template #icon>
          <img
            src="https://huydo862003.github.io/sqlingo.js/icon.svg"
            alt="sqlingo.js logo"
            class="w-20 h-20 rounded-xl border gui-neutral-border-subtle bg-white"
            style="box-shadow: 0 2px 8px rgba(0,0,0,0.08);"
          />
        </template>
        <template #title>
          <h1 class="text-3xl font-black leading-6">
            sqlingo.js: A Typescript/Javascript port of SQLGlot
          </h1>
        </template>
        <template #description>
          <p class="text-sm gui-neutral-fg-muted leading-relaxed">
            A JavaScript/TypeScript SQL parser, transpiler, and optimizer ported from SQLGlot.
            Parse, transpile, optimize, and run SQL across 33+ dialects in the browser or Node.js.
          </p>
        </template>
      </GHero>
    `,
  }),
};

export const IconOnlyStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GHero>
  <template #icon>
    <span>🚀</span>
  </template>
</GHero>`,
      },
    },
  },
  render: () => ({
    components: {
      GHero,
    },
    template: `
      <GHero>
        <template #icon>
          <span class="text-5xl">🚀</span>
        </template>
      </GHero>
    `,
  }),
};

export const TitleOnlyStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GHero>
  <template #title>
    <h1>Standalone Title</h1>
  </template>
</GHero>`,
      },
    },
  },
  render: () => ({
    components: {
      GHero,
    },
    template: `
      <GHero>
        <template #title>
          <h1 class="text-2xl font-bold">Standalone Title</h1>
        </template>
      </GHero>
    `,
  }),
};

export const WithHeaderStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GHero>
  <template #header>
    <nav><a href="#">Docs</a></nav>
  </template>
  <template #title>
    <h1>Project Name</h1>
  </template>
  <template #description>
    <p>A brief tagline for the project.</p>
  </template>
</GHero>`,
      },
    },
  },
  render: () => ({
    components: {
      GHero,
    },
    template: `
      <GHero>
        <template #header>
          <nav class="flex justify-center gap-md text-sm gui-neutral-fg-muted">
            <a href="#">Docs</a>
            <a href="#">Blog</a>
            <a href="#">GitHub</a>
          </nav>
        </template>
        <template #title>
          <h1 class="text-2xl font-bold">Project Name</h1>
        </template>
        <template #description>
          <p class="text-sm gui-neutral-fg-muted">A brief tagline for the project.</p>
        </template>
      </GHero>
    `,
  }),
};

export const WithFooterStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GHero>
  <template #icon>
    <span>📦</span>
  </template>
  <template #title>
    <h1>Get Started</h1>
  </template>
  <template #description>
    <p>Install the package and start building.</p>
  </template>
  <template #footer>
    <code>npm install my-lib</code>
  </template>
</GHero>`,
      },
    },
  },
  render: () => ({
    components: {
      GHero,
    },
    template: `
      <GHero>
        <template #icon>
          <span class="text-4xl">📦</span>
        </template>
        <template #title>
          <h1 class="text-2xl font-bold">Get Started</h1>
        </template>
        <template #description>
          <p class="text-sm gui-neutral-fg-muted">Install the package and start building.</p>
        </template>
        <template #footer>
          <div class="flex gap-sm justify-center">
            <code class="text-xs gui-neutral-bg-subtle px-sm py-xs rounded-md gui-neutral-border-subtle border">npm install my-lib</code>
          </div>
        </template>
      </GHero>
    `,
  }),
};

export const WithHeaderAndFooterStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GHero>
  <template #header>
    <span>v2.0 Released</span>
  </template>
  <template #icon>
    <span>⚡</span>
  </template>
  <template #title>
    <h1>Lightning Fast</h1>
  </template>
  <template #description>
    <p>Built for speed. Zero dependencies. Runs everywhere.</p>
  </template>
  <template #footer>
    <img src="badge.svg" alt="badge" />
  </template>
</GHero>`,
      },
    },
  },
  render: () => ({
    components: {
      GHero,
    },
    template: `
      <GHero>
        <template #header>
          <span class="text-xs gui-info-fg font-medium gui-info-bg-hover px-sm py-xs rounded-full">v2.0 Released</span>
        </template>
        <template #icon>
          <span class="text-4xl">⚡</span>
        </template>
        <template #title>
          <h1 class="text-3xl font-black">Lightning Fast</h1>
        </template>
        <template #description>
          <p class="text-sm gui-neutral-fg-muted leading-relaxed">
            Built for speed. Zero dependencies. Runs everywhere.
          </p>
        </template>
        <template #footer>
          <div class="flex gap-sm justify-center flex-wrap">
            <img src="https://img.shields.io/badge/bundle-2kb-green" alt="2kb" />
            <img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT" />
          </div>
        </template>
      </GHero>
    `,
  }),
};

export const DescriptionOnlyStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GHero>
  <template #description>
    <p>A description-only hero.</p>
  </template>
</GHero>`,
      },
    },
  },
  render: () => ({
    components: {
      GHero,
    },
    template: `
      <GHero>
        <template #description>
          <p class="text-sm gui-neutral-fg-muted leading-relaxed mx-auto">
            A description-only hero. Useful for subtle introductory text without a heading.
          </p>
        </template>
      </GHero>
    `,
  }),
};
