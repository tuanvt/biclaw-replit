import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import { z } from "zod";

const demoResponses: Record<string, string[]> = {
  revenue: [
    "Based on your Shopify data, yesterday's revenue was $3,847 — that's 12% higher than the same day last week. Your top seller was the Classic Canvas Tote with 23 units sold.",
    "Looking at your revenue trend: you're averaging $4,100/day this week, up from $3,600 last week. Your conversion rate also improved to 3.2%.",
  ],
  ads: [
    "Your Meta Ads are performing well! Current ROAS is 3.2x across all campaigns. Your 'Summer Collection' campaign is the star performer at 4.1x ROAS.",
    "Ad spend this week: $1,240. You've generated $3,968 in attributed revenue. I'd recommend increasing budget on the 'Retargeting' campaign — it's at 5.8x ROAS.",
  ],
  shopee: [
    "Your Shopee store had 47 orders today with a total GMV of $2,150. Your shop rating is 4.8/5 with a 96% response rate.",
    "Shopee flash sale results: 156 units sold in the 2-hour window, generating $4,680 in revenue. That's your best flash sale this month!",
  ],
  default: [
    "That's a great question! I can pull real-time data from your connected platforms. Want me to check your Shopify revenue, Meta Ads performance, or Shopee orders?",
    "I can help with that! Just connect your store and I'll analyze your data instantly. Would you like to see a revenue breakdown, ad performance, or inventory insights?",
    "Interesting! Let me crunch those numbers for you. In the meantime, you can connect your Shopify or Meta Ads account to get personalized insights.",
  ],
};

function getAIResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();

  let pool = demoResponses.default;
  if (lower.includes("revenue") || lower.includes("sales") || lower.includes("money") || lower.includes("income")) {
    pool = demoResponses.revenue;
  } else if (lower.includes("ad") || lower.includes("meta") || lower.includes("facebook") || lower.includes("roas") || lower.includes("campaign")) {
    pool = demoResponses.ads;
  } else if (lower.includes("shopee") || lower.includes("lazada") || lower.includes("marketplace")) {
    pool = demoResponses.shopee;
  }

  return pool[Math.floor(Math.random() * pool.length)];
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post("/api/chat/session", async (_req, res) => {
    try {
      const session = await storage.createChatSession();
      res.json({ sessionId: session.id });
    } catch (error) {
      console.error("Failed to create chat session:", error);
      res.status(500).json({ message: "Failed to create chat session" });
    }
  });

  app.post("/api/chat/message", async (req, res) => {
    try {
      const { sessionId, text } = req.body;
      if (!sessionId || !text) {
        return res.status(400).json({ message: "sessionId and text are required" });
      }

      await storage.addMessage({ sessionId, role: "user", text });

      const aiResponse = getAIResponse(text);
      const aiMessage = await storage.addMessage({ sessionId, role: "agent", text: aiResponse });

      res.json({ reply: aiMessage });
    } catch (error) {
      console.error("Failed to process chat message:", error);
      res.status(500).json({ message: "Failed to process message" });
    }
  });

  app.get("/api/chat/messages/:sessionId", async (req, res) => {
    try {
      const messages = await storage.getMessages(req.params.sessionId);
      res.json(messages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.post("/api/leads", async (req, res) => {
    try {
      const parsed = insertLeadSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid lead data", errors: parsed.error.flatten() });
      }

      const existing = await storage.getLeadByEmail(parsed.data.email);
      if (existing) {
        return res.json({ lead: existing, isNew: false });
      }

      const lead = await storage.createLead(parsed.data);
      res.status(201).json({ lead, isNew: true });
    } catch (error) {
      console.error("Failed to create lead:", error);
      res.status(500).json({ message: "Failed to create lead" });
    }
  });

  return httpServer;
}
