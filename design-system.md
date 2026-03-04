# BiClaw Design System

This document outlines the core design choices, typography, color palette, and component principles for the BiClaw frontend application.

## 1. Core Philosophy
BiClaw provides a **clean, modern, and solid** interface with a focus on high contrast, readable typography, and conversational UI elements. 

- **No Gradients:** The design strictly avoids gradients in favor of sharp, solid colors.
- **Abundant Whitespace:** Elements breathe through generous padding and margins.
- **Card-based Depth:** We use subtle background off-whites paired with pure white cards and delicate shadows to establish hierarchy and depth.

## 2. Color Palette
The color palette is derived from the "Mindful Palettes No. 257" selection. We use these colors strictly as solid fills.

- **Infinite Night (`#071037`):** The primary foreground color. Used for headings, bold body text, and high-contrast elements.
- **Divine Pleasure (`#F4EFE1`):** (Reserved for specific warmth if needed, though replaced mostly by pure whites and doctors for an even cleaner look).
- **Rustic Wicker (`#B18A56`):** The Primary brand color. Used for prominent buttons, active states, and the main branding highlights.
- **Marsh Field (`#D4C477`):** A secondary accent used for highlights, badges, and secondary icons.
- **Burnt Earth (`#9D4531`):** The destructive/accent color used for distinct notifications, warnings, and alternative icon highlights.
- **Doctor (`#F9F9F9`):** The main application background. It provides a soft base that makes pure white (`#FFFFFF`) cards stand out elegantly.

## 3. Typography
We utilize a two-font system loaded from Google Fonts to establish a distinct brand personality while maintaining excellent readability.

- **Display Font (`Outfit`):**
  - **Usage:** Headings (h1 - h6), brand name, strong numbers.
  - **Characteristics:** Geometric, bold, modern, and friendly. Adds character to the otherwise serious data application.

- **Body Font (`DM Sans`):**
  - **Usage:** Body text, paragraphs, labels, chat messages, input fields.
  - **Characteristics:** Clean, highly legible at small sizes, and pairs beautifully with Outfit.

## 4. Layout & Spacing
- **Max Width:** Content is generally constrained to a `max-w-7xl` container to ensure readability on ultra-wide screens.
- **Card Styling:** Containers and interactive elements use `rounded-2xl` for soft, approachable corners, paired with `shadow-md` or `shadow-xl` to pop off the Doctor background.
- **Borders:** Borders are kept very subtle (`border-border` mapped to a light grey) to define edges without adding visual noise.

## 5. The Chat Interface
As BiClaw is heavily conversational, the chat interface is a central component:
- **User Messages:** Align right, use the solid **Primary** color with white text. Rounded corners except for the top-right.
- **Agent Messages:** Align left, use a solid **Muted** off-white background with Infinite Night text. Rounded corners except for the top-left.
- **Input Area:** High contrast, rounded full inputs with a solid primary send button.

## 6. CSS Architecture (Tailwind v4)
All colors are defined as HSL variables in `index.css` via `@theme inline` allowing standard Tailwind utility classes to automatically utilize the design system.

```css
@theme inline {
  --color-primary: hsl(34 37% 52%); /* Rustic Wicker */
  --color-background: hsl(0 0% 98%); /* Doctor */
  --color-foreground: hsl(229 77% 12%); /* Infinite Night */
  /* ... */
}
```
