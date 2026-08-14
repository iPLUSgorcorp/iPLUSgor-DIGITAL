import { useEffect, useRef, useState } from "react";
import { publicAsset } from "../lib/publicAsset.js";

const videoSource = "assets/brand/iplusgor-ambient-forms.mp4";
const posterSource = "assets/brand/iplusgor-ambient-forms-poster.webp";
const staticMediaQuery = [
  "(max-width: 760px)",
  "(hover: none) and (pointer: coarse)",
  "(prefers-reduced-motion: reduce)",
  "(prefers-reduced-data: reduce)",
].join(", ");

function shouldUseStaticMedia() {
  if (typeof window === "undefined") return true;
  const savesData = Boolean(window.navigator.connection?.saveData);
  return savesData || window.matchMedia(staticMediaQuery).matches;
}

export function useStaticMediaMode() {
  const [staticMedia, setStaticMedia] = useState(shouldUseStaticMedia);

  useEffect(() => {
    const query = window.matchMedia(staticMediaQuery);
    const connection = window.navigator.connection;
    const update = () => setStaticMedia(shouldUseStaticMedia());

    update();
    query.addEventListener?.("change", update);
    connection?.addEventListener?.("change", update);

    return () => {
      query.removeEventListener?.("change", update);
      connection?.removeEventListener?.("change", update);
    };
  }, []);

  return staticMedia;
}

export function AmbientBrandVideo({
  className = "",
  priority = false,
  hideWhenStatic = false,
}) {
  const videoRef = useRef(null);
  const staticMedia = useStaticMediaMode();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || staticMedia) return undefined;

    if (!("IntersectionObserver" in window)) {
      video.play().catch(() => {});
      return () => video.pause();
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !document.hidden) video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.02 });

    const updateVisibility = () => {
      if (document.hidden) video.pause();
    };

    observer.observe(video);
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
      video.pause();
    };
  }, [staticMedia]);

  if (staticMedia && hideWhenStatic) return null;

  return (
    <div className={`ambient-brand-video ${className}`.trim()} aria-hidden="true">
      {staticMedia ? (
        <img
          src={publicAsset(posterSource)}
          alt=""
          width="1280"
          height="720"
          loading="eager"
          decoding="async"
          fetchPriority={priority ? "high" : "low"}
          draggable="false"
        />
      ) : (
        <video
          ref={videoRef}
          src={publicAsset(videoSource)}
          poster={publicAsset(posterSource)}
          muted
          loop
          playsInline
          preload={priority ? "metadata" : "none"}
          disablePictureInPicture
          tabIndex="-1"
        />
      )}
    </div>
  );
}
