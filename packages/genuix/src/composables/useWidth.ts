/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import {
  onUnmounted,
  ref,
  watch,
  type Ref,
} from 'vue';

// Be aware of forced reflow: changing the layout/resizing then immediately querying the size of the element
export function useWidth (elementRef: Ref<HTMLElement | null | undefined>) {
  const width = ref<number | undefined>(undefined);
  let observer: ResizeObserver | undefined;

  watch(elementRef, (element) => {
    observer?.disconnect();

    if (!element) {
      width.value = undefined;
      return;
    }

    width.value = element.offsetWidth;

    observer = new ResizeObserver(() => {
      width.value = element.offsetWidth;
    });
    observer.observe(element);
  }, {
    immediate: true,
  });

  onUnmounted(() => {
    observer?.disconnect();
  });

  return width;
}
