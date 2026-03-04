# BiClaw Landing Page

## Overview
BiClaw is a conversational AI business intelligence tool that lives in WhatsApp. This project is its marketing website with a landing page, live interactive chat demo, lead capture system, and a content blog.

## Architecture
- **Frontend:** React + Vite, served via Express in development
- **Backend:** Express.js API server
- **Database:** PostgreSQL with Drizzle ORM
- **Styling:** Tailwind CSS v4 with CSS variables
- **Routing:** wouter for client-side routing

## Color Palette
- **Infinite Night** (`#071037`) — foreground/text
- **Divine Pleasure** (`#FFFFFF`) — backgrounds
- **Rustic Wicker** (`#B18A56`) — secondary (warm gold)
- **Marsh Field** (`#D4C477`) — accent (yellow)
- **Burnt Earth** (`#9D4531`) — primary (red/orange) for CTAs

## Pages
- `/` — Landing page with full content from biclaw.app: hero, scrolling integrations marquee, "not another wrapper" comparisons, demo scenario cards (ads/competitors/research), security bento grid, before/after comparison, testimonials, 3-step setup, live demo with chat widget, pricing cards, FAQ accordion, final CTA
- `/blog` — Blog listing with featured post + grid of articles
- `/blog/:slug` — Blog detail with optimized reading layout (680px content column)

## Key Files
- `client/src/pages/home.tsx` — Landing page (all sections + chat widget + lead modal)
- `client/src/pages/blog.tsx` — Blog listing page
- `client/src/pages/blog-post.tsx` — Blog article detail page
- `client/src/index.css` — Tailwind v4 theme with CSS variables + marquee animation
- `shared/schema.ts` — Database schema (leads, chat_sessions, chat_messages, blog_posts)
- `server/routes.ts` — API routes + blog seed data
- `server/storage.ts` — Database storage layer with Drizzle
- `design-system.md` — Comprehensive design guidelines document

## API Endpoints
- `POST /api/chat/session` — Create a new chat session
- `POST /api/chat/message` — Send a message and get AI demo response
- `GET /api/chat/messages/:sessionId` — Get messages for a session
- `POST /api/leads` — Submit a lead (email + optional name)
- `GET /api/blog` — List all blog posts (ordered by publish date)
- `GET /api/blog/:slug` — Get a single blog post by slug

## Fonts
- **Outfit** — Display/headings (font-display)
- **DM Sans** — Body text (font-sans)

## Design Decisions
- No gradients — all solid color fills only
- No non-palette colors — everything uses primary/secondary/accent/foreground/muted
- White-dominant, clean light theme with AI aesthetic
- Chat widget uses contextual demo responses based on keywords
- Floating data cards with pulse/motion animations for visual interest
- Scrolling integration logo marquee with CSS keyframes
- Blog detail uses 680px max-width column for optimal reading
- Blog posts seeded on server startup (6 articles)
- All CTAs say "Start Free Trial" consistently (no waitlist copy)
