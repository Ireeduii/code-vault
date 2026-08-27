// import { prisma } from "@/lib/prisma";
// import { Snippet } from "@/types";

// export async function getSnippets(): Promise<Snippet[]> {
//   try {
//     const snippets = await prisma.snippet.findMany({
//       orderBy: { createdAt: "desc" },
//     });

//     return snippets as unknown as Snippet[];
//   } catch (error) {
//     console.error("Failed to fetch snippets:", error);
//     return [];
//   }
// }

// export async function getSnippet(id: string): Promise<Snippet | null> {
//   try {
//     const snippet = await prisma.snippet.findUnique({
//       where: { id },
//     });
//     return snippet as unknown as Snippet;
//   } catch (error) {
//     console.error("Failed to fetch snippet:", error);
//     return null;
//   }
// }

// export async function createSnippet(
//   newSnippet: Omit<Snippet, "id" | "createdAt" | "updatedAt">,
// ): Promise<Snippet | null> {
//   try {
//     const created = await prisma.snippet.create({
//       data: {
//         title: newSnippet.title,
//         description: newSnippet.description || "",
//         code: newSnippet.code,
//         language: newSnippet.language || "javascript",
//         tags: newSnippet.tags || "General",
//         isFavorite: newSnippet.isFavorite ?? false,
//       },
//     });
//     return created as unknown as Snippet;
//   } catch (error) {
//     console.error("Failed to create snippet:", error);
//     return null;
//   }
// }

// export async function toggleFavorite(id: string): Promise<void> {
//   try {
//     const snippet = await prisma.snippet.findUnique({ where: { id } });
//     if (snippet) {
//       await prisma.snippet.update({
//         where: { id },
//         data: { isFavorite: !snippet.isFavorite },
//       });
//     }
//   } catch (error) {
//     console.error("Failed to toggle favorite:", error);
//   }
// }

// export async function getUserProfile() {
//   return {
//     name: "Developer",
//     email: "developer@example.com",
//   };
// }

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

    // Database-ийн string tags-ийг массив болгон хувиргаж Snippet тип рүү хөрвүүлнэ
    return snippets.map((snippet) => ({
      ...snippet,
      description: snippet.description || "",
      tags:
        typeof snippet.tags === "string"
          ? snippet.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
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
      tags:
        typeof snippet.tags === "string"
          ? snippet.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
    } as unknown as Snippet;
  } catch (error) {
    console.error("Failed to fetch snippet:", error);
    return null;
  }
}

export async function createSnippet(
  newSnippet: Omit<Snippet, "id" | "createdAt" | "updatedAt">,
): Promise<Snippet | null> {
  try {
    const tagsString = Array.isArray(newSnippet.tags)
      ? newSnippet.tags.join(", ")
      : newSnippet.tags || "General";

    const created = await prisma.snippet.create({
      data: {
        title: newSnippet.title,
        description: newSnippet.description || "",
        code: newSnippet.code,
        language: newSnippet.language || "javascript",
        tags: tagsString,
        isFavorite: newSnippet.isFavorite ?? false,
        userId: "default-user",
      },
    });

    return {
      ...created,
      description: created.description || "",
      tags:
        typeof created.tags === "string"
          ? created.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
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
