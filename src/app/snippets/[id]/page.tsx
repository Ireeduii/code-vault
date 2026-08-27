import { getSnippet } from "@/lib/services";
import Link from "next/link";
import { ArrowLeft, Copy, Star, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";

export default async function SnippetDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const snippet = await getSnippet(params.id);

  if (!snippet) {
    notFound();
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
            {snippet.language}
          </span>
        </div>
      </div>

      {/* Title & Description */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {snippet.title}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          {snippet.description}
        </p>
      </div>

      {/* Code Viewer Box */}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 text-xs text-zinc-400 font-mono">
          <span>code snippet</span>
          <button className="flex items-center gap-1 hover:text-zinc-200 transition-colors">
            <Copy className="w-3.5 h-3.5" /> Copy
          </button>
        </div>
        <div className="p-4 overflow-x-auto text-zinc-200 font-mono text-xs">
          <pre>
            <code>{snippet.code}</code>
          </pre>
        </div>
      </div>

      {/* Explanation / Markdown notes */}
      {snippet.explanation && (
        <div className="space-y-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Explanation
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {snippet.explanation}
          </p>
        </div>
      )}

      {/* ai */}
      {snippet.aiInsights && (
        <div className="space-y-4 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 rounded-xl p-6">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
            <Sparkles className="w-4 h-4" /> AI Insights
          </div>
          <div className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
            <div>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                Why it works:
              </span>{" "}
              {snippet.aiInsights.whyItWorks}
            </div>
            {snippet.aiInsights.improvements && (
              <div>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">
                  Potential improvements:
                </span>{" "}
                {snippet.aiInsights.improvements}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
