// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="flex min-h-screen bg-zinc-950">
//       <main className="flex-1 overflow-y-auto">{children}</main>
//     </div>
//   );
// }

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <main className="flex-1 overflow-y-auto min-h-screen">{children}</main>
    </div>
  );
}
