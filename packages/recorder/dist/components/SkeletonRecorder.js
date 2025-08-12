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
    const renderWithRef = (hidden) => {
        if (isValidElement(children) &&
            typeof children.type === "string" // یعنی DOM tag هست مثل 'div'
        ) {
            const childEl = children;
            const existingStyle = (childEl.props && childEl.props.style) || {};
            return cloneElement(childEl, {
                ref: (node) => {
                    if (node)
                        targetRef.current = node;
                },
                style: {
                    ...existingStyle,
                    visibility: hidden ? "hidden" : existingStyle.visibility || undefined,
                },
            });
        }
        return (_jsx("div", { ref: (node) => {
                if (node)
                    targetRef.current = node;
            }, style: { visibility: hidden ? "hidden" : undefined }, children: children }));
    };
    return (_jsxs(_Fragment, { children: [renderWithRef(Boolean(isLoading)), isLoading && targetRef.current && generateSkeleton(targetRef.current), devMode && (_jsx("button", { onClick: handleCapture, style: {
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
