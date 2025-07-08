export const SkeletonRecorder = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div>
      {children}
      <button
        style={{
          position: "fixed",
          bottom: 10,
          right: 10,
          zIndex: 1000,
        }}
        onClick={() => alert("Capture Coming Soon")}
      >
        📸 Capture Skeleton
      </button>
    </div>
  );
};
