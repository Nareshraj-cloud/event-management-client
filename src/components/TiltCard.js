import { useRef } from "react";

/* Wraps its children in a card that tilts toward the mouse cursor in real
   3D space (rotateX/rotateY based on pointer position), with a soft
   spring-back when the mouse leaves. Pure JS + CSS, no libraries. */

export default function TiltCard({ className = "", children }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;  // 0 -> 1
    const py = (e.clientY - rect.top) / rect.height;   // 0 -> 1
    const rotateY = (px - 0.5) * 16;   // left/right tilt
    const rotateX = (0.5 - py) * 16;   // up/down tilt
    el.style.transition = "transform 0.05s linear";
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.5s cubic-bezier(0.2, 0.8, 0.3, 1)";
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
