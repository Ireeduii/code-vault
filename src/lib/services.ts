import { MOCK_SNIPPETS, MOCK_USER } from "./mock-data";
import { Snippet } from "@/types";

let snippetsStore = [...MOCK_SNIPPETS];

export async function getSnippets(): Promise<Snippet[]> {
  return Promise.resolve(snippetsStore);
}

export async function getSnippet(id: string): Promise<Snippet | undefined> {
  return Promise.resolve(snippetsStore.find((s) => s.id === id));
}

export async function createSnippet(
  newSnippet: Omit<Snippet, "id" | "createdAt" | "updatedAt">,
): Promise<Snippet> {
  const created: Snippet = {
    ...newSnippet,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  snippetsStore.unshift(created);
  return Promise.resolve(created);
}

export async function toggleFavorite(id: string): Promise<void> {
  snippetsStore = snippetsStore.map((s) =>
    s.id === id ? { ...s, isFavorite: !s.isFavorite } : s,
  );
  return Promise.resolve();
}

export async function getUserProfile() {
  return Promise.resolve(MOCK_USER);
}
