import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogsData } from "@/data/blogs";
import { ArrowLeft, Calendar, Clock, User, MessageCircle } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogsData.map((b) => ({ slug: b.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogsData.find((b) => b.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="py-12 sm:py-20 space-y-12 bg-[#F6F5F0] min-h-screen text-brand-ink">
      
      {/* Return Link */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-brand-ink-muted hover:text-brand-ink transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Field Journal</span>
        </Link>
      </div>

      {/* Article Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <header className="space-y-4 border-b border-brand-ink-border pb-8">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-brand-terracotta">
            {post.category} · ESSAY
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-brand-ink leading-[1.08]">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-brand-ink-muted pt-2">
            <span>By {post.author}</span>
            <span>·</span>
            <span>{post.publishedDate}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative w-full h-[360px] sm:h-[460px] rounded-lg overflow-hidden border border-brand-ink-border bg-stone-100">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Prose Body */}
        <div className="prose prose-stone max-w-none font-sans text-base sm:text-lg leading-relaxed text-brand-ink/90 space-y-6">
          <p className="text-xl sm:text-2xl font-serif text-brand-ink font-normal italic leading-relaxed border-l-2 border-brand-terracotta pl-6 py-1">
            {post.summary}
          </p>

          <div 
            className="space-y-6 text-brand-ink/85 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Consultation Callout */}
        <div className="mt-12 p-8 rounded-lg border border-brand-ink-border bg-[#FAF9F5] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <div className="font-mono text-xs text-brand-terracotta uppercase tracking-wider">
              HAVE QUESTIONS ABOUT THIS ROUTE?
            </div>
            <h3 className="font-serif text-2xl font-normal text-brand-ink">
              Speak directly with our Colombo travel designers.
            </h3>
            <p className="font-sans text-xs text-brand-ink-muted leading-relaxed">
              We arrange observation car train seats, certified naturalists, and private chauffeur transfers across Sri Lanka.
            </p>
          </div>

          <a
            href="https://wa.me/94771234567?text=Hello%20ExploreX!%20I%20read%20your%20journal%20article%20and%20would%20like%20to%20plan%20a%20private%20tour."
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-6 rounded-full bg-brand-ink hover:bg-brand-teal text-[#F6F5F0] font-sans text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 self-start sm:self-auto shrink-0 shadow-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </article>
    </div>
  );
}
