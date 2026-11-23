import React from "react";
import {interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {C, FONT_BODY, FONT_DISPLAY} from "../theme";
import {
  Arrow,
  Label,
  Scribble,
  SketchArc,
  SketchCircle,
  SketchEllipse,
  SketchHatch,
  SketchLine,
  SketchPath,
  SketchPolygon,
  SketchRect,
  clamp01,
  easeOut,
  ramp,
} from "./Sketch";

export const base = (v: number) => v;

/* ------------------------------------------------------------------ */
/* people                                                              */
/* ------------------------------------------------------------------ */

type Pose = "stand" | "shrug" | "point" | "cheer" | "sit" | "shock" | "think";

export const Person: React.FC<{
  x: number;
  y: number;
  s?: number;
  start?: number;
  color?: string;
  fill?: string;
  pose?: Pose;
  mood?: "neutral" | "happy" | "sad" | "shock" | "smug";
  hair?: string;
  accent?: string;
  glasses?: boolean;
  face?: boolean;
  seed?: number;
  flip?: boolean;
}> = ({
  x,
  y,
  s = 1,
  start = -1,
  color = C.fg,
  fill = C.panel,
  pose = "stand",
  mood = "neutral",
  hair = C.line,
  accent = C.cyan,
  glasses = false,
  face = true,
  seed = 900,
  flip = false,
}) => {
  const headY = -196;
  const headR = 29;
  const shoulderY = -154;
  const hipY = -76;
  const armL = {
    stand: {el: [-44, -116], hand: [-46, -80]},
    shrug: {el: [-52, -150], hand: [-64, -190]},
    point: {el: [-40, -120], hand: [-40, -86]},
    cheer: {el: [-52, -174], hand: [-62, -216]},
    sit: {el: [-36, -116], hand: [-30, -84]},
    shock: {el: [-56, -158], hand: [-70, -200]},
    think: {el: [-34, -128], hand: [-18, -206]},
  }[pose];
  const armR = {
    stand: {el: [44, -116], hand: [46, -80]},
    shrug: {el: [52, -150], hand: [64, -190]},
    point: {el: [62, -132], hand: [102, -142]},
    cheer: {el: [52, -174], hand: [62, -216]},
    sit: {el: [36, -116], hand: [34, -84]},
    shock: {el: [56, -158], hand: [70, -200]},
    think: {el: [34, -128], hand: [42, -196]},
  }[pose];
  const legL = pose === "sit" ? {knee: [-26, -40], foot: [-30, -6]} : {knee: [-18, -38], foot: [-26, -4]};
  const legR = pose === "sit" ? {knee: [28, -40], foot: [32, -6]} : {knee: [18, -38], foot: [26, -4]};
  const mouth =
    mood === "happy"
      ? `M -9 ${headY + 11} Q 0 ${headY + 21} 9 ${headY + 11}`
      : mood === "sad"
        ? `M -9 ${headY + 18} Q 0 ${headY + 9} 9 ${headY + 18}`
        : mood === "shock"
          ? `M 0 ${headY + 13} m -5 0 a 5 6 0 1 0 10 0 a 5 6 0 1 0 -10 0`
          : mood === "smug"
            ? `M -7 ${headY + 13} Q 2 ${headY + 18} 10 ${headY + 12}`
            : `M -8 ${headY + 14} L 8 ${headY + 14}`;
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>
      <SketchLine x1={-12} y1={hipY} x2={legL.knee[0]} y2={legL.knee[1]} start={start + 0.36} dur={0.24} stroke={color} strokeWidth={5} seed={seed + 1} />
      <SketchLine x1={legL.knee[0]} y1={legL.knee[1]} x2={legL.foot[0]} y2={legL.foot[1]} start={start + 0.44} dur={0.24} stroke={color} strokeWidth={5} seed={seed + 2} />
      <SketchLine x1={12} y1={hipY} x2={legR.knee[0]} y2={legR.knee[1]} start={start + 0.39} dur={0.24} stroke={color} strokeWidth={5} seed={seed + 3} />
      <SketchLine x1={legR.knee[0]} y1={legR.knee[1]} x2={legR.foot[0]} y2={legR.foot[1]} start={start + 0.47} dur={0.24} stroke={color} strokeWidth={5} seed={seed + 4} />
      <SketchPath d={`M ${legL.foot[0] - 12} ${legL.foot[1] + 1} L ${legL.foot[0] + 8} ${legL.foot[1] + 1} Q ${legL.foot[0] + 14} ${legL.foot[1] + 1} ${legL.foot[0] + 12} ${legL.foot[1] - 7} L ${legL.foot[0] - 8} ${legL.foot[1] - 7} Z`} start={start + 0.54} dur={0.18} stroke={color} fill={C.panel} seed={seed + 5} strokeWidth={2.6} />
      <SketchPath d={`M ${legR.foot[0] - 12} ${legR.foot[1] + 1} L ${legR.foot[0] + 8} ${legR.foot[1] + 1} Q ${legR.foot[0] + 14} ${legR.foot[1] + 1} ${legR.foot[0] + 12} ${legR.foot[1] - 7} L ${legR.foot[0] - 8} ${legR.foot[1] - 7} Z`} start={start + 0.56} dur={0.18} stroke={color} fill={C.panel} seed={seed + 6} strokeWidth={2.6} />
      <SketchPath
        d={`M -28 ${shoulderY + 6} C -36 -134 -30 -100 -24 ${hipY} L 24 ${hipY} C 30 -100 36 -134 28 ${shoulderY + 6} C 16 ${shoulderY - 6} -16 ${shoulderY - 6} -28 ${shoulderY + 6} Z`}
        start={start + 0.18}
        dur={0.4}
        stroke={color}
        strokeWidth={3.6}
        fill={fill}
        fillStart={start + 0.32}
        seed={seed + 7}
      />
      <SketchPath d={`M -13 ${shoulderY + 1} L 0 ${shoulderY + 14} L 13 ${shoulderY + 1}`} start={start + 0.34} dur={0.2} stroke={accent} strokeWidth={4} seed={seed + 8} />
      <SketchLine x1={-23} y1={hipY - 8} x2={23} y2={hipY - 8} start={start + 0.4} dur={0.22} stroke={C.soft} strokeWidth={3} seed={seed + 9} opacity={0.55} />
      <SketchLine x1={-26} y1={shoulderY + 8} x2={armL.el[0]} y2={armL.el[1]} start={start + 0.28} dur={0.22} stroke={color} strokeWidth={4.4} seed={seed + 11} />
      <SketchLine x1={armL.el[0]} y1={armL.el[1]} x2={armL.hand[0]} y2={armL.hand[1]} start={start + 0.4} dur={0.22} stroke={color} strokeWidth={4.4} seed={seed + 12} />
      <SketchLine x1={26} y1={shoulderY + 8} x2={armR.el[0]} y2={armR.el[1]} start={start + 0.3} dur={0.22} stroke={color} strokeWidth={4.4} seed={seed + 13} />
      <SketchLine x1={armR.el[0]} y1={armR.el[1]} x2={armR.hand[0]} y2={armR.hand[1]} start={start + 0.42} dur={0.22} stroke={color} strokeWidth={4.4} seed={seed + 14} />
      <SketchCircle x={armL.hand[0]} y={armL.hand[1]} d={10} start={start + 0.5} dur={0.15} stroke={color} fill={C.bg} seed={seed + 15} strokeWidth={2.2} />
      <SketchCircle x={armR.hand[0]} y={armR.hand[1]} d={10} start={start + 0.52} dur={0.15} stroke={color} fill={C.bg} seed={seed + 16} strokeWidth={2.2} />
      <SketchLine x1={-8} y1={shoulderY - 2} x2={-8} y2={shoulderY - 12} start={start + 0.2} dur={0.15} stroke={color} strokeWidth={4} seed={seed + 18} />
      <SketchLine x1={8} y1={shoulderY - 2} x2={8} y2={shoulderY - 12} start={start + 0.22} dur={0.15} stroke={color} strokeWidth={4} seed={seed + 19} />
      <SketchCircle x={0} y={headY} d={headR * 2} start={start + 0.1} dur={0.4} stroke={color} fill={C.bg} seed={seed + 20} strokeWidth={3.6} />
      <SketchPath d={`M -27 ${headY - 9} C -30 ${headY - 42} -10 ${headY - 52} 0 ${headY - 53} C 12 ${headY - 52} 30 ${headY - 42} 27 ${headY - 9} C 20 ${headY - 26} 12 ${headY - 32} 0 ${headY - 32} C -12 ${headY - 32} -20 ${headY - 26} -27 ${headY - 9} Z`} start={start + 0.25} dur={0.35} stroke={hair} fill={hair} fillStart={start + 0.4} seed={seed + 23} strokeWidth={2.4} opacity={0.9} />
      {face ? (
        <g>
          <SketchLine x1={-17} y1={headY - 13} x2={-5} y2={headY - 14} start={start + 0.42} dur={0.15} stroke={color} strokeWidth={2.6} seed={seed + 24} />
          <SketchLine x1={5} y1={headY - 14} x2={17} y2={headY - 13} start={start + 0.44} dur={0.15} stroke={color} strokeWidth={2.6} seed={seed + 25} />
          <SketchCircle x={-10} y={headY - 2} d={6} start={start + 0.46} dur={0.1} stroke={color} fill={color} seed={seed + 26} strokeWidth={1} />
          <SketchCircle x={10} y={headY - 2} d={6} start={start + 0.48} dur={0.1} stroke={color} fill={color} seed={seed + 27} strokeWidth={1} />
          <SketchPath d={mouth} start={start + 0.52} dur={0.22} stroke={color} strokeWidth={3} seed={seed + 29} />
          {glasses ? (
            <g>
              <SketchCircle x={-10} y={headY - 2} d={24} start={start + 0.48} dur={0.2} stroke={C.cyan} seed={seed + 30} strokeWidth={2} />
              <SketchCircle x={10} y={headY - 2} d={24} start={start + 0.5} dur={0.2} stroke={C.cyan} seed={seed + 31} strokeWidth={2} />
              <SketchLine x1={-1} y1={headY - 2} x2={1} y2={headY - 2} start={start + 0.53} dur={0.1} stroke={C.cyan} strokeWidth={2} seed={seed + 32} />
            </g>
          ) : null}
        </g>
      ) : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* brand + model cards                                                 */
/* ------------------------------------------------------------------ */

const QWEN_OUTER = "M174.82 108.75L155.38 75L165.64 57.75C166.46 56.31 166.46 54.53 165.64 53.09L155.38 35.84C154.86 34.91 153.87 34.33 152.78 34.33H114.88L106.14 19.03C105.62 18.1 104.63 17.52 103.54 17.52H83.3C82.21 17.52 81.22 18.1 80.7 19.03L61.26 52.77H41.02C39.93 52.77 38.94 53.35 38.42 54.28L28.16 71.53C27.34 72.97 27.34 74.75 28.16 76.19L45.52 107.5L36.78 122.8C35.96 124.24 35.96 126.02 36.78 127.46L47.04 144.71C47.56 145.64 48.55 146.22 49.64 146.22H87.54L96.28 161.52C96.8 162.45 97.79 163.03 98.88 163.03H119.12C120.21 163.03 121.2 162.45 121.72 161.52L141.16 127.78H158.52C159.61 127.78 160.6 127.2 161.12 126.27L171.38 109.02C172.2 107.58 172.2 105.8 171.38 104.36L174.82 108.75Z";
const QWEN_INNER = "M119.12 163.03H98.88L87.54 144.71H49.64L61.26 126.39H80.7L38.42 55.29H61.26L83.3 19.03L93.56 37.35L83.3 55.29H161.58L151.32 72.54L170.76 106.28H151.32L141.16 88.34L101.18 163.03H119.12Z";
const QWEN_GEM = "M127.86 79.83H76.14L101.18 122.11L127.86 79.83Z";

export const QwenGlyph: React.FC<{
  x?: number;
  y?: number;
  s?: number;
  color?: string;
  bg?: string;
  inner?: string;
  opacity?: number;
}> = ({x = 0, y = 0, s = 1, color = C.purple, bg = C.panel, inner, opacity = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
    <svg x={-60} y={-60} width={120} height={120} viewBox="0 0 200 200">
      <path d={QWEN_OUTER} fill={color} />
      <path d={QWEN_INNER} fill={bg} />
      <path d={QWEN_GEM} fill={inner ?? color} />
    </svg>
  </g>
);

export const QMark: React.FC<{
  x: number;
  y: number;
  s?: number;
  start?: number;
  color?: string;
  fill?: string;
  label?: string;
  labelColor?: string;
  labelSize?: number;
}> = ({x, y, s = 1, start = -1, color = C.purple, fill = C.panel, label = "Qwen", labelColor = C.fg, labelSize = 44}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = start < 0 ? 1 : ramp(frame / fps, start, 0.4);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <SketchRect x={-52} y={-52} w={104} h={104} start={start} dur={0.45} stroke={color} fill={fill} radius={22} seed={811} strokeWidth={3.6} />
      <g opacity={p}>
        <QwenGlyph s={0.74} color={color} bg={fill} inner={color} />
      </g>
      {label ? <Label text={label} x={0} y={86} size={labelSize} color={labelColor} start={start + 0.4} /> : null}
    </g>
  );
};

export const Ticker: React.FC<{
  x: number;
  y: number;
  from?: number;
  to: number;
  start: number;
  dur?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  size?: number;
  color?: string;
  font?: "Caveat" | "Patrick Hand";
  align?: "center" | "left" | "right";
}> = ({x, y, from = 0, to, start, dur = 0.8, decimals = 0, prefix = "", suffix = "", size = 96, color = C.fg, font = "Caveat", align = "center"}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = easeOut(ramp(frame / fps, start, dur));
  const v = from + (to - from) * p;
  return <Label text={`${prefix}${v.toFixed(decimals)}${suffix}`} x={x} y={y} size={size} color={color} font={font} align={align} start={start} dur={0.18} />;
};

export const ModelChip: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  name: string;
  sub?: string;
  start?: number;
  color?: string;
  fill?: string;
  strokeWidth?: number;
  dim?: number;
  lock?: boolean;
  icon?: boolean;
  radius?: number;
  seed?: number;
  nameSize?: number;
  subSize?: number;
  align?: "center" | "left";
  outlineAt?: number;
}> = ({
  x,
  y,
  w = 330,
  h = 118,
  name,
  sub,
  start = -1,
  color = C.cyan,
  fill = C.panel,
  strokeWidth = 3,
  dim = 1,
  lock = false,
  icon = false,
  radius = 14,
  seed = 820,
  nameSize = 48,
  subSize = 36,
  align = "center",
  outlineAt,
}) => {
  const textX = icon ? x + 44 : align === "left" ? x - w / 2 + 24 : x;
  return (
  <g opacity={dim}>
    <SketchRect x={x - w / 2} y={y - h / 2} w={w} h={h} start={outlineAt ?? start} dur={0.35} stroke={color} fill={fill} radius={radius} seed={seed} strokeWidth={strokeWidth} />
    {icon ? <QMark x={x - w / 2 + 54} y={y} s={0.5} start={start + 0.18} color={color} fill={C.well} label="" /> : null}
    <Label text={name} x={textX} y={sub ? y - 14 : y} size={nameSize} color={C.fg} align={align === "left" ? "left" : "center"} start={start + 0.05} dur={0.2} />
    {sub ? <Label text={sub} x={align === "left" ? x - w / 2 + (icon ? 100 : 24) : textX} y={y + 32} size={subSize} color={C.soft} align={align === "left" ? "left" : "center"} start={start + 0.12} dur={0.2} /> : null}
    {lock ? <Lock x={x + w / 2 - 34} y={y - h / 2 + 36} s={0.42} start={start + 0.45} color={C.yellow} /> : null}
  </g>
  );
};

export const Lock: React.FC<{x: number; y: number; s?: number; start?: number; color?: string; open?: boolean; fill?: string}> = ({
  x,
  y,
  s = 1,
  start = -1,
  color = C.yellow,
  open = false,
  fill = C.well,
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <SketchRect x={-30} y={-4} w={60} h={46} start={start} dur={0.4} stroke={color} fill={fill} radius={8} seed={831} strokeWidth={3.4} />
    <SketchPath d={open ? "M -14 -4 L -14 -28 C -14 -44 16 -44 16 -28" : "M -14 -4 L -14 -26 C -14 -48 14 -48 14 -26 L 14 -4"} start={start + 0.2} dur={0.4} stroke={color} strokeWidth={4.4} seed={832} fill="none" />
    <SketchCircle x={0} y={16} d={10} start={start + 0.45} dur={0.15} stroke={color} fill={color} seed={833} strokeWidth={1.4} />
    <SketchLine x1={0} y1={20} x2={0} y2={28} start={start + 0.5} dur={0.15} stroke={color} strokeWidth={3.4} seed={834} />
  </g>
);

export const OpenLock: React.FC<{x: number; y: number; s?: number; start?: number; color?: string}> = (p) => <Lock {...p} open color={p.color ?? C.green} />;

/* ------------------------------------------------------------------ */
/* data + weights                                                      */
/* ------------------------------------------------------------------ */

export const WeightStack: React.FC<{
  x: number;
  y: number;
  s?: number;
  start?: number;
  label?: string;
  color?: string;
  count?: number;
}> = ({x, y, s = 1, start = -1, label = "4.9 TB", color = C.cyan, count = 3}) => {
  const slabs = Array.from({length: count});
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {slabs.map((_, i) => (
        <g key={i}>
          <SketchPolygon
            points={[
              [-110, 40 + i * -26],
              [0, 70 + i * -26],
              [130, 34 + i * -26],
              [20, 4 + i * -26],
            ]}
            start={start + i * 0.1}
            dur={0.4}
            stroke={i === count - 1 ? color : C.soft}
            fill={i === count - 1 ? C.line : C.panel}
            fillStart={start + 0.2 + i * 0.1}
            seed={850 + i}
            strokeWidth={i === count - 1 ? 3.4 : 2.6}
          />
          <SketchLine x1={20} y1={4 + i * -26} x2={20} y2={-18 + i * -26} start={start + 0.2 + i * 0.1} dur={0.2} stroke={i === count - 1 ? color : C.soft} strokeWidth={2.2} seed={855 + i} opacity={0.85} />
          <SketchLine x1={130} y1={34 + i * -26} x2={130} y2={12 + i * -26} start={start + 0.22 + i * 0.1} dur={0.2} stroke={i === count - 1 ? color : C.soft} strokeWidth={2.2} seed={860 + i} opacity={0.85} />
        </g>
      ))}
      <Label text={label} x={14} y={116} size={56} color={color} start={start + 0.5} font={FONT_DISPLAY} />
    </g>
  );
};

export const ParamGrid: React.FC<{
  x: number;
  y: number;
  cols?: number;
  rows?: number;
  start?: number;
  color?: string;
  activeRows?: number;
  activeColor?: string;
  gap?: number;
  dot?: number;
  wave?: boolean;
}> = ({x, y, cols = 14, rows = 6, start = -1, color = C.purple, activeRows = 0, activeColor = C.green, gap = 34, dot = 12, wave = false}) => (
  <g>
    {Array.from({length: rows}).map((_, r) =>
      Array.from({length: cols}).map((_, c) => {
        const on = r < activeRows;
        return (
          <SketchCircle
            key={`${r}-${c}`}
            x={x + c * gap}
            y={y + r * gap}
            d={dot}
            start={start + (wave ? Math.hypot(c - (cols - 1) / 2, r - (rows - 1) / 2) * 0.06 : (r * cols + c) * 0.007)}
            dur={0.18}
            stroke={on ? activeColor : color}
            fill={on ? activeColor : C.well}
            seed={870 + r * cols + c}
            strokeWidth={on ? 2.4 : 1.8}
            opacity={on ? 1 : 0.8}
          />
        );
      }),
    )}
  </g>
);

/* ------------------------------------------------------------------ */
/* clouds, devices, documents                                          */
/* ------------------------------------------------------------------ */

export const Cloud: React.FC<{x: number; y: number; s?: number; start?: number; color?: string; fill?: string; label?: string}> = ({
  x,
  y,
  s = 1,
  start = -1,
  color = C.cyan,
  fill = C.panel,
  label,
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <SketchPath
      d="M -110 44 C -142 44 -152 12 -132 -6 C -138 -40 -110 -60 -82 -48 C -72 -78 -32 -86 -12 -62 C 10 -82 48 -70 54 -44 C 88 -44 100 -14 84 8 C 98 34 78 44 58 44 Z"
      start={start}
      dur={0.6}
      stroke={color}
      strokeWidth={3.8}
      fill={fill}
      fillStart={start + 0.35}
      seed={880}
    />
    {label ? <Label text={label} x={-14} y={4} size={42} color={color} start={start + 0.4} /> : null}
  </g>
);

export const GpuCard: React.FC<{x: number; y: number; start?: number; color?: string; label?: string; vram?: string}> = ({
  x,
  y,
  start = -1,
  color = C.green,
  label = "24 GB GPU",
  vram,
}) => (
  <g transform={`translate(${x} ${y})`}>
    <SketchRect x={-132} y={-62} w={264} h={124} start={start} dur={0.45} stroke={color} fill={C.panel} radius={12} seed={890} strokeWidth={3.2} />
    <SketchCircle x={-76} y={0} d={72} start={start + 0.2} dur={0.4} stroke={color} strokeWidth={2.6} seed={891} />
    <SketchCircle x={-76} y={0} d={30} start={start + 0.3} dur={0.25} stroke={color} strokeWidth={2.4} seed={892} />
    {[0, 1, 2, 3].map((i) => (
      <SketchLine key={i} x1={-20 + i * 21} y1={-40} x2={-20 + i * 21} y2={40} start={start + 0.35 + i * 0.04} dur={0.22} stroke={color} strokeWidth={2.4} seed={893 + i} opacity={0.7} />
    ))}
    <SketchRect x={-156} y={20} w={24} h={50} start={start + 0.4} dur={0.25} stroke={color} fill={C.line} radius={3} seed={897} strokeWidth={2.2} />
    <Label text={label} x={0} y={100} size={42} color={color} start={start + 0.5} />
    {vram ? <Label text={vram} x={0} y={148} size={38} color={C.soft} start={start + 0.6} /> : null}
  </g>
);

export const Mac: React.FC<{x: number; y: number; start?: number; color?: string; label?: string; size?: number}> = ({
  x,
  y,
  start = -1,
  color = C.cyan,
  label = "128 GB Mac",
  size = 1,
}) => (
  <g transform={`translate(${x} ${y}) scale(${size})`}>
    <SketchRect x={-120} y={-96} w={240} h={150} start={start} dur={0.45} stroke={color} fill={C.panel} radius={10} seed={900} strokeWidth={3.2} />
    <SketchRect x={-104} y={-80} w={208} h={118} start={start + 0.12} dur={0.35} stroke={C.line} fill={C.well} radius={4} seed={901} strokeWidth={2.2} />
    <SketchPolygon points={[[-148, 54], [148, 54], [138, 70], [-138, 70]]} start={start + 0.3} dur={0.3} stroke={color} fill={C.line} seed={902} strokeWidth={2.6} />
    <SketchLine x1={-34} y1={68} x2={34} y2={68} start={start + 0.45} dur={0.2} stroke={color} strokeWidth={2.4} seed={903} />
    <Label text={label} x={0} y={116} size={42} color={color} start={start + 0.5} />
  </g>
);

export const DocPage: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  start?: number;
  label?: string;
  lines?: number;
  color?: string;
  rot?: number;
}> = ({x, y, w = 280, h = 350, start = -1, label, lines = 5, color = C.soft, rot = 0}) => (
  <g transform={`rotate(${rot} ${x + w / 2} ${y + h / 2})`}>
    <SketchRect x={x + 8} y={y + 10} w={w} h={h} start={start - 0.05} dur={0.4} stroke={C.line} fill={C.well} radius={5} seed={910} strokeWidth={2.2} />
    <SketchRect x={x} y={y} w={w} h={h} start={start} dur={0.45} stroke={color} fill={C.panel} radius={5} seed={911} strokeWidth={2.8} />
    <SketchPolygon points={[[x + w - 38, y], [x + w, y + 38], [x + w - 38, y + 38]]} start={start + 0.2} dur={0.3} stroke={C.line} fill={C.well} seed={912} strokeWidth={2} />
    <SketchLine x1={x + 26} y1={y + 40} x2={x + w - 60} y2={y + 40} start={start + 0.18} dur={0.3} stroke={C.fg} strokeWidth={5} seed={913} opacity={0.8} />
    <Scribble x={x + 26} y={y + 80} w={w - 52} lines={lines} gap={30} start={start + 0.25} color={color} strokeWidth={2.8} seed={914} opacity={0.55} />
    {label ? <Label text={label} x={x + w / 2} y={y + h - 34} size={40} color={color} start={start + 0.4} /> : null}
  </g>
);

export const Browser: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  start?: number;
  color?: string;
  url?: string;
  children?: React.ReactNode;
}> = ({x, y, w = 560, h = 380, start = -1, color = C.soft, url = "huggingface.co", children}) => (
  <g>
    <SketchRect x={x} y={y} w={w} h={h} start={start} dur={0.5} stroke={color} fill={C.panel} radius={12} seed={920} strokeWidth={2.8} />
    <SketchLine x1={x} y1={y + 64} x2={x + w} y2={y + 64} start={start + 0.15} dur={0.4} stroke={C.line} strokeWidth={2.2} seed={921} />
    {[0, 1, 2].map((i) => (
      <SketchCircle key={i} x={x + 30 + i * 24} y={y + 32} d={10} start={start + 0.2 + i * 0.04} dur={0.15} stroke={C.soft} fill={C.soft} seed={922 + i} strokeWidth={1.4} opacity={0.65} />
    ))}
    <SketchRect x={x + 110} y={y + 16} w={w - 150} h={32} start={start + 0.25} dur={0.3} stroke={C.line} fill={C.well} radius={16} seed={925} strokeWidth={2} />
    <Label text={url} x={x + 130} y={y + 33} size={36} color={C.soft} align="left" start={start + 0.35} />
    {children}
  </g>
);

export const Book: React.FC<{x: number; y: number; s?: number; start?: number; color?: string; open?: boolean}> = ({
  x,
  y,
  s = 1,
  start = -1,
  color = C.yellow,
  open = true,
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <SketchPath d="M -120 70 L -120 -54 C -84 -72 -38 -64 0 -44 C 38 -64 84 -72 120 -54 L 120 70 C 84 52 38 60 0 80 C -38 60 -84 52 -120 70 Z" start={start} dur={0.55} stroke={color} strokeWidth={3.8} fill={C.panel} fillStart={start + 0.3} seed={930} />
    <SketchLine x1={0} y1={-44} x2={0} y2={80} start={start + 0.3} dur={0.3} stroke={color} strokeWidth={3} seed={931} />
    {open
      ? [0, 1, 2].map((i) => (
          <g key={i}>
            <SketchLine x1={-96} y1={-26 + i * 22} x2={-22} y2={-14 + i * 22} start={start + 0.35 + i * 0.05} dur={0.25} stroke={C.soft} strokeWidth={2.4} seed={932 + i} opacity={0.6} />
            <SketchLine x1={24} y1={-14 + i * 22} x2={96} y2={-26 + i * 22} start={start + 0.38 + i * 0.05} dur={0.25} stroke={C.soft} strokeWidth={2.4} seed={936 + i} opacity={0.6} />
          </g>
        ))
      : null}
  </g>
);

export const LayerStack: React.FC<{
  x: number;
  y: number;
  w?: number;
  start?: number;
  colors?: string[];
  labels?: string[];
  gap?: number;
  highlight?: number;
}> = ({x, y, w = 300, start = -1, colors = [C.cyan, C.cyan, C.cyan, C.pink], labels, gap = 16, highlight = -1}) => (
  <g>
    {colors.map((col, i) => (
      <g key={i}>
        <SketchRect
          x={x - w / 2}
          y={y + i * (42 + gap)}
          w={w}
          h={42}
          start={start + i * 0.09}
          dur={0.35}
          stroke={i === highlight ? C.yellow : col}
          fill={i === highlight ? C.line : C.panel}
          radius={7}
          seed={940 + i}
          strokeWidth={i === highlight ? 3.6 : 2.6}
        />
        {labels ? <Label text={labels[i] ?? ""} x={x} y={y + i * (42 + gap) + 21} size={36} color={i === highlight ? C.yellow : C.fg} start={start + 0.2 + i * 0.09} /> : null}
      </g>
    ))}
  </g>
);

export const Terminal: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  start?: number;
  title?: string;
  lines?: {text: string; color?: string; at?: number}[];
}> = ({x, y, w = 760, h = 380, start = -1, title = "terminal", lines = []}) => (
  <g>
    <SketchRect x={x} y={y} w={w} h={h} start={start} dur={0.5} stroke={C.green} fill={C.well} radius={10} seed={950} strokeWidth={3} />
    <SketchLine x1={x} y1={y + 50} x2={x + w} y2={y + 50} start={start + 0.15} dur={0.35} stroke={C.line} strokeWidth={2.4} seed={951} />
    <Label text={title} x={x + 28} y={y + 25} size={36} color={C.soft} align="left" start={start + 0.25} />
    {lines.map((l, i) => (
      <Label key={i} text={l.text} x={x + 34} y={y + 92 + i * 46} size={36} color={l.color ?? C.fg} align="left" start={l.at ?? start + 0.35 + i * 0.18} />
    ))}
  </g>
);

export const LookupTable: React.FC<{
  x: number;
  y: number;
  cols?: number;
  rows?: number;
  start?: number;
  color?: string;
  highlight?: number;
  gapX?: number;
  gapY?: number;
}> = ({x, y, cols = 8, rows = 5, start = -1, color = C.orange, highlight = 2, gapX = 62, gapY = 44}) => (
  <g>
    {Array.from({length: rows}).map((_, r) =>
      Array.from({length: cols}).map((_, c) => {
        const on = r === highlight;
        return (
          <SketchRect
            key={`${r}-${c}`}
            x={x + c * gapX}
            y={y + r * gapY}
            w={gapX - 12}
            h={gapY - 12}
            start={start + (r * cols + c) * 0.01}
            dur={0.2}
            stroke={on ? color : C.line}
            fill={on ? C.line : C.panel}
            radius={4}
            seed={960 + r * cols + c}
            strokeWidth={on ? 2.4 : 1.6}
            opacity={on ? 1 : 0.65}
          />
        );
      }),
    )}
  </g>
);

export const PriceTag: React.FC<{
  x: number;
  y: number;
  start?: number;
  price: string;
  sub?: string;
  color?: string;
  strike?: boolean;
  size?: number;
  seed?: number;
}> = ({x, y, start = -1, price, sub, color = C.green, strike = false, size = 72, seed = 970}) => (
  <g>
    <SketchRect x={x - 160} y={y - 62} w={320} h={124} start={start} dur={0.45} stroke={color} fill={C.panel} radius={12} seed={seed} strokeWidth={3} />
    <SketchCircle x={x - 160} y={y - 40} d={16} start={start + 0.15} dur={0.15} stroke={color} fill={C.bg} seed={seed + 1} strokeWidth={2.2} />
    <Label text={price} x={x} y={y - 6} size={size} color={color} start={start + 0.2} font={FONT_DISPLAY} />
    {sub ? <Label text={sub} x={x} y={y + 42} size={36} color={C.soft} start={start + 0.32} /> : null}
    {strike ? <SketchLine x1={x - 96} y1={y - 4} x2={x + 96} y2={y + 6} start={start + 0.45} dur={0.25} stroke={C.red} strokeWidth={4} seed={seed + 2} /> : null}
  </g>
);

export const CalendarChip: React.FC<{x: number; y: number; w?: number; start?: number; date: string; note: string; color?: string; active?: number}> = ({
  x,
  y,
  w = 260,
  start = -1,
  date,
  note,
  color = C.cyan,
  active = 0,
}) => (
  <g transform={`translate(${x} ${y}) scale(${1 + 0.06 * active})`}>
    <SketchRect x={-w / 2} y={-52} w={w} h={104} start={start} dur={0.4} stroke={color} fill={active > 0.5 ? C.line : C.panel} radius={10} seed={980} strokeWidth={active > 0.5 ? 3.4 : 2.4} />
    <Label text={date} x={0} y={-14} size={40} color={color} start={start + 0.12} />
    <Label text={note} x={0} y={28} size={36} color={C.fg} start={start + 0.22} />
  </g>
);

export const CheckBadge: React.FC<{x: number; y: number; s?: number; start?: number; color?: string}> = ({x, y, s = 1, start = -1, color = C.green}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <SketchCircle x={0} y={0} d={64} start={start} dur={0.3} stroke={color} fill={color} seed={990} strokeWidth={2.4} />
    <SketchPath d="M -14 2 L -4 13 L 16 -14" start={start + 0.25} dur={0.25} stroke={C.bg} strokeWidth={5} seed={991} />
  </g>
);

export const CrossBadge: React.FC<{x: number; y: number; s?: number; start?: number; color?: string}> = ({x, y, s = 1, start = -1, color = C.red}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <SketchCircle x={0} y={0} d={64} start={start} dur={0.3} stroke={color} fill={color} seed={992} strokeWidth={2.4} />
    <SketchLine x1={-12} y1={-12} x2={12} y2={12} start={start + 0.25} dur={0.2} stroke={C.bg} strokeWidth={5} seed={993} />
    <SketchLine x1={12} y1={-12} x2={-12} y2={12} start={start + 0.3} dur={0.2} stroke={C.bg} strokeWidth={5} seed={994} />
  </g>
);

export const Spark: React.FC<{x: number; y: number; s?: number; start?: number; color?: string}> = ({x, y, s = 1, start = -1, color = C.yellow}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <SketchPath d="M 0 -22 L 5 -5 L 22 0 L 5 5 L 0 22 L -5 5 L -22 0 L -5 -5 Z" start={start} dur={0.35} stroke={color} fill={color} fillStart={start + 0.2} seed={995} strokeWidth={2} />
  </g>
);

/* ------------------------------------------------------------------ */
/* small animated helpers                                              */
/* ------------------------------------------------------------------ */

export const PopIn: React.FC<{start: number; children: React.ReactNode; x?: number; y?: number; from?: number}> = ({start, children, x = 0, y = 0, from = 0.86}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - start * fps, fps, config: {damping: 14, stiffness: 180, mass: 0.55}, durationInFrames: 15});
  const p = clamp01(s);
  return (
    <g opacity={p} transform={`translate(${x} ${y}) scale(${from + (1 - from) * p}) translate(${-x} ${-y})`}>
      {children}
    </g>
  );
};

export const FadeGroup: React.FC<{start: number; dur?: number; children: React.ReactNode; dim?: number}> = ({start, dur = 0.4, children, dim = 1}) => {
  const f = useCurrentFrame();
  const p = ramp(f / 30, start, dur);
  return <g opacity={p * dim}>{children}</g>;
};

export const PulseRing: React.FC<{x: number; y: number; r: number; start?: number; color?: string; width?: number}> = ({
  x,
  y,
  r,
  start = -1,
  color = C.cyan,
  width = 2.4,
}) => {
  const f = useCurrentFrame();
  const p = easeOut(ramp(f / 30, start, 1.4));
  return <SketchCircle x={x} y={y} d={r * 2} start={start} dur={1.2} stroke={color} strokeWidth={width} seed={997} opacity={1 - p * 0.6} />;
};

export const DownArrow: React.FC<{x: number; y: number; len?: number; start?: number; color?: string; label?: string}> = ({
  x,
  y,
  len = 130,
  start = -1,
  color = C.green,
  label,
}) => (
  <g>
    <SketchLine x1={x} y1={y} x2={x} y2={y + len} start={start} dur={0.4} stroke={color} strokeWidth={5} seed={998} />
    <SketchLine x1={x} y1={y + len} x2={x - 16} y2={y + len - 22} start={start + 0.35} dur={0.18} stroke={color} strokeWidth={5} seed={999} />
    <SketchLine x1={x} y1={y + len} x2={x + 16} y2={y + len - 22} start={start + 0.38} dur={0.18} stroke={color} strokeWidth={5} seed={1000} />
    {label ? <Label text={label} x={x} y={y + len / 2} size={38} color={color} start={start + 0.4} /> : null}
  </g>
);
