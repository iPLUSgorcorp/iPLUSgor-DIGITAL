import { useEffect, useRef, useState } from "react";
import { publicAsset } from "../lib/publicAsset.js";

const videoSource = "assets/brand/iplusgor-ambient-forms.mp4";
const posterSource = "assets/brand/iplusgor-ambient-forms-poster.webp";

export function AmbientBrandVideo({ className = "", priority = false }) {
  const videoRef = useRef(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion || !("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.02 });
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <div className={`ambient-brand-video ${className}`.trim()} aria-hidden="true">
      {reduceMotion ? (
        <img
          src={publicAsset(posterSource)}
          alt=""
          width="1280"
          height="720"
          draggable="false"
        />
      ) : (
        <video
          ref={videoRef}
          src={publicAsset(videoSource)}
          poster={publicAsset(posterSource)}
          autoPlay
          muted
          loop
          playsInline
          preload={priority ? "auto" : "metadata"}
          disablePictureInPicture
          tabIndex="-1"
        />
      )}
    </div>
  );
}
