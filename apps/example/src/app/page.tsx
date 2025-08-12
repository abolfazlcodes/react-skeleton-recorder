"use client";

import { SkeletonRecorder } from "@recorder/core";
import { useState } from "react";


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <section className="max-w-2xl mx-auto space-y-12">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Demo cards</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">isLoading</span>
            <input
              type="checkbox"
              checked={isLoading}
              onChange={(e) => setIsLoading(e.target.checked)}
            />
          </div>
        </div>

        {/* LinkedIn-style post */}
        <div>
          <h2 className="text-lg font-medium mb-3">LinkedIn post</h2>
          <SkeletonRecorder isLoading={isLoading}>
            <article className="bg-white border rounded-xl p-4 space-y-4">
              {/* Header */}
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-full bg-blue-400 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Jane Doe</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-500">2h</span>
                  </div>
                  <div className="text-sm text-gray-500">Senior Frontend Engineer at Acme</div>
                </div>
                <button className="text-gray-400">•••</button>
              </div>

              {/* Body text */}
              <p className="text-gray-800 leading-relaxed">
                We just shipped a new feature that improves performance by 30%.
                Here’s a quick overview of how we approached it and what’s next.
              </p>

              {/* Media */}
              <div className="w-full h-60 bg-gray-200 rounded-lg" />

              {/* Stats */}
              <div className="flex justify-between text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-blue-500" />
                  <div className="h-4 w-4 rounded-full bg-green-500 -ml-2" />
                  <span>235</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>48 comments</span>
                  <span>12 shares</span>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-4 gap-2 pt-2 border-t">
                <button className="h-10 rounded-md bg-gray-100">Like</button>
                <button className="h-10 rounded-md bg-gray-100">Comment</button>
                <button className="h-10 rounded-md bg-gray-100">Repost</button>
                <button className="h-10 rounded-md bg-gray-100">Send</button>
              </div>
            </article>
          </SkeletonRecorder>
        </div>

        {/* Instagram-style post */}
        <div>
          <h2 className="text-lg font-medium mb-3">Instagram post</h2>
          <SkeletonRecorder isLoading={isLoading}>
            <article className="bg-white border rounded-xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-pink-400" />
                  <div className="flex flex-col">
                    <span className="font-semibold">@acme_studio</span>
                    <span className="text-xs text-gray-500">Paris, France</span>
                  </div>
                </div>
                <button className="text-gray-400">•••</button>
              </div>

              {/* Image */}
              <div className="w-full h-96 bg-gray-200" />

              {/* Actions */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <button className="h-9 w-16 rounded-md bg-gray-100">Like</button>
                  <button className="h-9 w-24 rounded-md bg-gray-100">Comment</button>
                  <button className="h-9 w-16 rounded-md bg-gray-100">Share</button>
                </div>
                <button className="h-9 w-16 rounded-md bg-gray-100">Save</button>
              </div>

              {/* Meta */}
              <div className="px-4 pb-4 space-y-2">
                <div className="text-sm font-semibold">1,482 likes</div>
                <div className="text-sm"><span className="font-semibold">acme_studio</span> Spring palette, minimal vibes.</div>
                <button className="text-sm text-gray-500">View all 126 comments</button>
                <div className="flex items-center gap-3 pt-2">
                  <div className="h-8 w-8 rounded-full bg-gray-300" />
                  <input className="flex-1 h-10 rounded-md border px-3" placeholder="Add a comment..." />
                </div>
              </div>
            </article>
          </SkeletonRecorder>
        </div>
      </section>
    </main>
  );
}
