"use client";

import { useState, useEffect } from "react";
import { Snippet } from "@/types";
import { SnippetCard } from "@/components/snippets/SnippetCard";
import { Tags as TagsIcon, Hash } from "lucide-react";

// Snippet доторх tag-ийн бүтцийг төлөөлөх тип (string эсвэл name-тэй объект байж болно)
type TagType = string | { name?: string | null };

export default function TagsPage() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/snippets")
      .then((res) => res.json())
      .then((data: unknown) => {
        if (Array.isArray(data)) {
          setSnippets(data as Snippet[]);
        }
        setLoading(false);
      })
      .catch((err: unknown) => {
        console.error("Failed to fetch snippets:", err);
        setLoading(false);
      });
  }, []);

  // Tag-ийн нэрийг ялгаж авах туслах функц
  const extractTagName = (tag: TagType): string | undefined => {
    if (typeof tag === "string") return tag;
    if (tag && typeof tag === "object" && "name" in tag) {
      return tag.name ?? undefined;
    }
    return undefined;
  };

  // Бүх tag-уудыг давхардалгүйгээр цуглуулах
  const allTags: string[] = Array.from(
    new Set(
      snippets.flatMap((snippet) => {
        const tags = snippet.tags as unknown as TagType[];
        if (!Array.isArray(tags)) return [];
        return tags
          .map((t) => extractTagName(t))
          .filter((name): name is string => Boolean(name));
      }),
    ),
  );

  // Сонгосон tag-аар шүүх
  const filteredSnippets = selectedTag
    ? snippets.filter((s) => {
        const tags = s.tags as unknown as TagType[];
        if (!Array.isArray(tags)) return false;
        return tags.some((t) => extractTagName(t) === selectedTag);
      })
    : snippets;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
          Tags & Technologies
        </h1>
        <p className="text-zinc-400 mt-1">
          Browse your code collection by specific tags and topics.
        </p>
      </div>

      <div className="flex flex-wrap gap-2.5">
        <button
          onClick={() => setSelectedTag(null)}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            selectedTag === null
              ? "bg-indigo-600 text-white"
              : "bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800"
          }`}
        >
          <TagsIcon className="w-4 h-4" />
          All Tags ({snippets.length})
        </button>

        {allTags.map((tagName) => {
          const count = snippets.filter((s) => {
            const tags = s.tags as unknown as TagType[];
            if (!Array.isArray(tags)) return false;
            return tags.some((t) => extractTagName(t) === tagName);
          }).length;

          return (
            <button
              key={tagName}
              onClick={() => setSelectedTag(tagName)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                selectedTag === tagName
                  ? "bg-indigo-600 text-white"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              <Hash className="w-3.5 h-3.5 text-indigo-400" />
              {tagName}
              <span className="ml-1 px-1.5 py-0.5 text-xs rounded-md bg-zinc-800 text-zinc-400">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-50">
          {selectedTag
            ? `Snippets tagged with #${selectedTag}`
            : "All Snippets"}
        </h2>

        {loading ? (
          <div className="text-center py-16 text-zinc-500">
            Loading snippets...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSnippets.map((snippet) => (
              <SnippetCard key={snippet.id} snippet={snippet} />
            ))}
          </div>
        )}

        {!loading && filteredSnippets.length === 0 && (
          <div className="text-center py-16 text-zinc-500 bg-zinc-900/50 border border-zinc-800 rounded-xl">
            No snippets found for this tag.
          </div>
        )}
      </div>
    </div>
  );
}
