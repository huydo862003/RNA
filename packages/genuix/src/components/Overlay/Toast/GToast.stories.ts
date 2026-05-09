/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import {
  useTemplateRef,
} from 'vue';
import GToast from './GToast.vue';
import {
  GToastSemantic,
} from './types';

const meta = {
  title: 'Components/Overlay/GToast',
  tags: ['autodocs'],
  component: GToast,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `<GToast ref="toast" />
<button @click="toast.add('Hello!')">Show toast</button>`,
      },
    },
  },
  render: () => ({
    components: {
      GToast,
    },
    setup () {
      const toast = useTemplateRef<InstanceType<typeof GToast>>('toast');

      function showInfo () {
        toast.value?.push('This is an info message.', GToastSemantic.Info);
      }

      function showSuccess () {
        toast.value?.push('Operation completed successfully!', GToastSemantic.Success);
      }

      function showWarning () {
        toast.value?.push('Proceed with caution.', GToastSemantic.Warning);
      }

      function showDanger () {
        toast.value?.push('Something went wrong.', GToastSemantic.Danger);
      }

      return {
        toast,
        showInfo,
        showSuccess,
        showWarning,
        showDanger,
      };
    },
    template: `
      <GToast ref="toast" />
      <div class="flex gap-sm flex-wrap">
        <button type="button" class="border gui-neutral-border rounded px-sm py-xs text-xs cursor-pointer" @click="showInfo">Info toast</button>
        <button type="button" class="border gui-neutral-border rounded px-sm py-xs text-xs cursor-pointer" @click="showSuccess">Success toast</button>
        <button type="button" class="border gui-neutral-border rounded px-sm py-xs text-xs cursor-pointer" @click="showWarning">Warning toast</button>
        <button type="button" class="border gui-neutral-border rounded px-sm py-xs text-xs cursor-pointer" @click="showDanger">Danger toast</button>
      </div>
    `,
  }),
};
