"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  Code2,
  Star,
  Clock,
  Tags,
  Settings,
  FolderGit2,
  Share2,
  Sun,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "All Snippets", href: "/snippets", icon: Code2 },
  { name: "Favorites", href: "/favorites", icon: Star },
  { name: "Recently Viewed", href: "/snippets", icon: Clock },
];

const workspaceItems = [
  { name: "My Snippets", href: "/snippets", icon: FolderGit2 },
  { name: "Shared With Me", href: "/snippets", icon: Share2 },
];

export function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800  bg-white dark:bg-zinc-950 flex flex-col h-screen sticky top-0">
      <div className="h-14 px-6 flex items-center border-b border-zinc-200 dark:border-zinc-800">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-50"
        >
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-600 text-white text-xs font-mono">
            &lt;/&gt;
          </span>
          <span className="tracking-tight">CodeVault</span>
        </Link>
      </div>

      <div className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200",
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4",
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-zinc-500",
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
            Organize
          </p>
          <Link
            href="/tags"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200"
          >
            <Tags className="w-4 h-4 text-zinc-500" />
            Tags
          </Link>
        </div>

        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
            Workspace
          </p>
          {workspaceItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200"
              >
                <Icon className="w-4 h-4 text-zinc-500" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 space-y-1">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
        >
          <Settings className="w-4 h-4 text-zinc-500" />
          Settings
        </Link>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Sun className="w-4 h-4 text-zinc-500 dark:hidden" />
            <Moon className="w-4 h-4 hidden dark:block text-zinc-400" />
            <span>Theme</span>
          </div>
          <span className="text-xs uppercase text-zinc-400 font-mono">
            {theme === "dark" ? "Dark" : "Light"}
          </span>
        </button>

        <div className="pt-2 mt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-3 py-1">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            Account
          </span>
          <UserButton />
        </div>
      </div>
    </aside>
  );
}
