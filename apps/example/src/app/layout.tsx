import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "React Skeleton Recorder",
  description:
    "Turn any UI into a precise skeleton loader automatically. Wrap once, get pixel-accurate skeletons.",
  metadataBase: new URL("https://example.local"),
  openGraph: {
    title: "React Skeleton Recorder",
    description:
      "Turn any UI into a precise skeleton loader automatically. Wrap once, get pixel-accurate skeletons.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "React Skeleton Recorder",
    description:
      "Turn any UI into a precise skeleton loader automatically. Wrap once, get pixel-accurate skeletons.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <nav className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
          <div className="max-w-4xl mx-auto flex items-center justify-between px-6 h-14">
            <Link href="/" className="font-medium">
              Skeleton Recorder
            </Link>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/docs" className="text-gray-600 hover:text-gray-900">
                Docs
              </Link>
              <Link href="/dev" className="text-gray-600 hover:text-gray-900">
                Playground
              </Link>
              <Link
                href="https://www.npmjs.com/package/@recorder/core"
                target="_blank"
                rel="noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                npm
              </Link>
            </div>
          </div>
        </nav>
        {children}
        <footer className="border-t mt-16">
          <div className="max-w-4xl mx-auto px-6 h-16 flex items-center text-xs text-gray-600">
            MIT Licensed. © 2025
          </div>
        </footer>
      </body>
    </html>
  );
}
