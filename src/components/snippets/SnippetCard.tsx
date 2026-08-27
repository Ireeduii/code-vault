"use client";

import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { Snippet } from "@/types";

interface SnippetCardProps {
  snippet: Snippet;
  onToggleFavorite?: (id: string) => void;
}

export function SnippetCard({ snippet, onToggleFavorite }: SnippetCardProps) {
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
            onClick={() => onToggleFavorite?.(snippet.id)}
            className="text-zinc-400 hover:text-amber-500 transition-colors"
          >
            <Star
              className={`w-4 h-4 ${snippet.isFavorite ? "fill-amber-500 text-amber-500" : ""}`}
            />
          </button>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4">
          {snippet.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono">
            {snippet.language}
          </span>
          {snippet.tags.map((tag) => (
            <span
              key={tag.id}
              className="px-2 py-0.5 text-xs font-medium rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>

      {/* Code Preview */}
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
