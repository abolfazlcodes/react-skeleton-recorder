// src/components/SkeletonRecorder.tsx
import {
  useEffect,
  useRef,
  useState,
  cloneElement,
  isValidElement
} from "react";

// src/utils/injectPulseAnimation.ts
var injectPulseAnimation = () => {
  if (typeof document === "undefined") return;
  if (!document.getElementById("pulse-animation-style")) {
    const css = `
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `;
    const style = document.createElement("style");
    style.id = "pulse-animation-style";
    style.innerHTML = css;
    document.head.appendChild(style);
  }
};

// src/utils/generateSkeleton.tsx
import React from "react";
import { jsx } from "react/jsx-runtime";
var parsePx = (value) => {
  if (!value) return 0;
  return parseFloat(value.replace("px", "")) || 0;
};
var px = (n) => `${Math.max(0, Math.round(n))}px`;
var seededRandom = (seed) => {
  let t = seed + 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
};
var hashString = (input) => {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return h >>> 0;
};
var shouldSkip = (tagName) => {
  const t = tagName.toUpperCase();
  return t === "SCRIPT" || t === "STYLE" || t === "LINK" || t === "META" || t === "NOSCRIPT" || t === "BR";
};
var copyLayoutStyles = (computed) => {
  let display = computed.display;
  const isFlex = display.includes("flex");
  const isGrid = display.includes("grid");
  const base = {
    // Ensure width/height can apply for inline elements
    display: display === "inline" ? "inline-block" : display,
    boxSizing: "border-box",
    padding: computed.padding,
    margin: computed.margin,
    borderRadius: computed.borderRadius
  };
  if (isFlex) {
    base.flexDirection = computed.flexDirection;
    base.justifyContent = computed.justifyContent;
    base.alignItems = computed.alignItems;
    base.flexWrap = computed.flexWrap;
    base.gap = computed.gap || void 0;
    base.rowGap = computed.rowGap || void 0;
    base.columnGap = computed.columnGap || void 0;
  }
  if (isGrid) {
    base.gridTemplateColumns = computed.gridTemplateColumns;
    base.gridTemplateRows = computed.gridTemplateRows;
    base.gridAutoFlow = computed.gridAutoFlow;
    base.gap = computed.gap || void 0;
    base.rowGap = computed.rowGap || void 0;
    base.columnGap = computed.columnGap || void 0;
    base.justifyItems = computed.justifyItems;
    base.alignItems = computed.alignItems;
    base.justifyContent = computed.justifyContent;
    base.alignContent = computed.alignContent;
  }
  return base;
};
var generateSkeleton = (element, parentRect) => {
  if (shouldSkip(element.tagName)) return null;
  const children = Array.from(element.children);
  const computedStyles = getComputedStyle(element);
  const rect = element.getBoundingClientRect();
  const fallbackWidth = parsePx(computedStyles.width) || element.clientWidth;
  const fallbackHeight = parsePx(computedStyles.height) || element.clientHeight;
  const width = rect.width || fallbackWidth;
  const height = rect.height || fallbackHeight;
  const layoutStyles = copyLayoutStyles(computedStyles);
  const isLeaf = children.length === 0;
  const resolveSkeletonColor = (el) => {
    const fromEl = getComputedStyle(el).getPropertyValue("--skeleton-base-color").trim();
    if (fromEl) return fromEl;
    const fromRoot = getComputedStyle(document.documentElement).getPropertyValue("--skeleton-base-color").trim();
    return fromRoot || "#e5e7eb";
  };
  const color = resolveSkeletonColor(element);
  const isAbsolutelyPositioned = computedStyles.position === "absolute";
  const isFixedPositioned = computedStyles.position === "fixed";
  const isStickyPositioned = computedStyles.position === "sticky";
  if (isLeaf) {
    const tag = element.tagName.toUpperCase();
    const radius = computedStyles.borderRadius;
    const isCircle = (() => {
      const br = parsePx(radius);
      const minSide = Math.min(width, height);
      return br >= minSide / 2 - 1;
    })();
    const isImageLike = tag === "IMG" || tag === "SVG" || tag === "CANVAS";
    const isButtonLike = tag === "BUTTON" || element.getAttribute("role") === "button" || computedStyles.cursor === "pointer";
    const hasTextContent = (() => {
      const text = element.textContent?.trim() || "";
      return text.length > 0;
    })();
    const leafStyles = {
      ...layoutStyles,
      width: px(width),
      height: px(height),
      backgroundColor: color,
      animation: window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? void 0 : "pulse 1.6s ease-in-out infinite"
    };
    if (isCircle || isImageLike && Math.abs(width - height) < 2) {
      leafStyles.borderRadius = "50%";
    }
    if (hasTextContent && !isButtonLike && !isImageLike && height > 0 && width > 0) {
      const fontSize = parsePx(computedStyles.fontSize) || 14;
      const lineHeight = parsePx(computedStyles.lineHeight) || Math.round(fontSize * 1.4);
      const paddingX = Math.max(0, parsePx(computedStyles.paddingLeft) + parsePx(computedStyles.paddingRight));
      const contentWidth = Math.max(0, width - paddingX);
      const maxLines = Math.max(1, Math.floor(height / lineHeight));
      const lineCount = Math.min(3, maxLines);
      const seed = hashString(`${rect.left},${rect.top},${rect.width},${rect.height}`);
      const lines = Array.from({ length: lineCount }).map((_, idx) => {
        const r = seededRandom(seed + idx);
        const isLast = idx === lineCount - 1;
        const baseWidthRatio = isLast ? 0.6 + r * 0.2 : 0.85 + r * 0.1;
        const lineWidth = Math.max(24, Math.round(contentWidth * baseWidthRatio));
        return /* @__PURE__ */ jsx(
          "div",
          {
            "aria-hidden": "true",
            style: {
              width: px(lineWidth),
              height: px(Math.max(8, Math.round(fontSize * 0.7))),
              borderRadius: px(Math.min(8, Math.round(fontSize * 0.5))),
              backgroundColor: color,
              animation: window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? void 0 : "pulse 1.6s ease-in-out infinite",
              marginTop: idx === 0 ? 0 : px(Math.round(lineHeight * 0.5))
            }
          },
          idx
        );
      });
      const textContainer = {
        ...layoutStyles,
        width: px(width),
        height: px(height),
        display: "flex",
        flexDirection: "column"
      };
      if (isAbsolutelyPositioned && parentRect) {
        textContainer.position = "absolute";
        textContainer.left = px(rect.left - parentRect.left);
        textContainer.top = px(rect.top - parentRect.top);
        textContainer.zIndex = parseInt(computedStyles.zIndex || "0") || void 0;
      } else if (isFixedPositioned) {
        textContainer.position = "fixed";
        textContainer.left = px(rect.left);
        textContainer.top = px(rect.top);
        textContainer.zIndex = parseInt(computedStyles.zIndex || "0") || void 0;
      } else if (isStickyPositioned && parentRect) {
        textContainer.position = "absolute";
        textContainer.left = px(rect.left - parentRect.left);
        textContainer.top = px(rect.top - parentRect.top);
      }
      return /* @__PURE__ */ jsx("div", { "aria-hidden": "true", style: textContainer, children: lines });
    }
    if (isAbsolutelyPositioned && parentRect) {
      leafStyles.position = "absolute";
      leafStyles.left = px(rect.left - parentRect.left);
      leafStyles.top = px(rect.top - parentRect.top);
      leafStyles.zIndex = parseInt(computedStyles.zIndex || "0") || void 0;
    } else if (isFixedPositioned) {
      leafStyles.position = "fixed";
      leafStyles.left = px(rect.left);
      leafStyles.top = px(rect.top);
      leafStyles.zIndex = parseInt(computedStyles.zIndex || "0") || void 0;
    } else if (isStickyPositioned && parentRect) {
      leafStyles.position = "absolute";
      leafStyles.left = px(rect.left - parentRect.left);
      leafStyles.top = px(rect.top - parentRect.top);
    }
    return /* @__PURE__ */ jsx("div", { "aria-hidden": "true", style: leafStyles });
  }
  const containerStyles = {
    ...layoutStyles,
    width: px(width),
    // Let height be defined by children to reveal nested boxes
    // Always relative to position absolute children correctly
    position: "relative"
  };
  return /* @__PURE__ */ jsx("div", { "aria-hidden": "true", style: containerStyles, children: children.map((child, i) => /* @__PURE__ */ jsx(React.Fragment, { children: generateSkeleton(child, rect) }, i)) });
};

// src/components/SkeletonRenderer.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var SkeletonRenderer = ({
  skeleton
}) => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        marginTop: 40,
        borderTop: "1px solid #ccc",
        paddingTop: 16
      },
      children: [
        /* @__PURE__ */ jsx2(
          "h2",
          {
            style: {
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginBottom: 8
            },
            children: "Skeleton Preview:"
          }
        ),
        skeleton
      ]
    }
  );
};

// src/components/SkeletonRecorder.tsx
import { Fragment, jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var SkeletonRecorder = ({
  children,
  isLoading,
  devMode,
  onCapture
}) => {
  const targetRef = useRef(null);
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    injectPulseAnimation();
  }, []);
  const handleCapture = () => {
    if (!targetRef.current) return;
    const skeleton = generateSkeleton(targetRef.current);
    setPreview(skeleton);
    onCapture?.(skeleton);
    console.log(skeleton, "skeleton");
  };
  const renderWithRef = (hidden) => {
    if (isValidElement(children) && typeof children.type === "string") {
      const childEl = children;
      const existingStyle = childEl.props && childEl.props.style || {};
      return cloneElement(childEl, {
        ref: (node) => {
          if (node) targetRef.current = node;
        },
        style: {
          ...existingStyle,
          display: hidden ? "none" : existingStyle.display || void 0
        }
      });
    }
    return /* @__PURE__ */ jsx3(
      "div",
      {
        ref: (node) => {
          if (node) targetRef.current = node;
        },
        style: { display: hidden ? "none" : void 0 },
        children
      }
    );
  };
  return /* @__PURE__ */ jsxs2(Fragment, { children: [
    renderWithRef(Boolean(isLoading)),
    isLoading && targetRef.current && /* @__PURE__ */ jsx3("div", { "aria-busy": "true", "aria-live": "polite", children: generateSkeleton(targetRef.current) }),
    devMode && /* @__PURE__ */ jsx3(
      "button",
      {
        onClick: handleCapture,
        style: {
          position: "fixed",
          bottom: 10,
          right: 10,
          zIndex: 9999,
          padding: "8px 12px",
          background: "#000",
          color: "#fff",
          borderRadius: 6,
          cursor: "pointer"
        },
        children: "\u{1F4F8} Capture Skeleton"
      }
    ),
    preview && devMode && /* @__PURE__ */ jsx3(SkeletonRenderer, { skeleton: preview })
  ] });
};
export {
  SkeletonRecorder
};
