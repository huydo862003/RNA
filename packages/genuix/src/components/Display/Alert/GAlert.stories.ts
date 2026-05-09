/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GAlert from './GAlert.vue';
import {
  GAlertSemantic,
} from './types';

const meta = {
  title: 'Components/Display/GAlert',
  tags: ['autodocs'],
  component: GAlert,
  argTypes: {
    semantic: {
      control: 'select',
      options: Object.values(GAlertSemantic),
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GAlert>Your changes have been saved.</GAlert>',
      },
    },
  },
  render: () => ({
    components: {
      GAlert,
    },
    template: `
      <GAlert>Your changes have been saved.</GAlert>
    `,
  }),
};

export const SemanticsStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GAlert semantic="info">Informational message.</GAlert>
<GAlert semantic="success">Operation succeeded.</GAlert>
<GAlert semantic="warning">Proceed with caution.</GAlert>
<GAlert semantic="danger">Something went wrong.</GAlert>`,
      },
    },
  },
  render: () => ({
    components: {
      GAlert,
    },
    setup () {
      return {
        GAlertSemantic,
      };
    },
    template: `
      <div class="flex flex-col gap-sm">
        <GAlert :semantic="GAlertSemantic.Info">This is an informational message.</GAlert>
        <GAlert :semantic="GAlertSemantic.Success">Your data has been saved successfully.</GAlert>
        <GAlert :semantic="GAlertSemantic.Warning">Your session is about to expire.</GAlert>
        <GAlert :semantic="GAlertSemantic.Danger">Unable to connect to the server.</GAlert>
      </div>
    `,
  }),
};

export const WithTitleStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GAlert semantic="warning" title="Heads up">This action cannot be undone.</GAlert>',
      },
    },
  },
  render: () => ({
    components: {
      GAlert,
    },
    setup () {
      return {
        GAlertSemantic,
      };
    },
    template: `
      <div class="flex flex-col gap-sm">
        <GAlert :semantic="GAlertSemantic.Warning" title="Heads up">This action cannot be undone.</GAlert>
        <GAlert :semantic="GAlertSemantic.Danger" title="Error">Failed to delete the record. Please try again.</GAlert>
      </div>
    `,
  }),
};
