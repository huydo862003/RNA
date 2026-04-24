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
- Compound components with `project`/`inject`.
- Vue directives.
- Scoped slots.

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
