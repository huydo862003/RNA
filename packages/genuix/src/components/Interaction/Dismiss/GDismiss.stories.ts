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
import GDismiss from './GDismiss.vue';

const meta = {
  title: 'Components/Interaction/GDismiss',
  tags: ['autodocs'],
  component: GDismiss,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicDismissStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Click inside the blue box to select it. Click outside to dismiss.',
      },
    },
  },
  render: () => ({
    components: {
      GDismiss,
    },
    setup () {
      const active = ref(false);
      function activate () {
        active.value = true;
      }
      function dismiss () {
        active.value = false;
      }
      return {
        active,
        activate,
        dismiss,
      };
    },
    template: `
      <div class="p-spacing-4">
        <p class="text-xs gui-neutral-fg-muted mb-spacing-3">
          {{ active ? 'Active — click outside to dismiss' : 'Click the box to activate' }}
        </p>
        <GDismiss @dismiss="dismiss">
          <div
            class="w-[200px] h-[100px] rounded-md flex items-center justify-center cursor-pointer transition-colors text-sm font-medium"
            :class="active ? 'gui-info-bg-hover gui-info-fg' : 'gui-neutral-bg-subtle gui-neutral-fg-muted'"
            @click="activate"
          >
            {{ active ? 'Active' : 'Inactive' }}
          </div>
        </GDismiss>
      </div>
    `,
  }),
};

export const IgnoreDismissStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The "Ignore me" button is in the ignore list — clicking it will not dismiss.',
      },
    },
  },
  render: () => ({
    components: {
      GDismiss,
    },
    setup () {
      const active = ref(false);
      const ignoredRef = ref(null);
      function activate () {
        active.value = true;
      }
      function dismiss () {
        active.value = false;
      }
      return {
        active,
        ignoredRef,
        activate,
        dismiss,
      };
    },
    template: `
      <div class="p-spacing-4 flex gap-spacing-4 items-start">
        <GDismiss :options="{ ignore: [ignoredRef] }" @dismiss="dismiss">
          <div
            class="w-[200px] h-[100px] rounded-md flex items-center justify-center cursor-pointer transition-colors text-sm font-medium"
            :class="active ? 'gui-info-bg-hover gui-info-fg' : 'gui-neutral-bg-subtle gui-neutral-fg-muted'"
            @click="activate"
          >
            {{ active ? 'Active' : 'Click me' }}
          </div>
        </GDismiss>
        <div class="flex flex-col gap-spacing-2">
          <button
            ref="ignoredRef"
            class="px-spacing-3 py-spacing-2 rounded-md gui-warning-bg-hover gui-warning-fg text-sm font-medium"
          >
            Ignore me
          </button>
          <button
            class="px-spacing-3 py-spacing-2 rounded-md gui-danger-bg-hover gui-danger-fg text-sm font-medium"
          >
            Dismiss me
          </button>
        </div>
      </div>
    `,
  }),
};
