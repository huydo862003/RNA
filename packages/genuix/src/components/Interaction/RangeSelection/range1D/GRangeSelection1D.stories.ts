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
import GRangeSelection1D from './GRangeSelection1D.vue';
import GRangeItem1D from './GRangeItem1D.vue';

const meta = {
  title: 'Interaction/GRangeSelection1D',
  tags: ['autodocs'],
  component: GRangeSelection1D,
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const FileExplorerRangeSelection1DStory: Story = {
  args: {
    count: 7,
  },
  parameters: {
    docs: {
      description: {
        story: 'File explorer: click, shift+click, drag, arrow keys, Ctrl+A, Esc to clear, click outside to dismiss',
      },
    },
  },
  render: () => ({
    components: {
      GRangeSelection1D,
      GRangeItem1D,
    },
    setup () {
      const rangeRef = ref(null);
      const selection = computed(() => rangeRef.value?.selection.value);
      const files = [
        {
          name: 'README.md',
          size: '2.4 KB',
          modified: 'Apr 18, 2026',
        },
        {
          name: 'package.json',
          size: '1.1 KB',
          modified: 'Apr 20, 2026',
        },
        {
          name: 'tsconfig.json',
          size: '0.3 KB',
          modified: 'Apr 15, 2026',
        },
        {
          name: 'vite.config.ts',
          size: '0.8 KB',
          modified: 'Apr 19, 2026',
        },
        {
          name: 'src/index.ts',
          size: '0.2 KB',
          modified: 'Apr 21, 2026',
        },
        {
          name: 'src/App.vue',
          size: '1.5 KB',
          modified: 'Apr 21, 2026',
        },
        {
          name: 'src/main.ts',
          size: '0.1 KB',
          modified: 'Apr 16, 2026',
        },
      ];
      return {
        rangeRef,
        selection,
        files,
      };
    },
    template: `
      <div class="w-[480px]">
        <div class="flex items-center justify-between mb-spacing-2 px-spacing-1">
          <span class="text-xs gui-neutral-fg-muted font-bold">Files</span>
          <span class="text-xs gui-neutral-fg-muted">
            {{ selection ? (selection.end - selection.start + 1) + ' of ' + files.length + ' selected' : files.length + ' items' }}
          </span>
        </div>
        <GRangeSelection1D ref="rangeRef" :count="files.length">
          <div class="border gui-neutral-border rounded-lg overflow-hidden">
            <table class="w-full border-collapse text-sm">
              <thead>
                <tr class="gui-neutral-bg-subtle gui-neutral-border-subtle border-b">
                  <th class="text-left py-spacing-2 px-spacing-3 gui-neutral-fg-muted font-medium text-xs tracking-wide uppercase">Name</th>
                  <th class="text-right py-spacing-2 px-spacing-3 gui-neutral-fg-muted font-medium text-xs tracking-wide uppercase w-[80px]">Size</th>
                  <th class="text-right py-spacing-2 px-spacing-3 gui-neutral-fg-muted font-medium text-xs tracking-wide uppercase w-[120px]">Modified</th>
                </tr>
              </thead>
              <tbody>
                <GRangeItem1D
                  v-for="(file, i) in files"
                  :key="i"
                  :index="i"
                  v-slot="{ selected, isPosition }"
                >
                  <tr
                    class="cursor-pointer transition-colors gui-neutral-border-subtle"
                    :class="[
                      selected
                        ? 'gui-info-bg-hover gui-info-fg'
                        : 'gui-neutral-bg hover:gui-neutral-bg-subtle',
                      i < files.length - 1 && !isPosition('end') ? 'border-b' : '',
                    ]"
                  >
                    <td class="py-spacing-2 px-spacing-3">
                      {{ file.name }}
                    </td>
                    <td class="text-right py-spacing-2 px-spacing-3 tabular-nums" :class="selected ? '' : 'gui-neutral-fg-muted'">
                      {{ file.size }}
                    </td>
                    <td class="text-right py-spacing-2 px-spacing-3" :class="selected ? '' : 'gui-neutral-fg-muted'">
                      {{ file.modified }}
                    </td>
                  </tr>
                </GRangeItem1D>
              </tbody>
            </table>
          </div>
        </GRangeSelection1D>
      </div>
    `,
  }),
};

export const DayPickerRangeSelection1DStory: Story = {
  args: {
    count: 7,
  },
  parameters: {
    docs: {
      description: {
        story: 'Day range picker: select contiguous days',
      },
    },
  },
  render: () => ({
    components: {
      GRangeSelection1D,
      GRangeItem1D,
    },
    setup () {
      const rangeRef = ref(null);
      const selection = computed(() => rangeRef.value?.selection.value);
      const days = [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun',
      ];
      return {
        rangeRef,
        selection,
        days,
      };
    },
    template: `
      <div>
        <div class="text-xs gui-neutral-fg-muted mb-spacing-3">
          {{ selection ? days[selection.start] + ' \u2014 ' + days[selection.end] : 'Select a range of days' }}
        </div>
        <GRangeSelection1D ref="rangeRef" :count="days.length">
          <div class="inline-flex rounded-lg overflow-hidden shadow-sm border gui-neutral-border">
            <GRangeItem1D
              v-for="(day, i) in days"
              :key="i"
              :index="i"
              v-slot="{ selected, isPosition }"
            >
              <div
                class="w-[52px] py-spacing-2 text-sm text-center cursor-pointer transition-colors font-medium"
                :class="[
                  selected
                    ? 'gui-info-solid text-white'
                    : 'gui-neutral-bg gui-neutral-fg-muted hover:gui-neutral-bg-subtle',
                  !isPosition('end') ? 'border-r gui-neutral-border' : '',
                ]"
              >
                {{ day }}
              </div>
            </GRangeItem1D>
          </div>
        </GRangeSelection1D>
      </div>
    `,
  }),
};
