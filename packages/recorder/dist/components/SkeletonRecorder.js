"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState, cloneElement, isValidElement, } from "react";
import { injectPulseAnimation } from "../utils/injectPulseAnimation";
import { generateSkeleton } from "../utils/generateSkeleton";
import { SkeletonRenderer } from "./SkeletonRenderer";
export const SkeletonRecorder = ({ children, isLoading, devMode, onCapture, }) => {
    const targetRef = useRef(null);
    const [preview, setPreview] = useState(null);
    useEffect(() => {
        injectPulseAnimation();
    }, []);
    const handleCapture = () => {
        if (!targetRef.current)
            return;
        const skeleton = generateSkeleton(targetRef.current);
        setPreview(skeleton);
        onCapture?.(skeleton);
        console.log(skeleton, "skeleton");
    };
    const renderWithRef = () => {
        if (isValidElement(children) &&
            typeof children.type === "string" // یعنی DOM tag هست مثل 'div'
        ) {
            return cloneElement(children, {
                ref: (node) => {
                    if (node)
                        targetRef.current = node;
                },
            });
        }
        return (_jsx("div", { ref: (node) => {
                if (node)
                    targetRef.current = node;
            }, children: children }));
    };
    if (typeof isLoading === "boolean") {
        if (isLoading && targetRef.current) {
            const skeleton = generateSkeleton(targetRef.current);
            return _jsx(_Fragment, { children: skeleton });
        }
        else {
            return _jsx(_Fragment, { children: children });
        }
    }
    return (_jsxs(_Fragment, { children: [renderWithRef(), devMode && (_jsx("button", { onClick: handleCapture, style: {
                    position: "fixed",
                    bottom: 10,
                    right: 10,
                    zIndex: 9999,
                    padding: "8px 12px",
                    background: "#000",
                    color: "#fff",
                    borderRadius: 6,
                    cursor: "pointer",
                }, children: "\uD83D\uDCF8 Capture Skeleton" })), preview && devMode && _jsx(SkeletonRenderer, { skeleton: preview })] }));
};
