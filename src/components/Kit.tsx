import React from "react";
import {useCurrentFrame, useVideoConfig} from "remotion";
import {C, FONT_BODY, FONT_DISPLAY} from "../theme";
import {
  Arrow,
  Label,
  Pop,
  Scribble,
  SketchArc,
  SketchCircle,
  SketchEllipse,
  SketchLine,
  SketchPath,
  SketchPolygon,
  SketchRect,
  clamp01,
  easeOut,
  ramp,
} from "./Sketch";
import {InkMark, QwenMark} from "./Brand";

/* ------------------------------------------------------------------ */
/* typography + simple shapes                                          */
/* ------------------------------------------------------------------ */


export const Heading: React.FC<{
  text: string | string[];
  x?: number;
  y?: number;
  size?: number;
  color?: string;
  start?: number;
  align?: "center" | "left" | "right";
  font?: "Caveat" | "Patrick Hand";
  drift?: number;
  maxWidth?: number;
  lineHeight?: number;
  rotate?: number;
}> = ({text, x = 960, y = 200, size = 80, color = C.fg, start = -1, align = "center", font = FONT_DISPLAY, drift = 12, lineHeight = 0.98, rotate = 0}) => (
  <Label text={text} x={x} y={y} size={size} color={color} start={start} align={align} font={font} drift={drift} lineHeight={lineHeight} rotate={rotate} />
);

export const Caption: React.FC<{
  text: string | string[];
  x?: number;
  y?: number;
  size?: number;
  color?: string;
  start?: number;
  align?: "center" | "left" | "right";
  maxWidth?: number;
  lineHeight?: number;
  opacity?: number;
}> = ({text, x = 960, y = 270, size = 40, color = C.soft, start = -1, align = "center", lineHeight = 1.08, opacity = 1}) => (
  <Label text={text} x={x} y={y} size={size} color={color} start={start} align={align} lineHeight={lineHeight} opacity={opacity} drift={7} />
);

export const Chip: React.FC<{
  x: number;
  y: number;
  text: string;
  w?: number;
  h?: number;
  color?: string;
  textColor?: string;
  fill?: string;
  start?: number;
  size?: number;
  seed?: number;
  icon?: React.ReactNode;
  align?: "center" | "left";
  strokeWidth?: number;
}> = ({x, y, text, w, h = 54, color = C.line, textColor = C.fg, fill = C.panel, start = -1, size = 36, seed = 1200, icon, align = "center", strokeWidth = 2.4}) => {
  const width = w ?? Math.max(96, text.length * size * 0.48 + 44 + (icon ? 50 : 0));
  const left = align === "center" ? x - width / 2 : x;
  return (
    <g>
      <SketchRect x={left} y={y - h / 2} w={width} h={h} start={start} dur={0.35} stroke={color} fill={fill} radius={h / 2} seed={seed} strokeWidth={strokeWidth} />
      {icon ? <g transform={`translate(${left + 30} ${y}) scale(0.28)`}>{icon}</g> : null}
      <Label text={text} x={icon ? left + 54 + (width - 54) / 2 : left + width / 2} y={y} size={size} color={textColor} start={start + 0.08} />
    </g>
  );
};

export const Rule: React.FC<{x1?: number; y?: number; x2?: number; start?: number; color?: string; opacity?: number}> = ({
  x1 = 260,
  y = 600,
  x2 = 1660,
  start = -1,
  color = C.line,
  opacity = 0.7,
}) => <SketchLine x1={x1} y1={y} x2={x2} y2={y} start={start} dur={0.6} stroke={color} strokeWidth={3} seed={1210} opacity={opacity} />;

export const Stat: React.FC<{
  x: number;
  y: number;
  value: string;
  label?: string;
  color?: string;
  size?: number;
  start?: number;
  align?: "center" | "left" | "right";
  labelSize?: number;
  font?: "Caveat" | "Patrick Hand";
}> = ({x, y, value, label, color = C.fg, size = 120, start = -1, align = "center", labelSize = 38, font = FONT_DISPLAY}) => (
  <g>
    <Label text={value} x={x} y={y} size={size} color={color} start={start} font={font} align={align} />
    {label ? <Label text={label} x={x} y={y + size * 0.52} size={labelSize} color={C.soft} start={start + 0.12} align={align} /> : null}
  </g>
);

/* ------------------------------------------------------------------ */
/* benchmark score layouts                                             */
/* ------------------------------------------------------------------ */

const AnimBar: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  value: number; // 0..1
  start: number;
  color: string;
  seed: number;
  dim?: number;
}> = ({x, y, w, h, value, start, color, seed, dim = 1}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = easeOut(ramp(frame / fps, start + 0.15, 0.9));
  const v = clamp01(value) * p;
  return (
    <g opacity={dim}>
      <SketchRect x={x} y={y} w={w} h={h} start={start} dur={0.4} stroke={C.line} fill={C.well} radius={h / 2} seed={seed} strokeWidth={2.4} />
      {v > 0.004 ? (
        <SketchRect x={x + 4} y={y + 4} w={Math.max(10, (w - 8) * v)} h={h - 8} start={start + 0.2} dur={0.5} stroke={color} fill={color} radius={(h - 8) / 2} seed={seed + 1} strokeWidth={2} />
      ) : null}
    </g>
  );
};

export const ScoreBars: React.FC<{
  x?: number;
  y?: number;
  w?: number;
  barH?: number;
  domain?: number;
  mini: number;
  qwen: number;
  startMini: number;
  startQwen: number;
  unit?: string;
  decimals?: number;
  gapLabel?: string;
  gapColor?: string;
  startGap?: number;
  miniLabel?: string;
  qwenLabel?: string;
  sizeLabel?: number;
  sizeValue?: number;
}> = ({
  x = 520,
  y = 410,
  w = 830,
  barH = 46,
  domain = 100,
  mini,
  qwen,
  startMini,
  startQwen,
  unit = "",
  decimals = 1,
  gapLabel,
  gapColor = C.green,
  startGap,
  miniLabel = "Inkling 2 Mini",
  qwenLabel = "Qwen 3.8 27B",
  sizeLabel = 40,
  sizeValue = 58,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const miniP = easeOut(ramp(t, startMini, 1.0));
  const qwenP = easeOut(ramp(t, startQwen, 1.0));
  const miniV = mini * miniP;
  const qwenV = qwen * qwenP;
  const row2 = y + 165;
  const labelX = x - 34;
  return (
    <g>
      {/* labels + values above bars */}
      <g>
        <InkMark x={x - 190} y={y - 26} s={0.26} color={C.green} bg={C.bg} start={startMini} strokeWidth={3} />
        <Label text={miniLabel} x={labelX} y={y - 26} size={sizeLabel} color={C.soft} align="right" start={startMini + 0.05} />
        <Label text={`${miniV.toFixed(decimals)}${unit}`} x={x + w + 24} y={y - 10} size={sizeValue} color={C.green} align="left" start={startMini + 0.1} font={FONT_DISPLAY} />
      </g>
      <AnimBar x={x} y={y} w={w} h={barH} value={mini / domain} start={startMini} color={C.green} seed={1301} />
      <g>
        <QwenMark x={x - 190} y={row2 - 26} s={0.26} color={C.purple} bg={C.bg} start={startQwen} />
        <Label text={qwenLabel} x={labelX} y={row2 - 26} size={sizeLabel} color={C.soft} align="right" start={startQwen + 0.05} />
        <Label text={`${qwenV.toFixed(decimals)}${unit}`} x={x + w + 24} y={row2 - 10} size={sizeValue} color={C.purple} align="left" start={startQwen + 0.1} font={FONT_DISPLAY} />
      </g>
      <AnimBar x={x} y={row2} w={w} h={barH} value={qwen / domain} start={startQwen} color={C.purple} seed={1311} />
      {gapLabel ? (
        <g>
          <SketchLine x1={x + w + 6} y1={y - 46} x2={x + w + 6} y2={row2 + barH + 4} start={startGap ?? startQwen + 0.4} dur={0.3} stroke={gapColor} strokeWidth={2.4} seed={1321} opacity={0.7} />
          <Label text={gapLabel} x={x - 10} y={row2 + barH + 62} size={44} color={gapColor} start={startGap ?? startQwen + 0.45} font={FONT_DISPLAY} />
        </g>
      ) : null}
    </g>
  );
};

export const ScoreCards: React.FC<{
  mini: string;
  qwen: string;
  miniSub?: string;
  qwenSub?: string;
  startMini: number;
  startQwen: number;
  y?: number;
  miniColor?: string;
  qwenColor?: string;
  tie?: boolean;
  startTie?: number;
  cardW?: number;
  size?: number;
}> = ({mini, qwen, miniSub, qwenSub, startMini, startQwen, y = 560, miniColor = C.green, qwenColor = C.purple, tie, startTie, cardW = 390, size = 150}) => {
  const leftX = 960 - 300 - cardW / 2;
  const rightX = 960 + 300 + cardW / 2;
  return (
    <g>
      <g>
        <SketchRect x={leftX - cardW / 2} y={y - 130} w={cardW} h={220} start={startMini} dur={0.45} stroke={miniColor} fill={C.panel} radius={18} seed={1340} strokeWidth={3.2} />
        <Label text={mini} x={leftX} y={y - 14} size={size} color={miniColor} start={startMini + 0.1} font={FONT_DISPLAY} />
        {miniSub ? <Label text={miniSub} x={leftX} y={y + 62} size={38} color={C.soft} start={startMini + 0.2} /> : null}
      </g>
      <g>
        <SketchRect x={rightX - cardW / 2} y={y - 130} w={cardW} h={220} start={startQwen} dur={0.45} stroke={qwenColor} fill={C.panel} radius={18} seed={1345} strokeWidth={3.2} />
        <Label text={qwen} x={rightX} y={y - 14} size={size} color={qwenColor} start={startQwen + 0.1} font={FONT_DISPLAY} />
        {qwenSub ? <Label text={qwenSub} x={rightX} y={y + 62} size={38} color={C.soft} start={startQwen + 0.2} /> : null}
      </g>
      {tie ? (
        <Pop start={startTie ?? startQwen + 0.3} x={960} y={y - 10}>
          <SketchRect x={898} y={y - 46} w={124} h={64} start={(startTie ?? startQwen + 0.3) + 0.05} dur={0.3} stroke={C.yellow} fill={C.well} radius={30} seed={1350} strokeWidth={2.6} />
          <Label text="TIE" x={960} y={y - 10} size={42} color={C.yellow} start={(startTie ?? startQwen + 0.3) + 0.1} font={FONT_DISPLAY} />
        </Pop>
      ) : null}
    </g>
  );
};

export const Legend: React.FC<{x?: number; y?: number; start?: number; gap?: number}> = ({x = 960, y = 940, start = -1, gap = 420}) => (
  <g>
    <g transform={`translate(${x - gap / 2} 0)`}>
      <InkMark x={-92} y={y} s={0.26} color={C.green} bg={C.bg} start={start} strokeWidth={3} />
      <Label text="Inkling 2 Mini" x={-64} y={y} size={36} color={C.green} align="left" start={start + 0.06} />
    </g>
    <g transform={`translate(${x + gap / 2} 0)`}>
      <QwenMark x={-92} y={y} s={0.26} color={C.purple} bg={C.bg} start={start + 0.1} />
      <Label text="Qwen 3.8 27B" x={-64} y={y} size={36} color={C.purple} align="left" start={start + 0.16} />
    </g>
  </g>
);

export const DotField: React.FC<{
  x: number;
  y: number;
  cols?: number;
  rows?: number;
  gap?: number;
  d?: number;
  start?: number;
  color?: string;
  fill?: string;
  highlight?: number[];
  highlightColor?: string;
  highlightFill?: string;
  stagger?: number;
  seed?: number;
  scroll?: boolean;
}> = ({x, y, cols = 20, rows = 6, gap = 28, d = 14, start = -1, color = C.line, fill = C.well, highlight = [], highlightColor, highlightFill, stagger = 0.008, seed = 1400, scroll = false}) => (
  <g>
    {Array.from({length: rows}).map((_, r) =>
      Array.from({length: cols}).map((_, c) => {
        const i = r * cols + c;
        const on = highlight.includes(i);
        return (
          <SketchCircle
            key={i}
            x={x + c * gap}
            y={y + r * gap}
            d={d}
            start={start + (scroll ? (r * 0.09 + c * 0.03) : i * stagger)}
            dur={0.14}
            stroke={on ? highlightColor ?? C.red : color}
            fill={on ? highlightFill ?? C.red : fill}
            seed={seed + i}
            strokeWidth={on ? 2.2 : 1.5}
            opacity={on ? 1 : 0.8}
          />
        );
      }),
    )}
  </g>
);

/* ------------------------------------------------------------------ */
/* annotations, stamps, callouts                                       */
/* ------------------------------------------------------------------ */

export const Stamp: React.FC<{
  x: number;
  y: number;
  text: string;
  color?: string;
  start?: number;
  rotate?: number;
  size?: number;
  w?: number;
  double?: boolean;
}> = ({x, y, text, color = C.red, start = -1, rotate = -8, size = 54, w, double = true}) => {
  const width = w ?? Math.max(240, text.length * size * 0.5 + 70);
  return (
    <Pop start={start} x={x} y={y}>
      <g transform={`rotate(${rotate} ${x} ${y})`}>
        <SketchRect x={x - width / 2} y={y - 56} w={width} h={112} start={start + 0.05} dur={0.35} stroke={color} fill={C.bg} radius={8} seed={1500} strokeWidth={4} />
        {double ? <SketchRect x={x - width / 2 + 10} y={y - 46} w={width - 20} h={92} start={start + 0.16} dur={0.3} stroke={color} fill="transparent" radius={4} seed={1501} strokeWidth={2} /> : null}
        <Label text={text} x={x} y={y} size={size} color={color} start={start + 0.12} font={FONT_DISPLAY} />
      </g>
    </Pop>
  );
};

export const Callout: React.FC<{
  x: number;
  y: number;
  text: string | string[];
  color?: string;
  start?: number;
  align?: "center" | "left";
  w?: number;
  size?: number;
  icon?: React.ReactNode;
  seed?: number;
  rotate?: number;
}> = ({x, y, text, color = C.yellow, start = -1, align = "center", w, size = 40, icon, seed = 1520, rotate = 0}) => {
  const lines = Array.isArray(text) ? text : [text];
  const width = w ?? Math.max(...lines.map((l) => l.length * size * 0.46 + 64)) + (icon ? 60 : 0);
  const left = align === "center" ? x - width / 2 : x;
  return (
    <Pop start={start} x={x} y={y}>
      <g transform={`rotate(${rotate} ${x} ${y})`}>
        <SketchRect x={left} y={y - 34 - (lines.length - 1) * size * 0.52} w={width} h={size * lines.length * 1.08 + 26} start={start + 0.05} dur={0.35} stroke={color} fill={C.panel} radius={10} seed={seed} strokeWidth={2.8} />
        {icon ? <g transform={`translate(${left + 38} ${y}) scale(0.34)`}>{icon}</g> : null}
        <Label text={lines} x={left + width / 2 + (icon ? 26 : 0)} y={y} size={size} color={color} start={start + 0.14} lineHeight={1.05} />
      </g>
    </Pop>
  );
};

export const FlagTag: React.FC<{x: number; y: number; text?: string; color?: string; start?: number; s?: number}> = ({x, y, text = "FLAWED", color = C.red, start = -1, s = 1}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <SketchLine x1={0} y1={70} x2={0} y2={-90} start={start} dur={0.35} stroke={color} strokeWidth={5} seed={1540} />
    <SketchPolygon points={[[0, -90], [150, -74], [124, -42], [150, -10], [0, -24]]} start={start + 0.25} dur={0.4} stroke={color} fill={C.panel} fillStart={start + 0.4} seed={1541} strokeWidth={3.2} />
    <Label text={text} x={64} y={-50} size={38} color={color} start={start + 0.5} font={FONT_DISPLAY} />
  </g>
);

export const MiniNote: React.FC<{
  x: number;
  y: number;
  text: string;
  color?: string;
  start?: number;
  rotate?: number;
  size?: number;
  w?: number;
  lines?: number;
}> = ({x, y, text, color = C.orange, start = -1, rotate = 3, size = 36, w = 300, lines = 0}) => (
  <Pop start={start} x={x} y={y}>
    <g transform={`rotate(${rotate} ${x} ${y})`}>
      <SketchRect x={x - w / 2} y={y - 28} w={w} h={56 + lines * 30} start={start + 0.04} dur={0.3} stroke={color} fill={C.panel} radius={6} seed={1560} strokeWidth={2.4} />
      <Label text={text} x={x} y={y} size={size} color={color} start={start + 0.12} />
      {lines > 0 ? <Scribble x={x - w / 2 + 24} y={y + 38} w={w - 48} lines={lines} gap={24} start={start + 0.2} color={C.soft} strokeWidth={2.2} opacity={0.5} /> : null}
    </g>
  </Pop>
);

/* ------------------------------------------------------------------ */
/* icon set (line art, 100x100 box)                                    */
/* ------------------------------------------------------------------ */

export type IconName =
  | "doc"
  | "book"
  | "chip"
  | "clock"
  | "coin"
  | "shield"
  | "terminal"
  | "repo"
  | "browser"
  | "scale"
  | "stopwatch"
  | "ticket"
  | "laptop"
  | "gauge"
  | "flag"
  | "brain"
  | "globe"
  | "router"
  | "loop"
  | "crown"
  | "lock"
  | "table"
  | "flask"
  | "grid"
  | "server"
  | "cloud"
  | "branch"
  | "search"
  | "wrench"
  | "cap"
  | "gate"
  | "layers";

export const Icon: React.FC<{name: IconName; x?: number; y?: number; s?: number; color?: string; start?: number; strokeWidth?: number}> = ({
  name,
  x = 0,
  y = 0,
  s = 1,
  color = C.fg,
  start = -1,
  strokeWidth = 3.2,
}) => {
  const p = (d: number) => start + d;
  const line = (x1: number, y1: number, x2: number, y2: number, d: number, seed: number, sw = strokeWidth) => (
    <SketchLine x1={x1} y1={y1} x2={x2} y2={y2} start={p(d)} dur={0.25} stroke={color} strokeWidth={sw} seed={seed} />
  );
  const path = (d: string, delay: number, seed: number, fill?: string) => (
    <SketchPath d={d} start={p(delay)} dur={0.4} stroke={color} strokeWidth={strokeWidth} seed={seed} fill={fill} fillStart={fill ? p(delay + 0.2) : undefined} />
  );
  const circle = (cx: number, cy: number, diam: number, delay: number, seed: number, fill?: string, sw = strokeWidth) => (
    <SketchCircle x={cx} y={cy} d={diam} start={p(delay)} dur={0.3} stroke={color} strokeWidth={sw} seed={seed} fill={fill} fillStart={fill ? p(delay + 0.15) : undefined} />
  );
  let body: React.ReactNode;
  switch (name) {
    case "doc":
      body = (
        <>
          <SketchRect x={-32} y={-42} w={64} h={84} start={p(0)} dur={0.35} stroke={color} fill={C.panel} radius={4} seed={1601} strokeWidth={strokeWidth} />
          {[0, 1, 2, 3].map((i) => line(-20, -22 + i * 18, 20 - (i === 3 ? 14 : 0), -22 + i * 18, 0.12 + i * 0.05, 1602 + i, 2.6))}
        </>
      );
      break;
    case "book":
      body = (
        <>
          {path("M -40 32 L -40 -32 C -18 -42 0 -38 0 -30 C 0 -38 18 -42 40 -32 L 40 32 C 18 24 0 28 0 36 C 0 28 -18 24 -40 32 Z", 0, 1610, C.panel)}
          {line(0, -30, 0, 36, 0.3, 1611)}
        </>
      );
      break;
    case "chip":
      body = (
        <>
          <SketchRect x={-30} y={-30} w={60} h={60} start={p(0)} dur={0.35} stroke={color} fill={C.panel} radius={6} seed={1620} strokeWidth={strokeWidth} />
          <SketchRect x={-14} y={-14} w={28} h={28} start={p(0.2)} dur={0.25} stroke={color} fill={C.well} radius={3} seed={1621} strokeWidth={2.4} />
          {[-20, -6, 8, 22].map((v, i) => (
            <g key={i}>
              {line(v, -30, v, -44, 0.3 + i * 0.03, 1622 + i, 2.4)}
              {line(v, 30, v, 44, 0.36 + i * 0.03, 1630 + i, 2.4)}
              {line(-30, v, -44, v, 0.42 + i * 0.03, 1638 + i, 2.4)}
              {line(30, v, 44, v, 0.48 + i * 0.03, 1646 + i, 2.4)}
            </g>
          ))}
        </>
      );
      break;
    case "clock":
      body = (
        <>
          {circle(0, 0, 76, 0, 1655)}
          {line(0, 0, 0, -24, 0.3, 1656, 4)}
          {line(0, 0, 18, 10, 0.4, 1657, 3.4)}
          {circle(0, 0, 8, 0.5, 1658, color, 1.2)}
        </>
      );
      break;
    case "coin":
      body = (
        <>
          {circle(0, 0, 72, 0, 1660)}
          <Label text="$" x={0} y={8} size={56} color={color} start={p(0.3)} font={FONT_DISPLAY} />
        </>
      );
      break;
    case "shield":
      body = path("M 0 -46 L 38 -30 L 34 8 C 30 30 12 42 0 48 C -12 42 -30 30 -34 8 L -38 -30 Z", 0, 1670, C.panel);
      break;
    case "terminal":
      body = (
        <>
          <SketchRect x={-44} y={-34} w={88} h={68} start={p(0)} dur={0.35} stroke={color} fill={C.well} radius={6} seed={1680} strokeWidth={strokeWidth} />
          {line(-30, -16, -18, -8, 0.2, 1681, 3.4)}
          {line(-18, -8, -30, 0, 0.28, 1682, 3.4)}
          {line(-8, 2, 10, 2, 0.36, 1683, 3.4)}
        </>
      );
      break;
    case "repo":
      body = (
        <>
          {path("M -34 -34 L 20 -34 L 34 -20 L 34 34 L -34 34 Z", 0, 1690, C.panel)}
          {line(-20, -18, 16, -18, 0.2, 1691, 2.8)}
          {line(-20, -2, 16, -2, 0.28, 1692, 2.8)}
          {line(-20, 14, 6, 14, 0.36, 1693, 2.8)}
        </>
      );
      break;
    case "browser":
      body = (
        <>
          <SketchRect x={-46} y={-32} w={92} h={64} start={p(0)} dur={0.35} stroke={color} fill={C.panel} radius={6} seed={1700} strokeWidth={strokeWidth} />
          {line(-46, -14, 46, -14, 0.2, 1701, 2.4)}
          {circle(-34, -23, 6, 0.28, 1702, color, 1)}
          {circle(-22, -23, 6, 0.32, 1703, color, 1)}
        </>
      );
      break;
    case "scale":
      body = (
        <>
          {line(0, 40, 0, -34, 0.1, 1710, 4)}
          {line(-40, -24, 40, -24, 0.25, 1711, 3.4)}
          {path("M -40 -24 L -56 10 L -24 10 Z", 0.35, 1712)}
          {path("M 40 -24 L 24 10 L 56 10 Z", 0.42, 1713)}
          {line(-16, 42, 16, 42, 0.5, 1714, 4)}
        </>
      );
      break;
    case "stopwatch":
      body = (
        <>
          {circle(0, 6, 66, 0, 1720)}
          {line(-12, -38, 12, -38, 0.2, 1721, 4)}
          {line(0, -38, 0, -26, 0.26, 1722, 3)}
          {line(0, 6, 0, -16, 0.36, 1723, 4)}
          {line(-20, -28, -30, -36, 0.42, 1724, 3)}
        </>
      );
      break;
    case "ticket":
      body = (
        <>
          <SketchRect x={-44} y={-26} w={88} h={52} start={p(0)} dur={0.35} stroke={color} fill={C.panel} radius={5} seed={1730} strokeWidth={strokeWidth} />
          {circle(-22, 0, 10, 0.2, 1731, C.bg, 2)}
          {circle(22, 0, 10, 0.24, 1732, C.bg, 2)}
          {line(-8, -16, -8, 16, 0.3, 1733, 2)}
        </>
      );
      break;
    case "laptop":
      body = (
        <>
          <SketchRect x={-36} y={-30} w={72} h={48} start={p(0)} dur={0.35} stroke={color} fill={C.panel} radius={4} seed={1740} strokeWidth={strokeWidth} />
          {path("M -50 18 L 50 18 L 42 32 L -42 32 Z", 0.22, 1741, C.line)}
          {line(-12, 26, 12, 26, 0.4, 1742, 2.2)}
        </>
      );
      break;
    case "gauge":
      body = (
        <>
          {path("M -40 20 A 44 44 0 0 1 40 20", 0, 1750)}
          {line(-26, 20, -34, 30, 0.2, 1751, 2.4)}
          {line(0, 20, 0, 2, 0.26, 1752, 2.4)}
          {line(26, 20, 34, 30, 0.32, 1753, 2.4)}
          {line(0, 20, 24, -4, 0.4, 1754, 4)}
          {circle(0, 20, 8, 0.45, 1755, color, 1)}
        </>
      );
      break;
    case "flag":
      body = (
        <>
          {line(0, 44, 0, -40, 0.1, 1760, 4)}
          {path("M 0 -40 L 42 -32 L 34 -12 L 42 8 L 0 0 Z", 0.28, 1761, C.panel)}
        </>
      );
      break;
    case "brain":
      body = (
        <>
          {path("M -30 26 C -46 12 -42 -16 -24 -28 C -20 -44 4 -48 12 -34 C 30 -42 46 -24 38 -8 C 52 6 44 26 28 30 C 18 44 -6 44 -14 32 C -20 34 -26 32 -30 26 Z", 0, 1770, C.panel)}
          {path("M -14 30 C -18 14 -6 4 -14 -8 C -20 -18 -10 -28 0 -26", 0.3, 1771)}
          {path("M 14 30 C 20 18 10 8 18 -2", 0.4, 1772)}
        </>
      );
      break;
    case "globe":
      body = (
        <>
          {circle(0, 0, 76, 0, 1780)}
          <ellipse cx={0} cy={0} rx={18} ry={38} fill="none" stroke={color} strokeWidth={2.6} opacity={0.85} />
          {line(-38, 0, 38, 0, 0.24, 1781, 2.6)}
          {path("M -32 -20 A 44 24 0 0 1 32 -20", 0.3, 1782)}
          {path("M -32 20 A 44 24 0 0 0 32 20", 0.36, 1783)}
        </>
      );
      break;
    case "router":
      body = (
        <>
          <SketchRect x={-28} y={0} w={56} h={34} start={p(0)} dur={0.35} stroke={color} fill={C.panel} radius={5} seed={1790} strokeWidth={strokeWidth} />
          {[-18, 0, 18].map((v, i) => (
            <g key={i}>
              {line(v, 0, v, -30, 0.2 + i * 0.05, 1791 + i, 2.6)}
              {circle(v, -36, 8, 0.34 + i * 0.05, 1795 + i, color, 1.2)}
            </g>
          ))}
        </>
      );
      break;
    case "loop":
      body = (
        <>
          {path("M -26 -20 C -8 -44 28 -36 32 -8", 0, 1800)}
          {path("M 32 -8 C 40 20 12 42 -12 34", 0.24, 1801)}
          {path("M -12 34 C -36 26 -42 -2 -26 -20", 0.46, 1802)}
          {path("M 24 -18 L 33 -8 L 21 -3", 0.5, 1803)}
          {path("M -2 24 L -12 35 L -22 25", 0.6, 1804)}
          {path("M -18 -28 L -27 -19 L -36 -30", 0.7, 1805)}
        </>
      );
      break;
    case "crown":
      body = (
        <>
          {path("M -42 24 L -36 -22 L -14 -4 L 0 -34 L 14 -4 L 36 -22 L 42 24 Z", 0, 1810, C.panel)}
          {line(-36, 34, 36, 34, 0.3, 1811, 4)}
          {circle(-20, 12, 7, 0.4, 1812, color, 1.2)}
          {circle(0, 8, 8, 0.45, 1813, color, 1.2)}
          {circle(20, 12, 7, 0.5, 1814, color, 1.2)}
        </>
      );
      break;
    case "lock":
      body = (
        <>
          <SketchRect x={-28} y={-2} w={56} h={42} start={p(0)} dur={0.35} stroke={color} fill={C.panel} radius={6} seed={1820} strokeWidth={strokeWidth} />
          {path("M -16 -2 L -16 -24 C -16 -44 16 -44 16 -24 L 16 -2", 0.2, 1821)}
          {circle(0, 18, 8, 0.4, 1822, color, 1.2)}
        </>
      );
      break;
    case "table":
      body = (
        <>
          <SketchRect x={-46} y={-32} w={92} h={64} start={p(0)} dur={0.35} stroke={color} fill={C.panel} radius={4} seed={1830} strokeWidth={strokeWidth} />
          {line(-46, -12, 46, -12, 0.2, 1831, 2.2)}
          {line(-46, 8, 46, 8, 0.26, 1832, 2.2)}
          {line(-16, -32, -16, 32, 0.32, 1833, 2.2)}
          {line(16, -32, 16, 32, 0.38, 1834, 2.2)}
        </>
      );
      break;
    case "flask":
      body = (
        <>
          {path("M -18 -40 L 18 -40 L 14 -6 L 34 32 L -34 32 L -14 -6 Z", 0, 1840, C.panel)}
          {line(-26, 16, 26, 16, 0.3, 1841, 2.4)}
          {circle(-8, 25, 6, 0.45, 1842, color, 1)}
          {circle(8, 22, 5, 0.5, 1843, color, 1)}
        </>
      );
      break;
    case "grid":
      body = (
        <>
          {Array.from({length: 3}).map((_, r) =>
            Array.from({length: 3}).map((_, c) => (
              <SketchRect key={`${r}-${c}`} x={-38 + c * 27} y={-38 + r * 27} w={20} h={20} start={p((r * 3 + c) * 0.04)} dur={0.18} stroke={color} fill={C.panel} radius={3} seed={1850 + r * 3 + c} strokeWidth={2.2} />
            )),
          )}
        </>
      );
      break;
    case "server":
      body = (
        <>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <SketchRect x={-38} y={-36 + i * 24} w={76} h={18} start={p(i * 0.08)} dur={0.24} stroke={color} fill={C.panel} radius={3} seed={1860 + i} strokeWidth={2.4} />
              {circle(24, -27 + i * 24, 5, 0.2 + i * 0.08, 1864 + i, color, 1)}
            </g>
          ))}
        </>
      );
      break;
    case "cloud":
      body = path("M -30 20 C -48 20 -52 0 -38 -8 C -42 -30 -20 -42 -6 -30 C 0 -48 28 -48 34 -28 C 52 -28 58 -8 46 4 C 56 20 40 26 28 26 Z", 0, 1870, C.panel);
      break;
    case "branch":
      body = (
        <>
          {circle(-22, -28, 14, 0, 1880, C.bg, 3)}
          {circle(-22, 28, 14, 0.1, 1881, C.bg, 3)}
          {circle(24, -12, 14, 0.2, 1882, C.bg, 3)}
          {path("M -22 -20 L -22 18", 0.3, 1883)}
          {path("M -22 -4 C -22 -18 8 -20 16 -12", 0.4, 1884)}
        </>
      );
      break;
    case "search":
      body = (
        <>
          {circle(-8, -8, 52, 0, 1890)}
          {line(16, 16, 40, 40, 0.3, 1891, 5)}
        </>
      );
      break;
    case "wrench":
      body = (
        <>
          {path("M -36 34 L 12 -14", 0, 1900, undefined)}
          {path("M 12 -14 C 2 -28 6 -44 20 -46 C 26 -48 32 -44 32 -38 C 32 -32 26 -30 24 -24 C 22 -18 28 -12 34 -14", 0.2, 1901)}
        </>
      );
      break;
    case "cap":
      body = (
        <>
          {path("M -42 -10 L 0 -30 L 42 -10 L 0 10 Z", 0, 1910, C.panel)}
          {line(0, 10, 0, 34, 0.3, 1911, 3)}
          {line(-36, -4, -36, 18, 0.36, 1912, 3)}
        </>
      );
      break;
    case "gate":
      body = (
        <>
          {line(-34, 34, -34, -34, 0.1, 1920, 4)}
          {line(34, 34, 34, -34, 0.15, 1921, 4)}
          {line(-34, 34, 34, 34, 0.2, 1922, 4)}
          {line(-34, -30, 20, -4, 0.3, 1923, 3.4)}
          {line(34, -30, 20, -4, 0.36, 1924, 3.4)}
          {circle(20, -4, 8, 0.42, 1925, color, 1.2)}
        </>
      );
      break;
    case "layers":
      body = (
        <>
          {[0, 1, 2, 3].map((i) => (
            <SketchPolygon key={i} points={[[-40, 12 + i * -16], [0, 30 + i * -16], [40, 12 + i * -16], [0, -6 + i * -16]]} start={p(i * 0.1)} dur={0.3} stroke={color} fill={i === 0 ? C.line : C.panel} seed={1930 + i} strokeWidth={2.4} />
          ))}
        </>
      );
      break;
    default:
      body = null;
  }
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{body}</g>;
};

/* ------------------------------------------------------------------ */
/* charts                                                              */
/* ------------------------------------------------------------------ */

export const MiniLineChart: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  points: {x: number; y: number; label?: string; color?: string}[];
  start?: number;
  color?: string;
  xLabels?: string[];
  yLabels?: string[];
  xTitle?: string;
  yTitle?: string;
  dotColor?: string;
  showArea?: boolean;
}> = ({x, y, w, h, points, start = -1, color = C.green, xLabels = [], yLabels = [], xTitle, yTitle, dotColor, showArea = false}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const p = easeOut(ramp(t, start, 1.2));
  const sx = (vx: number) => x + vx * w;
  const sy = (vy: number) => y + h - vy * h;
  // assume points sorted by x; draw polyline progressively
  const d = points.map((pt, i) => `${i === 0 ? "M" : "L"} ${sx(pt.x)} ${sy(pt.y)}`).join(" ");
  return (
    <g>
      {yLabels.map((lab, i) => (
        <g key={i}>
          <SketchLine x1={x} y1={y + (h * i) / Math.max(1, yLabels.length - 1)} x2={x + w} y2={y + (h * i) / Math.max(1, yLabels.length - 1)} start={start - 0.1} dur={0.4} stroke={C.line} strokeWidth={1.6} seed={2000 + i} opacity={0.45} />
          <Label text={lab} x={x - 16} y={y + (h * i) / Math.max(1, yLabels.length - 1)} size={34} color={C.soft} align="right" start={start} />
        </g>
      ))}
      <SketchLine x1={x} y1={y + h} x2={x + w} y2={y + h} start={start - 0.1} dur={0.5} stroke={C.soft} strokeWidth={3} seed={2010} />
      <SketchLine x1={x} y1={y} x2={x} y2={y + h} start={start - 0.1} dur={0.5} stroke={C.soft} strokeWidth={3} seed={2011} />
      {xLabels.map((lab, i) => (
        <Label key={i} text={lab} x={x + (w * i) / Math.max(1, xLabels.length - 1)} y={y + h + 36} size={34} color={C.soft} start={start + 0.1} />
      ))}
      {showArea ? <path d={`${d} L ${sx(points[points.length - 1].x)} ${y + h} L ${sx(points[0].x)} ${y + h} Z`} fill={color} opacity={0.08 * p} /> : null}
      <path d={d} fill="none" stroke={color} strokeWidth={0} opacity={0} />
      <SketchPath d={d} start={start + 0.1} dur={1.2} stroke={color} strokeWidth={4} seed={2020} />
      {points.map((pt, i) => {
        const local = Math.min(1, Math.max(0, (p - i / (points.length + 1)) * 3));
        return (
          <g key={i} opacity={local}>
            <SketchCircle x={sx(pt.x)} y={sy(pt.y)} d={pt.color ? 16 : 12} start={start + 0.1 + (i / points.length) * 0.9} dur={0.16} stroke={pt.color ?? dotColor ?? color} fill={pt.color ?? dotColor ?? color} seed={2030 + i} strokeWidth={1.4} />
            {pt.label ? <Label text={pt.label} x={sx(pt.x)} y={sy(pt.y) - 34} size={36} color={pt.color ?? color} start={start + 0.15 + (i / points.length) * 0.9} /> : null}
          </g>
        );
      })}
      {xTitle ? <Label text={xTitle} x={x + w / 2} y={y + h + 84} size={38} color={C.soft} start={start + 0.2} /> : null}
      {yTitle ? <Label text={yTitle} x={x} y={y - 26} size={34} color={C.soft} align="left" start={start + 0.2} /> : null}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* small utilities                                                     */
/* ------------------------------------------------------------------ */

export const useOpacity = (start: number, dur = 0.4, dim = 1) => {
  const frame = useCurrentFrame();
  return ramp(frame / 30, start, dur) * dim;
};

export const Dim: React.FC<{from: number; to: number; dim?: number; children: React.ReactNode}> = ({from, to, dim = 0.35, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const a = ramp(t, from, 0.5);
  const b = to > from ? ramp(t, to, 0.5) : 0;
  const o = 1 - (1 - dim) * Math.max(0, a - b);
  return <g opacity={o}>{children}</g>;
};
