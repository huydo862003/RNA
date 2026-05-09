/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

export interface DataTableColumn<T extends Record<string, unknown> = Record<string, unknown>> {
  /** Key matching a field in the row data */
  key: keyof T & string;
  /** Header label */
  label: string;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Fixed column width in pixels. Defaults to 1fr */
  width?: number;
  /** CSS class string for the header cell */
  headerClass?: string;
  /** Inline style string for the header cell */
  headerStyle?: string;
  /** CSS class string for data cells */
  cellClass?: string;
  /** Inline style string for data cells */
  cellStyle?: string;
}
