import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { blogsData } from "@/data/blogs";
import { WaveLine } from "@/components/motifs/WaveLine";
import { ArrowRight, Clock, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Field Journal & Travel Dispatches | ExploreX Sri Lanka",
  description: "Curated field notes, train observation car guides, wildlife safari tips, and seasonal monsoon advice directly from local Sri Lankan expedition planners."
};

export default function BlogPage() {
  return (
    <div className="py-16 sm:py-24 space-y-16 bg-[#F6F5F0] min-h-screen text-brand-ink">
      
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-brand-ink-border pb-8">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-brand-terracotta mb-3">
            FIELD JOURNAL · ESSAYS &amp; DISPATCHES
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-brand-ink leading-[1.08] max-w-4xl">
            Notes from the <span className="italic font-light text-brand-terracotta">island road</span>.
          </h1>
          <p className="font-sans text-base sm:text-lg text-brand-ink-muted max-w-2xl mt-4 leading-relaxed">
            First-hand dispatches on observation train seating, sacred highland etiquette, wildlife migration cycles, and coastal seasonal rhythms.
          </p>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogsData.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="bg-white border border-brand-ink-border rounded-lg overflow-hidden shadow-xs hover:border-brand-ink transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-60 w-full overflow-hidden bg-stone-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#1F3F3B]/90 backdrop-blur-xs text-[#F6F5F0] px-3 py-1 rounded-sm font-mono text-[10px] uppercase tracking-wider">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 font-mono text-[10px] text-brand-ink-muted uppercase tracking-wider">
                    <span>{post.publishedDate}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h2 className="font-serif text-2xl font-normal text-brand-ink leading-snug group-hover:text-brand-terracotta transition-colors">
                    {post.title}
                  </h2>

                  <p className="font-sans text-xs sm:text-sm text-brand-ink-muted line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-3 border-t border-brand-ink-border/60 flex items-center justify-between font-mono text-xs text-brand-ink group-hover:text-brand-terracotta bg-[#FAF9F5]">
                <span>Read Dispatch</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
