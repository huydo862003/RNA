/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';
import {
  computed,
  ref,
} from 'vue';
import GRangeSelection2D from './GRangeSelection2D.vue';
import GRangeCell2D from './GRangeCell2D.vue';

const meta = {
  title: 'Components/Interaction/GRangeSelection2D',
  tags: ['autodocs'],
  component: GRangeSelection2D,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SpreadsheetRangeSelection2DStory: Story = {
  args: {
    rows: 10,
    cols: 6,
  },
  parameters: {
    docs: {
      description: {
        story: 'Excel-style spreadsheet with cell range selection',
      },
    },
  },
  render: () => ({
    components: {
      GRangeSelection2D,
      GRangeCell2D,
    },
    setup () {
      const rangeRef = ref<InstanceType<typeof GRangeSelection2D> | null>(null);
      const selection = computed(() => rangeRef.value?.selection);
      const headers = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
      ];
      const rowCount = 10;
      const data = Array.from({
        length: rowCount,
      }, (_, r) =>
        headers.map((_, c) => ((r + 1) * 10 + c + 1)));
      return {
        rangeRef,
        selection,
        headers,
        rows: Array.from({
          length: rowCount,
        }, (_, i) => i),
        data,
      };
    },
    template: `
      <div>
        <div class="text-xs gui-neutral-fg-muted mb-spacing-2">
          {{ selection
            ? headers[selection.startCol] + (selection.startRow + 1) + ':' + headers[selection.endCol] + (selection.endRow + 1)
              + ' (' + ((selection.endRow - selection.startRow + 1) * (selection.endCol - selection.startCol + 1)) + ' cells)'
            : 'Click and drag to select cells' }}
        </div>
        <GRangeSelection2D ref="rangeRef" :rows="rows.length" :cols="headers.length">
          <table class="border-collapse border gui-neutral-border rounded-md overflow-hidden text-sm">
            <thead>
              <tr class="gui-neutral-bg-subtle">
                <th class="w-[40px] h-size-4 gui-neutral-border border-r border-b gui-neutral-fg-muted font-normal text-xs"></th>
                <th
                  v-for="(h, c) in headers"
                  :key="c"
                  class="w-[72px] h-size-4 gui-neutral-border border-r border-b gui-neutral-fg-muted font-medium text-xs text-center"
                >{{ h }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in rows" :key="r">
                <td class="gui-neutral-bg-subtle gui-neutral-border border-r border-b gui-neutral-fg-muted text-xs text-center font-medium">
                  {{ r + 1 }}
                </td>
                <td
                  v-for="(_, c) in headers"
                  :key="c"
                  class="p-0 gui-neutral-border border-r border-b"
                >
                  <GRangeCell2D :row="r" :col="c" v-slot="{ selected, isPosition }">
                    <div
                      class="w-full px-spacing-2 py-spacing-1 cursor-cell select-none transition-colors text-right tabular-nums"
                      :class="[
                        selected ? 'gui-info-bg-hover gui-info-fg font-medium' : 'gui-neutral-bg gui-neutral-fg',
                        isPosition('top-left') ? 'rounded-tl-sm' : '',
                        isPosition('top-right') ? 'rounded-tr-sm' : '',
                        isPosition('bottom-left') ? 'rounded-bl-sm' : '',
                        isPosition('bottom-right') ? 'rounded-br-sm' : '',
                      ]"
                    >
                      {{ data[r][c] }}
                    </div>
                  </GRangeCell2D>
                </td>
              </tr>
            </tbody>
          </table>
        </GRangeSelection2D>
      </div>
    `,
  }),
};

export const CalendarRangeSelection2DStory: Story = {
  args: {
    rows: 5,
    cols: 7,
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar month view with date range selection',
      },
    },
  },
  render: () => ({
    components: {
      GRangeSelection2D,
      GRangeCell2D,
    },
    setup () {
      const rangeRef = ref<InstanceType<typeof GRangeSelection2D> | null>(null);
      const selection = computed(() => rangeRef.value?.selection);
      const weekdays = [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun',
      ];
      // April 2026 starts on Wednesday (col 2), 30 days
      const blanks = 2;
      const days = 30;
      const weeks = Math.ceil((blanks + days) / 7);
      const grid = Array.from({
        length: weeks,
      }, (_, w) =>
        Array.from({
          length: 7,
        }, (_, d) => {
          const day = w * 7 + d - blanks + 1;
          return (1 <= day && day <= days) ? day : null;
        }));
      return {
        rangeRef,
        selection,
        weekdays,
        grid,
      };
    },
    template: `
      <div>
        <div class="text-sm font-bold gui-neutral-fg mb-spacing-2">April 2026</div>
        <div class="text-xs gui-neutral-fg-muted mb-spacing-2">
          {{ selection ? 'Selected range' : 'Drag to select date range' }}
        </div>
        <GRangeSelection2D ref="rangeRef" :rows="grid.length" :cols="weekdays.length">
          <table class="border-collapse text-sm">
            <thead>
              <tr>
                <th
                  v-for="d in weekdays"
                  :key="d"
                  class="w-size-6 h-size-4 text-xs gui-neutral-fg-muted font-normal text-center"
                >{{ d }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(week, r) in grid" :key="r">
                <td v-for="(day, c) in week" :key="c" class="p-0">
                  <template v-if="day">
                    <GRangeCell2D :row="r" :col="c" v-slot="{ selected, isPosition }">
                      <div
                        class="w-size-6 h-size-6 flex items-center justify-center cursor-pointer select-none transition-colors"
                        :class="[
                          selected ? 'gui-info-bg-hover gui-info-fg font-bold' : 'gui-neutral-fg hover:gui-neutral-bg-subtle',
                          isPosition('top-left') ? 'rounded-tl-md' : '',
                          isPosition('top-right') ? 'rounded-tr-md' : '',
                          isPosition('bottom-left') ? 'rounded-bl-md' : '',
                          isPosition('bottom-right') ? 'rounded-br-md' : '',
                          (c === 5 || c === 6) && !selected ? 'gui-neutral-fg-muted' : '',
                        ]"
                      >
                        {{ day }}
                      </div>
                    </GRangeCell2D>
                  </template>
                  <div v-else class="w-size-6 h-size-6" />
                </td>
              </tr>
            </tbody>
          </table>
        </GRangeSelection2D>
      </div>
    `,
  }),
};
