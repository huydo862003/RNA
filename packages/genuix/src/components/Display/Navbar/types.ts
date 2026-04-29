/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

import type {
  DeepReadonly,
  InjectionKey,
  Ref,
} from 'vue';

export interface NavbarContext {
  collapsed: DeepReadonly<Ref<boolean>>;
  toggle (): void;
}

export const NAVBAR_KEY: InjectionKey<NavbarContext> = Symbol('GNavbar');

export const NAV_MENU_DEPTH_KEY: InjectionKey<true> = Symbol('NavMenuDepth');
