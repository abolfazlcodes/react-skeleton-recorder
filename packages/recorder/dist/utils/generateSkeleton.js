import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
const parsePx = (value) => {
    if (!value)
        return 0;
    return parseFloat(value.replace("px", "")) || 0;
};
const px = (n) => `${Math.max(0, Math.round(n))}px`;
const shouldSkip = (tagName) => {
    const t = tagName.toUpperCase();
    return (t === "SCRIPT" ||
        t === "STYLE" ||
        t === "LINK" ||
        t === "META" ||
        t === "NOSCRIPT" ||
        t === "BR");
};
const copyLayoutStyles = (computed) => {
    let display = computed.display;
    const isFlex = display.includes("flex");
    const isGrid = display.includes("grid");
    const base = {
        // Ensure width/height can apply for inline elements
        display: display === "inline" ? "inline-block" : display,
        boxSizing: "border-box",
        padding: computed.padding,
        margin: computed.margin,
        borderRadius: computed.borderRadius,
    };
    if (isFlex) {
        base.flexDirection = computed.flexDirection;
        base.justifyContent = computed.justifyContent;
        base.alignItems = computed.alignItems;
        base.flexWrap = computed.flexWrap;
        // gap properties
        base.gap = computed.gap || undefined;
        base.rowGap = computed.rowGap || undefined;
        base.columnGap = computed.columnGap || undefined;
    }
    if (isGrid) {
        base.gridTemplateColumns = computed.gridTemplateColumns;
        base.gridTemplateRows = computed.gridTemplateRows;
        base.gridAutoFlow = computed.gridAutoFlow;
        base.gap = computed.gap || undefined;
        base.rowGap = computed.rowGap || undefined;
        base.columnGap = computed.columnGap || undefined;
        base.justifyItems = computed.justifyItems;
        base.alignItems = computed.alignItems;
        base.justifyContent = computed.justifyContent;
        base.alignContent = computed.alignContent;
    }
    return base;
};
export const generateSkeleton = (element, parentRect) => {
    if (shouldSkip(element.tagName))
        return null;
    const children = Array.from(element.children);
    const computedStyles = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    // Fallbacks for cases where bounding rect is 0
    const fallbackWidth = parsePx(computedStyles.width) || element.clientWidth;
    const fallbackHeight = parsePx(computedStyles.height) || element.clientHeight;
    const width = rect.width || fallbackWidth;
    const height = rect.height || fallbackHeight;
    const layoutStyles = copyLayoutStyles(computedStyles);
    const isLeaf = children.length === 0;
    // Positioning for absolutely positioned elements
    const isAbsolutelyPositioned = computedStyles.position === "absolute";
    const isFixedPositioned = computedStyles.position === "fixed";
    const isStickyPositioned = computedStyles.position === "sticky";
    if (isLeaf) {
        const leafStyles = {
            ...layoutStyles,
            width: px(width),
            height: px(height),
            backgroundColor: "#e5e7eb",
            animation: "pulse 1.6s ease-in-out infinite",
        };
        if (isAbsolutelyPositioned && parentRect) {
            leafStyles.position = "absolute";
            leafStyles.left = px(rect.left - parentRect.left);
            leafStyles.top = px(rect.top - parentRect.top);
            leafStyles.zIndex = parseInt(computedStyles.zIndex || "0") || undefined;
        }
        else if (isFixedPositioned) {
            // Approximate fixed as absolute relative to viewport
            leafStyles.position = "fixed";
            leafStyles.left = px(rect.left);
            leafStyles.top = px(rect.top);
            leafStyles.zIndex = parseInt(computedStyles.zIndex || "0") || undefined;
        }
        else if (isStickyPositioned && parentRect) {
            // Treat sticky like absolute at current position
            leafStyles.position = "absolute";
            leafStyles.left = px(rect.left - parentRect.left);
            leafStyles.top = px(rect.top - parentRect.top);
        }
        return _jsx("div", { style: leafStyles });
    }
    const containerStyles = {
        ...layoutStyles,
        width: px(width),
        // Let height be defined by children to reveal nested boxes
        // Always relative to position absolute children correctly
        position: "relative",
    };
    return (_jsx("div", { style: containerStyles, children: children.map((child, i) => (_jsx(React.Fragment, { children: generateSkeleton(child, rect) }, i))) }));
};
