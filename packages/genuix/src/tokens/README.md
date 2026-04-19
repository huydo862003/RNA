# Design tokens

I haven't fully researched on design system yet (as of April 2025). But I did some research for what I needed now.

I want a proper system of design tokens, so:
- I can easily choose which font sizes, colors, spacing to use from a limited set of values. This ensures UI consistency.
- I can easily swap in another set of design tokens (like dark-themed colors) without changing the styles of any components.

## Design

- Regarding the namings and organization of design tokens:
  1. [Github Primer](https://github.com/primer/primitives) uses a 3-tiered approach: Primitive tokens, Semantic tokens & Component/Layout token.
     - Tier 1: Primitive tokens (defined [here](./primitives/)) define the branding of the whole systems - they roughly define the looks and feels of the UI/UX. Basically, they are raw, context-unaware values of design decisions (the color pallette, etc.).
     - Tier 2: Semantic tokens (defined [here](./semantic.css)) essentially attach an intended use to the primitive tokens, such as this color should be the background color, etc. This helps insulate the consumers of the design tokens from theme changes (which can cause the primitive tokens to change).
     - Tier 3: Component/Layout tokens are more component-specific, probably like `style scoped` in vue SFC.

- Regarding the values to go to the primitive tokens:
  - The book "Refactoring UI" suggests some best practices regarding choosing the color pallette (neutral, primary, accent colors & the desirable number of shades for a hue) & the steps for font sizes, spacings, line heights.
  - Radix UI defines 12 shades for each hue with the intended role: `bg`, `fg`, etc. For sizes though, T-shirt sizes are typically used.
  - It's suggested by the book "Refactoring UI" that the animation should not last over 300ms.
  - The spacings, line heights, etc. are advised to be divisible by 4 to snap to the grid (?).
  - The fontsizes use minor third ratio, which is good for generic sites.
