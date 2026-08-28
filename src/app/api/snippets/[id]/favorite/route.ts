import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }, // Type-ийг Promise болгох
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // энд await хийж id-гээ гаргаж авна
    const { id } = await params;
    const body = await request.json();
    const { isFavorite } = body;

    const updatedSnippet = await prisma.snippet.update({
      where: { id },
      data: { isFavorite: isFavorite },
    });

    return NextResponse.json(updatedSnippet);
  } catch (error) {
    console.error("Error updating favorite:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
