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

async function seedBlogPosts() {
  const existing = await storage.getAllBlogPosts();
  if (existing.length > 0) return;

  const posts = [
    {
      slug: "why-ecommerce-founders-ditch-dashboards",
      title: "Why Ecommerce Founders Are Ditching Dashboards for Chat",
      excerpt: "The dashboard era is ending. Modern founders want answers, not charts. Here's why conversational BI is the future of ecommerce analytics.",
      category: "Insights",
      author: "Sarah Chen",
      authorAvatar: "https://i.pravatar.cc/100?img=5",
      readTime: 8,
      coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop",
      content: `The average ecommerce founder logs into 4-7 different dashboards every single morning. Shopify admin. Google Analytics. Meta Ads Manager. Maybe Shopee Seller Center. A spreadsheet or two for good measure.

That's 30-45 minutes of context-switching before you've made a single decision.

## The Dashboard Problem

Dashboards were built for data analysts, not business owners. They assume you have the time and expertise to:

- Navigate complex filtering interfaces
- Understand what metrics actually matter
- Cross-reference data across platforms manually
- Spot anomalies in charts you glance at for 3 seconds

The truth is, most founders just want answers to simple questions: "How did yesterday go?" or "Is my ad spend actually working?"

## The Conversational Alternative

Imagine waking up to a WhatsApp message that says:

> "Morning! Yesterday you did $4,250 in revenue across 67 orders. Your Meta Ads ROAS was 3.2x, up from 2.8x last week. The 'Summer Collection' campaign is your best performer. Want me to dig deeper into anything?"

No login. No dashboard. No context-switching. Just the answer.

## What Changes When You Chat With Your Data

**Speed:** The average dashboard session takes 12 minutes. A chat conversation takes 30 seconds.

**Accessibility:** Your entire team can ask questions in plain language. No training required.

**Proactivity:** Instead of you hunting for insights, the insights come to you. Daily briefs, anomaly alerts, trend notifications — all delivered to where you already spend your time.

**Cross-platform intelligence:** When your Shopify revenue dips and your Meta CPM spikes on the same day, a conversational AI connects those dots automatically. A dashboard shows you two separate charts in two separate tabs.

## The Founders Who Get It

We've seen a clear pattern among the 500+ founders using BiClaw: they spend 80% less time on analytics and make faster decisions. Not because they have less data, but because they have better access to it.

The founders who thrive aren't the ones with the most sophisticated dashboards. They're the ones who can ask a question and get an answer in 10 seconds.

## Making the Switch

The transition from dashboards to conversational BI isn't about abandoning data — it's about consuming it differently. Your Shopify data, Meta Ads performance, and Shopee metrics don't disappear. They just become accessible through the most natural interface humans have ever invented: conversation.

The dashboard era gave us visibility. The conversational era gives us clarity.`
    },
    {
      slug: "understanding-roas-beyond-the-number",
      title: "Understanding ROAS: Why the Number Alone Isn't Enough",
      excerpt: "A 3x ROAS sounds great, but is it actually good for YOUR business? We break down the context most analytics tools miss.",
      category: "Education",
      author: "Marcus Rivera",
      authorAvatar: "https://i.pravatar.cc/100?img=12",
      readTime: 6,
      coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop",
      content: `Every ecommerce founder knows ROAS — Return on Ad Spend. It's the metric that determines whether your advertising is "working." But here's the uncomfortable truth: ROAS alone is one of the most misleading metrics in ecommerce.

## The ROAS Trap

Let's say your Meta Ads show a 3.2x ROAS. For every dollar you spend, you get $3.20 back in revenue. Sounds profitable, right?

Not necessarily.

**ROAS doesn't account for:**
- Your cost of goods sold (COGS)
- Shipping costs
- Payment processing fees
- Returns and refunds
- Customer acquisition vs. retention

A 3.2x ROAS on a product with 70% margins is incredible. A 3.2x ROAS on a product with 30% margins means you're barely breaking even — or losing money.

## What You Should Be Tracking Instead

### Blended ROAS vs. Platform ROAS

Platform ROAS (what Meta or Google reports) only tells you about attributed revenue. Blended ROAS looks at your total ad spend across all platforms divided by your total revenue. This gives you a more honest picture.

### Contribution Margin After Ads

This is the metric that actually matters:

Revenue - COGS - Ad Spend - Shipping - Processing = Contribution Margin

If this number is positive, your ads are truly working. If it's negative, a 5x ROAS doesn't save you.

### Customer Lifetime Value (LTV) to Customer Acquisition Cost (CAC) Ratio

A 1.5x ROAS on first purchase might look terrible, but if those customers come back 4 more times without additional ad spend, your effective ROAS is much higher.

## How BiClaw Helps

When you ask BiClaw "How are my ads performing?", we don't just show you ROAS. We connect your ad spend data with your actual Shopify margins, refund rates, and repeat purchase patterns to give you the full picture.

A typical response might look like:

> "Your Meta ROAS is 3.2x, but after accounting for your 45% COGS and 8% return rate, your true profit per ad dollar is $0.48. Your 'Retargeting' campaign has the highest effective margin at $0.82/dollar because repeat customers have a 2% return rate vs. 12% for new customers."

That's the difference between seeing a number and understanding your business.

## The Bottom Line

ROAS is a useful directional metric, but it's a starting point — not a conclusion. The founders who scale profitably are the ones who look beyond the surface number and understand the full economics of their advertising.

Stop celebrating ROAS. Start celebrating profitable growth.`
    },
    {
      slug: "daily-briefings-morning-routine",
      title: "How Daily AI Briefings Changed My Morning Routine as a Founder",
      excerpt: "From 45 minutes of dashboard-hopping to a 2-minute WhatsApp conversation. A founder shares how automated briefings transformed her mornings.",
      category: "Case Study",
      author: "Priya Sharma",
      authorAvatar: "https://i.pravatar.cc/100?img=25",
      readTime: 5,
      coverImage: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=630&fit=crop",
      content: `I used to wake up at 6 AM just to get through my dashboards before the day started. Shopify admin first — checking yesterday's revenue, scanning for any order issues. Then Meta Ads Manager — did my campaigns overspend? Is the ROAS holding up? Then Shopee Seller Center — any new reviews? How's the flash sale performing?

By the time I was done, it was 6:45 AM, I'd had two cups of coffee, and I hadn't even started my actual work.

## The Old Morning Routine

**6:00 AM** — Wake up, grab phone, open Shopify
**6:10 AM** — Check Meta Ads Manager, panic about CPM spikes
**6:20 AM** — Open Shopee, check seller rating
**6:30 AM** — Open Google Sheets, update daily tracker
**6:40 AM** — Cross-reference numbers, look for patterns
**6:45 AM** — Finally start breakfast

Every single morning. Seven days a week. Because ecommerce doesn't take weekends off.

## The Switch

When I connected BiClaw to my stores, the first thing I set up was a daily morning briefing. Every day at 7 AM, I get a WhatsApp message that looks something like this:

> "Good morning, Priya! Here's your daily brief:
> 
> Revenue: $3,847 yesterday (↑12% vs. last week)
> Top product: Silk Scrunchie Set — 34 units
> Meta Ads: $380 spent, 3.4x ROAS
> Shopee: 28 orders, 4.9 rating maintained
> 
> One thing to note: Your 'New Arrivals' campaign CPM jumped 23% yesterday. Want me to look into it?"

Two minutes. That's all it takes now.

## What Changed

### I actually eat breakfast now
This sounds trivial, but it's not. The mental load of scanning dashboards first thing in the morning was exhausting. Now I read my brief over breakfast like reading the news.

### I make faster decisions
When I see something concerning in my brief, I just reply. "Yes, look into the CPM spike." BiClaw does the analysis and sends me a follow-up. No logging into three platforms and trying to correlate data manually.

### I focus on strategy, not data collection
The time I saved isn't just 40 minutes. It's the mental energy of context-switching between platforms. That energy now goes toward product development, customer relationships, and actual growth work.

### Weekends feel different
I still get my daily brief on weekends, but it's a 30-second scan instead of a 45-minute ritual. If everything looks normal, I put my phone down and enjoy my day off.

## The Unexpected Benefit

The biggest surprise was how my team responded. I started forwarding relevant insights to my VA and my marketing person. They didn't need to learn any dashboards — they just got the information they needed in a message.

My VA now asks BiClaw directly: "What were the top 5 orders yesterday?" My marketing person asks: "Which ad creative had the highest click-through rate this week?" They get instant answers without bothering me.

## Would I Go Back?

Not a chance. The dashboard era served its purpose, but once you've experienced getting answers delivered to you instead of hunting for them, there's no going back.

My morning routine now: Wake up. Read brief. Reply if needed. Eat breakfast. Start working on things that actually grow the business.

That's the founder life I signed up for.`
    },
    {
      slug: "connecting-shopify-meta-ads-guide",
      title: "The Complete Guide to Connecting Your Shopify Store with Meta Ads Data",
      excerpt: "Step-by-step guide to unifying your Shopify and Meta Ads data for cross-platform intelligence and better decision making.",
      category: "Tutorial",
      author: "BiClaw Team",
      authorAvatar: "https://i.pravatar.cc/100?img=33",
      readTime: 10,
      coverImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=630&fit=crop",
      content: `One of the most powerful things about conversational BI is the ability to ask questions that span multiple data sources. "What's my true cost per acquisition when I factor in Shopify refunds?" or "Which Meta campaign drives the most repeat purchases?"

These questions require your Shopify and Meta Ads data to talk to each other. Here's how to make that happen.

## Why Cross-Platform Data Matters

Most ecommerce founders look at their Shopify data and their Meta Ads data separately. Shopify tells you what sold. Meta tells you what you spent. But neither tells you the full story.

**Questions you can't answer with a single platform:**
- Which ad campaign drives the highest-margin orders?
- What's the refund rate for customers acquired through Meta vs. organic?
- How does ad spend correlate with revenue on a daily basis?
- Which products have the best ROAS when you factor in returns?

## Setting Up the Connection

### Step 1: Connect Your Shopify Store

BiClaw connects to Shopify through the official API. You'll need:

1. Your Shopify store URL (e.g., yourstore.myshopify.com)
2. Admin API access (we request read-only permissions)
3. The data we pull: orders, products, customers, refunds

The connection takes about 60 seconds. We'll do an initial sync of your last 90 days of data, and then keep everything updated in real-time via webhooks.

### Step 2: Connect Your Meta Ads Account

For Meta Ads, we use the Marketing API:

1. Log in with your Facebook account
2. Select the ad accounts you want to analyze
3. Grant read-only access to campaign, ad set, and ad-level data

We sync campaign performance data including spend, impressions, clicks, and conversions.

### Step 3: Let BiClaw Map the Data

This is where the magic happens. BiClaw automatically maps Meta Ads conversion data to actual Shopify orders. This means we can tell you not just that a campaign had a 3x ROAS, but that the orders from that campaign had:

- An average margin of 52%
- A refund rate of 4%
- A repeat purchase rate of 28%

### Step 4: Start Asking Questions

Once connected, you can ask questions like:

> "Compare my top 3 Meta campaigns by true profit margin"

> "What's my blended ROAS this month including organic?"

> "Show me the products with the highest refund rate from paid traffic"

## Best Practices

### Review Your Data Weekly

Set up a weekly deep-dive brief in addition to your daily summary. The weekly brief covers trends, comparisons, and recommendations that need a broader time horizon.

### Use Consistent UTM Parameters

If you're running campaigns across multiple platforms, consistent UTM tagging helps BiClaw attribute orders more accurately.

### Monitor Anomalies

BiClaw automatically flags unusual patterns — like a sudden spike in CPM or an unexpected drop in conversion rate. Make sure you respond to these alerts promptly.

## What Comes Next

Once you've mastered the Shopify + Meta Ads connection, you can add additional data sources like Shopee, Google Ads, email marketing platforms, and more. Each new connection makes your conversational insights richer and more actionable.

The goal isn't just to have all your data in one place — it's to have all your data accessible through a single question.`
    },
    {
      slug: "shopee-sellers-guide-to-analytics",
      title: "A Shopee Seller's Guide to Analytics That Actually Matter",
      excerpt: "Tired of Shopee's basic seller dashboard? Here are the metrics that separate top sellers from the rest — and how to track them.",
      category: "Education",
      author: "James Tan",
      authorAvatar: "https://i.pravatar.cc/100?img=15",
      readTime: 7,
      coverImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=630&fit=crop",
      content: `Shopee Seller Center gives you the basics: orders, revenue, ratings. But if you're serious about growing your Shopee business, you need to track metrics that the default dashboard doesn't surface.

## The Metrics That Matter

### 1. True Conversion Rate by Traffic Source

Shopee shows you an overall conversion rate, but it doesn't break down by traffic source. Are your Shopee Ads converting better than organic search? Is your social media traffic actually driving sales or just visits?

Understanding conversion by source helps you allocate budget effectively.

### 2. Return Rate by Product Category

Returns eat into your margins silently. A product with high sales but a 15% return rate might actually be less profitable than a slower seller with 2% returns.

Track returns at the product and category level to identify problem areas before they drain your profits.

### 3. Response Time Impact on Conversion

Shopee rewards fast response times, but did you know that responding within 5 minutes vs. 30 minutes can increase your conversion rate by up to 40%? Track your actual response times and correlate them with sales performance.

### 4. Flash Sale Profitability

Flash sales drive volume, but are they profitable after discounts, Shopee fees, and shipping subsidies? Calculate your true margin per flash sale to decide which ones are worth participating in.

### 5. Repeat Purchase Rate

The most underrated metric for Shopee sellers. If customers buy from you once and never return, you're always paying for new acquisition. Track which products drive repeat purchases and feature them more prominently.

## How to Track These Metrics

### The Manual Way

Export your Shopee data weekly, combine it with your ad spend data in a spreadsheet, and calculate these metrics by hand. This works but takes 2-3 hours per week and is prone to errors.

### The BiClaw Way

Connect your Shopee account and ask:

> "What's my conversion rate from Shopee Ads vs. organic search this month?"

> "Which products have the highest return rate?"

> "How profitable was last week's flash sale after all fees?"

You get the answer in seconds, with trend context and comparisons to previous periods.

## Building a Data-Driven Shopee Business

The sellers who dominate Shopee aren't necessarily the ones with the best products or the lowest prices. They're the ones who understand their data deeply enough to make smart, fast decisions.

Start tracking these metrics today, and you'll have a significant advantage over sellers who only look at their Shopee dashboard.

The data is already there. You just need the right way to access it.`
    },
    {
      slug: "ai-ecommerce-analytics-2026",
      title: "The State of AI in Ecommerce Analytics: 2026 and Beyond",
      excerpt: "From basic reporting to predictive intelligence — how AI is reshaping the way ecommerce businesses understand their data.",
      category: "Insights",
      author: "Sarah Chen",
      authorAvatar: "https://i.pravatar.cc/100?img=5",
      readTime: 9,
      coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop",
      content: `Three years ago, "AI in ecommerce" meant product recommendations and chatbots that couldn't understand basic questions. Today, we're in a fundamentally different era.

## Where We Started

The first wave of AI in ecommerce was about automation — auto-generated product descriptions, basic recommendation engines, and rule-based chatbots. Useful, but limited.

The second wave brought better machine learning — dynamic pricing, demand forecasting, and more sophisticated recommendation algorithms. Better, but still required data science expertise to implement.

## Where We Are Now

The third wave — which we're fully in now — is about **natural language intelligence**. The breakthrough isn't in the AI's ability to analyze data (that was solved years ago). It's in the AI's ability to communicate insights in human language.

This is why conversational BI is exploding. Founders don't need to become data scientists. They just need to ask questions.

### What Modern AI Analytics Can Do

**Contextual Understanding:** When you ask "How did yesterday go?", the AI knows you mean revenue, orders, and key metrics — not a philosophical question about the nature of time.

**Cross-Platform Synthesis:** The AI can connect data from Shopify, Meta Ads, Shopee, and email marketing to give you unified insights. It doesn't just report numbers; it connects patterns.

**Anomaly Detection:** Instead of you noticing that conversion rate dropped, the AI flags it proactively: "Your conversion rate dropped 18% today. This correlates with a site speed issue detected at 2 PM."

**Predictive Insights:** Based on current trends, the AI can project: "At your current daily run rate, you'll hit $125K this month — 15% above your target."

## The Challenges Ahead

### Data Quality

AI analytics is only as good as the data it processes. Messy UTM parameters, inconsistent product categorization, and incomplete tracking still plague many ecommerce businesses.

### Trust and Transparency

Founders need to trust the AI's recommendations. This means the AI needs to show its reasoning, not just its conclusions. "I recommend increasing your retargeting budget because..." is more useful than "Increase retargeting budget."

### Privacy and Compliance

As AI analytics becomes more sophisticated, the regulatory landscape is catching up. GDPR, CCPA, and emerging privacy laws require careful handling of customer data.

## What's Coming Next

### Voice-First Analytics

The next frontier is voice. Imagine asking your phone "Hey, how are sales today?" and getting an instant verbal summary while you're driving or cooking.

### Predictive Automation

Beyond just predicting outcomes, AI will start taking action. "Your Meta CPM is spiking. I've paused your lowest-performing campaign and reallocated budget to your top performer. Estimated savings: $340."

### Collaborative Intelligence

AI analytics won't replace human judgment — it will augment it. The best outcomes will come from founders who combine AI insights with their deep understanding of their customers and market.

## The Bottom Line

The ecommerce founders who embrace AI analytics now will have a compounding advantage. Not because the AI is smarter than them, but because it gives them back the most valuable resource they have: time.

And with that time, they can do what humans do best — build relationships, create products, and make the strategic decisions that no algorithm can make.

The future of ecommerce analytics isn't about more dashboards or more data. It's about better conversations with the data you already have.`
    }
  ];

  for (const post of posts) {
    await storage.createBlogPost(post);
  }
  console.log(`Seeded ${posts.length} blog posts`);
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  await seedBlogPosts();

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

  app.get("/api/blog", async (_req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Failed to fetch blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Failed to fetch blog post:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  return httpServer;
}
