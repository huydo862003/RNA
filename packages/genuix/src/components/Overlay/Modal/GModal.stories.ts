/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import GModal from './GModal.vue';
import GButton from '@/components/Input/Button/GButton.vue';
import {
  useModal,
} from '@/composables/useModal';

const meta = {
  title: 'Components/Overlay/GModal',
  tags: ['autodocs'],
  component: GModal,
  args: {
    name: 'default',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultStory: Story = {
  parameters: {
    docs: {
      source: {
        code: `const modal = useModal();
modal.push('confirm');

<GModal name="confirm">
  <template #header><h3>Title</h3></template>
  Content
  <template #footer>
    <GButton @click="modal.pop('confirm')">Close</GButton>
  </template>
</GModal>`,
      },
    },
  },
  render: () => ({
    components: {
      GModal,
      GButton,
    },
    setup () {
      const modal = useModal();
      return {
        modal,
      };
    },
    template: `
      <div>
        <GButton @click="modal.push('confirm')">Open Modal</GButton>
        <GModal name="confirm">
          <template #header>
            <h3 class="text-md font-bold">Confirm action</h3>
          </template>
          <p class="text-sm gui-neutral-fg-muted">Are you sure you want to proceed?</p>
          <template #footer>
            <GButton prominence="ghost" @click="modal.pop('confirm')">Cancel</GButton>
            <GButton semantic="info" @click="modal.pop('confirm')">Confirm</GButton>
          </template>
        </GModal>
      </div>
    `,
  }),
};

export const NestedStory: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Nested modals via stack. Opening a second modal layers it on top.',
      },
      source: {
        code: `modal.push('outer');
// from inside outer:
modal.push('inner');`,
      },
    },
  },
  render: () => ({
    components: {
      GModal,
      GButton,
    },
    setup () {
      const modal = useModal();
      return {
        modal,
      };
    },
    template: `
      <div>
        <GButton @click="modal.push('outer')">Open Outer</GButton>
        <GModal name="outer">
          <template #header>
            <h3 class="text-md font-bold">Outer Modal</h3>
          </template>
          <p class="text-sm gui-neutral-fg-muted mb-sm">This is the outer modal.</p>
          <GButton @click="modal.push('inner')">Open Inner</GButton>
          <template #footer>
            <GButton @click="modal.pop('outer')">Close</GButton>
          </template>
        </GModal>
        <GModal name="inner" size="sm">
          <template #header>
            <h3 class="text-md font-bold">Inner Modal</h3>
          </template>
          <p class="text-sm gui-neutral-fg-muted">Nested on top of outer.</p>
          <template #footer>
            <GButton @click="modal.pop('inner')">Close</GButton>
          </template>
        </GModal>
      </div>
    `,
  }),
};

export const SizesStory: Story = {
  parameters: {
    docs: {
      source: {
        code: '<GModal name="lg" size="lg">...</GModal>',
      },
    },
  },
  render: () => ({
    components: {
      GModal,
      GButton,
    },
    setup () {
      const modal = useModal();
      return {
        modal,
      };
    },
    template: `
      <div class="flex gap-sm">
        <GButton @click="modal.push('sm')">Small</GButton>
        <GButton @click="modal.push('lg')">Large</GButton>
        <GButton @click="modal.push('xl')">XL</GButton>
        <GModal name="sm" size="sm">
          <template #header><h3 class="text-md font-bold">Small</h3></template>
          <p class="text-sm gui-neutral-fg-muted">max-width: 25rem</p>
        </GModal>
        <GModal name="lg" size="lg">
          <template #header><h3 class="text-md font-bold">Large</h3></template>
          <p class="text-sm gui-neutral-fg-muted">max-width: 45rem</p>
        </GModal>
        <GModal name="xl" size="xl">
          <template #header><h3 class="text-md font-bold">XL</h3></template>
          <p class="text-sm gui-neutral-fg-muted">max-width: 60rem</p>
        </GModal>
      </div>
    `,
  }),
};
