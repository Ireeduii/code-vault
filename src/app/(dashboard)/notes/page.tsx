// // import { StickyNote } from "lucide-react";

// // export default function NotesPage() {
// //   return (
// //     <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
// //       <div>
// //         <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-3">
// //           <StickyNote className="w-8 h-8 text-indigo-500" />
// //           Quick Notes
// //         </h1>
// //         <p className="text-zinc-600 dark:text-zinc-400 mt-1">
// //           Jot down quick ideas, TODOs, or code thoughts.
// //         </p>
// //       </div>

// //       <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 min-h-[300px]">
// //         <textarea
// //           placeholder="Write down your thoughts here..."
// //           className="w-full h-64 bg-transparent resize-none focus:outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 font-mono text-sm"
// //         />
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useState, useEffect } from "react";
// import { StickyNote, Loader2, Check } from "lucide-react";

// export default function NotesPage() {
//   const [content, setContent] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSaving, setIsSaving] = useState(false);
//   const [savedMessage, setSavedMessage] = useState(false);

//   // Хуудас ачаалагдахад өмнөх хадгалсан тэмдэглэлийг татаж авах
//   useEffect(() => {
//     fetch("/api/notes")
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.content) {
//           setContent(data.content);
//         }
//       })
//       .catch((err) => console.error("Error loading note:", err))
//       .finally(() => setIsLoading(false));
//   }, []);

//   // Бааз руу хадгалах функц
//   const handleSave = async () => {
//     setIsSaving(true);
//     try {
//       const res = await fetch("/api/notes", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ content }),
//       });

//       if (res.ok) {
//         setSavedMessage(true);
//         setTimeout(() => setSavedMessage(false), 2000);
//       }
//     } catch (error) {
//       console.error("Error saving note:", error);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-3">
//             <StickyNote className="w-8 h-8 text-indigo-500" />
//             Quick Notes
//           </h1>
//           <p className="text-zinc-600 dark:text-zinc-400 mt-1">
//             Jot down quick ideas, TODOs, or code thoughts.
//           </p>
//         </div>
//         <button
//           onClick={handleSave}
//           disabled={isSaving}
//           className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors shadow-sm disabled:opacity-50"
//         >
//           {isSaving ? (
//             <Loader2 className="w-4 h-4 animate-spin" />
//           ) : savedMessage ? (
//             <Check className="w-4 h-4" />
//           ) : null}
//           {savedMessage ? "Saved!" : "Save Note"}
//         </button>
//       </div>

//       <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 min-h-[300px]">
//         {isLoading ? (
//           <div className="flex justify-center items-center h-64 text-zinc-500">
//             <Loader2 className="w-6 h-6 animate-spin" />
//           </div>
//         ) : (
//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             placeholder="Write down your thoughts here..."
//             className="w-full h-64 bg-transparent resize-none focus:outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 font-mono text-sm"
//           />
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { StickyNote, Loader2, Plus, Trash2 } from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Тэмдэглэлүүдийг татаж авах
  useEffect(() => {
    fetch("/api/notes")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setNotes(data);
        }
      })
      .catch((err) => console.error("Error loading notes:", err))
      .finally(() => setIsLoading(false));
  }, []);

  // Шинэ тэмдэглэл хадгалах
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;

    setIsSaving(true);
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        const newNote = await res.json();
        setNotes([newNote, ...notes]); // Шинэ тэмдэглэлийг жагсаалтын хамгийн эхэнд нэмэх
        setTitle("");
        setContent("");
      }
    } catch (error) {
      console.error("Error saving note:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-3">
          <StickyNote className="w-8 h-8 text-indigo-500" />
          Quick Notes
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-1">
          Jot down quick ideas, TODOs, or code thoughts.
        </p>
      </div>

      {/* Шинэ тэмдэглэл бичих хэсэг */}
      <form
        onSubmit={handleSave}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 space-y-4 shadow-sm"
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title..."
          className="w-full bg-transparent font-semibold text-lg focus:outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 pb-2"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write down your thoughts here..."
          className="w-full h-32 bg-transparent resize-none focus:outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 font-mono text-sm"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors shadow-sm disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            Save Note
          </button>
        </div>
      </form>

      {/* Хадгалагдсан тэмдэглэлүүдийн жагсаалт (Картууд) */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Saved Notes
        </h2>

        {isLoading ? (
          <div className="flex justify-center items-center py-12 text-zinc-500">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : notes.length === 0 ? (
          <p className="text-sm text-zinc-500">
            No notes yet. Create your first one above!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 flex flex-col justify-between space-y-3 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
              >
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-base mb-1">
                    {note.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap font-mono">
                    {note.content}
                  </p>
                </div>
                <div className="text-xs text-zinc-400 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex justify-between items-center">
                  <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
