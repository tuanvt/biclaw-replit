import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, LineChart, MessageCircle, BarChart3, TrendingUp, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [messages, setMessages] = useState<{role: 'agent' | 'user', text: string}[]>([
    { role: 'agent', text: "Hi! I'm BiClaw — a business data analyst that lives in your WhatsApp." },
    { role: 'agent', text: "I can connect to your Shopify store, Facebook Ads, Shopee, or Google Sheets — and send you a morning brief every day." },
    { role: 'agent', text: "Want to see what I can do? Tell me about your business. What do you sell?" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput("");

    // Simulate agent typing
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'agent',
        text: "That sounds like a great market! I can pull your recent revenue numbers and ad spend. Want me to take a quick look at your storefront?"
      }]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground bg-noise selection:bg-primary/30 relative overflow-hidden flex flex-col">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Navigation */}
      <nav className="w-full flex items-center justify-between px-8 py-6 max-w-7xl mx-auto relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-sm">
            <LineChart className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tight text-foreground">
            BiClaw
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
          <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
        </div>
        <div>
          <Button variant="outline" className="border-border hover:bg-card/50 hidden md:flex bg-background shadow-sm">
            Login
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-8 py-12 lg:py-24 grid lg:grid-cols-2 gap-16 relative z-10 items-center">
        
        {/* Left Copy */}
        <div className="flex flex-col gap-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border w-fit shadow-sm">
            <Sparkles className="w-4 h-4 text-marsh-field" />
            <span className="text-sm font-medium text-foreground/80">
              The BI tool you actually use
            </span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-display font-bold leading-[1.1] text-glow-light">
            Your data team,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-marsh-field to-accent">
              in your WhatsApp.
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-md">
            No dashboards. No setup wizards. Just connect your Shopify and Meta Ads, and get your morning brief delivered via chat.
          </p>
          
          <div className="flex items-center gap-4 pt-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold px-8 h-14 rounded-xl text-lg transition-transform hover:scale-105 active:scale-95 shadow-md">
              Start Chatting
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 rounded-xl text-lg hover:bg-card/50 bg-background border-border shadow-sm">
              See Demo
            </Button>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-8">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-card border-2 border-background overflow-hidden shadow-sm">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <p className="font-medium text-foreground/80">Join 500+ founders getting morning briefs</p>
          </div>
        </div>

        {/* Right Chat Widget */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent blur-3xl" />
          
          <div className="w-full max-w-[420px] mx-auto bg-card/90 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[550px] relative z-10 ring-1 ring-black/5">
            {/* Header */}
            <div className="px-6 py-4 border-b border-border bg-card/80 flex items-center gap-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-sm">
                  <LineChart className="w-5 h-5 text-white" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground">BiClaw</h3>
                <p className="text-xs text-muted-foreground">Always active</p>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.role === 'agent' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                        msg.role === 'agent'
                          ? 'bg-muted/50 text-foreground rounded-tl-none border border-border/50'
                          : 'bg-primary text-white font-medium rounded-tr-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-card border-t border-border">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full bg-background border border-border rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground transition-all shadow-sm"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="absolute right-2 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white disabled:opacity-50 transition-transform active:scale-95 hover:scale-105 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Decorative floating elements */}
          <div className="absolute -left-12 top-20 bg-card border border-border p-4 rounded-xl shadow-lg flex items-center gap-3 animate-pulse" style={{ animationDuration: '4s' }}>
            <div className="p-2 bg-marsh-field/20 rounded-lg text-marsh-field">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Revenue Today</p>
              <p className="text-sm font-bold text-foreground">$4,250.00</p>
            </div>
          </div>

          <div className="absolute -right-8 bottom-32 bg-card border border-border p-4 rounded-xl shadow-lg flex items-center gap-3 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}>
            <div className="p-2 bg-accent/20 rounded-lg text-accent">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Meta ROAS</p>
              <p className="text-sm font-bold text-foreground">3.2x</p>
            </div>
          </div>

        </div>
      </main>

      {/* Logos Section */}
      <section className="w-full border-y border-border/50 bg-card/20 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-center text-sm font-medium text-muted-foreground mb-8">Connects seamlessly with your favorite tools</p>
          <div className="flex flex-wrap justify-center gap-12 lg:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Shopify */}
            <div className="flex items-center gap-2 text-xl font-display font-bold">
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-[#95BF47]"><path d="M21.2 14.8c-.8-3.1-2.4-5.3-4.7-6.5-.4-.2-.8-.4-1.2-.5-1.1-.4-2.3-.5-3.6-.2-1.3.2-2.5.8-3.5 1.7-.5.4-1 .8-1.5 1.3-.2.2-.4.4-.6.6-1.5 1.6-2.5 3.6-2.9 5.8-.3 1.6-.2 3.3.4 4.8.6 2 1.8 3.7 3.5 4.9.4.3.8.5 1.2.7.4.2.8.4 1.3.5.5.1.9.2 1.4.2 1.1 0 2.2-.2 3.2-.6 1-.4 1.9-1 2.7-1.7 1.5-1.4 2.6-3.2 3.2-5.2.5-1.9.6-3.9.2-5.8zm-9.3-9c1.6.3 3.1 1.1 4.2 2.3.4.4.8.8 1.1 1.3.1.2.2.4.3.6 1.1 2 1.5 4.3 1.2 6.6-.3 1.8-.9 3.5-1.9 5.1-1.4 2.2-3.4 3.9-5.8 4.7-.5.2-1.1.3-1.6.3-.6 0-1.1-.1-1.7-.2-1.7-.5-3.2-1.6-4.3-3-.4-.5-.8-1-1.1-1.6-.1-.2-.2-.4-.3-.6-1-1.9-1.4-4.1-1-6.2.2-1.5.7-3 1.5-4.4 1.2-2.1 2.9-3.8 5-4.7.4-.2.8-.3 1.2-.4.5-.1 1-.2 1.5-.2.5.1 1 .2 1.6.4z"/></svg>
              Shopify
            </div>
            {/* Meta */}
            <div className="flex items-center gap-2 text-xl font-display font-bold">
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-[#0668E1]"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/></svg>
              Meta Ads
            </div>
            {/* Shopee */}
            <div className="flex items-center gap-2 text-xl font-display font-bold">
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-[#EE4D2D]"><path d="M16.5 6.5l-9 2-2 11 9 2 9-2-2-11zm-5 13.5c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm0-8c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z"/></svg>
              Shopee
            </div>
            {/* Google Analytics */}
            <div className="flex items-center gap-2 text-xl font-display font-bold">
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-[#E37400]"><path d="M21 12.5v-1c0-5.5-4.5-10-10-10S1 6 1 11.5v1c0 5.5 4.5 10 10 10s10-4.5 10-10zM11 5.5v12h2v-12h-2zM7 8.5v9h2v-9H7zm8 2v7h2v-7h-2z"/></svg>
              Analytics
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-divine-pleasure mb-4">
              Everything you need, nothing you don't.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We stripped away the clunky dashboards and complex SQL queries. Just instant answers and proactive insights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-2xl p-8 hover:-translate-y-1 transition-transform shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Conversational UX</h3>
              <p className="text-muted-foreground">
                Ask "How was revenue yesterday?" and get instant answers. No more digging through charts to find the number you need.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-2xl p-8 hover:-translate-y-1 transition-transform shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Proactive Briefs</h3>
              <p className="text-muted-foreground">
                Wake up to a daily summary combining your Shopify sales and Meta ad spend. See your true ROAS before you even get out of bed.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 hover:-translate-y-1 transition-transform shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-marsh-field/20 text-marsh-field flex items-center justify-center mb-6">
                <LineChart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Multi-Source Sync</h3>
              <p className="text-muted-foreground">
                Connects directly to your platforms via APIs, Webhooks, or even parses your order emails for unsupported platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-auto bg-card/50">
        <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-sm">
              <LineChart className="w-3 h-3 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">BiClaw</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2026 BiClaw. Conversational intelligence for modern ecommerce.
          </p>
          <div className="flex gap-4 text-sm font-medium">
            <a href="#" className="text-muted-foreground hover:text-divine-pleasure">Twitter</a>
            <a href="#" className="text-muted-foreground hover:text-divine-pleasure">LinkedIn</a>
            <a href="#" className="text-muted-foreground hover:text-divine-pleasure">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
