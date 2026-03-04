# BiClaw Landing Page

## Overview
BiClaw is a conversational AI business intelligence tool that lives in WhatsApp. This project is its marketing landing page with a live interactive chat demo and lead capture system.

## Architecture
- **Frontend:** React + Vite, served via Express in development
- **Backend:** Express.js API server
- **Database:** PostgreSQL with Drizzle ORM
- **Styling:** Tailwind CSS v4 with CSS variables

## Color Palette
- **Infinite Night** (`#292F36`) — foreground/text
- **Divine Pleasure** (`#FFFFFF`) — backgrounds
- **Rustic Wicker** (`#B18A56`) — secondary (warm gold)
- **Marsh Field** (`#D4C477`) — accent (yellow)
- **Burnt Earth** (`#9D4531`) — primary (red/orange) for CTAs

## Key Files
- `client/src/pages/home.tsx` — Landing page with chat widget + lead modal
- `client/src/index.css` — Tailwind v4 theme with CSS variables
- `shared/schema.ts` — Database schema (leads, chat_sessions, chat_messages)
- `server/routes.ts` — API routes (/api/chat/*, /api/leads)
- `server/storage.ts` — Database storage layer with Drizzle

## API Endpoints
- `POST /api/chat/session` — Create a new chat session
- `POST /api/chat/message` — Send a message and get AI demo response
- `GET /api/chat/messages/:sessionId` — Get messages for a session
- `POST /api/leads` — Submit a lead (email + optional name)

## Fonts
- **Outfit** — Display/headings (font-display)
- **DM Sans** — Body text (font-sans)

## Design Decisions
- No gradients — all solid color fills
- White-dominant, clean light theme with AI aesthetic
- Chat widget uses contextual demo responses based on keywords (revenue, ads, shopee)
- Floating data cards with pulse animation for visual interest
