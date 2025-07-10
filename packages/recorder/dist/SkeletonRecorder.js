import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    if (document.getElementById("pulse-animation-style"))
        return;
    const style = document.createElement("style");
    style.id = "pulse-animation-style";
    style.innerHTML = pulseAnimation;
    document.head.appendChild(style);
};
const generateSkeleton = (element) => {
    const children = Array.from(element.children);
    if (children.length === 0) {
        const text = element.textContent?.trim();
        const rect = element.getBoundingClientRect();
        const width = Math.round(rect.width);
        const height = text ? 16 : Math.round(rect.height);
        return (_jsx("div", { style: {
                width,
                height,
                backgroundColor: "#e5e7eb", // معادل bg-gray-200
                borderRadius: 6,
                animation: "pulse 2s infinite",
            } }));
    }
    return (_jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: children.map((child, i) => (_jsx("div", { children: generateSkeleton(child) }, i))) }));
};
export const SkeletonRecorder = ({ children, }) => {
    const ref = useRef(null);
    const [preview, setPreview] = useState(null);
    useEffect(() => {
        injectAnimationStyle();
    }, []);
    const handleCapture = () => {
        if (!ref.current)
            return;
        const skeleton = generateSkeleton(ref.current);
        setPreview(skeleton);
    };
    return (_jsxs("div", { ref: ref, children: [children, _jsx("button", { onClick: handleCapture, style: {
                    position: "fixed",
                    bottom: 10,
                    right: 10,
                    zIndex: 9999,
                    padding: "8px 12px",
                    background: "#000",
                    color: "#fff",
                    borderRadius: 6,
                    cursor: "pointer",
                }, children: "\uD83D\uDCF8 Capture Skeleton" }), preview && (_jsxs("div", { style: {
                    marginTop: 40,
                    borderTop: "1px solid #ccc",
                    paddingTop: 16,
                }, children: [_jsx("h2", { style: {
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            marginBottom: 8,
                        }, children: "Skeleton Preview:" }), preview] }))] }));
};
