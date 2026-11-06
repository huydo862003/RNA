import DOMPurify from 'dompurify';

/**
 * SSR-safe HTML sanitization using DOMPurify
 *
 * During SSR (no window/DOM), DOMPurify cannot run so the input is returned unchanged
 * This is acceptable because:
 * - SSR inputs come from trusted sources (highlight.js, KaTeX), not user input
 * - The client will re-run this function with DOMPurify during hydration
 *
 * Do NOT use this for user-supplied HTML that is rendered server-side without client hydration
 */
export function sanitize (html: string): string {
  return typeof window === 'undefined' ? html : DOMPurify.sanitize(html);
}
