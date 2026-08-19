import { useEffect } from "react";
import { publicAsset } from "../lib/publicAsset.js";

const routeAssets = [
  "assets/brand/iplusgor-symbol-signal.png",
  "assets/brand/iplusgor-digital-poster.webp",
  "assets/reference/catalogue-model-a.webp",
  "assets/reference/catalogue-model-b.webp",
  "assets/reference/catalogue-model-c.webp",
];

function loadImage(path, isCancelled) {
  return new Promise((resolve) => {
    if (isCancelled()) {
      resolve();
      return;
    }

    const image = new Image();
    let timeout;
    const finish = () => {
      window.clearTimeout(timeout);
      image.onload = null;
      image.onerror = null;
      resolve();
    };

    image.decoding = "async";
    image.fetchPriority = "low";
    image.onload = () => image.decode?.().catch(() => {}).finally(finish) || finish();
    image.onerror = finish;
    timeout = window.setTimeout(finish, 10_000);
    image.src = publicAsset(path);
  });
}

async function getConceptAssets() {
  try {
    const response = await fetch(publicAsset("data/work-concepts.json"), { cache: "default" });
    if (!response.ok) return [];
    const concepts = await response.json();
    return Array.isArray(concepts)
      ? concepts.flatMap((concept) => concept.images || []).map((image) => image.src).filter(Boolean)
      : [];
  } catch {
    return [];
  }
}

export function ProgressiveAssetWarmup() {
  useEffect(() => {
    const connection = window.navigator.connection;
    const reducedData = window.matchMedia("(prefers-reduced-data: reduce)").matches;
    if (connection?.saveData || reducedData) return undefined;

    let cancelled = false;
    let idleId;
    let timerId;
    const isCancelled = () => cancelled;

    const warm = async () => {
      const conceptAssets = await getConceptAssets();
      const assets = [...new Set([...routeAssets, ...conceptAssets])];
      for (const asset of assets) {
        if (cancelled) break;
        await loadImage(asset, isCancelled);
      }
    };

    const schedule = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(warm, { timeout: 1_500 });
      } else {
        timerId = window.setTimeout(warm, 350);
      }
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, []);

  return null;
}
