<template>
  <Teleport to="body">
    <dialog
      v-bind="$attrs"
      :id="id"
      ref="dialogRef"
      :class="[
        'modal',
        `modal-${size}`,
      ]"
      @close="handleNativeClose"
      @click="handleBackdropClick"
    >
      <div
        class="modal-content"
        @click.stop
      >
        <div
          v-if="$slots.header"
          class="modal-header"
        >
          <slot name="header" />
          <button
            class="modal-close"
            type="button"
            @click="close"
          >
            <GIcon :name="GIconName.X" />
          </button>
        </div>
        <div class="modal-body">
          <slot />
        </div>
        <div
          v-if="$slots.footer"
          class="modal-footer"
        >
          <slot name="footer" />
        </div>
      </div>
    </dialog>
  </Teleport>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  computed,
  nextTick,
  provide,
  ref,
  watch,
} from 'vue';
import type {
  ModalSize,
} from './types';
import {
  POPPER_CONTAINER_KEY,
} from './types';
import {
  Size,
} from '@/types';
import {
  useModal,
} from '@/composables/useModal';
import GIcon from '@/components/Display/Icon/GIcon.vue';
import {
  GIconName,
} from '@/components/Display/Icon/types';

defineOptions({
  inheritAttrs: false,
});

const {
  id = undefined,
  name,
  size = Size.Md,
} = defineProps<{
  id?: string;
  /** Register with global modal stack, this should be unique */
  name: string | symbol;
  size?: ModalSize;
}>();

const modal = useModal();

const isOpen = computed({
  get: () => modal.isOpen(name).value,
  set: (v: boolean) => {
    if (v) {
      modal.push(name);
    } else {
      modal.pop(name);
    }
  },
});

const dialogRef = ref<HTMLDialogElement | null>(null);

// Nested tooltips/dropdowns should render inside the dialog, not body
provide(POPPER_CONTAINER_KEY, dialogRef);

watch(isOpen, async (open) => {
  await nextTick();
  if (!dialogRef.value) return;
  if (open) {
    dialogRef.value.showModal();
  } else {
    dialogRef.value.close();
  }
});

function close () {
  isOpen.value = false;
}

function open () {
  isOpen.value = true;
}

// Native <dialog> fires 'close' on Escape
function handleNativeClose () {
  isOpen.value = false;
}

function handleBackdropClick (e: MouseEvent) {
  if (e.target === dialogRef.value) {
    close();
  }
}

defineExpose({
  open,
  close,
  dialogRef,
});
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.modal {
  @apply fixed inset-0 m-auto rounded-md overflow-hidden p-0;
  z-index: var(--z-modal);
  border: none;
  max-height: 85vh;
}

.modal::backdrop {
  background: rgba(0, 0, 0, 0.5);
}

.modal[open] {
  animation: modal-in var(--duration-normal) var(--ease-out);
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-content {
  @apply gui-neutral-bg gui-neutral-fg flex flex-col overflow-y-auto;
  box-shadow: var(--shadow-lg);
}

.modal-header {
  @apply flex items-center justify-between px-md py-sm border-b gui-neutral-border-subtle;
}

.modal-body {
  @apply px-md py-md;
}

.modal-footer {
  @apply flex items-center justify-end gap-sm px-md py-sm border-t gui-neutral-border-subtle;
}

.modal-close {
  @apply cursor-pointer bg-transparent border-none gui-neutral-fg-muted;
  transition: color var(--duration-fast) var(--ease-default);
}

.modal-close:hover {
  @apply gui-neutral-fg;
}

/* Sizes */
.modal-xs {
  max-width: 20rem;
  width: calc(100vw - 2 * var(--spacing-md));
}
.modal-sm {
  max-width: 25rem;
  width: calc(100vw - 2 * var(--spacing-md));
}
.modal-md {
  max-width: 35rem;
  width: calc(100vw - 2 * var(--spacing-md));
}
.modal-lg {
  max-width: 45rem;
  width: calc(100vw - 2 * var(--spacing-md));
}
.modal-xl {
  max-width: 60rem;
  width: calc(100vw - 2 * var(--spacing-md));
}
}
</style>
