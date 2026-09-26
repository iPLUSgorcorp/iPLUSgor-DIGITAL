import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export function MagneticLink({ className = "button", onPointerEnter, onPointerMove, onPointerLeave, ...props }) {
  const linkRef = useRef(null);
  const boundsRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => () => window.cancelAnimationFrame(frameRef.current), []);

  const enter = (event) => {
    onPointerEnter?.(event);
    if (event.pointerType === "mouse") boundsRef.current = event.currentTarget.getBoundingClientRect();
  };

  const move = (event) => {
    onPointerMove?.(event);
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const node = linkRef.current;
    if (!node) return;
    const bounds = boundsRef.current || node.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 9;
    window.cancelAnimationFrame(frameRef.current);
    frameRef.current = window.requestAnimationFrame(() => {
      node.style.setProperty("--magnet-x", `${x.toFixed(2)}px`);
      node.style.setProperty("--magnet-y", `${y.toFixed(2)}px`);
    });
  };

  const leave = (event) => {
    onPointerLeave?.(event);
    boundsRef.current = null;
    window.cancelAnimationFrame(frameRef.current);
    linkRef.current?.style.setProperty("--magnet-x", "0px");
    linkRef.current?.style.setProperty("--magnet-y", "0px");
  };

  return <Link {...props} ref={linkRef} className={`${className} magnetic-link`} onPointerEnter={enter} onPointerMove={move} onPointerLeave={leave} />;
}
