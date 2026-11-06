/* #human-slop
 *  https://github.com/huydo862003/Fck-AI-Slop/edit/main/README.md
 */

// Invert the color theme for a component
// Makes an inverted dark button on dark background look distinguished

import type {
  ObjectDirective,
} from 'vue';

export const vInverted: ObjectDirective<HTMLElement, (event: Event) => void> = {
  mounted (element) {
    element.classList.add('inverted');
  },
};
