import dynamic from "next/dynamic";

export const CanvasArea = dynamic(
  () => import("./CanvasAreaRaw").then((mod) => mod.CanvasAreaRaw),
  { ssr: false }
);
