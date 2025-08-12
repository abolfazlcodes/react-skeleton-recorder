import React from "react";

const parsePx = (value: string | null) => {
  if (!value) return 0;
  return parseFloat(value.replace("px", "")) || 0;
};

const px = (n: number) => `${Math.max(0, Math.round(n))}px`;

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

  // Positioning for absolutely positioned elements
  const isAbsolutelyPositioned = computedStyles.position === "absolute";
  const isFixedPositioned = computedStyles.position === "fixed";
  const isStickyPositioned = computedStyles.position === "sticky";

  if (isLeaf) {
    const leafStyles: React.CSSProperties = {
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
    return <div style={leafStyles} />;
  }

  const containerStyles: React.CSSProperties = {
    ...layoutStyles,
    width: px(width),
    // Let height be defined by children to reveal nested boxes
    // Always relative to position absolute children correctly
    position: "relative",
  };

  return (
    <div style={containerStyles}>
      {children.map((child, i) => (
        <React.Fragment key={i}>{generateSkeleton(child, rect)}</React.Fragment>
      ))}
    </div>
  );
};
