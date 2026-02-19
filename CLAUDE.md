# Luce Design System — AI Reference

## What is Luce?

Luce (Italian for "light") is the design language for LuminaOS, a precision agriculture control platform for vertical farms and greenhouses. The three-materials metaphor (Void/Glass/Aluminum) draws from automotive instrument design. The name's irony: a dark UI named after light — because in a greenhouse, light is the primary control variable, and every colored pixel is a deliberate signal emerging from the void.

## Three Materials

Every surface must be exactly one of these:

1. **Void** — pure dark background (`#0C0E12`, `#12151B`, `#181B23`). The absence of light.
2. **Glass** — translucent panels with `backdrop-filter: blur(20px)`, 4% white bg, 8% white border, top-edge highlight gradient. Used for cards and containers.
3. **Aluminum** — interactive controls only. Gradient surfaces (`#3F3F46` → `#27272A`), machined thumb aesthetic. Reserved for things the user physically manipulates (sliders, toggles, manettino).

## Color Rules

Color is **information only**, never decoration:

| Token | Hex | Meaning |
|-|-|-|
| `--gold` | `#F5A623` | Active state, primary action, accent |
| `--green` | `#34D399` | Healthy, connected, success, temperature |
| `--orange` | `#FB923C` | Warning, attention needed |
| `--red` | `#F87171` | Critical, offline, error |
| `--blue` | `#60A5FA` | Water, humidity, informational |
| `--purple` | `#A78BFA` | AI insights |

Each has a `-dim` variant (e.g. `--gold-dim`) for subtle backgrounds.

## Typography

- **DM Sans** — all reading text (UI labels, titles, body)
- **JetBrains Mono** — all data values, device IDs, code

Text hierarchy uses four aluminum tones:
- `--alu-light` (#D4D4D8) — primary text (13.2:1 contrast)
- `--alu-mid` (#A1A1AA) — secondary text (7.3:1)
- `--alu-dark` (#8B8B93) — tertiary/labels (5.0:1, WCAG AA pass)
- `--alu-muted` (#71717A) — decorative only (3.7:1, large text/icons only)
- `#FAFAFA` — headings (pure white, 18.3:1)

## Spacing

4px grid: `--sp-1` (4px) through `--sp-12` (48px). All margins, padding, and gaps must be multiples of 4px.

## Motion

One easing: `--ease-spring: cubic-bezier(0.16, 1, 0.3, 1)` — fast launch, gentle settle.
Three durations: `--dur-fast` (200ms), `--dur-med` (350ms), `--dur-slow` (500ms).

## Radius

`--radius-sm` (8px), `--radius-md` (12px), `--radius-lg` (16px), `--radius-xl` (20px), `--radius-full` (9999px).

## Components (20 total)

**Aluminum** (interactive controls):
- **AluminumSlider** — range input with gradient thumb, gold fill, monospace value
- **AluminumToggle** — switch with gold track (on), void track (off), aluminum thumb
- **SegmentedControl (Manettino)** — segmented control with sliding gold highlight
- **AluminumButtonBar** — multi-option bar (e.g. fan speed OFF/LOW/MED/HIGH/MAX)
- **AluminumRadio** — radio group with scale dot animation

**Glass** (containers & data display):
- **GlassPanel** — universal container. Blur bg, border, top highlight
- **MetricCard** — label (uppercase 10px), value (mono 20px), optional sparkline, tap-to-expand
- **DeviceCard** — device name, status pill, sensor summary
- **StatusPill** — 7 variants: healthy, warning, critical, connected, offline, idle, configuring
- **VerticalBarGauge** — bar with animated fill for primary sensor readings
- **LEDChannel** — 6 channels (R/G/B/W/UV/IR) with animated bars
- **RelayPill** — clickable on/off toggle pill
- **HardwareStatusRow** — key/value pairs for hardware status
- **PhaseCard** — grow phase cards with current phase highlighted
- **ActivityEvent** — audit event with colored type dot and timestamp
- **AIInsightCard** — purple border + AI badge
- **FertigationPair** — pH + EC with current/target values
- **DayCounter** — day count with animated progress bar
- **RecordCard** — harvest batch record card
- **LoginButton** — gold gradient button with rifle-bolt ceremony

## Themes

Luce has two themes. **Dark** (default) uses the Void/Glass/Aluminum materials with gold accent — for monitoring environments. **Light** uses solid white surfaces with teal (`#0D9488`) accent — for office/documentation contexts.

Theme switching: set `data-theme="light"` on `<html>`. All token overrides live in `css/tokens.css` under `[data-theme="light"]`. The same CSS custom property names are reused, so all component CSS works unchanged.

Key light theme differences:
- `--void` → `#FAFAFA`, `--void-raised` → `#F4F4F5`, `--void-surface` → `#FFFFFF`
- `--glass-bg` → `rgba(0,0,0,0.03)` (dark overlay instead of white)
- `--glass-border` → `#E4E4E7` (solid border, no glass blur)
- `--alu-light` → `#18181B`, `--alu-mid` → `#52525B` (text inverts to dark)
- `--gold` → `#0D9488` (teal replaces gold as primary accent)
- Semantic colors shift slightly: `--green` `#22C55E`, `--red` `#EF4444`, etc.

Persist user preference: `localStorage.setItem('luce-theme', 'light'|'dark')`.

## Token Files

- `css/tokens.css` — importable CSS custom properties (includes `[data-theme="light"]` overrides)
- `tokens.json` — machine-readable JSON structure (includes `"light"` object)

## Accessibility

- All text must meet WCAG AA contrast (4.5:1 body, 3:1 large)
- `--alu-muted` is NEVER for body text — decorative/large only
- Touch targets: 44pt (iOS), 48dp (Android), 40px (web) minimum
- Focus: 2px gold `outline` via `:focus-visible`; glass panels use `box-shadow` instead
- Respect `prefers-reduced-motion`: disable springs, use instant transitions

## Responsive Layout

- Breakpoints: phone (<640px), tablet (640–1024px), desktop (>=1025px)
- Content density rule: if N items fit in one row comfortably, use Nx1 — never leave empty grid cells
- Glass nesting: increase bg opacity by +2% per depth level (0.04 → 0.06 → 0.08). Max 3 levels.
- Phone: single column, bottom tab bar, sticky bar gauges
- Tablet landscape: persistent sidebar (260px), 2-column cards, master-detail
- Desktop: persistent sidebar, 3-column cards, expanded charts, max content width 960px

## Charts

- Background: `--void-raised` container, never raw void
- Grid lines: `rgba(255,255,255,0.04)`, axis labels in `--alu-dark` mono 10px
- Data lines: 2px stroke, semantic color. Max 3 series per chart.
- Second series: dashed (4px/3px), 1.5px — visually subordinate
- Area fill: same color at 8% opacity
- Tooltips: `--void-surface` bg, `--glass-border`, mono text

## Elevation (5 levels)

- z-0: Base (void) — screen background
- z-1: Raised (void-raised) — cards, charts, glass panels
- z-2: Sticky — headers, tab bars, bar gauge row
- z-3: Overlay — modals, bottom sheets, dropdowns
- z-4: Toast — notifications, tooltips, top-level alerts

## When Building New Luce Components

1. Surface must be void, glass, or aluminum — nothing else
2. Color must carry meaning — no decorative color
3. All values in JetBrains Mono, all labels in DM Sans
4. Spacing from the 4px grid only
5. Animations use `--ease-spring` easing
6. Interactive controls get aluminum material treatment
7. Touch targets must meet platform minimums (44pt/48dp/40px)
8. All text on void must pass WCAG AA contrast
9. Provide `:focus-visible` styling for web keyboard users
10. Show loading skeletons, not blank screens, during data fetch
11. Support both dark and light themes — use CSS custom properties, never hardcoded colors

## Site Structure

Four pages: `index.html` (landing), `foundations.html` (tokens, materials, motion, layout), `components.html` (20 interactive demos), `patterns.html` (layout, navigation, animation, forms), `brand.html` (identity, voice, logos, themes).

CSS: `css/tokens.css` (design tokens), `css/base.css` (reset + utilities), `css/docs.css` (documentation layout), `css/components.css` (all 20 components), `css/patterns.css` (pattern demos), `css/brand.css` (brand page).

JS: `js/nav.js` (sidebar navigation), `js/demos.js` (interactive component behavior), `js/code.js` (Prism.js + copy-to-clipboard).

Zero-build vanilla HTML/CSS/JS. Serve with `python3 -m http.server`.
