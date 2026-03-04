# BiClaw Design System

This document outlines the core design choices, typography, color palette, and component principles for the BiClaw frontend application.

## 1. Core Philosophy
BiClaw provides a **clean, modern, and solid** interface with a focus on high contrast, readability, and a pronounced AI aesthetic. 

- **No Gradients:** The design strictly avoids gradients in favor of sharp, solid colors.
- **Pure White Canvas:** We maximize the use of pure white backgrounds (`#FFFFFF`) to give the interface an expansive, clinical, and intelligent feel.
- **AI Vibes:** We incorporate subtle grid backgrounds, pulse animations, typing indicators, and `BrainCircuit` icons to emphasize the intelligent, autonomous nature of the agent.

## 2. Color Palette
The color palette is derived from the "Mindful Palettes No. 257" selection, balancing the energetic primary action color with warm secondary accents.

- **Backgrounds:** Pure white (`#FFFFFF`) to create an ultra-clean canvas.
- **Infinite Night (`#071037`):** The primary text color. Used for headings, body text, and providing high contrast against the white backgrounds.
- **Burnt Earth (`#9D4531`):** The Primary Action color. This vibrant red/orange draws the eye to primary calls-to-action, the main chat send button, and user messages.
- **Rustic Wicker (`#B18A56`):** The Secondary accent. This warm yellow/gold provides touches of branding, used for highlighting badges, secondary buttons, and specific icon containers.
- **Marsh Field (`#D4C477`):** A tertiary accent used sparingly for decorative elements.
- **Muted Elements (`#F5F5F5`):** Light grays are used for the AI's chat bubble background to distinguish it from the user's vibrant bubbles.

## 3. Typography
We utilize a two-font system loaded from Google Fonts to establish a distinct brand personality while maintaining excellent readability.

- **Display Font (`Outfit`):**
  - **Usage:** Headings (h1 - h6), brand name, strong numbers.
  - **Characteristics:** Geometric, bold, modern, and friendly. Adds character to the otherwise serious data application.

- **Body Font (`DM Sans`):**
  - **Usage:** Body text, paragraphs, labels, chat messages, input fields.
  - **Characteristics:** Clean, highly legible at small sizes, and pairs beautifully with Outfit.

## 4. Components & Interactions
- **Chat Interface:** 
  - The centerpiece of the application. 
  - AI messages are placed on a light gray background with an animated typing indicator to simulate thinking.
  - User messages are solid **Burnt Earth** to stand out.
- **Floating Data Nodes:**
  - Cards that pulse subtly around the chat interface to represent real-time data ingestion.
- **Iconography:**
  - Standard UI uses `lucide-react`. `BrainCircuit` is the primary icon representing the BiClaw agent.

## 5. CSS Architecture (Tailwind v4)
All colors are defined as HSL variables in `index.css` via `@theme inline` allowing standard Tailwind utility classes to automatically utilize the design system.

```css
@theme inline {
  --color-background: hsl(0 0% 100%); /* Pure White */
  --color-foreground: hsl(229 77% 12%); /* Infinite Night */
  --color-primary: hsl(11 52% 40%); /* Burnt Earth (Red/Orange) */
  --color-secondary: hsl(34 37% 52%); /* Rustic Wicker (Yellow/Gold) */
  /* ... */
}
```
