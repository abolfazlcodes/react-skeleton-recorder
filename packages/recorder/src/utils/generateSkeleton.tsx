import React from "react";

export const generateSkeleton = (element: HTMLElement): React.ReactNode => {
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
          backgroundColor: "#e5e7eb",
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
