/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  InjectionKey,
  Ref,
} from 'vue';

export {
  Size as ModalSize,
} from '@/types';

// Poppers are teleported to body
// So when poppers are rendered inside a overlay, they appear behind it
// Each overlay should provide POPPER_CONTAINER_KEY, so the popper wills render over it
export const POPPER_CONTAINER_KEY: InjectionKey<Ref<HTMLElement | null>> = Symbol('PopperContainer');
