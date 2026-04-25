/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  DateTime,
} from 'luxon';

export function today (): DateTime {
  return DateTime.now().startOf('day');
}
// Format like notion
// e.g. April 23, 2025
export function formatDate (value: DateTime): string {
  return value.toFormat('MMM d, y');
}

// Check format like notion
// e.g. April 23, 2025
export function parseDate (value: string): DateTime | undefined {
  const date = DateTime.fromFormat(value, 'MMM d, y');
  return date.isValid ? date : undefined;
}
