export const injectPulseAnimation = () => {
    if (typeof document === "undefined")
        return;
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
