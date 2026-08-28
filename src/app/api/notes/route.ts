import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// export async function GET() {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const note = await prisma.note.findFirst({
//       where: { userId },
//       orderBy: { updatedAt: "desc" },
//     });

//     return NextResponse.json({ content: note ? note.content : "" });
//   } catch (error) {
//     console.error("Failed to fetch note:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 },
//     );
//   }
// }
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const notes = await prisma.note.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(notes);
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// export async function POST(request: Request) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { content } = await request.json();

//     const existingNote = await prisma.note.findFirst({
//       where: { userId },
//     });

//     let savedNote;
//     if (existingNote) {
//       savedNote = await prisma.note.update({
//         where: { id: existingNote.id },
//         data: { content },
//       });
//     } else {
//       savedNote = await prisma.note.create({
//         data: {
//           content,
//           userId,
//         },
//       });
//     }

//     return NextResponse.json(savedNote);
//   } catch (error) {
//     console.error("Failed to save note:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 },
//     );
//   }
// }

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content } = await request.json();
    if (!content && !title) {
      return NextResponse.json(
        { error: "Title or content is required" },
        { status: 400 },
      );
    }

    const newNote = await prisma.note.create({
      data: {
        title: title || "Untitled Note",
        content,
        userId,
      },
    });

    return NextResponse.json(newNote);
  } catch (error) {
    console.error("Failed to create note:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
