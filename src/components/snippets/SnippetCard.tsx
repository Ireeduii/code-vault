"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, ArrowRight, Sparkles, X, Loader2 } from "lucide-react";
import { Snippet } from "@/types";

interface SnippetCardProps {
  snippet: Snippet;
  onToggleFavorite?: (id: string) => void;
}

export function SnippetCard({ snippet, onToggleFavorite }: SnippetCardProps) {
  const [isFav, setIsFav] = useState(snippet.isFavorite ?? false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // AI Modal States
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
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

  const handleAskAI = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAiModalOpen(true);

    // Хэрэв өмнө нь асуучихсан байвал сервер рүү дахин хүсэлт явуулахгүй
    if (aiResponse) return;

    setIsAiLoading(true);
    try {
      const res = await fetch("/api/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: snippet.code,
          language: snippet.language,
          title: snippet.title,
          prompt:
            "Энэ кодыг тайлбарлаж, яаж сайжруулж болохыг монголоор товч бичиж өгөөч.",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setAiResponse(data.result);
      } else {
        setAiResponse(data.error || "Алдаа гарлаа.");
      }
    } catch (error) {
      setAiResponse("AI-тай холбогдоход алдаа гарлаа. Та дахин оролдоно уу.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <>
      <div className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 hover:-translate-y-0.5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-4 mb-2">
            <Link
              href={`/snippets/${snippet.id}`}
              className="font-semibold text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {snippet.title}
            </Link>

            <div className="flex items-center gap-1">
              {/* Ask AI Button */}
              <button
                onClick={handleAskAI}
                title="Ask AI"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/50 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
              </button>

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
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4">
            {snippet.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono">
              {snippet.language}
            </span>
            {Array.isArray(snippet.tags) &&
              snippet.tags.map(
                (tag: string | { id?: string; name?: string }) => {
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
                },
              )}
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
              Updated{" "}
              {mounted ? new Date(snippet.updatedAt).toLocaleDateString() : ""}
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

      {/* --- AI MODAL POPUP --- */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>AI Insights: {snippet.title}</span>
              </div>
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 min-h-[160px] max-h-[60vh] overflow-y-auto flex flex-col">
              {isAiLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-3 text-zinc-500 py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                  <p className="text-sm font-medium animate-pulse">
                    Gemini AI analyzing code...
                  </p>
                </div>
              ) : (
                <div className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {aiResponse}
                </div>
              )}
            </div>

            <div className="p-4 bg-zinc-50 dark:bg-zinc-950/50 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="px-4 py-2 text-sm font-medium bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-lg transition-colors"
              >
                Хаах
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
