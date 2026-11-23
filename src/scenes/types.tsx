import React from "react";
import {useCurrentFrame, useVideoConfig} from "remotion";

export type SceneProps = {t0: number};

/** Scene-local seconds plus an absolute-time -> local-time converter. */
export const useClock = (t0: number) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  return {
    t,
    b: (abs: number) => abs - t0,
    abs: t + t0,
  };
};

export const SceneGroup: React.FC<{opacity: number; children: React.ReactNode}> = ({opacity, children}) => (
  <g opacity={opacity}>{children}</g>
);
