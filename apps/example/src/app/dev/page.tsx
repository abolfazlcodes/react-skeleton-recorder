"use client";

import { SkeletonRecorder } from "@recorder/core";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function DevPage() {
  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <ThemeToggle />
      <section className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-2xl font-semibold">Skeleton Dev Tools</h1>
        <p className="text-sm text-gray-600">
          Use the capture button to preview the generated skeleton for the content below.
        </p>

        <SkeletonRecorder devMode>
          <div className="space-y-4 bg-white border rounded-xl p-6">
            <h2 className="text-lg font-medium">Playground</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-24 rounded-lg bg-blue-100" />
              <div className="h-24 rounded-lg bg-green-100" />
              <div className="h-24 rounded-lg bg-purple-100 col-span-2" />
            </div>
            <div className="flex items-center gap-3">
              <input className="flex-1 h-10 rounded-md border px-3" placeholder="Type here" />
              <button className="h-10 rounded-md bg-black text-white px-4">Submit</button>
            </div>
          </div>
        </SkeletonRecorder>
      </section>
    </main>
  );
}


