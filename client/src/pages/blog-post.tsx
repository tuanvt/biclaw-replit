import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, BrainCircuit, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@shared/schema";

function formatDate(date: string | Date | null) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: JSX.Element[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-2xl lg:text-3xl font-display font-extrabold text-foreground mt-14 mb-4">
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-xl font-display font-bold text-foreground mt-10 mb-3">
          {line.replace("### ", "")}
        </h3>
      );
    } else if (line.startsWith("> ")) {
      const quoteLines = [line.replace(/^> ?/, "")];
      while (i + 1 < lines.length && lines[i + 1].startsWith("> ")) {
        i++;
        quoteLines.push(lines[i].replace(/^> ?/, ""));
      }
      elements.push(
        <blockquote key={i} className="border-l-4 border-secondary pl-6 py-3 my-8 bg-secondary/5 rounded-r-xl">
          <p className="text-foreground/90 italic leading-relaxed text-base">
            {quoteLines.map((ql, qi) => (
              <span key={qi}>
                {renderInlineText(ql)}
                {qi < quoteLines.length - 1 && <br />}
              </span>
            ))}
          </p>
        </blockquote>
      );
    } else if (line.startsWith("- ")) {
      const listItems = [line.replace("- ", "")];
      while (i + 1 < lines.length && lines[i + 1].startsWith("- ")) {
        i++;
        listItems.push(lines[i].replace("- ", ""));
      }
      elements.push(
        <ul key={i} className="space-y-2 my-6 ml-1">
          {listItems.map((item, li) => (
            <li key={li} className="flex items-start gap-3 text-foreground/85 leading-relaxed text-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
              <span>{renderInlineText(item)}</span>
            </li>
          ))}
        </ul>
      );
    } else if (/^\d+\.\s/.test(line)) {
      const listItems = [line.replace(/^\d+\.\s/, "")];
      while (i + 1 < lines.length && /^\d+\.\s/.test(lines[i + 1])) {
        i++;
        listItems.push(lines[i].replace(/^\d+\.\s/, ""));
      }
      elements.push(
        <ol key={i} className="space-y-2 my-6 ml-1 list-decimal list-inside">
          {listItems.map((item, li) => (
            <li key={li} className="text-foreground/85 leading-relaxed text-lg">
              {renderInlineText(item)}
            </li>
          ))}
        </ol>
      );
    } else if (line.trim() === "") {
      // skip empty lines
    } else {
      elements.push(
        <p key={i} className="text-foreground/85 text-lg leading-relaxed mb-6">
          {renderInlineText(line)}
        </p>
      );
    }
    i++;
  }

  return elements;
}

function renderInlineText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-bold text-foreground">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: [`/api/blog/${params.slug}`],
    enabled: !!params.slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col font-sans">
        <nav className="w-full flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-foreground">BiClaw</span>
            </div>
          </Link>
        </nav>
        <div className="flex-1 max-w-[680px] mx-auto px-6 py-12 w-full">
          <div className="h-8 w-32 bg-muted/50 rounded-lg animate-pulse mb-6" />
          <div className="h-12 w-3/4 bg-muted/50 rounded-lg animate-pulse mb-4" />
          <div className="h-6 w-1/2 bg-muted/50 rounded-lg animate-pulse mb-8" />
          <div className="h-80 bg-muted/50 rounded-2xl animate-pulse mb-8" />
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-5 bg-muted/50 rounded animate-pulse" style={{ width: `${80 + Math.random() * 20}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background flex flex-col font-sans">
        <nav className="w-full flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-foreground">BiClaw</span>
            </div>
          </Link>
        </nav>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-display font-bold text-foreground mb-4">Post not found</h1>
            <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist or has been removed.</p>
            <Link href="/blog">
              <Button className="bg-primary hover:bg-primary/90 text-white font-bold rounded-xl" data-testid="button-back-to-blog">
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <nav className="w-full flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-foreground" data-testid="text-logo">
              BiClaw
            </span>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/70">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
        </div>
        <div />
      </nav>

      <article className="flex-1 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-[680px] mx-auto px-6 pt-8 pb-4"
        >
          <Link href="/blog">
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 font-medium" data-testid="button-back">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </button>
          </Link>

          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-5" data-testid="badge-post-category">
            {post.category}
          </span>

          <h1 className="text-3xl lg:text-4xl xl:text-[2.75rem] font-display font-extrabold text-foreground leading-[1.15] mb-6" data-testid="text-post-title">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 mb-10 pb-8 border-b border-border">
            <div className="flex items-center gap-3">
              {post.authorAvatar ? (
                <img src={post.authorAvatar} alt={post.author} className="w-11 h-11 rounded-full object-cover ring-2 ring-border" />
              ) : (
                <div className="w-11 h-11 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold">
                  {post.author.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-medium text-foreground text-sm" data-testid="text-post-author">{post.author}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1" data-testid="text-post-date">
                    <Calendar className="w-3 h-3" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="text-border">|</span>
                  <span className="flex items-center gap-1" data-testid="text-post-readtime">
                    <Clock className="w-3 h-3" />
                    {post.readTime} min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {post.coverImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-[900px] mx-auto px-6 mb-12"
          >
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full rounded-2xl object-cover aspect-[2/1] shadow-lg"
              data-testid="img-post-cover"
            />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-[680px] mx-auto px-6 pb-20"
          data-testid="content-post-body"
        >
          {renderContent(post.content)}

          <div className="border-t border-border mt-16 pt-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {post.authorAvatar ? (
                  <img src={post.authorAvatar} alt={post.author} className="w-14 h-14 rounded-full object-cover ring-2 ring-border" />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-lg font-bold">
                    {post.author.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-0.5">Written by</p>
                  <p className="font-display font-bold text-foreground text-lg">{post.author}</p>
                </div>
              </div>
              <Link href="/blog">
                <Button variant="outline" className="border-border bg-white shadow-sm font-medium rounded-xl hover:bg-muted" data-testid="button-more-articles">
                  More Articles
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </article>

      <footer className="border-t border-border bg-white py-12">
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
    </div>
  );
}
