/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  InjectionKey,
  Ref,
} from 'vue';

export const TOC_ITEM_DEPTH_KEY: InjectionKey<Ref<number>> = Symbol('GTocItemDepth');
