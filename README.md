# Luce Design Guidelines

Luce (Italian for *light*) is the design language for LuminaOS, a precision agriculture control platform for vertical farms and greenhouses.

This repo is the living reference site — interactive demos, design tokens, and usage guidelines for every component in the system.

## The Three Materials

Every surface in Luce is exactly one of three materials, drawn from the instrument clusters and cockpit controls of Ferrari's *Luce* design language:

| Material | Role | Visual |
|-|-|-|
| **Void** | Background | Pure dark (`#0C0E12`). The absence of light. |
| **Glass** | Containers | Translucent panels with backdrop blur and subtle borders. |
| **Aluminum** | Interactive controls | Machined-metal gradients. Only for things the user physically manipulates. |

Color is information, never decoration — gold for active state, green for healthy, red for critical, blue for water/humidity, purple for AI insights.

## What's Inside

The site has five pages:

- **Foundations** — Materials, colors, typography, spacing, motion, radius, responsive layout, accessibility, elevation, and themes
- **Components** — Interactive demos for all 20 Luce UI components (sliders, toggles, metric cards, status pills, bar gauges, and more)
- **Patterns** — Screen structure, navigation, glass nesting, animation choreography, data loading, and form patterns
- **Brand** — Name origin, design inspiration, voice guidelines, logo usage, and the two-theme system
- **Resources** — Design tokens available as JSON and CSS custom properties, viewable inline with copy-to-clipboard

## Running Locally

Zero build step. Serve the directory with any static file server:

```
python3 -m http.server
```

Then open [http://localhost:8000](http://localhost:8000).

## Design Tokens

Tokens are available in two formats for integration into your own projects:

- **`tokens.json`** — Machine-readable JSON with materials, semantic colors, typography, spacing, motion, radius, breakpoints, elevation, touch targets, and light theme overrides
- **`css/tokens.css`** — CSS custom properties ready to import, with `[data-theme="light"]` overrides included

## Themes

Luce ships with two themes. **Dark** (default) uses the Void/Glass/Aluminum materials with a gold accent — designed for monitoring environments. **Light** uses solid white surfaces with a teal accent — designed for office and documentation contexts.

Toggle between them with the sun/moon button in the sidebar. Preference persists via `localStorage`.

## Project Structure

```
index.html              Landing page
foundations.html         Design foundations reference
components.html         20 interactive component demos
patterns.html           Layout and interaction patterns
brand.html              Brand identity and voice

css/
  tokens.css            Design tokens (CSS custom properties)
  base.css              Reset and shared utilities
  docs.css              Documentation site layout
  components.css        All 20 component styles
  patterns.css          Pattern demo styles
  brand.css             Brand page styles

js/
  nav.js                Sidebar navigation and theme toggle
  demos.js              Interactive component behavior
  code.js               Syntax highlighting and copy-to-clipboard

assets/                 Logo files (PNG, light and dark variants)
tokens.json             Design tokens (JSON)
```

## License

Copyright Mary Agrotechnologies Inc. All rights reserved.
