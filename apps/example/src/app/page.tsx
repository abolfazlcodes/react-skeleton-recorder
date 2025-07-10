"use client";

import { SkeletonRecorder } from "@recorder/core";

export default function Home() {
  return (
    <SkeletonRecorder>
      <div className="space-y-4 p-8">
        <h1>hello everybody</h1>
        <div className="bg-gray-300 h-6 w-2/3 rounded"></div>
        <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
        <div className="bg-gray-300 h-4 w-1/3 rounded"></div>
      </div>
    </SkeletonRecorder>
  );
}
