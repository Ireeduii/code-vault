import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = await auth();
    console.log("Current user id:", userId);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const snippets = await prisma.snippet.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(snippets);
  } catch (error) {
    console.error("Failed to fetch snippets:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    console.log("Current user id:", userId);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, code, language, tags, isFavorite } = body;

    if (!title || !code || !language) {
      return NextResponse.json(
        { error: "Missing required fields (title, code, language)" },
        { status: 400 },
      );
    }

    let formattedTags: string[] = ["General"];

    if (Array.isArray(tags)) {
      formattedTags = tags;
    } else if (typeof tags === "string") {
      formattedTags = tags
        .split(",")
        .map((t: string) => t.trim())
        .filter(Boolean);
    }

    const newSnippet = await prisma.snippet.create({
      data: {
        title,
        description: description || "",
        code,
        language,
        tags: formattedTags,
        isFavorite: isFavorite || false,
        userId,
      },
    });

    return NextResponse.json(newSnippet, { status: 201 });
  } catch (error) {
    console.error("Failed to create snippet:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
