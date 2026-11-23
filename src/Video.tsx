import React from "react";
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame} from "remotion";
import {loadFont} from "@remotion/fonts";
import {C, FPS} from "./theme";
import {SCENES, TOTAL_DURATION} from "./scenes";
import {clamp} from "./timing";

loadFont({
  family: "Caveat",
  url: staticFile("fonts/Caveat.ttf"),
  weight: "400 700",
  format: "truetype",
}).catch((e) => console.error("Caveat font failed", e));

loadFont({
  family: "Patrick Hand",
  url: staticFile("fonts/PatrickHand.ttf"),
  weight: "400",
  format: "truetype",
}).catch((e) => console.error("Patrick Hand font failed", e));

const XFADE = 5;

const SceneFade: React.FC<{duration: number; children: React.ReactNode; first?: boolean; last?: boolean}> = ({
  duration,
  children,
  first,
  last,
}) => {
  const f = useCurrentFrame();
  const fin = first ? 1 : clamp(f / XFADE, 0, 1);
  const fout = last ? 1 : clamp((duration - f) / XFADE, 0, 1);
  return (
    <AbsoluteFill style={{opacity: Math.min(fin, fout)}}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid meet"
        style={{position: "absolute", inset: 0}}
      >
        {children}
      </svg>
    </AbsoluteFill>
  );
};

const FinalFade: React.FC = () => {
  const f = useCurrentFrame();
  const total = Math.ceil(TOTAL_DURATION * FPS);
  const o = clamp((f - (total - 36)) / 32, 0, 1);
  return <AbsoluteFill style={{backgroundColor: C.bg, opacity: o}} />;
};

export const InklingVideo: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: C.bg}}>
    <Audio src={staticFile("audio.wav")} />
    {SCENES.map((s, i) => {
      const from = Math.round(s.start * FPS);
      const next = i === SCENES.length - 1 ? Math.ceil(TOTAL_DURATION * FPS) : Math.round(SCENES[i + 1].start * FPS);
      const dur = Math.max(1, next - from + (i === SCENES.length - 1 ? 0 : XFADE));
      return (
        <Sequence key={s.id} from={from} durationInFrames={dur} name={`${s.id} ${s.title}`}>
          <SceneFade duration={dur} first={i === 0} last={i === SCENES.length - 1}>
            <s.Component t0={s.start} />
          </SceneFade>
        </Sequence>
      );
    })}
    <FinalFade />
  </AbsoluteFill>
);
