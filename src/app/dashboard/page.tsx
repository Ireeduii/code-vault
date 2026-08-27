import { getSnippets } from "@/lib/services";
import { SnippetCard } from "@/components/snippets/SnippetCard";
import Link from "next/link";
import { Plus, Search, Sparkles, Tags } from "lucide-react";

export default async function DashboardPage() {
  const snippets = await getSnippets();
  const recentSnippets = snippets.slice(0, 4);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Good evening, Developer.
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">
            Your personal knowledge base for code and solutions.
          </p>
        </div>
        <Link
          href="/snippets/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          New Snippet
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Snippets", value: snippets.length },
          {
            label: "Favorites",
            value: snippets.filter((s) => s.isFavorite).length,
          },
          { label: "Technologies", value: 16 },
          { label: "Recently Added", value: 8 },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs"
          >
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {stat.label}
            </p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-2">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "New Snippet", icon: Plus, href: "/snippets/new" },
            { label: "Search Code", icon: Search, href: "/search" },
            { label: "Ask AI", icon: Sparkles, href: "/search" },
            { label: "Browse Tags", icon: Tags, href: "/tags" },
          ].map((action, i) => {
            const Icon = action.icon;
            return (
              <Link
                key={i}
                href={action.href}
                className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                {action.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Snippets */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Recent Snippets
          </h2>
          <Link
            href="/snippets"
            className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentSnippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
        </div>
      </div>
    </div>
  );
}
