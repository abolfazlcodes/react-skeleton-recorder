"use client";

import InstagramCard from "@/components/InstagramCard";
import LinkedInCard from "@/components/LinkedInCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SkeletonRecorder } from "@recorder/core";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
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

        <ThemeToggle />
        {/* LinkedIn-style post */}
        <div>
          <h2 className="text-lg font-medium mb-3">LinkedIn post</h2>
          <SkeletonRecorder isLoading={isLoading}>
            <div className="space-y-4">
              <LinkedInCard />
              {/* <LinkedInCard />
              <LinkedInCard />
              <LinkedInCard />
              <LinkedInCard /> */}
            </div>
          </SkeletonRecorder>
        </div>

        {/* Instagram-style post */}
        <div>
          <h2 className="text-lg font-medium mb-3">Instagram post</h2>
          <SkeletonRecorder isLoading={isLoading}>
            <div className="space-y-4">
              <InstagramCard />
              {/* <InstagramCard />
              <InstagramCard /> */}
            </div>
          </SkeletonRecorder>
        </div>
      </section>
    </main>
  );
}
