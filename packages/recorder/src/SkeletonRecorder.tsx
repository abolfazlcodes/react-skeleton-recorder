import { useEffect, useRef, useState } from "react";

// ایجاد انیمیشن pulse به کمک CSS-in-JS
const pulseAnimation = `
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

// درون head قرار بده
const injectAnimationStyle = () => {
  if (document.getElementById("pulse-animation-style")) return;
  const style = document.createElement("style");
  style.id = "pulse-animation-style";
  style.innerHTML = pulseAnimation;
  document.head.appendChild(style);
};

const generateSkeleton = (element: HTMLElement): React.ReactNode => {
  const children = Array.from(element.children) as HTMLElement[];

  if (children.length === 0) {
    const text = element.textContent?.trim();
    const rect = element.getBoundingClientRect();
    const width = Math.round(rect.width);
    const height = text ? 16 : Math.round(rect.height);

    return (
      <div
        style={{
          width,
          height,
          backgroundColor: "#e5e7eb", // معادل bg-gray-200
          borderRadius: 6,
          animation: "pulse 2s infinite",
        }}
      />
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {children.map((child, i) => (
        <div key={i}>{generateSkeleton(child)}</div>
      ))}
    </div>
  );
};

export const SkeletonRecorder = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    injectAnimationStyle();
  }, []);

  const handleCapture = () => {
    if (!ref.current) return;
    const skeleton = generateSkeleton(ref.current);
    setPreview(skeleton);
  };

  return (
    <div ref={ref}>
      {children}

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

      {preview && (
        <div
          style={{
            marginTop: 40,
            borderTop: "1px solid #ccc",
            paddingTop: 16,
          }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginBottom: 8,
            }}
          >
            Skeleton Preview:
          </h2>
          {preview}
        </div>
      )}
    </div>
  );
};
