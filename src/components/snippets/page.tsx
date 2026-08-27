"use client";

import { useState, useEffect } from "react";
import { getSnippets, toggleFavorite } from "@/lib/services";
import { Snippet } from "@/types";
import { SnippetCard } from "@/components/snippets/SnippetCard";
import Link from "next/link";
import { Plus, Search, Filter } from "lucide-react";

export default function SnippetsPage() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");

  useEffect(() => {
    getSnippets().then(setSnippets);
  }, []);

  const handleToggleFavorite = async (id: string) => {
    await toggleFavorite(id);
    const updated = await getSnippets();
    setSnippets([...updated]);
  };

  // Filter snippets based on search and language
  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch =
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.tags.some((t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesLanguage =
      selectedLanguage === "All" || snippet.language === selectedLanguage;

    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in.fade-in duration-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
            All Snippets
          </h1>
          <p className="text-zinc-400 mt-1">
            Your personal collection of reusable code and solutions.
          </p>
        </div>
        <Link
          href="/snippets/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Snippet
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search snippets by title, tag, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-zinc-400 shrink-0" />
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full sm:w-48 px-3 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Languages</option>
            <option value="TypeScript">TypeScript</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="SQL">SQL</option>
            <option value="Bash">Bash</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSnippets.map((snippet) => (
          <SnippetCard
            key={snippet.id}
            snippet={snippet}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>

      {filteredSnippets.length === 0 && (
        <div className="text-center py-16 space-y-3 bg-zinc-900/50 border border-zinc-800 rounded-xl">
          <p className="text-zinc-400 font-medium">No snippets found</p>
          <p className="text-xs text-zinc-500">
            Try changing your search query or language filter.
          </p>
        </div>
      )}
    </div>
  );
}
