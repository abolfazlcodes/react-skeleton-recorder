"use client";

import InstagramCard from "@/components/InstagramCard";
import LinkedInCard from "@/components/LinkedInCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SkeletonRecorder } from "@recorder/core";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <main className="bg-gray-50 min-h-screen">
      <ThemeToggle />
      <section className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs text-gray-600 shadow">
            <span>React</span>
            <span>•</span>
            <span>Skeleton Recorder</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
            Turn any UI into a precise skeleton loader — automatically
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Wrap your content once and get a pixel-accurate skeleton while data is loading.
            No more hand-crafted placeholder trees.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a href="/docs" className="h-9 px-4 inline-flex items-center rounded-md bg-black text-white text-sm shadow hover:bg-gray-900">Read the docs</a>
            <a href="/dev" className="h-9 px-4 inline-flex items-center rounded-md border bg-white text-sm shadow hover:bg-gray-50">Open playground</a>
          </div>
        </header>

        <section className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-medium">Install</h2>
          <div className="mt-3 grid md:grid-cols-3 gap-3 text-xs">
            <code className="rounded-md bg-gray-900 text-gray-50 px-3 py-2 block">pnpm add @recorder/core</code>
            <code className="rounded-md bg-gray-900 text-gray-50 px-3 py-2 block">npm i @recorder/core</code>
            <code className="rounded-md bg-gray-900 text-gray-50 px-3 py-2 block">yarn add @recorder/core</code>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Live demo</h2>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <span>isLoading</span>
              <input
                type="checkbox"
                checked={isLoading}
                onChange={(e) => setIsLoading(e.target.checked)}
              />
            </label>
          </div>

          {/* LinkedIn-style post */}
          <div>
            <SkeletonRecorder isLoading={isLoading}>
              <div className="space-y-4">
                <LinkedInCard />
              </div>
            </SkeletonRecorder>
          </div>

          {/* Instagram-style post */}
          <div>
            <SkeletonRecorder isLoading={isLoading}>
              <div className="space-y-4">
                <InstagramCard />
              </div>
            </SkeletonRecorder>
          </div>
        </section>

        <section className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-medium">Usage</h2>
          <p className="text-sm text-gray-600 mt-1">Wrap your content with the component and drive it with a loading flag.</p>
          <pre className="mt-3 rounded-md bg-gray-900 text-gray-50 p-4 overflow-auto text-xs">
{`import { SkeletonRecorder } from "@recorder/core";

<SkeletonRecorder isLoading={loading}>{content}</SkeletonRecorder>`}
          </pre>
        </section>
      </section>
    </main>
  );
}
