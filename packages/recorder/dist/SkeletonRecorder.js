import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
const generateSkeleton = (element) => {
    const children = Array.from(element.children);
    if (children.length === 0) {
        const text = element.textContent?.trim();
        const rect = element.getBoundingClientRect();
        const width = Math.round(rect.width);
        const height = Math.round(rect.height);
        const style = {
            width,
            height: text ? 16 : height,
        };
        return (_jsx("div", { style: style, className: "bg-gray-200 border border-red-500 rounded animate-pulse" }));
    }
    return (_jsx("div", { className: "space-y-2", children: children.map((child, i) => (_jsx("div", { children: generateSkeleton(child) }, i))) }));
};
export const SkeletonRecorder = ({ children, }) => {
    const [skeletonJSX, setSkeletonJSX] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const ref = useRef(null);
    const handleCapture = () => {
        if (!ref.current)
            return;
        const jsx = generateSkeleton(ref.current);
        console.log("📸 Skeleton JSX:\n\n", jsx);
        setSkeletonJSX(jsx);
        setShowPreview(true);
    };
    useEffect(() => {
        const fake = _jsx("div", { className: "bg-red-500 text-white p-4", children: "STATIC JSX" });
        setSkeletonJSX(fake);
        setShowPreview(true);
    }, []);
    return (_jsxs("div", { ref: ref, children: [children, _jsx("div", { className: "bg-red-500 animate-pulse text-white p-4", children: "Hello from Recorder" })] }));
};
