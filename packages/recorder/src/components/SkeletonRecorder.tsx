"use client";

import React, { useEffect, useRef, useState } from "react";
import { injectPulseAnimation } from "../utils/injectPulseAnimation";
import { generateSkeleton } from "../utils/generateSkeleton";
import { SkeletonRenderer } from "./SkeletonRenderer";

type Props = {
  children: React.ReactNode;
  isLoading?: boolean;
  devMode?: boolean;
  onCapture?: (jsx: React.ReactNode) => void;
};

export const SkeletonRecorder = ({
  children,
  isLoading,
  devMode,
  onCapture,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    injectPulseAnimation();
  }, []);

  const handleCapture = () => {
    if (!ref.current) return;
    const skeleton = generateSkeleton(ref.current);
    setPreview(skeleton);
    onCapture?.(skeleton);
  };

  // حالت runtime
  if (typeof isLoading === "boolean") {
    if (isLoading && ref.current) {
      const skeleton = generateSkeleton(ref.current);
      return <>{skeleton}</>;
    } else {
      return <>{children}</>;
    }
  }

  // حالت devMode
  return (
    <div ref={ref}>
      {children}
      {devMode && (
        <button
          onClick={handleCapture}
          style={{
            position: "fixed",
            bottom: 10,
            right: 10,
            zIndex: 9999,
            padding: "8px 12px",
            background: "#000",
            color: "#fff",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          📸 Capture Skeleton
        </button>
      )}
      {preview && devMode && <SkeletonRenderer skeleton={preview} />}
    </div>
  );
};
