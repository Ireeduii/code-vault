import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CommandPalette } from "@/components/search/CommandPalette";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeVault — Developer's Second Brain",
  description:
    "Save, organize, and search code snippets and solutions instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body
          className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100`}
        >
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
          </ThemeProvider>
          <CommandPalette />
        </body>
      </html>
    </ClerkProvider>
  );
}
