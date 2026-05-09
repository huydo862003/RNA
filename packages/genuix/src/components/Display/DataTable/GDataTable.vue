<template>
  <div
    v-bind="$attrs"
    class="data-table-wrapper"
  >
    <div
      class="data-table"
      :style="{
        '--_cols': gridTemplateColumns,
      }"
      role="table"
    >
      <!-- header row -->
      <div
        class="data-table-row data-table-row--header"
        role="row"
      >
        <div
          v-for="(column, columnIndex) in resolvedColumns"
          :key="column.key"
          class="data-table-cell data-table-cell--header"
          :class="[
            column.align && `data-table-align--${column.align}`,
            column.headerClass,
            hoveredColumn === columnIndex && 'data-table-cell--col-hover',
          ]"
          :style="column.headerStyle"
          role="columnheader"
          @mouseenter="() => setHoveredColumn(columnIndex)"
          @mouseleave="clearHoveredColumn"
        >
          <slot
            :name="`header-${column.key}`"
            :column="column"
          >
            {{ column.label }}
          </slot>
        </div>
      </div>

      <!-- data rows -->
      <div
        v-for="(row, rowIndex) in rows"
        :key="rowKey ? (typeof rowKey === 'string' ? String(row[rowKey]) : rowKey(row)) : rowIndex"
        class="data-table-row"
        role="row"
      >
        <div
          v-for="(column, columnIndex) in resolvedColumns"
          :key="column.key"
          class="data-table-cell"
          :class="[
            column.align && `data-table-align--${column.align}`,
            column.cellClass,
            hoveredColumn === columnIndex && 'data-table-cell--col-hover',
          ]"
          :style="column.cellStyle"
          role="cell"
        >
          <slot
            :name="`cell-${column.key}`"
            :row="row"
            :value="row[column.key]"
            :row-index="rowIndex"
          >
            <span class="data-table-cell-text">{{ row[column.key] }}</span>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, unknown>">
/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  computed,
  ref,
} from 'vue';
import type {
  DataTableColumn,
} from './types';

defineOptions({
  inheritAttrs: false,
});

const {
  columns = undefined,
  rows,
  rowKey = undefined,
} = defineProps<{
  /** Column definitions. If omitted, derived from first row's keys */
  columns?: DataTableColumn<T>[];
  /** Row data */
  rows: T[];
  /** Field name or function to derive a unique key per row */
  rowKey?: (keyof T & string) | ((row: T) => string);
}>();

const resolvedColumns = computed<DataTableColumn<T>[]>(() => {
  if (columns) return columns;

  const first = rows[0];

  if (!first) return [];

  return Object.keys(first).map((key) => ({
    key: key as keyof T & string,
    label: key,
  }));
});

const gridTemplateColumns = computed(() =>
  resolvedColumns.value.map((column) => column.width ? `${column.width}px` : '1fr').join(' '));

const hoveredColumn = ref<undefined | number>(undefined);

function clearHoveredColumn () {
  hoveredColumn.value = undefined;
}

function setHoveredColumn (index: number) {
  hoveredColumn.value = index;
}
</script>

<style scoped>
@reference '@/style.css';

@layer components {
.data-table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.data-table {
  display: grid;
  grid-template-columns: var(--_cols, 1fr);
  min-width: 100%;
  font-size: var(--text-sm);
  border: 1px solid var(--gui-neutral-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.data-table-row {
  display: contents;
}

/* Header cells */
.data-table-row--header > .data-table-cell {
  background: var(--gui-neutral-bg-subtle);
  border-bottom: 1px solid var(--gui-neutral-border);
  font-weight: var(--font-weight-medium);
  color: var(--gui-neutral-fg);
}

.data-table-row--header > .data-table-cell--col-hover {
  background: var(--gui-neutral-bg-active);
}

/* Row hover - all cells in hovered row */
.data-table-row:not(.data-table-row--header):hover > .data-table-cell {
  background: var(--gui-neutral-bg-hover);
}

/* Column hover */
.data-table-cell--col-hover {
  background: var(--gui-neutral-bg-hover);
}

/* Row separator */
.data-table-row:not(.data-table-row--header):not(:last-child) > .data-table-cell {
  border-bottom: 1px solid var(--gui-neutral-border-subtle);
}

.data-table-cell {
  display: flex;
  align-items: center;
  padding: var(--spacing-xs) var(--spacing-sm);
  min-width: 0;
  overflow: hidden;
}

.data-table-cell-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}

.data-table-align--left {
  justify-content: flex-start;
  text-align: left;
}

.data-table-align--center {
  justify-content: center;
  text-align: center;
}

.data-table-align--right {
  justify-content: flex-end;
  text-align: right;
}
}
</style>
