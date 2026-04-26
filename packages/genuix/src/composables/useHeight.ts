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
export function useHeight (elementRef: Ref<HTMLElement | null | undefined>) {
  const height = ref<number | undefined>(undefined);
  let observer: ResizeObserver | undefined;

  watch(elementRef, (element) => {
    observer?.disconnect();

    if (!element) {
      height.value = undefined;
      return;
    }

    height.value = element.offsetHeight;

    observer = new ResizeObserver(() => {
      height.value = element.offsetHeight;
    });
    observer.observe(element);
  }, {
    immediate: true,
  });

  onUnmounted(() => {
    observer?.disconnect();
  });

  return height;
}
