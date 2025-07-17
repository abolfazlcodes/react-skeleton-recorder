import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
const parsePx = (value) => {
    if (!value)
        return 0;
    return parseFloat(value.replace("px", "")) || 0;
};
export const generateSkeleton = (element) => {
    const children = Array.from(element.children);
    const computedStyles = getComputedStyle(element);
    const paddingTop = parsePx(computedStyles.paddingTop);
    const paddingBottom = parsePx(computedStyles.paddingBottom);
    const paddingLeft = parsePx(computedStyles.paddingLeft);
    const paddingRight = parsePx(computedStyles.paddingRight);
    const borderRadius = computedStyles.borderRadius;
    const height = parsePx(computedStyles.height);
    const width = parsePx(computedStyles.width);
    const contentHeight = Math.max(height - (paddingTop + paddingBottom), 0);
    const contentWidth = Math.max(width - (paddingLeft + paddingRight), 0);
    console.log(computedStyles, "computed", element);
    if (children.length === 0) {
        return (_jsx("div", { style: {
                // ...computedStyles,
                backgroundColor: "red",
                padding: computedStyles.padding,
                borderRadius: borderRadius,
                height: contentHeight,
                width: contentWidth,
                rowGap: computedStyles?.rowGap,
                boxSizing: "border-box",
            } }));
    }
    // اگر فرزند داره، خودش رو رندر کن و داخلش بچه‌ها رو بازگشتی رندر کن
    return (_jsx("div", { style: {
            padding: computedStyles.padding,
            borderRadius: borderRadius,
            height: contentHeight,
            width: contentWidth,
            boxSizing: "border-box",
            backgroundColor: "#ccc",
            animation: "pulse 2s infinite",
        }, children: children.map((child, i) => (_jsx(React.Fragment, { children: generateSkeleton(child) }, i))) }));
};
