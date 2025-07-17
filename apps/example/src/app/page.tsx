"use client";

import { SkeletonRecorder } from "@recorder/core";

export default function Home() {
  return (
    <main className="p-4">
      {/* <SkeletonRecorder devMode></SkeletonRecorder> */}
      {/* <div className="space-y-4 p-8">
        <h1>hello everybody</h1>
        <div className="rounded-2xl">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex flex-col gap-y-4 items-start">
              <input placeholder="hi comment" className="w-44" />
              <button>submit form</button>
            </div>
            <div className="flex flex-col gap-y-4 items-start">
              <input placeholder="hi comment" className="w-44" />
              <button>submit form</button>
            </div>
          </div>
        </div>
      </div> */}
      <SkeletonRecorder devMode>
        <div
          id="div-me"
          className="border border-black p-10 gap-y-4 bg-gray-200"
          style={{
            display: "flex",
            flexDirection: "column",
            columnGap: "16px",
            alignItems: "start",
            borderRadius: "20px",
          }}
        >
          <input
            placeholder="hi comment"
            className="bg-white p-3 w-full rounded-xl"
          />
          <button className="w-44 flex items-center justify-center border border-green-400 rounded-xl bg-white text-green-400 h-10">
            submit form
          </button>
        </div>
      </SkeletonRecorder>
    </main>
  );
}
