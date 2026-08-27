"use client";

import { useState, useEffect } from "react";
import { getSnippets } from "@/lib/services";
import { Snippet } from "@/types";
import { SnippetCard } from "@/components/snippets/SnippetCard";
import { Search, Sparkles } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [isSemantic, setIsSemantic] = useState(false);

  useEffect(() => {
    getSnippets().then(setSnippets);
  }, []);

  const filteredSnippets = snippets.filter((s) => {
    const q = query.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.language.toLowerCase().includes(q) ||
      s.tags.some((t) => t.name.toLowerCase().includes(q))
    );
  });

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
          Search your knowledge base
        </h1>
        <p className="text-zinc-400">
          Find your saved snippets, bugs, and solutions instantly.
        </p>
      </div>

      {/* Big Search Input */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search code, bugs, solutions, technologies (e.g. Prisma, Next.js)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            autoFocus
          />
        </div>

        {/* Semantic Search Toggle */}
        <div className="flex items-center justify-between px-1">
          <button
            onClick={() => setIsSemantic(!isSemantic)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              isSemantic
                ? "bg-indigo-600 text-white"
                : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {isSemantic
              ? "Semantic Search Active"
              : "Enable Semantic AI Search"}
          </button>

          <span className="text-xs text-zinc-400">
            {filteredSnippets.length} results found
          </span>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSnippets.map((snippet) => (
          <SnippetCard key={snippet.id} snippet={snippet} />
        ))}
      </div>

      {filteredSnippets.length === 0 && (
        <div className="text-center py-16 space-y-3 bg-zinc-900/50 border border-zinc-800 rounded-xl">
          <p className="text-zinc-400">
            No snippets found matching &quot;{query}&quot;
          </p>
          <p className="text-xs text-zinc-500">
            Try searching for another keyword or technology tag.
          </p>
        </div>
      )}
    </div>
  );
}
