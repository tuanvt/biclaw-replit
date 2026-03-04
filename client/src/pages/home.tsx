import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, LineChart, MessageCircle, BarChart3, TrendingUp, Zap, Sparkles, BrainCircuit, Activity, X, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";

export default function Home() {
  const [messages, setMessages] = useState<{role: 'agent' | 'user', text: string}[]>([
    { role: 'agent', text: "Hi! I'm BiClaw — your AI business analyst." },
    { role: 'agent', text: "I can connect to your Shopify store, Facebook Ads, or Shopee, and analyze your data instantly." },
    { role: 'agent', text: "Want to see what I can do? Try asking about your revenue, ad performance, or Shopee orders!" }
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

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    async function initSession() {
      try {
        const res = await apiRequest("POST", "/api/chat/session");
        const data = await res.json();
        setSessionId(data.sessionId);
      } catch (err) {
        console.error("Failed to create chat session:", err);
      }
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
      const res = await apiRequest("POST", "/api/chat/message", {
        sessionId,
        text: userText,
      });
      const data = await res.json();
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'agent', text: data.reply.text }]);
    } catch (err) {
      console.error("Chat error:", err);
      setIsTyping(false);
      setMessages(prev => [...prev, {
        role: 'agent',
        text: "Hmm, I had trouble processing that. Could you try again?"
      }]);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail.trim()) return;
    setLeadLoading(true);

    try {
      await apiRequest("POST", "/api/leads", {
        email: leadEmail,
        name: leadName || undefined,
        source: "cta_button",
      });
      setLeadSubmitted(true);
    } catch (err) {
      console.error("Lead submission error:", err);
    } finally {
      setLeadLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50 pointer-events-none" />

      <nav className="w-full flex items-center justify-between px-8 py-6 max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <BrainCircuit className="w-6 h-6 text-white" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tight text-foreground" data-testid="text-logo">
            BiClaw
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/70">
          <a href="#how-it-works" className="hover:text-primary transition-colors" data-testid="link-how-it-works">How it Works</a>
          <a href="#features" className="hover:text-primary transition-colors" data-testid="link-features">Features</a>
          <a href="#pricing" className="hover:text-primary transition-colors" data-testid="link-pricing">Pricing</a>
        </div>
        <div>
          <Button variant="outline" className="border-border hover:bg-muted hidden md:flex bg-white shadow-sm font-medium" data-testid="button-login">
            Login
          </Button>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-7xl mx-auto px-8 py-12 lg:py-24 grid lg:grid-cols-2 gap-16 relative z-10 items-center">
        
        <div className="flex flex-col gap-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border w-fit shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-sm font-bold text-foreground/80 tracking-wide uppercase text-xs">
              AI Powered Business Intelligence
            </span>
          </div>
          
          <h1 className="text-6xl lg:text-7xl font-display font-extrabold leading-[1.05] tracking-tight">
            Chat with your<br />
            <span className="text-primary relative inline-block">
              business data.
              <svg className="absolute w-full h-4 -bottom-1 left-0 text-accent" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="transparent" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-md">
            No complex dashboards or SQL queries. Just connect your stores and ad accounts, and ask questions naturally in WhatsApp.
          </p>
          
          <div className="flex items-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-bold px-8 h-14 rounded-xl text-lg transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95"
              onClick={() => setShowLeadModal(true)}
              data-testid="button-start-chatting"
            >
              Start Chatting
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 rounded-xl text-lg hover:bg-secondary/10 hover:text-secondary-foreground hover:border-secondary/50 bg-white border-border shadow-sm font-medium transition-colors"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              data-testid="button-see-demo"
            >
              See Demo
            </Button>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-8">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-white border-2 border-white overflow-hidden shadow-sm">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Avatar" className="w-full h-full object-cover grayscale opacity-80" />
                </div>
              ))}
            </div>
            <p className="font-medium text-foreground/80" data-testid="text-social-proof">Trusted by 500+ modern founders</p>
          </div>
        </div>

        <div className="relative">
          <div className="w-full max-w-[420px] mx-auto bg-white border border-border rounded-2xl shadow-2xl shadow-foreground/5 overflow-hidden flex flex-col h-[550px] relative z-10">
            <div className="px-6 py-4 border-b border-border bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shadow-sm">
                    <BrainCircuit className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground leading-none">BiClaw AI</h3>
                  <p className="text-xs text-secondary font-medium mt-1" data-testid="status-online">Online & Analyzing</p>
                </div>
              </div>
              <Activity className="w-5 h-5 text-secondary/50" />
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-muted/30" data-testid="chat-messages">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.role === 'agent' ? 'justify-start' : 'justify-end'}`}
                    data-testid={`chat-message-${msg.role}-${i}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-sm ${
                        msg.role === 'agent'
                          ? 'bg-white text-foreground rounded-tl-none border border-border/60 font-medium'
                          : 'bg-primary text-white font-medium rounded-tr-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex justify-start"
                    data-testid="typing-indicator"
                  >
                    <div className="bg-white border border-border/60 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-primary/80 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-4 bg-white border-t border-border">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about your revenue..."
                  className="w-full bg-muted/50 border border-border rounded-full pl-5 pr-12 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground transition-all"
                  disabled={isTyping}
                  data-testid="input-chat"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white disabled:opacity-50 transition-transform active:scale-95 hover:scale-105 shadow-sm"
                  data-testid="button-send"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </form>
          </div>

          <div className="absolute -left-16 top-16 bg-white border border-border p-4 rounded-xl shadow-xl flex items-center gap-4 animate-pulse hidden lg:flex" style={{ animationDuration: '4s' }}>
            <div className="p-2.5 bg-accent/20 rounded-lg text-accent">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-bold tracking-wider uppercase mb-0.5">Revenue Today</p>
              <p className="text-lg font-display font-bold text-foreground" data-testid="text-revenue-card">$4,250.00</p>
            </div>
          </div>

          <div className="absolute -right-12 bottom-28 bg-white border border-border p-4 rounded-xl shadow-xl flex items-center gap-4 animate-pulse hidden lg:flex" style={{ animationDuration: '5s', animationDelay: '1s' }}>
            <div className="p-2.5 bg-primary/20 rounded-lg text-primary">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-bold tracking-wider uppercase mb-0.5">Meta ROAS</p>
              <p className="text-lg font-display font-bold text-foreground" data-testid="text-roas-card">3.2x</p>
            </div>
          </div>

        </div>
      </main>

      <section className="w-full border-y border-border bg-white py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-center text-sm font-bold tracking-widest uppercase text-muted-foreground mb-8">Connects seamlessly with your data</p>
          <div className="flex flex-wrap justify-center gap-12 lg:gap-24 opacity-60 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
            <div className="flex items-center gap-2 text-xl font-display font-bold text-foreground">
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-[#95BF47]"><path d="M21.2 14.8c-.8-3.1-2.4-5.3-4.7-6.5-.4-.2-.8-.4-1.2-.5-1.1-.4-2.3-.5-3.6-.2-1.3.2-2.5.8-3.5 1.7-.5.4-1 .8-1.5 1.3-.2.2-.4.4-.6.6-1.5 1.6-2.5 3.6-2.9 5.8-.3 1.6-.2 3.3.4 4.8.6 2 1.8 3.7 3.5 4.9.4.3.8.5 1.2.7.4.2.8.4 1.3.5.5.1.9.2 1.4.2 1.1 0 2.2-.2 3.2-.6 1-.4 1.9-1 2.7-1.7 1.5-1.4 2.6-3.2 3.2-5.2.5-1.9.6-3.9.2-5.8zm-9.3-9c1.6.3 3.1 1.1 4.2 2.3.4.4.8.8 1.1 1.3.1.2.2.4.3.6 1.1 2 1.5 4.3 1.2 6.6-.3 1.8-.9 3.5-1.9 5.1-1.4 2.2-3.4 3.9-5.8 4.7-.5.2-1.1.3-1.6.3-.6 0-1.1-.1-1.7-.2-1.7-.5-3.2-1.6-4.3-3-.4-.5-.8-1-1.1-1.6-.1-.2-.2-.4-.3-.6-1-1.9-1.4-4.1-1-6.2.2-1.5.7-3 1.5-4.4 1.2-2.1 2.9-3.8 5-4.7.4-.2.8-.3 1.2-.4.5-.1 1-.2 1.5-.2.5.1 1 .2 1.6.4z"/></svg>
              Shopify
            </div>
            <div className="flex items-center gap-2 text-xl font-display font-bold text-foreground">
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-[#0668E1]"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/></svg>
              Meta Ads
            </div>
            <div className="flex items-center gap-2 text-xl font-display font-bold text-foreground">
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-[#EE4D2D]"><path d="M16.5 6.5l-9 2-2 11 9 2 9-2-2-11zm-5 13.5c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm0-8c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z"/></svg>
              Shopee
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-extrabold text-foreground mb-6">
              Intelligence without the dashboards.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              We stripped away the complex SQL queries and clunky interfaces. Just instant, intelligent answers derived from your actual business data.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-border rounded-2xl p-8 hover:-translate-y-1 transition-transform shadow-md hover:shadow-xl" data-testid="card-feature-ai">
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <BrainCircuit className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">AI-Powered Analysis</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our AI understands context. Ask "How was revenue yesterday?" and get instant answers without digging through charts.
              </p>
            </div>
            
            <div className="bg-white border border-border rounded-2xl p-8 hover:-translate-y-1 transition-transform shadow-md hover:shadow-xl" data-testid="card-feature-briefs">
              <div className="w-14 h-14 rounded-xl bg-accent/20 text-accent flex items-center justify-center mb-6">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Proactive Briefs</h3>
              <p className="text-muted-foreground leading-relaxed">
                Wake up to a daily summary combining your Shopify sales and Meta ad spend. See your true ROAS before you even get out of bed.
              </p>
            </div>

            <div className="bg-white border border-border rounded-2xl p-8 hover:-translate-y-1 transition-transform shadow-md hover:shadow-xl" data-testid="card-feature-sync">
              <div className="w-14 h-14 rounded-xl bg-secondary/20 text-secondary flex items-center justify-center mb-6">
                <LineChart className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Multi-Source Sync</h3>
              <p className="text-muted-foreground leading-relaxed">
                Connects directly to your platforms via APIs, Webhooks, or even parses your order emails for unsupported platforms automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border mt-auto bg-white py-12">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">BiClaw</span>
          </div>
          <p className="text-muted-foreground text-sm font-medium">
            © 2026 BiClaw. Conversational intelligence for modern ecommerce.
          </p>
          <div className="flex gap-6 text-sm font-bold text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors" data-testid="link-twitter">Twitter</a>
            <a href="#" className="hover:text-primary transition-colors" data-testid="link-linkedin">LinkedIn</a>
            <a href="#" className="hover:text-primary transition-colors" data-testid="link-terms">Terms</a>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showLeadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowLeadModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-border"
              onClick={(e) => e.stopPropagation()}
              data-testid="modal-lead"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                    <BrainCircuit className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="font-display font-bold text-xl text-foreground">Get Early Access</h2>
                </div>
                <button onClick={() => setShowLeadModal(false)} className="text-muted-foreground hover:text-foreground transition-colors" data-testid="button-close-modal">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!leadSubmitted ? (
                <form onSubmit={handleLeadSubmit}>
                  <p className="text-muted-foreground mb-6">
                    Join the waitlist and be the first to chat with your business data on WhatsApp.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Name (optional)</label>
                      <input
                        type="text"
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        placeholder="Your name"
                        className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-muted/30"
                        data-testid="input-lead-name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Email *</label>
                      <input
                        type="email"
                        required
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-muted/30"
                        data-testid="input-lead-email"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={leadLoading || !leadEmail.trim()}
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl text-base transition-all hover:shadow-lg hover:shadow-primary/30"
                      data-testid="button-submit-lead"
                    >
                      {leadLoading ? "Joining..." : "Join Waitlist"}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-4" data-testid="text-lead-success">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">You're on the list!</h3>
                  <p className="text-muted-foreground">
                    We'll send you an invite as soon as BiClaw is ready. Keep an eye on your inbox.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
