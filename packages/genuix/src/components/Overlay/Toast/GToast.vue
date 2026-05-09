<template>
  <Teleport to="body">
    <TransitionGroup
      name="toast"
      tag="div"
      class="toast-container"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast"
        :class="[`toast--${toast.semantic || 'info'}`]"
        role="status"
      >
        <span class="toast-message">{{ toast.message }}</span>
        <button
          v-inverted
          class="gui-neutral-fg cursor-pointer"
          :prominence="GButtonProminence.Ghost"
          aria-label="Dismiss"
          @click="() => remove(toast.id)"
        >
          <GIcon
            :name="GIconName.X"
            :size="12"
          />
        </button>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  ref,
} from 'vue';
import GIcon from '@/components/Display/Icon/GIcon.vue';
import {
  GIconName,
} from '@/components/Display/Icon/types';
import { GButtonProminence } from '@/components/Input';
import {
  vInverted,
} from '@/directives'
import { GToastOptions, GToastSemantic } from './types';

defineOptions({
  inheritAttrs: false,
});

interface ToastEntry {
  id: number;
  message: string;
  semantic?: GToastSemantic;
}

let nextId = 0;
const toasts = ref<ToastEntry[]>([]);

function push (
  message: string,
  semantic: GToastSemantic,
  { duration = 3000 }: GToastOptions = {},
) {
  const id = nextId++;

  toasts.value.push({
    id,
    message,
    semantic,
  });
  setTimeout(() => remove(id), duration);
}

function remove (id: number) {
  toasts.value = toasts.value.filter((toast) => toast.id !== id);
}

defineExpose({
  push,
  remove,
});
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.toast-container {
  position: fixed;
  bottom: var(--spacing-lg);
  right: var(--spacing-lg);
  display: flex;
  flex-direction: column-reverse;
  gap: var(--spacing-sm);
  z-index: var(--z-toast);
}

.toast {
  @apply w-72;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.toast--info {
  background: var(--gui-info-solid);
  color: white;
}

.toast--success {
  background: var(--gui-success-solid);
  color: white;
}

.toast--warning {
  background: var(--gui-warning-solid);
  color: white;
}

.toast--danger {
  background: var(--gui-danger-solid);
  color: white;
}

.toast-message {
  flex: 1;
}

.toast-dismiss:hover {
  opacity: 1;
}

.toast-enter-active,
.toast-leave-active {
  transition: all var(--duration-normal) var(--ease-default);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
}
</style>
