<template>
  <div
    v-bind="$attrs"
    class="avatar-group"
  >
    <slot />
    <span
      v-if="overflow > 0"
      class="avatar-group-overflow"
    >
      +{{ overflow }}
    </span>
  </div>
</template>

<script setup lang="ts">
import {
  computed, provide, ref,
} from 'vue';
import {
  AVATAR_GROUP_KEY,
} from './types';

/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

defineOptions({
  inheritAttrs: false,
});

const {
  limit = 3,
} = defineProps<{
  /** Number of avatars that overflow and are hidden */
  limit?: number;
}>();

const count = ref(0);
const overflow = computed(() => Math.max(0, count.value - limit));

const avatars = ref<unknown[]>([]);

provide(AVATAR_GROUP_KEY, {
  register (avatar: unknown) {
    if (!avatars.value.includes(avatar)) {
      ++count.value;
      avatars.value.push(avatar);
    }
  },
  unregister (avatar: unknown) {
    const index = avatars.value.indexOf(avatar);

    if (0 <= index) {
      --count.value;
      avatars.value.splice(index, 1);
    }
  },
  isVisible (avatar: unknown): boolean {
    const index = avatars.value.indexOf(avatar);

    return index < limit;
  },
});
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.avatar-group {
  display: flex;
  align-items: center;
}

.avatar-group :deep(> *:not(:first-child)) {
  margin-left: calc(-1 * var(--spacing-sm));
}

.avatar-group :deep(> *) {
  border: 2px solid var(--gui-neutral-bg);
  border-radius: var(--radius-full);
}

.avatar-group-overflow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  background: var(--gui-neutral-bg-hover);
  color: var(--gui-neutral-fg-muted);
  font-size: var(--text-xs);
  font-weight: var(--font-weight-medium);
  margin-left: calc(-1 * var(--spacing-sm));
  border: 2px solid var(--gui-neutral-bg);
}
}
</style>
