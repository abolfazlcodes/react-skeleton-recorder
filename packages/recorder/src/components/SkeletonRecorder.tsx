"use client";

import React, {
  useEffect,
  useRef,
  useState,
  cloneElement,
  isValidElement,
} from "react";
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
  const targetRef = useRef<HTMLElement | null>(null);
  const [preview, setPreview] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    injectPulseAnimation();
  }, []);

  const handleCapture = () => {
    if (!targetRef.current) return;
    const skeleton = generateSkeleton(targetRef.current);
    setPreview(skeleton);
    onCapture?.(skeleton);
    console.log(skeleton, "skeleton");
  };

  const renderWithRef = () => {
    if (
      isValidElement(children) &&
      typeof children.type === "string" // یعنی DOM tag هست مثل 'div'
    ) {
      return cloneElement(children as React.ReactElement<any>, {
        ref: (node: HTMLElement | null) => {
          if (node) targetRef.current = node;
        },
      });
    }

    return (
      <div
        ref={(node) => {
          if (node) targetRef.current = node;
        }}
      >
        {children}
      </div>
    );
  };

  if (typeof isLoading === "boolean") {
    if (isLoading && targetRef.current) {
      const skeleton = generateSkeleton(targetRef.current);
      return <>{skeleton}</>;
    } else {
      return <>{children}</>;
    }
  }

  return (
    <>
      {renderWithRef()}
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
    </>
  );
};
