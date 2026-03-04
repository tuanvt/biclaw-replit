# BiClaw Design Guidelines

A comprehensive design system for the BiClaw conversational business intelligence platform.

---

## 1. Brand Identity

### Mission Statement
BiClaw replaces complex dashboards with natural-language conversations. The design should feel **intelligent, approachable, and trustworthy** — like talking to a brilliant analyst who just gets it.

### Brand Personality
- **Intelligent** — Clean layouts, purposeful whitespace, data-forward aesthetic
- **Approachable** — Warm accent colors, rounded corners, conversational tone
- **Trustworthy** — Consistent spacing, solid colors (no distracting gradients), professional typography

### Logo
- The BiClaw logomark is the `BrainCircuit` icon from Lucide, rendered in white on a **Burnt Earth** rounded square (`rounded-xl`)
- The wordmark uses **Outfit Bold** at `text-2xl` with tight tracking (`tracking-tight`)
- Minimum clear space: 12px on all sides

---

## 2. Color System

### Core Palette

| Name             | Hex       | HSL                | Role                           |
|------------------|-----------|--------------------|--------------------------------|
| **Infinite Night** | `#071037` | `229 77% 12%`    | Foreground / text              |
| **Divine Pleasure** | `#FFFFFF` | `0 0% 100%`     | Backgrounds                    |
| **Burnt Earth**   | `#9D4531` | `11 52% 40%`     | Primary — CTAs, actions, links |
| **Rustic Wicker** | `#B18A56` | `34 37% 52%`     | Secondary — warm highlights    |
| **Marsh Field**   | `#D4C477` | `50 52% 65%`     | Accent — decorative touches    |

### Extended Palette

| Name             | Value                | Usage                          |
|------------------|----------------------|--------------------------------|
| Muted Background | `hsl(0 0% 96%)`     | Input fields, subtle sections  |
| Muted Text       | `hsl(229 30% 40%)`  | Secondary text, captions       |
| Border           | `hsl(0 0% 90%)`     | Card borders, dividers         |
| Destructive      | Same as Primary      | Error states (Burnt Earth)     |

### Color Usage Rules
1. **No gradients.** All fills are solid colors only.
2. **White-dominant.** Backgrounds are pure `#FFFFFF`. Cards are white with subtle `border-border` and soft shadows.
3. **Primary (Burnt Earth)** is reserved for interactive elements: buttons, links, active states, user chat bubbles.
4. **Secondary (Rustic Wicker)** is used for warm visual highlights: badges, status indicators, icon containers.
5. **Accent (Marsh Field)** is used sparingly for decorative elements: animated dots, underline swooshes, sparkles.
6. **Never use more than 2 palette colors on a single component.** If a card has a Primary icon, its text should be Foreground/Muted — not Secondary.

### Opacity Conventions
- `primary/10` or `primary/20` — icon container backgrounds
- `secondary/20` — secondary icon containers
- `accent/20` — accent icon containers
- `foreground/70` — subdued nav text
- `foreground/80` — secondary body text
- `muted-foreground` — captions, timestamps

---

## 3. Typography

### Font Stack
- **Display:** `Outfit` (Google Fonts) — headings, brand name, large numbers
- **Body:** `DM Sans` (Google Fonts) — paragraphs, UI labels, chat messages

### Type Scale

| Element          | Font    | Size              | Weight     | Tracking       |
|------------------|---------|--------------------|-----------|----------------|
| Hero H1          | Outfit  | `text-6xl`/`7xl`  | `extrabold`| `tracking-tight` |
| Section H2       | Outfit  | `text-4xl`/`5xl`  | `extrabold`| `tracking-tight` |
| Card H3          | Outfit  | `text-xl`         | `bold`     | default        |
| Blog Title       | Outfit  | `text-4xl`/`5xl`  | `extrabold`| `tracking-tight` |
| Blog Body        | DM Sans | `text-lg`         | `normal`   | default        |
| Body Text        | DM Sans | `text-lg`/`xl`    | `normal`   | default        |
| UI Labels        | DM Sans | `text-sm`         | `medium`   | default        |
| Tiny Caps        | DM Sans | `text-xs`         | `bold`     | `tracking-wider uppercase` |

### Reading Typography (Blog)
- **Line height:** `leading-relaxed` (1.625) for body paragraphs
- **Max width:** `max-w-[680px]` for optimal reading line length (65-75 characters)
- **Paragraph spacing:** `space-y-6` between paragraphs
- **Heading spacing:** `mt-12 mb-4` for section headings within articles

---

## 4. Spacing & Layout

### Grid System
- **Container:** `max-w-7xl mx-auto px-8` (1280px max width, 32px horizontal padding)
- **Blog content:** `max-w-[680px] mx-auto` for optimal readability
- **Section padding:** `py-24` for major sections, `py-12` for compact sections

### Spacing Scale
- `gap-4` — tight element spacing (buttons, inline items)
- `gap-8` — card grids, section content
- `gap-16` — major layout columns
- `mb-6` — heading to body text
- `mb-16` — section header to section content

### Responsive Breakpoints
- **Mobile-first** — single column, `px-6`, reduced font sizes
- **`md:` (768px)** — 2-column grids, nav links visible
- **`lg:` (1024px)** — full 2-column hero, `text-7xl` headings, floating data cards

---

## 5. Component Patterns

### Buttons

**Primary CTA:**
```
bg-primary hover:bg-primary/90 text-white font-bold px-8 h-14 rounded-xl text-lg
transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95
```

**Secondary/Outline:**
```
bg-white border-border shadow-sm font-medium rounded-xl
hover:bg-secondary/10 hover:text-secondary-foreground hover:border-secondary/50
```

**Ghost/Nav:**
```
text-foreground/70 hover:text-primary transition-colors
```

### Cards
```
bg-white border border-border rounded-2xl p-8 shadow-md
hover:-translate-y-1 hover:shadow-xl transition-transform
```

### Icon Containers
```
w-14 h-14 rounded-xl bg-{color}/10 text-{color} flex items-center justify-center
```
Where `{color}` is `primary`, `secondary`, or `accent` depending on the card's role.

### Badges / Tags
```
inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-sm
text-xs font-bold tracking-wide uppercase
```

### Input Fields
```
w-full bg-muted/50 border border-border rounded-full pl-5 pr-12 py-3.5 text-sm
focus:outline-none focus:ring-2 focus:ring-primary/20
```

### Modals
```
bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-border
```
- Backdrop: `bg-black/50`
- Enter animation: scale 0.95 → 1, opacity 0 → 1
- Exit animation: reverse

---

## 6. Motion & Animation

### Principles
- Animations should feel **purposeful**, not decorative
- Use `framer-motion` for enter/exit transitions
- Use CSS `animate-*` for persistent ambient effects

### Catalog

| Animation         | Usage                    | Implementation                          |
|-------------------|--------------------------|-----------------------------------------|
| Fade-up           | Chat messages, modals    | `opacity: 0→1, y: 10→0, scale: 0.95→1` |
| Pulse             | Floating data cards      | `animate-pulse` with 4-5s duration      |
| Ping              | Live status indicator    | `animate-ping` on accent dot            |
| Bounce            | Typing indicator         | 3 dots with staggered `animationDelay`  |
| Hover lift        | Feature cards            | `hover:-translate-y-1 transition-transform` |
| Button press      | Primary CTAs             | `active:scale-95`                       |

### Timing
- Quick interactions: `duration-200` to `duration-300`
- Section transitions: `duration-500`
- Ambient loops: 3-5 second cycles

---

## 7. Iconography

### Library
All icons come from **Lucide React** (`lucide-react`).

### Key Icons
| Icon          | Usage                                      |
|---------------|---------------------------------------------|
| `BrainCircuit`| BiClaw logo, AI features                    |
| `Send`        | Chat send button                            |
| `TrendingUp`  | Revenue metrics                             |
| `BarChart3`   | ROAS / ad metrics                           |
| `Zap`         | Proactive features                          |
| `LineChart`   | Multi-source data sync                      |
| `Activity`    | Status / monitoring                         |
| `Mail`        | Lead confirmation                           |
| `Clock`       | Read time                                   |
| `ArrowLeft`   | Back navigation                             |
| `Calendar`    | Publish dates                               |
| `User`        | Author attribution                          |

### Sizing
- **Nav / inline:** `w-5 h-5`
- **Card feature icons:** `w-7 h-7` inside `w-14 h-14` container
- **Logo mark:** `w-6 h-6` inside `w-10 h-10` container

---

## 8. Blog / Content Design

### Reading Experience Priorities
1. **Optimal line length** — Content column capped at 680px
2. **Generous whitespace** — `leading-relaxed`, large spacing between sections
3. **Clear hierarchy** — Outfit for headings (tight tracking), DM Sans for body (relaxed leading)
4. **Distraction-free** — No sidebar, no widgets, pure content focus on article pages

### Blog Listing Layout
- Grid layout: 1 column on mobile, 2 on `md:`, 3 on `lg:`
- Card anatomy: Cover image → Category badge → Title → Excerpt → Author row (avatar + name + date + read time)
- Featured post (first item): Full-width with larger image

### Blog Detail Layout
- Centered single column (`max-w-[680px]`)
- Back button at top
- Category badge → Title → Meta row (author, date, read time) → Cover image → Content
- Content uses rich prose styling: headings, paragraphs, blockquotes, lists, code blocks
- Sticky reading progress indicator (optional future enhancement)

### Blog Card Hover
```
hover:-translate-y-1 hover:shadow-xl transition-all duration-300
```
Image scales subtly: `group-hover:scale-105 transition-transform duration-500`

---

## 9. Shadows & Elevation

| Level    | Class                               | Usage                      |
|----------|--------------------------------------|----------------------------|
| Base     | `shadow-sm`                         | Buttons, avatars, badges   |
| Card     | `shadow-md`                         | Content cards              |
| Elevated | `shadow-xl`                         | Floating data nodes        |
| Modal    | `shadow-2xl`                        | Chat widget, modals        |
| Colored  | `shadow-primary/20` or `/30`       | CTA hover glow             |

---

## 10. Accessibility

- **Color contrast:** Infinite Night on white background exceeds WCAG AA standards
- **Focus rings:** `focus:ring-2 focus:ring-primary/20` on all interactive elements
- **Alt text:** All images require descriptive alt text
- **Keyboard navigation:** All interactive elements are focusable and activatable via keyboard
- **Reduced motion:** Respect `prefers-reduced-motion` for ambient animations (future enhancement)

---

## 11. File Architecture

```
client/
  src/
    pages/
      home.tsx          — Landing page
      blog.tsx          — Blog listing
      blog-post.tsx     — Blog article detail
    components/
      ui/               — Shadcn/ui primitives
    lib/
      queryClient.ts    — API helpers + React Query config
    index.css           — Tailwind v4 theme variables

shared/
  schema.ts             — Drizzle ORM models + Zod schemas

server/
  routes.ts             — Express API routes
  storage.ts            — Database storage layer
  index.ts              — Server entry point
```
