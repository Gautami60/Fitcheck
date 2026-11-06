import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fitcheck — AI Fashion Compatibility & Style Intelligence",
  description: "AI-powered aesthetic previews and personal style intelligence platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-[#151413] font-sans selection:bg-[#0E0E0E] selection:text-white">
        {children}
      </body>
    </html>
  );
}
