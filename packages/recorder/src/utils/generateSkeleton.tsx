import React from "react";

const parsePx = (value: string | null) => {
  if (!value) return 0;
  return parseFloat(value.replace("px", "")) || 0;
};

const px = (n: number) => `${Math.max(0, Math.round(n))}px`;

const seededRandom = (seed: number) => {
  let t = seed + 0x6d2b79f5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const hashString = (input: string) => {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return h >>> 0;
};

const shouldSkip = (tagName: string) => {
  const t = tagName.toUpperCase();
  return (
    t === "SCRIPT" ||
    t === "STYLE" ||
    t === "LINK" ||
    t === "META" ||
    t === "NOSCRIPT" ||
    t === "BR"
  );
};

const copyLayoutStyles = (computed: CSSStyleDeclaration): React.CSSProperties => {
  let display = computed.display;
  const isFlex = display.includes("flex");
  const isGrid = display.includes("grid");

  const base: React.CSSProperties = {
    // Ensure width/height can apply for inline elements
    display: display === "inline" ? "inline-block" : display,
    boxSizing: "border-box",
    padding: computed.padding,
    margin: computed.margin,
    borderRadius: computed.borderRadius,
  };

  if (isFlex) {
    base.flexDirection = computed.flexDirection as React.CSSProperties["flexDirection"];
    base.justifyContent = computed.justifyContent as React.CSSProperties["justifyContent"];
    base.alignItems = computed.alignItems as React.CSSProperties["alignItems"];
    base.flexWrap = computed.flexWrap as React.CSSProperties["flexWrap"];
    // gap properties
    (base as any).gap = (computed as any).gap || undefined;
    (base as any).rowGap = (computed as any).rowGap || undefined;
    (base as any).columnGap = (computed as any).columnGap || undefined;
  }

  if (isGrid) {
    base.gridTemplateColumns = computed.gridTemplateColumns as any;
    base.gridTemplateRows = computed.gridTemplateRows as any;
    base.gridAutoFlow = computed.gridAutoFlow as any;
    (base as any).gap = (computed as any).gap || undefined;
    (base as any).rowGap = (computed as any).rowGap || undefined;
    (base as any).columnGap = (computed as any).columnGap || undefined;
    base.justifyItems = computed.justifyItems as any;
    base.alignItems = computed.alignItems as any;
    base.justifyContent = computed.justifyContent as any;
    base.alignContent = computed.alignContent as any;
  }

  return base;
};

export const generateSkeleton = (
  element: HTMLElement,
  parentRect?: DOMRect
): React.ReactNode => {
  if (shouldSkip(element.tagName)) return null;

  const children = Array.from(element.children) as HTMLElement[];
  const computedStyles = getComputedStyle(element);
  const rect = element.getBoundingClientRect();

  // Fallbacks for cases where bounding rect is 0
  const fallbackWidth = parsePx(computedStyles.width) || element.clientWidth;
  const fallbackHeight = parsePx(computedStyles.height) || element.clientHeight;

  const width = rect.width || fallbackWidth;
  const height = rect.height || fallbackHeight;

  const layoutStyles = copyLayoutStyles(computedStyles);
  const isLeaf = children.length === 0;

  const resolveSkeletonColor = (el: Element): string => {
    const fromEl = getComputedStyle(el).getPropertyValue("--skeleton-base-color").trim();
    if (fromEl) return fromEl;
    const fromRoot = getComputedStyle(document.documentElement)
      .getPropertyValue("--skeleton-base-color")
      .trim();
    return fromRoot || "#e5e7eb";
  };

  const color = resolveSkeletonColor(element);

  // Positioning for absolutely positioned elements
  const isAbsolutelyPositioned = computedStyles.position === "absolute";
  const isFixedPositioned = computedStyles.position === "fixed";
  const isStickyPositioned = computedStyles.position === "sticky";

  // Text/media heuristics for leafs
  if (isLeaf) {
    const tag = element.tagName.toUpperCase();
    const radius = computedStyles.borderRadius;
    const isCircle = (() => {
      const br = parsePx(radius);
      const minSide = Math.min(width, height);
      return br >= minSide / 2 - 1; // approx circle
    })();
    const isImageLike = tag === "IMG" || tag === "SVG" || tag === "CANVAS";
    const isButtonLike =
      tag === "BUTTON" ||
      element.getAttribute("role") === "button" ||
      computedStyles.cursor === "pointer";
    const hasTextContent = (() => {
      const text = element.textContent?.trim() || "";
      return text.length > 0;
    })();

    const leafStyles: React.CSSProperties = {
      ...layoutStyles,
      width: px(width),
      height: px(height),
      backgroundColor: color,
      animation:
        window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? undefined
          : "pulse 1.6s ease-in-out infinite",
    };

    // Avatar/image shapes
    if (isCircle || (isImageLike && Math.abs(width - height) < 2)) {
      leafStyles.borderRadius = "50%";
    }

    // For text blocks, render ragged lines inside
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
        return (
          <div
            key={idx}
            aria-hidden="true"
            style={{
              width: px(lineWidth),
              height: px(Math.max(8, Math.round(fontSize * 0.7))),
              borderRadius: px(Math.min(8, Math.round(fontSize * 0.5))),
              backgroundColor: color,
              animation:
                window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? undefined
                  : "pulse 1.6s ease-in-out infinite",
              marginTop: idx === 0 ? 0 : px(Math.round(lineHeight * 0.5)),
            }}
          />
        );
      });

      const textContainer: React.CSSProperties = {
        ...layoutStyles,
        width: px(width),
        height: px(height),
        display: "flex",
        flexDirection: "column",
      };

      if (isAbsolutelyPositioned && parentRect) {
        textContainer.position = "absolute";
        textContainer.left = px(rect.left - parentRect.left);
        textContainer.top = px(rect.top - parentRect.top);
        textContainer.zIndex = parseInt(computedStyles.zIndex || "0") || undefined;
      } else if (isFixedPositioned) {
        textContainer.position = "fixed";
        textContainer.left = px(rect.left);
        textContainer.top = px(rect.top);
        textContainer.zIndex = parseInt(computedStyles.zIndex || "0") || undefined;
      } else if (isStickyPositioned && parentRect) {
        textContainer.position = "absolute";
        textContainer.left = px(rect.left - parentRect.left);
        textContainer.top = px(rect.top - parentRect.top);
      }

      return <div aria-hidden="true" style={textContainer}>{lines}</div>;
    }

    if (isAbsolutelyPositioned && parentRect) {
      leafStyles.position = "absolute";
      leafStyles.left = px(rect.left - parentRect.left);
      leafStyles.top = px(rect.top - parentRect.top);
      leafStyles.zIndex = parseInt(computedStyles.zIndex || "0") || undefined;
    } else if (isFixedPositioned) {
      // Approximate fixed as absolute relative to viewport
      leafStyles.position = "fixed";
      leafStyles.left = px(rect.left);
      leafStyles.top = px(rect.top);
      leafStyles.zIndex = parseInt(computedStyles.zIndex || "0") || undefined;
    } else if (isStickyPositioned && parentRect) {
      // Treat sticky like absolute at current position
      leafStyles.position = "absolute";
      leafStyles.left = px(rect.left - parentRect.left);
      leafStyles.top = px(rect.top - parentRect.top);
    }
    return <div aria-hidden="true" style={leafStyles} />;
  }

  const containerStyles: React.CSSProperties = {
    ...layoutStyles,
    width: px(width),
    // Let height be defined by children to reveal nested boxes
    // Always relative to position absolute children correctly
    position: "relative",
  };

  return (
    <div aria-hidden="true" style={containerStyles}>
      {children.map((child, i) => (
        <React.Fragment key={i}>{generateSkeleton(child, rect)}</React.Fragment>
      ))}
    </div>
  );
};
