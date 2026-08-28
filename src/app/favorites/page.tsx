import { getSnippets } from "@/lib/services";
import { SnippetCard } from "@/components/snippets/SnippetCard";
import { Star, ArrowLeft } from "lucide-react";
import { Snippet } from "@/types";
import Link from "next/link";

export default async function FavoritesPage() {
  const snippets: Snippet[] = await getSnippets();

  // any ашиглахгүйгээр s: Snippet болон type assertion хийж шүүнэ
  const favoriteSnippets = snippets.filter((s: Snippet) => {
    const snippetData = s as Snippet & { favorite?: boolean };
    return snippetData.isFavorite || snippetData.favorite;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
      <div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-3">
          <Star className="w-8 h-8 text-amber-500 fill-amber-500" />
          Favorite Snippets
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-1">
          Quick access to your most starred and important code snippets.
        </p>
      </div>

      {favoriteSnippets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favoriteSnippets.map((snippet) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-zinc-500 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl">
          No favorite snippets found. Star some snippets to see them here!
        </div>
      )}
    </div>
  );
}
