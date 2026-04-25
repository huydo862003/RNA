<template>
  <GDropdown
    :arrow="false"
    placement="bottom-start"
    class="datepicker-popper"
  >
    <!-- Datepicker trigger -->
    <button
      aria-haspopup="dialog"
      :disabled="disabled"
      :style="{
        '--_bg-hover': disabled ? tokens.bg : tokens.bgHover,
        '--_fg': disabled ? tokens.mutedFg : tokens.fg,
        '--_bg': tokens.bg,
        '--_border': tokens.border,
        ..._style,
      }"
      :class="{
        [_class]: true,
        'datepicker-trigger': true,
        'cursor-pointer': !disabled,
        [`datepicker-trigger-${size}`]: true,
      }"
    >
      {{ displayDate }}
    </button>
    <!-- Datepicker popper -->
    <template #popper>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Date picker"
      >
        <!-- Date input -->
        <input
          v-model="rawDateInput"
          :class="{
            'datepicker-input': true,
            'datepicker-input--valid': isValidDateInput,
            'datepicker-input--invalid': !isValidDateInput,
          }"
          aria-label="Date"
        >

        <!-- Calendar header -->
        <div class="datepicker-header">
          <span class="datepicker-month-label">{{ currentMonthLabel }}</span>
          <div class="datepicker-nav">
            <button
              class="datepicker-nav-btn"
              @click="goToday"
            >
              Today
            </button>
            <button
              class="datepicker-nav-btn"
              aria-label="Previous month"
              @click="prevMonth"
            >
              <GIcon :name="GIconName.ChevronLeft" />
            </button>
            <button
              class="datepicker-nav-btn"
              aria-label="Next month"
              @click="nextMonth"
            >
              <GIcon :name="GIconName.ChevronRight" />
            </button>
          </div>
        </div>

        <!-- Weekday row -->
        <div
          class="datepicker-weekday-grid"
          role="grid"
          :aria-label="currentMonthLabel"
        >
          <span
            v-for="d in weekdays"
            :key="d"
            role="columnheader"
            class="datepicker-weekday"
          >{{ d }}</span>

          <!-- Day cells -->
          <button
            v-for="cell in cells"
            :key="cell.key"
            role="gridcell"
            class="datepicker-day"
            :class="{
              'datepicker-day--outside': cell.outside,
              'datepicker-day--today': cell.isToday,
              'datepicker-day--selected': cell.selected,
            }"
            :aria-selected="cell.selected"
            :aria-current="cell.isToday ? 'date' : undefined"
            :aria-label="cell.datetime.toFormat('MMMM d, y')"
            @click="selectDay(cell.datetime)"
          >
            {{ cell.day }}
          </button>
        </div>
      </div>
    </template>
  </GDropdown>
</template>

<script setup lang="ts">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  DateTime,
  Info,
} from 'luxon';
import {
  computed,
  ref,
  watch,
} from 'vue';
import {
  DatePickerSize,
} from './types';
import {
  formatDate,
  parseDate,
  today,
} from '@/utils/date';
import {
  prominenceTokens,
} from '@/utils/prominence';
import {
  Prominence,
  Semantic,
} from '@/types';
import GDropdown from '@/components/Overlay/Dropdown/GDropdown.vue';
import GIcon from '@/components/Display/Icon/GIcon.vue';
import {
  GIconName,
} from '@/components/Display/Icon/types';

defineOptions({
  inheritAttrs: false,
});

const {
  class: _class = '',
  style: _style = undefined,
  size = DatePickerSize.Md,
  disabled = false,
  placeholder = 'No Date',
} = defineProps<{
  class?: string;
  style?: Record<string, string>;
  size?: DatePickerSize;
  disabled?: boolean;
  placeholder?: string;
}>();

const tokens = prominenceTokens(Prominence.Ghost, Semantic.Neutral);

// Displayed date
const displayDate = ref(placeholder);
// Date input in the popper
const rawDateInput = ref('');
const parsedDateInput = computed(() => parseDate(rawDateInput.value));
const isValidDateInput = computed(() => !!parsedDateInput.value);

watch(parsedDateInput, (newDate) => {
  if (!newDate) return; // Ignore temporarily invalid date
  displayDate.value = formatDate(newDate) || displayDate.value;
});

/* Supplied date - the single source of truth, to avoid circular watch, don't update this on watch */
const date = defineModel<DateTime | undefined>();

watch(
  date,
  (newDate) => {
    displayDate.value = newDate ? formatDate(newDate) : placeholder;
    rawDateInput.value = displayDate.value;
  },
  {
    immediate: true,
  },
);

/* Calendar state */
const startViewDate = ref(DateTime.now().startOf('month'));

const currentMonthLabel = computed(() => startViewDate.value.toFormat('MMM yyyy'));

const weekdays = Info.weekdays('short').map((d) => d.slice(0, 2));

const cells = computed(() => {
  const first = startViewDate.value.startOf('month');
  // luxon weekday: 1=Mon..7=Sun. Grid starts Monday.
  const startOffset = first.weekday - 1;

  const gridStart = first.minus({
    days: startOffset,
  });

  const result = [];
  const today = DateTime.now().startOf('day');
  // Always display 6 weeks
  for (let i = 0; i < 42; i++) {
    const datetime = gridStart.plus({
      days: i,
    });
    result.push({
      key: datetime.toISODate(),
      datetime,
      day: datetime.day,
      outside: datetime.month !== first.month,
      isToday: datetime.hasSame(today, 'day'),
      selected: date.value ? datetime.hasSame(date.value, 'day') : false,
    });
  }
  return result;
});

/* Actions */
function selectDay (datetime: DateTime) {
  if (!datetime.hasSame(startViewDate.value, 'month')) {
    startViewDate.value = datetime.startOf('month');
  }
  date.value = datetime;
}

function prevMonth () {
  startViewDate.value = startViewDate.value.minus({
    months: 1,
  });
}

function nextMonth () {
  startViewDate.value = startViewDate.value.plus({
    months: 1,
  });
}

function goToday () {
  const todayDate = today();
  startViewDate.value = todayDate.startOf('month');
  date.value = todayDate;
}
</script>

<style scoped>
@reference '@/style.css';

@layer components {
/* Trigger */
.datepicker-trigger {
  @apply inline-flex items-center justify-start rounded-md px-sm border border-solid;
  background: var(--_bg);
  color: var(--_fg);
  border-color: var(--_border);

  &:hover {
    background: var(--_bg-hover);
  }

  &:disabled:hover {
    @apply cursor-not-allowed;
  }
}

.datepicker-trigger:active:not(:disabled) {
  animation: datepicker-pulse var(--duration-fast, 150ms) var(--ease-out, ease-out);
}

@keyframes datepicker-pulse {
  0% { filter: brightness(1); }
  50% { filter: brightness(1.2); }
  100% { filter: brightness(1); }
}

/* Trigger sizes */
.datepicker-trigger-xs {
  @apply h-5 text-xs;
  width: 120px;
}

.datepicker-trigger-sm {
  @apply h-6 text-sm;
  width: 140px;
}

.datepicker-trigger-md {
  @apply h-8 text-md;
  width: 180px;
}

.datepicker-trigger-lg {
  @apply h-9 text-lg;
  width: 200px;
}

.datepicker-trigger-xl {
  @apply h-10 text-xl;
  width: 240px;
}
}
</style>

<style>
/* Needs unscoped style here to style the popper, which is teleported */
@reference '@/style.css';

@layer components {
/* Datepicker popper */
.datepicker-popper .v-popper__inner {
  @apply gui-neutral-bg gui-neutral-border-subtle rounded-lg font-mono border border-solid shadow-lg overflow-hidden p-sm;
  width: 280px; /* This is not really a design decision, so using a magic number is okay */
}

.datepicker-input {
  @apply text-sm gui-neutral-fg gui-neutral-bg-subtle gui-neutral-border-subtle rounded-md w-full border border-solid outline-none px-sm py-xs mb-sm;
}

.datepicker-input--valid:focus {
  @apply gui-info-border;
}

.datepicker-input--invalid {
  @apply gui-danger-border;
}

/* Header */
.datepicker-header {
  @apply px-1.5 flex items-center justify-between mb-xs;
}

.datepicker-month-label {
  @apply text-sm font-medium gui-neutral-fg;
}

.datepicker-nav {
  @apply flex items-center gap-xs;
}

.datepicker-nav-btn {
  /* The next and prev button */
  @apply text-xs gui-neutral-fg-muted rounded-md cursor-pointer p-xs bg-transparent border-none inline-flex items-center;

  &:hover {
    @apply gui-neutral-bg-hover;
  }
}

/* Grid */
.datepicker-weekday-grid {
  @apply grid grid-cols-7 gap-1;
  user-select: none; /* Calendar selector should not behave like they're selectable */
}

.datepicker-weekday {
  @apply text-xs gui-neutral-fg-muted text-center p-xs;
}

.datepicker-day {
  @apply text-sm gui-neutral-fg cursor-pointer rounded-md aspect-square flex items-center justify-center bg-transparent border-none;
}

.datepicker-day:hover {
  @apply gui-neutral-bg-hover;
}

.datepicker-day--outside {
  @apply gui-neutral-fg-muted;
}

.datepicker-day--today {
  @apply gui-danger-solid rounded-full;
  color: var(--gui-neutral-bg);
}

.datepicker-day--today:hover {
  @apply gui-neutral-bg-hover gui-neutral-fg;
}

.datepicker-day--selected {
  @apply gui-info-solid;
  color: var(--gui-neutral-bg);
}

.datepicker-day--selected:hover {
  @apply gui-info-solid-hover;
}
}
</style>
