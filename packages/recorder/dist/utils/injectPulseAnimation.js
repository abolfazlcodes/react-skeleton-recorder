export const injectPulseAnimation = () => {
    if (typeof document === "undefined")
        return;
    if (document.getElementById("pulse-animation-style"))
        return;
    const pulseAnimation = `
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
  `;
    const style = document.createElement("style");
    style.id = "pulse-animation-style";
    style.innerHTML = pulseAnimation;
    document.head.appendChild(style);
};
