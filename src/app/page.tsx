import { getSnippets } from "@/lib/services";
import { SnippetCard } from "@/components/snippets/SnippetCard";
import Link from "next/link";

export default async function HomePage() {
  // 1. Mock эсвэл Database-ээс өгөгдлөө дуудаж авчирна
  const snippets = await getSnippets();

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Saved Snippets</h1>
        <Link
          href="/snippets/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          + New Snippet
        </Link>
      </div>

      {/* 2. Авчирсан өгөгдлөө map хийж харуулах */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {snippets.map((snippet) => (
          <SnippetCard key={snippet.id} snippet={snippet} />
        ))}
      </div>
    </main>
  );
}
