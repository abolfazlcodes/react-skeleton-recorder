export const injectPulseAnimation = () => {
    if (typeof document === "undefined")
        return;
    if (!document.getElementById("pulse-animation-style")) {
        const css = `
      :root {
        --skeleton-base-color: #e5e7eb;
      }
      @media (prefers-color-scheme: dark) {
        :root {
          --skeleton-base-color: rgba(255, 255, 255, 0.14);
        }
      }
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
    try {
        const computed = getComputedStyle(document.body);
        const bg = computed.backgroundColor || "rgb(255, 255, 255)";
        const toRgb = (color) => {
            const m = color.match(/rgba?\(([^)]+)\)/);
            if (!m)
                return [255, 255, 255];
            const parts = m[1].split(",").map((v) => parseFloat(v.trim()));
            return [parts[0] || 255, parts[1] || 255, parts[2] || 255];
        };
        const [r, g, b] = toRgb(bg);
        const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        const base = luminance < 0.5 ? "rgba(255, 255, 255, 0.14)" : "#e5e7eb";
        document.documentElement.style.setProperty("--skeleton-base-color", base);
    }
    catch {
        // best-effort theme detection only
    }
};
