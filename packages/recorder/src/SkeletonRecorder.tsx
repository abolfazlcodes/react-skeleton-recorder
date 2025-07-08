import { useEffect, useRef, useState } from "react";

// const generateSkeleton = (element: HTMLElement): string => {
//   const children = Array.from(element.children) as HTMLElement[];

//   // detect texts and do one liner div
//   if (children.length === 0) {
//     const text = element.textContent?.trim();
//     const rect = element.getBoundingClientRect();
//     const width = Math.round(rect.width);
//     const height = Math.round(rect.height);

//     // اگر فقط متن بود، skeleton مخصوص متن بساز
//     if (text && text.length > 0) {
//       return `<div className="bg-gray-200 rounded h-4 w-[${width}px]" />`;
//     }

//     // در غیر این صورت (مثلاً آیکن یا باکس خالی)، همون باکس معمولی
//     return `<div className="bg-gray-200 rounded w-[${width}px] h-[${height}px]" />`;
//   }

//   // در غیر این صورت، recursive بچه‌ها رو بررسی کن
//   const childSkeletons = children.map(generateSkeleton).join("\n");

//   return `<div className="space-y-2">\n${childSkeletons}\n</div>`;
// };

const generateSkeleton = (element: HTMLElement): React.ReactNode => {
  const children = Array.from(element.children) as HTMLElement[];

  if (children.length === 0) {
    const text = element.textContent?.trim();
    const rect = element.getBoundingClientRect();
    const width = Math.round(rect.width);
    const height = Math.round(rect.height);

    const style = {
      width,
      height: text ? 16 : height,
    };

    return (
      <div
        style={style}
        className="bg-gray-200 border border-red-500 rounded animate-pulse"
      />
    );
  }

  return (
    <div className="space-y-2">
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
  const [skeletonJSX, setSkeletonJSX] = useState<React.ReactNode>(null);
  const [showPreview, setShowPreview] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const handleCapture = () => {
    if (!ref.current) return;

    const jsx = generateSkeleton(ref.current);
    console.log("📸 Skeleton JSX:\n\n", jsx);
    setSkeletonJSX(jsx);
    setShowPreview(true);
  };

  useEffect(() => {
    const fake = <div className="bg-red-500 text-white p-4">STATIC JSX</div>;
    setSkeletonJSX(fake);
    setShowPreview(true);
  }, []);

  return (
    <div ref={ref}>
      {children}
      {/* <button
        style={{
          position: "fixed",
          bottom: 10,
          right: 10,
          zIndex: 9999,
          padding: "8px 12px",
          background: "#000",
          color: "#fff",
          borderRadius: "6px",
        }}
        onClick={handleCapture}
      >
        📸 Capture Skeleton
      </button> */}

      {/* {showPreview && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.6)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setShowPreview(false)}
        >
          <div
            style={{
              padding: "2rem",
              maxHeight: "80vh",
              overflow: "auto",
              borderRadius: "8px",
              minWidth: "300px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4">📸 Skeleton Preview</h2>
            <div className="bg-red-500 text-white p-4">TEST FROM RECORDER</div>
            <div className="p-4 space-y-2">{showPreview && skeletonJSX}</div>
          </div>
        </div>
      )} */}

      <div className="bg-red-500 animate-pulse text-white p-4">
        Hello from Recorder
      </div>
    </div>
  );
};
