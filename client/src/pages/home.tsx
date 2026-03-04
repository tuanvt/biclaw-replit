import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Send, TrendingUp, Zap, BrainCircuit, Activity,
  X, Mail, Shield, Lock, Container, Wifi, Cpu, Clock, Check,
  Globe, CalendarClock, Code, Search, MessageCircle, FileText, AlertTriangle,
  Eye, ShoppingCart, Megaphone, Star, Coffee
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/8 text-primary text-[11px] font-bold uppercase tracking-widest border border-primary/12">
      {children}
    </span>
  );
}

const integrations = [
  { name: "Shopify", color: "#95BF47" },
  { name: "Facebook Ads", color: "#0668E1" },
  { name: "Stripe", color: "#635BFF" },
  { name: "Google Analytics", color: "#E37400" },
  { name: "Google Ads", color: "#4285F4" },
  { name: "Amazon", color: "#FF9900" },
  { name: "WooCommerce", color: "#96588A" },
  { name: "TikTok Shop", color: "#000000" },
  { name: "Google Sheets", color: "#0F9D58" },
  { name: "Any Dashboard", color: "#666666" },
];

const faqs = [
  { q: "Is my data safe?", a: "Each user gets their own isolated instance running in a secure Docker sandbox. Your Shopify tokens, ad account credentials, and data never leave your private environment — never shared with other users, never accessible outside your container." },
  { q: "What else can BiClaw do besides analytics?", a: "BiClaw is a full AI business partner. Beyond morning briefs and data analysis, it can monitor competitor pricing, research market trends, draft product descriptions and emails, automate recurring reports, manage inventory data, and run any business task you can describe in plain language." },
  { q: "Can BiClaw monitor my competitors?", a: "Yes. The browser agent can visit any public store or website on a schedule you set — daily, weekly, or on demand. BiClaw tracks pricing changes, new product launches, and promotions, then reports what changed." },
  { q: "How is this different from ChatGPT?", a: "ChatGPT requires you to upload data manually and forgets everything between sessions. BiClaw is always connected to your tools, always monitoring, always automating. It pushes morning briefs, competitor updates, and task results to you without you asking." },
  { q: "Do I need technical skills?", a: "No. BiClaw walks you through everything in chat — from connecting data sources to setting up competitor monitoring and automated workflows. All technical setup is handled for you." },
  { q: "Will it work with my marketplace or dashboard?", a: "Yes. The built-in browser agent can log into any web dashboard — Amazon Seller Central, TikTok Shop, marketplace dashboards, ad platforms, and more. No API needed." },
  { q: "What AI model does it use?", a: "BiClaw includes Claude Sonnet 4.5 by Anthropic in your subscription. No API keys needed — unlike other wrappers, you never have to bring your own model key." },
  { q: "Is there a risk-free way to try it?", a: "Yes. Start with a 7-day free trial — no credit card required. All paid plans include a 30-day money-back guarantee." },
];

const testimonials = [
  { quote: "I used to spend 20 minutes every morning checking Shopify and Facebook Ads. Now BiClaw sends me one WhatsApp message with everything I need — and tracks my top competitor's pricing automatically.", name: "Sarah M.", company: "CaseCraft", platform: "Shopify", revenue: "$45K/mo" },
  { quote: "BiClaw's anomaly detection caught a payment processing issue at 6 AM before I even woke up. The browser agent confirmed it was a checkout error. That would have cost me $2K.", name: "Marcus T.", company: "GearFlow", platform: "Shopify + Stripe", revenue: "$120K/mo" },
  { quote: "I manage 6 client stores. Each one has its own instance — morning briefs on Telegram, automated weekly reports, and competitor monitoring. It's like having an analyst + assistant per client.", name: "Priya K.", company: "Elevate Agency", platform: "Multi-store", revenue: "$300K/mo" },
  { quote: "I asked BiClaw to research trending products in my niche every Monday and draft descriptions for the winners. What used to take me half a day now happens while I sleep.", name: "Daniel R.", company: "NovaPets", platform: "Shopify + Amazon", revenue: "$80K/mo" },
];

const beforeTasks = [
  { task: "Check Shopify admin", time: "8 min" },
  { task: "Calculate ROAS manually", time: "6 min" },
  { task: "Visit competitor stores", time: "10 min" },
  { task: "Google trending products", time: "15 min" },
  { task: "Write product descriptions", time: "12 min" },
  { task: "Compile weekly report", time: "10 min" },
];

export default function Home() {
  const [messages, setMessages] = useState<{role: 'agent' | 'user', text: string}[]>([
    { role: 'agent', text: "Hi! I'm BiClaw — your AI business analyst." },
    { role: 'agent', text: "Ask me for a sample morning brief, competitor report, or anything about your ecommerce data." },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadEmail, setLeadEmail] = useState("");
  const [leadName, setLeadName] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadLoading, setLeadLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  useEffect(() => {
    async function initSession() {
      try {
        const res = await apiRequest("POST", "/api/chat/session");
        const data = await res.json();
        setSessionId(data.sessionId);
      } catch (err) { console.error("Failed to create chat session:", err); }
    }
    initSession();
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !sessionId) return;
    const userText = input;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput("");
    setIsTyping(true);
    try {
      const res = await apiRequest("POST", "/api/chat/message", { sessionId, text: userText });
      const data = await res.json();
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'agent', text: data.reply.text }]);
    } catch {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'agent', text: "Hmm, I had trouble processing that. Could you try again?" }]);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail.trim()) return;
    setLeadLoading(true);
    try {
      await apiRequest("POST", "/api/leads", { email: leadEmail, name: leadName || undefined, source: "cta_button" });
      setLeadSubmitted(true);
    } catch (err) { console.error("Lead submission error:", err); }
    finally { setLeadLoading(false); }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans overflow-x-hidden">

      {/* ──── NAV ──── */}
      <nav className="w-full flex items-center justify-between px-6 md:px-8 py-4 max-w-7xl mx-auto relative z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-foreground" data-testid="text-logo">BiClaw</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/60">
          <a href="#features" className="hover:text-primary transition-colors" data-testid="link-features">Features</a>
          <a href="#pricing" className="hover:text-primary transition-colors" data-testid="link-pricing">Pricing</a>
          <Link href="/blog" className="hover:text-primary transition-colors" data-testid="link-blog">Blog</Link>
        </div>
        <Button
          size="sm"
          className="bg-primary hover:bg-primary/90 text-white font-semibold text-sm h-9 px-4 rounded-lg"
          onClick={() => setShowLeadModal(true)}
          data-testid="button-login"
        >
          Start Free Trial
        </Button>
      </nav>

      {/* ──── HERO ──── */}
      <section className="relative z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle,#e5e5e5_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-25 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-8 pt-12 pb-16 relative">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-border shadow-sm mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <span className="text-[11px] font-bold text-foreground/60 tracking-wider uppercase" data-testid="badge-hero">AI Business Analyst for E-commerce</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.08] tracking-tight mb-5"
            >
              Stop checking 6 dashboards{" "}
              <span className="text-primary relative inline-block">
                every morning
                <svg className="absolute w-full h-2.5 -bottom-0.5 left-0 text-accent" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="5" fill="transparent" strokeLinecap="round"/>
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
              className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8"
            >
              Your AI business analyst texts you sales, ads, and traffic insights — with instant anomaly alerts. Set up in under 1 minute.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.22 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-bold px-7 h-12 rounded-xl text-base transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] w-full sm:w-auto"
                onClick={() => setShowLeadModal(true)}
                data-testid="button-start-chatting"
              >
                Start Free Trial — No Credit Card
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-7 rounded-xl text-base bg-white border-border shadow-sm font-medium w-full sm:w-auto"
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-see-demo"
              >
                See a live demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-muted-foreground"
            >
              {["Set up in under 1 minute", "No credit card", "No technical skills", "Cancel anytime"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-primary" />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Social proof cards below hero */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10"
          >
            <div className="bg-white border border-border px-4 py-3 rounded-xl shadow-md flex items-center gap-3">
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-primary uppercase tracking-wider leading-none">Proactive Alert</p>
                <p className="text-xs text-foreground mt-1">Caught $2K checkout error before store opened</p>
              </div>
              <span className="text-xs font-bold text-secondary ml-1">Saved $2,140</span>
            </div>

            <div className="bg-white border border-border px-4 py-3 rounded-xl shadow-md flex items-center gap-3">
              <div className="p-1.5 bg-accent/15 rounded-lg">
                <TrendingUp className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider leading-none">Today's Revenue</p>
                <p className="text-lg font-display font-bold text-foreground leading-none mt-1" data-testid="text-revenue-card">$4,250</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──── SCROLLING LOGOS ──── */}
      <section className="border-y border-border bg-muted/30 py-6 relative z-10 overflow-hidden">
        <p className="text-center text-[11px] font-bold tracking-widest uppercase text-muted-foreground mb-4 px-6">Trusted by e-commerce businesses in 15+ countries</p>
        <div className="relative">
          <div className="flex animate-marquee gap-10 items-center">
            {[...integrations, ...integrations, ...integrations].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 shrink-0">
                <div className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: item.color + '18' }}>
                  <ShoppingCart className="w-3 h-3" style={{ color: item.color }} />
                </div>
                <span className="text-xs font-semibold text-foreground/60 whitespace-nowrap">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-4 px-6">
          Don't see your platform? BiClaw can read <strong className="text-foreground">any web dashboard</strong>.
        </p>
      </section>

      {/* ──── WHY NOT ANOTHER WRAPPER ──── */}
      <section id="features" className="py-16 lg:py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-10">
            <SectionBadge>Not another AI wrapper</SectionBadge>
            <h2 className="text-3xl lg:text-4xl font-display font-extrabold text-foreground mt-4 mb-3">
              Why BiClaw isn't just another AI wrapper
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm">Three things that separate BiClaw from generic AI chatbots.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                title: "Pre-Built, Not Empty",
                bad: "Generic AI wrappers give you an empty chatbot. You teach it everything from scratch.",
                good: "BiClaw comes with e-commerce BI skills built-in. Already knows how to read Shopify, Stripe, Google Analytics, Facebook Ads.",
                stat: "Under 1 min",
                statLabel: "Setup time",
                icon: <Zap className="w-5 h-5" />,
                color: "primary" as const,
              },
              {
                title: "Proactive, Not Reactive",
                bad: "Generic AI wrappers wait for you to ask questions.",
                good: 'BiClaw tells YOU when something needs attention. "Sales dropped 20% — here\'s why."',
                stat: "24/7",
                statLabel: "Monitoring",
                icon: <Eye className="w-5 h-5" />,
                color: "secondary" as const,
              },
              {
                title: "Fixed Price, Not Pay-Per-Token",
                bad: "Generic AI wrappers charge per query. Costs add up fast.",
                good: "BiClaw charges $29/mo flat. Unlimited questions. We optimize tokens so you don't have to.",
                stat: "$29/mo",
                statLabel: "Transparent pricing",
                icon: <Shield className="w-5 h-5" />,
                color: "accent" as const,
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col"
                data-testid={`card-wrapper-${i}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                  card.color === 'primary' ? 'bg-primary/10 text-primary' :
                  card.color === 'secondary' ? 'bg-secondary/15 text-secondary' :
                  'bg-accent/15 text-accent'
                }`}>
                  {card.icon}
                </div>
                <h3 className="text-base font-display font-bold text-foreground mb-3">{card.title}</h3>
                <div className="bg-muted/50 rounded-lg p-3 mb-2">
                  <p className="text-sm text-muted-foreground line-through decoration-muted-foreground/30 leading-snug">{card.bad}</p>
                </div>
                <div className="bg-primary/5 rounded-lg p-3 mb-4 border border-primary/8 flex-1">
                  <p className="text-sm text-foreground font-medium leading-snug">{card.good}</p>
                </div>
                <div className="pt-3 border-t border-border/60">
                  <p className="text-xl font-display font-extrabold text-foreground">{card.stat}</p>
                  <p className="text-[11px] text-muted-foreground font-medium">{card.statLabel}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── BICLAW DOES THE WORK ──── */}
      <section className="py-16 lg:py-20 bg-muted/25 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-10">
            <SectionBadge>See it in action</SectionBadge>
            <h2 className="text-3xl lg:text-4xl font-display font-extrabold text-foreground mt-4">
              BiClaw does the work.
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            {/* Card: Runs Ads */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
              className="bg-white border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              data-testid="card-demo-ads"
            >
              <div className="px-4 py-2.5 bg-muted/40 border-b border-border flex items-center gap-2">
                <Megaphone className="w-3.5 h-3.5 text-primary" />
                <span className="text-[11px] font-bold text-primary uppercase tracking-wider">Runs Your Ads</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="bg-primary/5 rounded-lg p-3 border-l-2 border-primary">
                  <p className="text-sm text-foreground font-medium leading-snug">How are my Facebook campaigns doing?</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-sm text-foreground leading-snug">Your overall ROAS is <strong>8.2x</strong>. "Cold" campaign is underperforming at 1.4x — <strong className="text-primary">I paused it.</strong></p>
                </div>
                <div className="space-y-1.5">
                  {[
                    { name: "Retarget", roas: "2.1x" },
                    { name: "Lookalike", roas: "6.8x" },
                    { name: "Spring", roas: "14.3x" },
                    { name: "Cold", roas: "1.4x", paused: true },
                  ].map((c) => (
                    <div key={c.name} className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-muted/20">
                      <span className="text-sm font-medium text-foreground">{c.name}</span>
                      <span className={`text-sm font-bold ${c.paused ? 'text-muted-foreground' : 'text-foreground'}`}>
                        {c.roas}
                        {c.paused && <span className="ml-1.5 text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full font-bold uppercase">Paused</span>}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Card: Tracks Competitors */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.08 }}
              className="bg-white border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              data-testid="card-demo-competitors"
            >
              <div className="px-4 py-2.5 bg-muted/40 border-b border-border flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-secondary" />
                <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">Tracks Competitors</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="bg-secondary/5 rounded-lg p-3 border-l-2 border-secondary">
                  <p className="text-sm text-foreground font-medium leading-snug">What's CompetitorX charging for their best sellers?</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-sm text-foreground leading-snug">Checked their store. You're <strong>cheaper on 2 of 3</strong> products:</p>
                </div>
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-3 text-[11px] font-bold text-muted-foreground uppercase tracking-wider bg-muted/40 px-3 py-1.5">
                    <span>Product</span><span className="text-center">Them</span><span className="text-right">You</span>
                  </div>
                  {[
                    { p: "Pro Widget", them: "$49.99", you: "$44.99", cheaper: true },
                    { p: "Starter Kit", them: "$29.99", you: "$34.99", cheaper: false },
                    { p: "Bundle Pack", them: "$89.99", you: "$79.99", cheaper: true },
                  ].map((r) => (
                    <div key={r.p} className="grid grid-cols-3 text-sm px-3 py-2 border-t border-border/50">
                      <span className="font-medium text-foreground">{r.p}</span>
                      <span className="text-center text-muted-foreground">{r.them}</span>
                      <span className={`text-right font-bold ${r.cheaper ? 'text-secondary' : 'text-primary'}`}>
                        {r.you} {r.cheaper ? '↓' : '↑'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Card: Researches */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.16 }}
              className="bg-white border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              data-testid="card-demo-research"
            >
              <div className="px-4 py-2.5 bg-muted/40 border-b border-border flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-accent" />
                <span className="text-[11px] font-bold text-accent-foreground uppercase tracking-wider">Researches & Creates</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="bg-accent/8 rounded-lg p-3 border-l-2 border-accent">
                  <p className="text-sm text-foreground font-medium leading-snug">What pet accessories are trending this month?</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-sm text-foreground leading-snug">GPS collars lead with <strong>+34% search volume</strong>. I drafted a product description.</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["GPS collars", "Slow feeders", "Water bottles"].map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-full bg-accent/10 text-xs font-semibold text-foreground border border-accent/15">{t}</span>
                  ))}
                  <span className="px-2.5 py-1 rounded-full bg-primary/8 text-xs font-semibold text-primary border border-primary/15">draft ready</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──── SECURITY ──── */}
      <section className="py-16 lg:py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-10">
            <SectionBadge>Enterprise-grade security</SectionBadge>
            <h2 className="text-3xl lg:text-4xl font-display font-extrabold text-foreground mt-4 mb-3">
              Your data never leaves your vault.
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { icon: <Lock className="w-5 h-5" />, title: "Encrypted storage", desc: "AES-256 at rest" },
              { icon: <Container className="w-5 h-5" />, title: "Isolated container", desc: "Per-user Docker sandbox" },
              { icon: <Shield className="w-5 h-5" />, title: "Zero privileges", desc: "Read-only filesystem" },
              { icon: <Cpu className="w-5 h-5" />, title: "Resource limits", desc: "Memory, CPU & PID caps" },
              { icon: <Wifi className="w-5 h-5" />, title: "Network isolation", desc: "No Docker socket access" },
              { icon: <Globe className="w-5 h-5" />, title: "Zero shared infra", desc: "Credentials stay in your sandbox" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="bg-muted/30 border border-border rounded-xl p-4 hover:bg-white hover:shadow-md transition-all duration-200 group"
                data-testid={`card-security-${i}`}
              >
                <div className="w-9 h-9 rounded-lg bg-foreground/5 text-foreground/60 flex items-center justify-center mb-3 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  {item.icon}
                </div>
                <h4 className="font-display font-bold text-sm text-foreground mb-0.5">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {[
              { icon: <Globe className="w-3 h-3" />, label: "Browses the web" },
              { icon: <CalendarClock className="w-3 h-3" />, label: "Runs on schedule" },
              { icon: <Code className="w-3 h-3" />, label: "Executes code" },
              { icon: <Search className="w-3 h-3" />, label: "Searches the web" },
              { icon: <MessageCircle className="w-3 h-3" />, label: "Messages you" },
              { icon: <FileText className="w-3 h-3" />, label: "Reads & writes files" },
            ].map((p) => (
              <span key={p.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-border text-xs font-medium text-foreground/70">
                {p.icon} {p.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ──── BEFORE / AFTER ──── */}
      <section className="py-16 lg:py-20 bg-muted/25 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-10">
            <SectionBadge>Save 61 minutes every morning</SectionBadge>
            <h2 className="text-3xl lg:text-4xl font-display font-extrabold text-foreground mt-4 mb-2">
              Your morning used to look like this
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              By the time you notice a problem across 6 dashboards, it's already cost you money.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
              className="bg-white border border-border rounded-2xl p-5"
            >
              <h3 className="font-display font-bold text-sm text-foreground mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-muted-foreground"><Clock className="w-3.5 h-3.5" /></span>
                Before BiClaw
              </h3>
              <div className="space-y-2">
                {beforeTasks.map((t) => (
                  <div key={t.task} className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/40">
                    <span className="text-sm text-foreground">{t.task}</span>
                    <span className="text-xs font-bold text-muted-foreground">{t.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Total</span>
                <span className="text-lg font-display font-extrabold text-primary">~61 min <span className="text-xs font-normal text-muted-foreground">every morning</span></span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.08 }}
              className="bg-white border-2 border-primary/20 rounded-2xl p-5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-bl-lg">Automated</div>
              <h3 className="font-display font-bold text-sm text-foreground mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><BrainCircuit className="w-3.5 h-3.5" /></span>
                With BiClaw
              </h3>
              <div className="space-y-2">
                {["Revenue brief delivered", "Competitors tracked", "Trends researched", "Descriptions drafted", "Reports compiled"].map((t) => (
                  <div key={t} className="flex items-center gap-2.5 py-2 px-3 rounded-lg bg-primary/5 border border-primary/8">
                    <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="text-sm text-foreground font-medium">{t}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Total</span>
                <span className="text-lg font-display font-extrabold text-foreground flex items-center gap-1.5">
                  0 min
                  <Coffee className="w-4 h-4 text-secondary" />
                  <span className="text-xs font-normal text-muted-foreground">enjoy your coffee</span>
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──── TESTIMONIALS ──── */}
      <section className="py-16 lg:py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-10">
            <SectionBadge>Testimonials</SectionBadge>
            <h2 className="text-3xl lg:text-4xl font-display font-extrabold text-foreground mt-4">
              Real results from real sellers.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="bg-white border border-border rounded-xl p-5 hover:shadow-md transition-shadow"
                data-testid={`card-testimonial-${i}`}
              >
                <div className="flex gap-0.5 mb-3">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-accent text-accent" />)}
                </div>
                <p className="text-foreground leading-relaxed mb-4 text-sm">"{t.quote}"</p>
                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <div>
                    <p className="font-bold text-foreground text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.company} · {t.platform}</p>
                  </div>
                  <span className="text-[11px] font-bold text-primary bg-primary/8 px-2.5 py-0.5 rounded-full">{t.revenue}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── 3 STEPS ──── */}
      <section className="py-16 lg:py-20 bg-muted/25 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-10">
            <SectionBadge>Get started</SectionBadge>
            <h2 className="text-3xl lg:text-4xl font-display font-extrabold text-foreground mt-4">
              Up and running in 3 steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-px bg-border z-0" />

            {[
              { num: "01", title: "Chat with BiClaw", desc: "Try the live demo right here. Tell BiClaw what you need — analytics, competitor monitoring, or task automation.", icon: <MessageCircle className="w-5 h-5" /> },
              { num: "02", title: "Connect and configure", desc: "Link your data sources, set up competitor monitoring, and choose your channels — all through secure connectors.", icon: <Zap className="w-5 h-5" /> },
              { num: "03", title: "Briefs & alerts on autopilot", desc: "Morning briefs, competitor updates, and proactive alerts — delivered to WhatsApp, Telegram, or Discord.", icon: <CalendarClock className="w-5 h-5" /> },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="relative z-10 text-center"
                data-testid={`card-step-${i}`}
              >
                <div className="w-12 h-12 rounded-xl bg-white border-2 border-primary/15 flex items-center justify-center mx-auto mb-4 text-primary">
                  {step.icon}
                </div>
                <span className="text-[11px] font-bold text-primary tracking-widest uppercase">{step.num}</span>
                <h3 className="text-base font-display font-bold text-foreground mt-1 mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── LIVE DEMO ──── */}
      <section id="demo" className="py-16 lg:py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <SectionBadge>Live demo</SectionBadge>
              <h2 className="text-3xl lg:text-4xl font-display font-extrabold text-foreground mt-4 mb-4">
                See BiClaw in action
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                This is a live demo. Ask anything — BiClaw will show you what it can do for your business.
              </p>
              <ul className="space-y-2.5 mb-6">
                {[
                  "Ask for a sample morning brief or competitor report",
                  "See how BiClaw monitors Shopify, Amazon, and ad platforms",
                  "Get a feel for proactive alerts and daily summaries",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-foreground">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Lock className="w-3 h-3" />
                Your data stays private — this demo uses sample scenarios.
              </p>
            </div>

            {/* Chat widget */}
            <div className="w-full max-w-[400px] mx-auto lg:mx-0 lg:ml-auto bg-white border border-border rounded-2xl shadow-xl overflow-hidden flex flex-col h-[460px]">
              <div className="px-4 py-3 border-b border-border bg-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <BrainCircuit className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-accent rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-foreground leading-none">BiClaw</h3>
                    <p className="text-[10px] text-secondary font-medium mt-0.5" data-testid="status-online">Live demo</p>
                  </div>
                </div>
                <Activity className="w-3.5 h-3.5 text-muted-foreground/30" />
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/15" data-testid="chat-messages">
                <AnimatePresence>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${msg.role === 'agent' ? 'justify-start' : 'justify-end'}`}
                      data-testid={`chat-message-${msg.role}-${i}`}
                    >
                      <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        msg.role === 'agent'
                          ? 'bg-white text-foreground rounded-tl-none border border-border/50'
                          : 'bg-primary text-white font-medium rounded-tr-none'
                      }`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex justify-start" data-testid="typing-indicator">
                      <div className="bg-white border border-border/50 rounded-2xl rounded-tl-none px-3.5 py-2.5 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/80 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              <div className="px-3 pt-2 pb-2.5 bg-white border-t border-border">
                <div className="flex gap-1.5 mb-2 overflow-x-auto pb-0.5">
                  {["Show me a morning brief", "I sell on Shopify", "What can you monitor?"].map((q) => (
                    <button
                      key={q}
                      onClick={() => { setInput(q); }}
                      className="shrink-0 px-2.5 py-1 rounded-full bg-muted/50 border border-border text-[11px] font-medium text-foreground hover:bg-primary/8 hover:text-primary hover:border-primary/15 transition-colors"
                      data-testid={`button-quick-${q.substring(0, 10).replace(/\s/g, '-')}`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
                <form onSubmit={handleSend} className="relative flex items-center">
                  <input
                    type="text" value={input} onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask BiClaw anything..."
                    className="w-full bg-muted/30 border border-border rounded-full pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/15 text-foreground placeholder:text-muted-foreground"
                    disabled={isTyping}
                    data-testid="input-chat"
                  />
                  <button type="submit" disabled={!input.trim() || isTyping}
                    className="absolute right-1 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white disabled:opacity-40 active:scale-95"
                    data-testid="button-send"
                  >
                    <Send className="w-3.5 h-3.5 ml-0.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──── PRICING ──── */}
      <section id="pricing" className="py-16 lg:py-20 bg-muted/25 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-10">
            <SectionBadge>Pricing</SectionBadge>
            <h2 className="text-3xl lg:text-4xl font-display font-extrabold text-foreground mt-4 mb-2">
              Simple pricing. Cancel anytime.
            </h2>
            <p className="text-sm text-muted-foreground">Founding member pricing — locked in for early users</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {/* Starter */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
              className="bg-white border border-border rounded-2xl p-6 flex flex-col"
              data-testid="card-pricing-starter"
            >
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">7-day free trial</span>
              <h3 className="text-xl font-display font-bold text-foreground mt-1">Starter</h3>
              <p className="text-xs text-muted-foreground mt-0.5 mb-4">Your own AI business partner</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-display font-extrabold text-foreground">$29</span>
                <span className="text-muted-foreground text-sm">/mo</span>
              </div>
              <p className="text-[11px] text-muted-foreground mb-5">$0.96/day</p>
              <div className="space-y-2.5 flex-1 mb-6">
                {[
                  "Your own isolated instance",
                  "AI included (Claude Sonnet 4.5)",
                  "300 messages + 1.5M tokens/mo",
                  "5 data sources (any mix)",
                  "All channels (Webchat, Telegram, WhatsApp, Discord)",
                  "Daily morning brief + anomaly alerts",
                  "Competitor monitoring",
                  "Task automation + scheduled reports",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{f}</span>
                  </div>
                ))}
              </div>
              <Button
                className="w-full bg-white border border-border text-foreground font-semibold h-10 rounded-xl hover:bg-muted"
                onClick={() => setShowLeadModal(true)}
                data-testid="button-pricing-starter"
              >
                Start Free Trial
              </Button>
              <p className="text-[11px] text-center text-muted-foreground mt-2">No credit card needed.</p>
            </motion.div>

            {/* Pro */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.08 }}
              className="bg-white border-2 border-primary/25 rounded-2xl p-6 relative flex flex-col"
              data-testid="card-pricing-pro"
            >
              <div className="absolute -top-2.5 left-6 px-2.5 py-0.5 bg-primary text-white text-[10px] font-bold rounded-full">Best Value</div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">7-day free trial</span>
              <h3 className="text-xl font-display font-bold text-foreground mt-1">Pro</h3>
              <p className="text-xs text-muted-foreground mt-0.5 mb-4">Full-power AI partner for agencies</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-display font-extrabold text-foreground">$79</span>
                <span className="text-muted-foreground text-sm">/mo</span>
              </div>
              <p className="text-[11px] text-muted-foreground mb-5">$2.63/day</p>
              <div className="space-y-2.5 flex-1 mb-6">
                {[
                  "Everything in Starter",
                  "1,200 messages + 8M tokens/mo",
                  "10 data sources",
                  "Custom morning brief templates",
                  "Cross-source analysis (ROAS, trends)",
                  "Advanced competitor tracking",
                  "Custom automation workflows",
                  "Priority support + API access",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{f}</span>
                  </div>
                ))}
              </div>
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-10 rounded-xl"
                onClick={() => setShowLeadModal(true)}
                data-testid="button-pricing-pro"
              >
                Start Free Trial
              </Button>
              <p className="text-[11px] text-center text-muted-foreground mt-2">No credit card needed.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──── FAQ ──── */}
      <section className="py-16 lg:py-20 bg-white relative z-10">
        <div className="max-w-2xl mx-auto px-6 md:px-8">
          <div className="text-center mb-8">
            <SectionBadge>FAQ</SectionBadge>
            <h2 className="text-3xl lg:text-4xl font-display font-extrabold text-foreground mt-4">
              Honest answers
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-muted/20 border border-border rounded-xl px-4 data-[state=open]:bg-white data-[state=open]:shadow-sm transition-all" data-testid={`faq-item-${i}`}>
                <AccordionTrigger className="text-left font-display font-bold text-foreground py-4 hover:no-underline text-sm">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4 text-sm">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ──── FINAL CTA ──── */}
      <section className="py-16 lg:py-20 bg-muted/25 relative z-10">
        <div className="max-w-2xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-display font-extrabold text-foreground mb-4">
            Stop checking dashboards.{" "}
            <span className="text-primary">Start knowing.</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
            Join e-commerce sellers who let AI handle the boring stuff so they can focus on growth.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-bold px-8 h-12 rounded-xl text-base hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]"
            onClick={() => setShowLeadModal(true)}
            data-testid="button-final-cta"
          >
            Start Free Trial — No Credit Card
          </Button>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 mt-6 text-xs text-muted-foreground">
            {["7-day free trial", "No credit card required", "Cancel anytime", "30-day money-back guarantee"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-primary" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ──── FOOTER ──── */}
      <footer className="border-t border-border bg-white py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <BrainCircuit className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">BiClaw</span>
          </div>
          <p className="text-muted-foreground text-xs">
            © 2026 BiClaw. Conversational intelligence for modern ecommerce.
          </p>
          <div className="flex gap-5 text-xs font-semibold text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors" data-testid="link-twitter">Twitter</a>
            <a href="#" className="hover:text-primary transition-colors" data-testid="link-linkedin">LinkedIn</a>
            <a href="#" className="hover:text-primary transition-colors" data-testid="link-terms">Terms</a>
          </div>
        </div>
      </footer>

      {/* ──── LEAD MODAL ──── */}
      <AnimatePresence>
        {showLeadModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowLeadModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-border"
              onClick={(e) => e.stopPropagation()}
              data-testid="modal-lead"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                    <BrainCircuit className="w-4.5 h-4.5 text-white" />
                  </div>
                  <h2 className="font-display font-bold text-lg text-foreground">Start Free Trial</h2>
                </div>
                <button onClick={() => setShowLeadModal(false)} className="text-muted-foreground hover:text-foreground transition-colors" data-testid="button-close-modal">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {!leadSubmitted ? (
                <form onSubmit={handleLeadSubmit}>
                  <p className="text-sm text-muted-foreground mb-5">Start your 7-day free trial and see what BiClaw can do for your business.</p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-foreground mb-1 block">Name (optional)</label>
                      <input type="text" value={leadName} onChange={(e) => setLeadName(e.target.value)} placeholder="Your name"
                        className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/15 bg-muted/20"
                        data-testid="input-lead-name"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-foreground mb-1 block">Email *</label>
                      <input type="email" required value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} placeholder="you@company.com"
                        className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/15 bg-muted/20"
                        data-testid="input-lead-email"
                      />
                    </div>
                    <Button type="submit" disabled={leadLoading || !leadEmail.trim()}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-semibold h-10 rounded-lg text-sm"
                      data-testid="button-submit-lead"
                    >
                      {leadLoading ? "Starting..." : "Start Free Trial"}
                    </Button>
                  </div>
                  <p className="text-[11px] text-center text-muted-foreground mt-2">Free for 7 days. No credit card needed.</p>
                </form>
              ) : (
                <div className="text-center py-3" data-testid="text-lead-success">
                  <div className="w-14 h-14 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-7 h-7 text-secondary" />
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-1">You're all set!</h3>
                  <p className="text-sm text-muted-foreground">We'll send your login details shortly. Check your inbox to get started.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
