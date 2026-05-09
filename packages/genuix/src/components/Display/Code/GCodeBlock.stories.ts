/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GCodeBlock from './GCodeBlock.vue';
import {
  GCodeLanguage,
  GCodeBlockSemantic,
  GHighlightTheme,
} from './types';
import {
  GProminence,
} from '@/types';
import {
  GIconName,
} from '@/components/Display/Icon/types';

const meta = {
  title: 'Components/Display/Code/GCodeBlock',
  tags: ['autodocs'],
  component: GCodeBlock,
  argTypes: {
    id: {
      control: 'text',
      description: 'Block id, used for line anchors (#{id}-L{n})',
    },
    title: {
      control: 'text',
      description: 'Optional title displayed in header',
    },
    icon: {
      control: 'select',
      options: Object.values(GIconName),
      description: 'Optional icon displayed before title',
    },
    code: {
      control: 'text',
      description: 'Code string',
    },
    language: {
      control: 'select',
      options: Object.values(GCodeLanguage),
      description: 'Language for syntax highlighting',
    },
    showLineNumbers: {
      control: 'boolean',
      description: 'Show line numbers',
    },
    wordWrap: {
      control: 'boolean',
      description: 'Wrap long lines (true) or scroll horizontally (false)',
    },
    prominence: {
      control: 'select',
      options: Object.values(GProminence),
      description: 'GProminence level: tertiary, secondary, primary',
    },
    semantic: {
      control: 'select',
      options: Object.values(GCodeBlockSemantic),
      description: 'Color role for border, header, and language label',
    },
    highlightTheme: {
      control: 'select',
      options: Object.values(GHighlightTheme),
      description: 'Built-in syntax highlight theme (auto-switches light/dark)',
    },
    showHeader: {
      control: 'boolean',
      description: 'Show or hide the header bar',
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicCodeBlockStory: Story = {
  args: {
    id: 'basic',
    language: GCodeLanguage.Typescript,
    showLineNumbers: true,
    code: `interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): User {
  return { id, name: 'Alice', email: 'alice@example.com' };
}`,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default code block with line numbers',
      },
      source: {
        code: '<GCodeBlock id="basic" :language="GCodeLanguage.Typescript" show-line-numbers :code="code" />',
      },
    },
  },
};

export const WordWrapCodeBlockStory: Story = {
  args: {
    id: 'wrap',
    language: GCodeLanguage.Typescript,
    showLineNumbers: true,
    code: `const longString = "This is a very long string that will demonstrate how word wrapping works when the content exceeds the container width, breaking onto the next line while keeping the line number anchored to the top";

function processData(input: { name: string; email: string; address: string; phone: string; metadata: Record<string, unknown> }): void {
  console.log(input);
}`,
  },
  parameters: {
    docs: {
      description: {
        story: 'Word wrap enabled (default) vs disabled (scroll)',
      },
      source: {
        code: '<GCodeBlock id="wrap" :language="GCodeLanguage.Typescript" show-line-numbers word-wrap :code="code" />',
      },
    },
  },
};

export const TitledCodeBlockStory: Story = {
  args: {
    id: 'titled',
    title: 'src/main.ts',
    language: GCodeLanguage.Typescript,
    showLineNumbers: true,
    code: `import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');`,
  },
  parameters: {
    docs: {
      description: {
        story: 'Code block with a title prop (e.g. filename)',
      },
      source: {
        code: '<GCodeBlock id="titled" title="src/main.ts" :language="GCodeLanguage.Typescript" show-line-numbers :code="code" />',
      },
    },
  },
};

export const AllSemanticsCodeBlockStory: Story = {
  args: {
    id: 'semantics',
    language: GCodeLanguage.Bash,
    code: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'All semantic colors with titles',
      },
      source: {
        code: '<GCodeBlock id="sem-info" :language="GCodeLanguage.Bash" :code="\'npm install\'" :semantic="GCodeBlockSemantic.Info" title="Installation" />',
      },
    },
  },
  render: () => ({
    components: {
      GCodeBlock,
    },
    setup () {
      return {
        GCodeLanguage,
        GCodeBlockSemantic,
      };
    },
    template: `
      <div class="flex flex-col gap-spacing-4">
        <GCodeBlock id="sem-neutral" :language="GCodeLanguage.Bash" :code="'npm install @hdnax/genuix'" :semantic="GCodeBlockSemantic.Neutral" title="Neutral" />
        <GCodeBlock id="sem-info" :language="GCodeLanguage.Bash" :code="'npm install @hdnax/genuix'" :semantic="GCodeBlockSemantic.Info" title="Installation" />
        <GCodeBlock id="sem-danger" :language="GCodeLanguage.Bash" :code="'rm -rf /'" :semantic="GCodeBlockSemantic.Danger" title="Do not run this" />
        <GCodeBlock id="sem-warning" :language="GCodeLanguage.Typescript" :semantic="GCodeBlockSemantic.Warning" :code="'// @deprecated Use fetchData() instead\\nfunction getData() { return fetch(\\'/api\\'); }'" title="Deprecated" />
        <GCodeBlock id="sem-success" :language="GCodeLanguage.Bash" :semantic="GCodeBlockSemantic.Success" :code="'vite v6.0.0 building...\\n✓ built in 1.2s'" title="Build output" />
      </div>
    `,
  }),
};

export const AllProminencesCodeBlockStory: Story = {
  args: {
    id: 'prominences',
    language: GCodeLanguage.Bash,
    code: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tertiary, secondary, and primary prominences with info semantic',
      },
      source: {
        code: '<GCodeBlock id="prom-secondary" :language="GCodeLanguage.Bash" :prominence="GProminence.Secondary" :semantic="GCodeBlockSemantic.Info" :code="\'npm install\'" title="Secondary" />',
      },
    },
  },
  render: () => ({
    components: {
      GCodeBlock,
    },
    setup () {
      return {
        GCodeLanguage,
        GProminence,
        GCodeBlockSemantic,
      };
    },
    template: `
      <div class="flex flex-col gap-spacing-4">
        <GCodeBlock id="prom-tertiary" :language="GCodeLanguage.Bash" :prominence="GProminence.Tertiary" :semantic="GCodeBlockSemantic.Info" :code="'npm install @hdnax/genuix'" title="Tertiary (default)" />
        <GCodeBlock id="prom-secondary" :language="GCodeLanguage.Bash" :prominence="GProminence.Secondary" :semantic="GCodeBlockSemantic.Info" :code="'npm install @hdnax/genuix'" title="Secondary" />
        <GCodeBlock id="prom-primary" :language="GCodeLanguage.Bash" :prominence="GProminence.Primary" :semantic="GCodeBlockSemantic.Info" :code="'npm install @hdnax/genuix'" title="Primary" />
      </div>
    `,
  }),
};

export const LongTitleCodeBlockStory: Story = {
  args: {
    id: 'long-title',
    title: 'src/components/very/deeply/nested/folder/structure/that/goes/on/and/on/MyComponent.vue',
    language: GCodeLanguage.Typescript,
    showLineNumbers: true,
    code: 'export default defineComponent({ name: \'MyComponent\' });',
  },
  parameters: {
    docs: {
      description: {
        story: 'Long title truncated with ellipsis',
      },
      source: {
        code: '<GCodeBlock id="long-title" title="path/to/MyComponent.vue" :language="GCodeLanguage.Typescript" show-line-numbers :code="code" />',
      },
    },
  },
};

export const AllHighlightThemesStory: Story = {
  args: {
    id: 'themes',
    language: GCodeLanguage.Typescript,
    code: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'All built-in highlight themes (auto-switch with dark mode)',
      },
    },
  },
  render: () => ({
    components: {
      GCodeBlock,
    },
    setup () {
      return {
        GCodeLanguage,
        GHighlightTheme,
      };
    },
    template: `
      <div class="flex flex-col gap-spacing-4">
        <GCodeBlock
          v-for="theme in Object.values(GHighlightTheme)"
          :key="theme"
          :id="'theme-' + theme"
          :language="GCodeLanguage.Typescript"
          :highlight-theme="theme"
          :title="theme"
          show-line-numbers
          :code="'interface User {\\n  id: number;\\n  name: string;\\n}\\n\\nfunction greet(user: User): string {\\n  // Return greeting\\n  return \\'Hello, \\' + user.name;\\n}'"
        />
      </div>
    `,
  }),
};

export const CustomBodyBgStory: Story = {
  args: {
    id: 'custom-bg',
    language: GCodeLanguage.Typescript,
    showLineNumbers: true,
    highlightTheme: GHighlightTheme.TokyoNight,
    code: `function hello() {
  console.log("custom background");
}`,
  },
  parameters: {
    docs: {
      description: {
        story: 'Code block with custom body background via style prop',
      },
    },
  },
  render: () => ({
    components: {
      GCodeBlock,
    },
    setup () {
      return {
        GCodeLanguage,
        GHighlightTheme,
      };
    },
    template: `
      <GCodeBlock
        id="custom-bg"
        :language="GCodeLanguage.Typescript"
        :highlight-theme="GHighlightTheme.TokyoNight"
        show-line-numbers
        class="gui-danger-bg"
        :code="'function hello() {\\n  console.log(\\'custom background\\');\\n}'"
      />
    `,
  }),
};

export const NoHeaderStory: Story = {
  args: {
    id: 'no-header',
    language: GCodeLanguage.Typescript,
    showLineNumbers: true,
    hideHeader: true,
    code: `function hello() {
  console.log("no header");
}`,
  },
  parameters: {
    docs: {
      description: {
        story: 'Code block with header hidden',
      },
      source: {
        code: '<GCodeBlock id="no-header" :language="GCodeLanguage.Typescript" :show-header="false" show-line-numbers :code="code" />',
      },
    },
  },
};

export const IconCodeBlockStory: Story = {
  args: {
    id: 'icon',
    title: 'Terminal',
    icon: GIconName.Code,
    language: GCodeLanguage.Bash,
    code: 'npm install @hdnax/genuix',
  },
  parameters: {
    docs: {
      description: {
        story: 'Code block with icon in header',
      },
      source: {
        code: '<GCodeBlock id="icon" title="Terminal" :icon="GIconName.Code" :language="GCodeLanguage.Bash" code="npm install @hdnax/genuix" />',
      },
    },
  },
};
