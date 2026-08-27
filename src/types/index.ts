export type Tag = {
  id: string;
  name: string;
  color?: string;
};

export type Snippet = {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  tags: Tag[];
  explanation?: string;
  aiInsights?: {
    whyItWorks?: string;
    improvements?: string;
    edgeCases?: string;
  };
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UserProfile = {
  name: string;
  username: string;
  email: string;
  bio: string;
  avatarUrl: string;
  stats: {
    totalSnippets: number;
    favorites: number;
    technologies: number;
  };
};
