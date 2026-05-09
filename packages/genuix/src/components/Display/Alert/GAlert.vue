<template>
  <div
    v-bind="$attrs"
    class="alert"
    :class="[`alert--${semantic}`]"
    role="alert"
  >
    <div class="alert-icon">
      <slot name="icon">
        <GIcon
          :name="defaultIcon"
          :size="16"
        />
      </slot>
    </div>
    <div class="alert-body">
      <div
        v-if="$slots.title || title"
        class="alert-title"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div class="alert-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  computed,
} from 'vue';
import {
  GAlertSemantic,
} from './types';
import GIcon from '@/components/Display/Icon/GIcon.vue';
import {
  GIconName,
} from '@/components/Display/Icon/types';

defineOptions({
  inheritAttrs: false,
});

const {
  semantic = GAlertSemantic.Info,
  title = '',
} = defineProps<{
  /** Semantic color role of the alert */
  semantic?: GAlertSemantic;
  /** Alert title text */
  title?: string;
}>();

const defaultIcon = computed(() => {
  switch (semantic) {
  case GAlertSemantic.Success: return GIconName.CheckCircle;
  case GAlertSemantic.Warning: return GIconName.Warning;
  case GAlertSemantic.Danger: return GIconName.XCircle;
  default: return GIconName.Info;
  }
});
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.alert {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  border: 1px solid;
  font-size: var(--text-sm);
}

.alert--info {
  border-color: var(--gui-info-border);
  background: var(--gui-info-bg-subtle);
  color: var(--gui-info-fg);
}

.alert--success {
  border-color: var(--gui-success-border);
  background: var(--gui-success-bg-subtle);
  color: var(--gui-success-fg);
}

.alert--warning {
  border-color: var(--gui-warning-border);
  background: var(--gui-warning-bg-subtle);
  color: var(--gui-warning-fg);
}

.alert--danger {
  border-color: var(--gui-danger-border);
  background: var(--gui-danger-bg-subtle);
  color: var(--gui-danger-fg);
}

.alert-icon {
  flex-shrink: 0;
  margin-top: 1px;
}

.alert-body {
  flex: 1;
  min-width: 0;
}

.alert-title {
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-2xs);
}

.alert-content {
  color: var(--gui-neutral-fg-muted);
}
}
</style>
