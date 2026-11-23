import React from "react";
import {C, FONT_DISPLAY, FONT_BODY} from "../theme";
import {Label, SketchCircle, SketchLine, SketchPath, SketchRect, Pop, ramp} from "./Sketch";
import {useCurrentFrame, useVideoConfig} from "remotion";
import {QwenGlyph} from "./Art";

/* ------------------------------------------------------------------ */
/* Inkling mark: a three-pass loop, drawn by hand                      */
/* ------------------------------------------------------------------ */

export const InkMark: React.FC<{
  x?: number;
  y?: number;
  s?: number;
  color?: string;
  bg?: string;
  start?: number;
  plain?: boolean;
  strokeWidth?: number;
}> = ({x = 0, y = 0, s = 1, color = C.green, bg = C.panel, start = -1, plain = false, strokeWidth = 4}) => {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {!plain ? (
        <SketchRect x={-58} y={-58} w={116} h={116} start={start} dur={0.4} stroke={color} fill={bg} radius={24} seed={701} strokeWidth={3.2} />
      ) : null}
      {/* three curved passes with arrowheads */}
      <SketchPath d="M -30 -18 C -12 -44 26 -40 34 -12" start={start + 0.12} dur={0.32} stroke={color} strokeWidth={strokeWidth} seed={702} />
      <SketchPath d="M 34 -12 C 44 16 16 42 -10 36" start={start + 0.3} dur={0.32} stroke={color} strokeWidth={strokeWidth} seed={703} />
      <SketchPath d="M -10 36 C -34 30 -44 2 -30 -18" start={start + 0.48} dur={0.32} stroke={color} strokeWidth={strokeWidth} seed={704} />
      {/* arrowheads */}
      <SketchPath d="M 26 -20 L 35 -10 L 23 -5" start={start + 0.58} dur={0.18} stroke={color} strokeWidth={strokeWidth} seed={705} />
      <SketchPath d="M -1 26 L -11 37 L -21 27" start={start + 0.66} dur={0.18} stroke={color} strokeWidth={strokeWidth} seed={706} />
      <SketchPath d="M -20 -26 L -31 -17 L -40 -28" start={start + 0.74} dur={0.18} stroke={color} strokeWidth={strokeWidth} seed={707} />
      <SketchCircle x={2} y={8} d={12} start={start + 0.7} dur={0.2} stroke={color} fill={color} seed={708} strokeWidth={1.4} />
    </g>
  );
};

export const QwenMark: React.FC<{
  x?: number;
  y?: number;
  s?: number;
  color?: string;
  bg?: string;
  start?: number;
  plain?: boolean;
}> = ({x = 0, y = 0, s = 1, color = C.purple, bg = C.panel, start = -1, plain = false}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = start < 0 ? 1 : ramp(frame / fps, start, 0.35);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={p}>
      {!plain ? (
        <SketchRect x={-58} y={-58} w={116} h={116} start={start} dur={0.4} stroke={color} fill={bg} radius={24} seed={711} strokeWidth={3.2} />
      ) : null}
      <g transform="scale(0.78)">
        <QwenGlyph color={color} bg={plain ? C.bg : bg} inner={color} s={1.0} />
      </g>
    </g>
  );
};

export const LabMark: React.FC<{x?: number; y?: number; s?: number; color?: string; start?: number}> = ({
  x = 0,
  y = 0,
  s = 1,
  color = C.cyan,
  start = -1,
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <SketchPath d="M -42 -44 L -20 -44 L -20 0 C -20 26 -6 40 0 40 C 6 40 20 26 20 0 L 20 -44 L 42 -44" start={start} dur={0.55} stroke={color} strokeWidth={4} seed={721} />
    <SketchPath d="M -20 -44 L -20 -22 L 20 -22 L 20 -44" start={start + 0.25} dur={0.3} stroke={color} strokeWidth={3.4} seed={722} />
    <SketchCircle x={-6} y={16} d={9} start={start + 0.5} dur={0.15} stroke={color} fill={color} seed={723} strokeWidth={1.2} />
    <SketchCircle x={8} y={-4} d={7} start={start + 0.58} dur={0.15} stroke={color} fill={color} seed={724} strokeWidth={1.2} />
  </g>
);

/* ------------------------------------------------------------------ */
/* Model card with the right mark                                       */
/* ------------------------------------------------------------------ */

export const ModelCard: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  name: string;
  sub?: string;
  start?: number;
  color?: string;
  fill?: string;
  mark?: "ink" | "qwen" | "none";
  nameSize?: number;
  subSize?: number;
  strokeWidth?: number;
  dim?: number;
  outlineAt?: number;
  seed?: number;
  badge?: string;
  badgeColor?: string;
}> = ({
  x,
  y,
  w = 420,
  h = 150,
  name,
  sub,
  start = -1,
  color = C.green,
  fill = C.panel,
  mark = "ink",
  nameSize = 52,
  subSize = 38,
  strokeWidth = 3,
  dim = 1,
  outlineAt,
  seed = 730,
  badge,
  badgeColor,
}) => {
  const left = x - w / 2;
  const iconX = left + 62;
  const textX = mark === "none" ? x : left + 118;
  return (
    <g opacity={dim}>
      <SketchRect x={left} y={y - h / 2} w={w} h={h} start={outlineAt ?? start} dur={0.4} stroke={color} fill={fill} radius={16} seed={seed} strokeWidth={strokeWidth} />
      {mark === "ink" ? <InkMark x={iconX} y={y - 4} s={0.56} color={color} bg={C.well} start={start + 0.1} /> : null}
      {mark === "qwen" ? <QwenMark x={iconX} y={y - 4} s={0.56} color={color} bg={C.well} start={start + 0.1} /> : null}
      <Label text={name} x={textX} y={sub ? y - 18 : y} size={nameSize} color={C.fg} align={mark === "none" ? "center" : "left"} font={FONT_BODY} start={start + 0.06} dur={0.22} />
      {sub ? <Label text={sub} x={textX} y={y + 34} size={subSize} color={C.soft} align={mark === "none" ? "center" : "left"} font={FONT_BODY} start={start + 0.16} dur={0.22} /> : null}
      {badge ? (
        <g>
          <SketchRect x={left + w - 152} y={y - h / 2 - 26} w={140} h={48} start={(outlineAt ?? start) + 0.15} dur={0.3} stroke={badgeColor ?? C.yellow} fill={C.well} radius={22} seed={seed + 5} strokeWidth={2.4} />
          <Label text={badge} x={left + w - 82} y={y - h / 2 - 1} size={36} color={badgeColor ?? C.yellow} start={(outlineAt ?? start) + 0.2} />
        </g>
      ) : null}
    </g>
  );
};

export const TinyModelTag: React.FC<{
  x: number;
  y: number;
  who: "ink" | "qwen";
  label?: string;
  start?: number;
  color?: string;
  size?: number;
}> = ({x, y, who, label, start = -1, color, size = 38}) => (
  <g>
    {who === "ink" ? (
      <InkMark x={x} y={y} s={0.25} color={color ?? C.green} bg={C.bg} start={start} strokeWidth={3} />
    ) : (
      <QwenMark x={x} y={y} s={0.25} color={color ?? C.purple} bg={C.bg} start={start} />
    )}
    <Label text={label ?? (who === "ink" ? "Inkling 2 Mini" : "Qwen 3.8 27B")} x={x + 24} y={y} size={size} color={color ?? (who === "ink" ? C.green : C.purple)} align="left" start={start + 0.1} />
  </g>
);
