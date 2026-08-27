import { Snippet, UserProfile } from "@/types";

export const MOCK_SNIPPETS: Snippet[] = [
  {
    id: "1",
    title: "Prisma transaction rollback",
    description:
      "A safe transaction pattern for handling nested database operations securely.",
    code: `const result = await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({ data: { email } });
  await tx.profile.create({ data: { userId: user.id } });
  return user;
});`,
    language: "TypeScript",
    tags: [
      { id: "t1", name: "Prisma" },
      { id: "t2", name: "PostgreSQL" },
      { id: "t3", name: "TypeScript" },
    ],
    explanation:
      "This pattern ensures atomic operations across multiple tables. If any query fails, the entire transaction rolls back automatically.",
    aiInsights: {
      whyItWorks:
        "Leverages Prisma's interactive transactions which handle rollback logic internally.",
      improvements: "Add timeout configurations for large transactional loads.",
      edgeCases:
        "Watch out for deadlock exceptions under heavy concurrent writes.",
    },
    isFavorite: true,
    createdAt: "2026-04-10T10:00:00Z",
    updatedAt: "2026-04-20T14:30:00Z",
  },
  {
    id: "2",
    title: "Next.js middleware authentication check",
    description:
      "Protect routes and handle token verification efficiently inside edge middleware.",
    code: `export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
  return NextResponse.next();
}`,
    language: "TypeScript",
    tags: [
      { id: "t4", name: "Next.js" },
      { id: "t5", name: "Auth" },
    ],
    explanation:
      "Intercepts incoming requests at the edge before rendering pages, preventing unauthorized access instantly.",
    isFavorite: false,
    createdAt: "2026-04-05T08:00:00Z",
    updatedAt: "2026-04-18T11:20:00Z",
  },
];

export const MOCK_USER: UserProfile = {
  name: "Bat-Ireedui Erkhemzaya",
  username: "ireeduii",
  email: "ireedui@example.com",
  bio: "Full-stack developer building scalable web applications.",
  avatarUrl: "https://github.com/github.png",
  stats: {
    totalSnippets: 128,
    favorites: 24,
    technologies: 16,
  },
};
