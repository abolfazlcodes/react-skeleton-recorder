import React from "react";

export const SkeletonRenderer = ({
  skeleton,
}: {
  skeleton: React.ReactNode;
}) => {
  return (
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
      {skeleton}
    </div>
  );
};
