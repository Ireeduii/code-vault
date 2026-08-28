"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { Snippet } from "@/types";

interface SnippetCardProps {
  snippet: Snippet;
  onToggleFavorite?: (id: string) => void;
}

export function SnippetCard({ snippet, onToggleFavorite }: SnippetCardProps) {
  // Local state for favorite status so UI updates instantly
  const [isFav, setIsFav] = useState(snippet.isFavorite ?? false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault(); // Link руу үсрэхээс сэргийлэх
    if (isLoading) return;

    setIsLoading(true);
    try {
      // Backend API рүү хүсэлт илгээх (Жишээ API зам: /api/snippets/[id]/favorite)
      const res = await fetch(`/api/snippets/${snippet.id}/favorite`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFavorite: !isFav }),
      });

      if (res.ok) {
        setIsFav(!isFav);
        onToggleFavorite?.(snippet.id);
      }
    } catch (error) {
      console.error("Failed to update favorite status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 hover:-translate-y-0.5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-4 mb-2">
          <Link
            href={`/snippets/${snippet.id}`}
            className="font-semibold text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            {snippet.title}
          </Link>
          <button
            onClick={handleToggleFavorite}
            disabled={isLoading}
            className="text-zinc-400 hover:text-amber-500 transition-colors p-1"
          >
            <Star
              className={`w-4 h-4 ${
                isFav ? "fill-amber-500 text-amber-500" : ""
              }`}
            />
          </button>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4">
          {snippet.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono">
            {snippet.language}
          </span>
          {Array.isArray(snippet.tags) &&
            snippet.tags.map((tag: any) => {
              const tagName = typeof tag === "string" ? tag : tag?.name;
              const tagId = typeof tag === "string" ? tag : tag?.id;
              if (!tagName) return null;
              return (
                <span
                  key={tagId || tagName}
                  className="px-2 py-0.5 text-xs font-medium rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400"
                >
                  #{tagName}
                </span>
              );
            })}
        </div>
      </div>

      <div>
        <div className="bg-zinc-950 text-zinc-200 rounded-lg p-3 font-mono text-xs overflow-x-auto mb-4 max-h-24">
          <pre>
            <code>{snippet.code}</code>
          </pre>
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-400 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
          <span>
            Updated {new Date(snippet.updatedAt).toLocaleDateString()}
          </span>
          <Link
            href={`/snippets/${snippet.id}`}
            className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-medium group-hover:translate-x-0.5 transition-transform"
          >
            View <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
