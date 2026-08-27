// src/app/snippets/page.tsx
import { getSnippets } from "@/lib/services";
import { SnippetCard } from "@/components/snippets/SnippetCard";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";

export default async function AllSnippetsPage() {
  const snippets = await getSnippets();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              All Snippets
            </h1>
            <p className="text-zinc-400 mt-1">
              Browse all your saved code snippets and solutions.
            </p>
          </div>
        </div>
        <Link
          href="/snippets/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Snippet
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {snippets.length > 0 ? (
          snippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))
        ) : (
          <div className="col-span-2 text-center py-12 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
            <p className="text-sm text-zinc-500 mb-3">
              No snippets available yet.
            </p>
            <Link
              href="/snippets/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500"
            >
              <Plus className="w-4 h-4" /> Create your first snippet
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
