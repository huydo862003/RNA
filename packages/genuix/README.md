# Genuix

![Status](https://img.shields.io/badge/status-active-brightblue)
![Version](https://img.shields.io/badge/version-0.3.0--alpha-orange)
![License](https://img.shields.io/badge/license-MIT-green)

A personal design system with DNA in its name - **Gene** + **UI/UX** = **Genuix** (sounds like "genuine-x").

Also a place to document my findings of building a design system.

**Progress tracker**: [Design System Home](https://painted-jodhpur-6fe.notion.site/Design-System-Home-2e6aa8fcd08880cb94bbe70c80eb0fa1)

## Motivation

- Sharpen frontend skills - both logic and visual design.
- Learn how design systems are built and maintained.
- Explore UI/UX best practices hands-on.
- Build personal libraries to use across my projects.

## Component Design

### API Design

Some types of APIs to consider for a modular piece of UI + logic:
- Simple reusable components.
- Simple composables.
- Compound components with `provide`/`inject`.
- Vue directives.
- Scoped slots.
- `data-*` attributes.

Some may be more suitable than others depending on the scenarios.

### Token Inversion Problem

When a non-primary child component sits on a solid surface, it needs inverted colors to stay readable.

One way is to have the child components aware of their rendering contexts & change their styles based on that. But it's adhoc and we can't possibly account for the possible types of surfaces they are rendered on.

Another way is to have the consumer (parent components) remap the design tokens, so the child components stay agnostic of the context.

Example: `invertTokens(semantic)` remaps `--gui-{semantic}-*` CSS custom properties on a container element:

```
fg       -> bg        (dark text becomes light)
fg-muted -> bg-subtle (muted text becomes subtle light)
border   -> bg-active (border visible on solid surface)
bg-hover -> solid-hover (hover state works on solid surface)
```

Usage: apply the returned style object on the container, and any child component reading `--gui-{semantic}-*` automatically gets contrast-correct values with zero overrides.

I believe Radix Themes handles it like this.

The general rule: **parent owns the context, children stay generic**.

This is another reason why we should use semantic design tokens.

### Overridable Default Styling for Components

One problem that I faced was that:
- I wanted to have intricate stylings for my components.
- But, I wanted my components' stylings to be overridable.

Previously, I was styling the components like this:

```vue
<template>
  <div id="div-1" class="gui-neutral-bg-subtle" />
  <!-- Or -->
  <div id="div-2" class="my-div" />
</template>

<style scoped>
.my-div {
  ...
}
</style>
```

I wondered, can the consumer override these styles? If the root child component receive the fall through styles/classes they shall conflict, understandably.

So, I decided to use `@layer`: Component styles are placed inside `@layer components`. CSS layer precedence means unlayered styles always win over layered ones, regardless of specificity. This lets consumers override any component style via the `class` prop without `!important`.

This keeps the override hierarchy clean: component defaults (layered) < consumer classes (unlayered).

### Semantic Styling

A problem when design `GTextInput`: I want to allow the text input to have multiple states (success, warning, error, default). Therefore, the consumer should be allowed to pass the current input state to the component.

In other components that I implemented, I sometimes used this pattern:
```vue
<!-- Component internals -->
<template>
  <input
    :class="{
      'text-input--error': state === 'error',
      'text-input--warning': state === 'warning',
      'text-input--success': state === 'success',
    }"
  />
</template>

<style scoped>
.text-input--error {
  @apply gui-danger-border;
}

.text-input--warning {
  @apply gui-warning-border;
}

.text-input--success {
  @apply gui-success-border;
}
</style>
```

However, the problem is that, what if I want the consumer to style the exact state of a component?
1. A possible solution is to make the `.text-input--error` classes part of the public API, but I think this is somewhat leaky & adhoc as I have always added classes in a somewhat free-styling manner & `text-input` is an implementation detail.
2. Another solution is to add props such as `error-class`, `warning-class`. However, it seems verbose and doesn't scale.
3. Exposing via `class` prop leaks implementation. If an error state later adds a background change, every consumer override breaks.

So I ended up with `data-*` attributes, denoting the current state of the component:

```vue
<!-- Component internals -->
<template>
  <input :data-state="state" />
</template>

<style scoped>
@layer components {
  .text-input[data-state="error"] {
    @apply gui-danger-border;
  }

  .text-input[data-state="warning"] {
    @apply gui-warning-border;
  }
}
</style>
```

```vue
<!-- Consumer: style based on state without knowing implementation -->
<GTextInput state="error" />
```

The `data-*` attribute is also queryable by parent CSS selectors (e.g. via `:has([data-state="error"])`), which none of the other approaches support.
