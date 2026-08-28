import { prisma } from "@/lib/prisma";
import { Snippet } from "@/types";

export async function getSnippets(): Promise<Snippet[]> {
  try {
    const snippets = await prisma.snippet.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (!Array.isArray(snippets)) {
      return [];
    }

    return snippets.map((snippet) => ({
      ...snippet,
      description: snippet.description || "",
      tags: Array.isArray(snippet.tags) ? (snippet.tags as string[]) : [],
    })) as unknown as Snippet[];
  } catch (error) {
    console.error("Failed to fetch snippets:", error);
    return [];
  }
}

export async function getSnippet(id: string): Promise<Snippet | null> {
  try {
    const snippet = await prisma.snippet.findUnique({
      where: { id },
    });

    if (!snippet) return null;

    return {
      ...snippet,
      description: snippet.description || "",
      tags: Array.isArray(snippet.tags) ? (snippet.tags as string[]) : [],
    } as unknown as Snippet;
  } catch (error) {
    console.error("Failed to fetch snippet:", error);
    return null;
  }
}

export async function createSnippet(newSnippet: {
  title: string;
  description?: string;
  code: string;
  language: string;
  tags?: string[] | string;
  isFavorite?: boolean;
}): Promise<Snippet | null> {
  try {
    let formattedTags: string[] = ["General"];
    if (Array.isArray(newSnippet.tags)) {
      formattedTags = newSnippet.tags.map(
        (t: string | Record<string, unknown>) =>
          typeof t === "string" ? t : String(t),
      );
    } else if (typeof newSnippet.tags === "string") {
      formattedTags = newSnippet.tags
        .split(",")
        .map((t: string) => t.trim())
        .filter(Boolean);
    }

    const created = await prisma.snippet.create({
      data: {
        title: newSnippet.title,
        description: newSnippet.description || "",
        code: newSnippet.code,
        language: newSnippet.language || "javascript",
        tags: formattedTags,
        isFavorite: newSnippet.isFavorite ?? false,
        userId: "default-user",
      },
    });

    return {
      ...created,
      description: created.description || "",
      tags: Array.isArray(created.tags) ? (created.tags as string[]) : [],
    } as unknown as Snippet;
  } catch (error) {
    console.error("Failed to create snippet:", error);
    return null;
  }
}

export async function toggleFavorite(id: string): Promise<void> {
  try {
    const snippet = await prisma.snippet.findUnique({ where: { id } });
    if (snippet) {
      await prisma.snippet.update({
        where: { id },
        data: { isFavorite: !snippet.isFavorite },
      });
    }
  } catch (error) {
    console.error("Failed to toggle favorite:", error);
  }
}

export async function getUserProfile() {
  return {
    name: "Developer",
    email: "developer@example.com",
  };
}
