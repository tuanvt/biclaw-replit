import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, ArrowRight, BrainCircuit, Calendar } from "lucide-react";
import type { BlogPost } from "@shared/schema";

function formatDate(date: string | Date | null) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="group grid md:grid-cols-2 gap-8 bg-white border border-border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
        data-testid={`card-blog-featured-${post.id}`}
      >
        <div className="overflow-hidden aspect-[16/10] md:aspect-auto">
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              data-testid="img-featured-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <BrainCircuit className="w-16 h-16 text-muted-foreground/30" />
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center p-8 md:pr-10 md:pl-0">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit mb-4" data-testid="badge-category-featured">
            {post.category}
          </span>
          <h2 className="font-display text-2xl lg:text-3xl font-extrabold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors" data-testid="text-blog-title-featured">
            {post.title}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3" data-testid="text-blog-excerpt-featured">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {post.authorAvatar ? (
                <img src={post.authorAvatar} alt={post.author} className="w-9 h-9 rounded-full object-cover" data-testid="img-author-featured" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-sm font-bold">
                  {post.author.charAt(0)}
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-foreground" data-testid="text-author-featured">{post.author}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1" data-testid="text-date-featured">
                    <Calendar className="w-3 h-3" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1" data-testid="text-readtime-featured">
                    <Clock className="w-3 h-3" />
                    {post.readTime} min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="group bg-white border border-border rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
        data-testid={`card-blog-${post.id}`}
      >
        <div className="overflow-hidden aspect-[16/10]">
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              data-testid={`img-blog-cover-${post.id}`}
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <BrainCircuit className="w-12 h-12 text-muted-foreground/30" />
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col flex-1">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider w-fit mb-3" data-testid={`badge-category-${post.id}`}>
            {post.category}
          </span>
          <h3 className="font-display text-lg font-bold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2" data-testid={`text-blog-title-${post.id}`}>
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2 flex-1" data-testid={`text-blog-excerpt-${post.id}`}>
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-border/60">
            <div className="flex items-center gap-2">
              {post.authorAvatar ? (
                <img src={post.authorAvatar} alt={post.author} className="w-7 h-7 rounded-full object-cover" data-testid={`img-author-${post.id}`} />
              ) : (
                <div className="w-7 h-7 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-xs font-bold">
                  {post.author.charAt(0)}
                </div>
              )}
              <span className="text-xs font-medium text-foreground" data-testid={`text-author-${post.id}`}>{post.author}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1" data-testid={`text-readtime-${post.id}`}>
                <Clock className="w-3 h-3" />
                {post.readTime} min
              </span>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

export default function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const featured = posts?.[0];
  const rest = posts?.slice(1) || [];

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
          <Link href="/" className="hover:text-primary transition-colors" data-testid="link-home">Home</Link>
          <Link href="/blog" className="text-primary font-bold" data-testid="link-blog-active">Blog</Link>
        </div>
        <div />
      </nav>

      <main className="flex-1 w-full max-w-7xl mx-auto px-8 py-12">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-xs font-bold uppercase tracking-wider mb-4" data-testid="badge-blog-header">
              Blog
            </span>
            <h1 className="text-4xl lg:text-5xl font-display font-extrabold text-foreground mb-4" data-testid="text-blog-heading">
              Insights & Resources
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Practical guides, founder stories, and deep dives into ecommerce analytics. Learn how to make better decisions with your data.
            </p>
          </motion.div>
        </div>

        {isLoading ? (
          <div className="space-y-8">
            <div className="h-80 bg-muted/50 rounded-2xl animate-pulse" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 bg-muted/50 rounded-2xl animate-pulse" />
              ))}
            </div>
          </div>
        ) : (
          <>
            {featured && <FeaturedCard post={featured} />}

            {rest.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {rest.map((post, i) => (
                  <BlogCard key={post.id} post={post} index={i} />
                ))}
              </div>
            )}

            {(!posts || posts.length === 0) && (
              <div className="text-center py-24">
                <BrainCircuit className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">No blog posts yet. Check back soon!</p>
              </div>
            )}
          </>
        )}
      </main>

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
    </div>
  );
}
