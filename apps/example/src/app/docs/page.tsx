"use client";

import { ThemeToggle } from "@/components/ThemeToggle";

export default function DocsPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <ThemeToggle />
      <section className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">Documentation</h1>
          <p className="text-gray-600 max-w-2xl">
            Everything you need to install, configure, and use React Skeleton Recorder.
          </p>
        </header>

        <section className="bg-white border rounded-xl p-6 shadow-sm space-y-3">
          <h2 className="text-lg font-medium">Installation</h2>
          <div className="grid md:grid-cols-3 gap-3 text-xs">
            <code className="rounded-md bg-gray-900 text-gray-50 px-3 py-2 block">pnpm add @recorder/core</code>
            <code className="rounded-md bg-gray-900 text-gray-50 px-3 py-2 block">npm i @recorder/core</code>
            <code className="rounded-md bg-gray-900 text-gray-50 px-3 py-2 block">yarn add @recorder/core</code>
          </div>
        </section>

        <section className="bg-white border rounded-xl p-6 shadow-sm space-y-3">
          <h2 className="text-lg font-medium">Quickstart</h2>
          <pre className="rounded-md bg-gray-900 text-gray-50 p-4 overflow-auto text-xs">
{`import { useState } from "react";
import { SkeletonRecorder } from "@recorder/core";

export function Example() {
  const [loading, setLoading] = useState(true);
  return (
    <SkeletonRecorder isLoading={loading}>
      <div className="card">
        <h2>Title</h2>
        <p>Body text...</p>
      </div>
    </SkeletonRecorder>
  );
}`}
          </pre>
        </section>

        <section className="bg-white border rounded-xl p-6 shadow-sm space-y-3">
          <h2 className="text-lg font-medium">Props</h2>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            <li><code>isLoading?: boolean</code> — shows the generated skeleton when true.</li>
            <li><code>devMode?: boolean</code> — adds a floating "📸 Capture Skeleton" button for local inspection.</li>
            <li><code>onCapture?: (jsx: React.ReactNode) =&gt; void</code> — receive captured JSX when clicking the button.</li>
          </ul>
        </section>

        <section className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-medium">Theming (light &amp; dark)</h2>
          <p className="text-sm text-gray-700">
            Set the CSS variable <code>--skeleton-base-color</code> globally. You can also control light/dark by toggling
            <code> data-theme</code> on the <code>&lt;html&gt;</code> element.
          </p>
          <pre className="rounded-md bg-gray-900 text-gray-50 p-4 overflow-auto text-xs">
{`:root { --skeleton-base-color: #e5e7eb; }
@media (prefers-color-scheme: dark) {
  :root { --skeleton-base-color: rgba(255,255,255,.14); }
}

:root[data-theme="light"] { --skeleton-base-color: #e5e7eb; }
:root[data-theme="dark"]  { --skeleton-base-color: #374151; }`}
          </pre>
          <pre className="rounded-md bg-gray-900 text-gray-50 p-4 overflow-auto text-xs">
{`document.documentElement.setAttribute('data-theme', 'dark'); // or 'light'`}
          </pre>
          <p className="text-xs text-gray-600">
            Motion is disabled automatically when users enable <code>prefers-reduced-motion</code>.
          </p>
        </section>

        <section className="bg-white border rounded-xl p-6 shadow-sm space-y-3">
          <h2 className="text-lg font-medium">How it works</h2>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            <li>Measures your rendered DOM and computed styles.</li>
            <li>Mirrors layout (flex/grid, gaps, padding, radius) with lightweight blocks.</li>
            <li>Text nodes become ragged lines; media becomes blocks or circles.</li>
            <li>Injects a minimal <code>@keyframes pulse</code> once per document.</li>
          </ul>
        </section>
      </section>
    </main>
  );
}


