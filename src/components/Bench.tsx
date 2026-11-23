import React from "react";
import {useCurrentFrame, useVideoConfig} from "remotion";
import {C, FONT_DISPLAY} from "../theme";
import {Label, SketchLine, SketchRect, easeOut, ramp} from "./Sketch";
import {Chip, Icon, IconName, Rule, ScoreBars} from "./Kit";

export type MetaChip = {text: string; at: number; color?: string};

export const BenchTitle: React.FC<{
  name: string;
  check?: string;
  meta?: MetaChip[];
  startName: number;
  startCheck?: number;
  accent?: string;
  y?: number;
  size?: number;
}> = ({name, check, meta = [], startName, startCheck, accent = C.green, y = 168, size = 72}) => {
  const widths = meta.map((m) => Math.max(110, m.text.length * 36 * 0.48 + 50));
  const gap = 24;
  const total = widths.reduce((a, b) => a + b, 0) + gap * Math.max(0, meta.length - 1);
  let cursor = 960 - total / 2;
  return (
    <g>
      <Label text={name} x={960} y={y} size={size} color={C.fg} start={startName} font={FONT_DISPLAY} />
      {check ? <Label text={check} x={960} y={y + 66} size={40} color={C.soft} start={startCheck ?? startName + 0.2} /> : null}
      <g>
        {meta.map((m, i) => {
          const w = widths[i];
          const at = cursor;
          cursor += w + gap;
          return <Chip key={i} x={at + w / 2} y={y + 146} w={w} text={m.text} color={m.color ?? accent} textColor={m.color ?? accent} start={m.at} size={36} h={52} />;
        })}
      </g>
      <SketchLine x1={330} y1={y + 204} x2={1590} y2={y + 204} start={startName + 0.3} dur={0.6} stroke={C.line} strokeWidth={2.4} seed={4100} opacity={0.55} />
    </g>
  );
};

export const BenchBars: React.FC<{
  mini: number;
  qwen: number;
  startMini: number;
  startQwen: number;
  unit?: string;
  domain?: number;
  gap?: string;
  gapColor?: string;
  startGap?: number;
  y?: number;
  w?: number;
}> = ({mini, qwen, startMini, startQwen, unit = "%", domain = 100, gap, gapColor = C.green, startGap, y = 490, w = 800}) => (
  <ScoreBars
    x={540}
    y={y}
    w={w}
    domain={domain}
    mini={mini}
    qwen={qwen}
    startMini={startMini}
    startQwen={startQwen}
    unit={unit}
    gapLabel={gap}
    gapColor={gapColor}
    startGap={startGap}
  />
);

export const BenchFoot: React.FC<{
  text: string;
  at: number;
  color?: string;
  y?: number;
  icon?: IconName;
  size?: number;
  align?: "center" | "left";
  x?: number;
}> = ({text, at, color = C.soft, y = 890, icon, size = 38, align = "center", x = 960}) => (
  <g>
    {icon ? <Icon name={icon} x={x - (align === "center" ? text.length * size * 0.24 : 0) - 40} y={y - 4} s={0.44} color={color} start={at} /> : null}
    <Label text={text} x={x + (icon ? 20 : 0)} y={y} size={size} color={color} start={at} align={align} />
  </g>
);

export const BenchNote: React.FC<{
  title: string;
  body?: string;
  at: number;
  bodyAt?: number;
  color?: string;
  x?: number;
  y?: number;
  w?: number;
  icon?: IconName;
}> = ({title, body, at, bodyAt, color = C.yellow, x = 960, y = 880, w = 900, icon}) => (
  <g>
    <SketchRect x={x - w / 2} y={y - 66} w={w} h={body ? 126 : 92} start={at} dur={0.4} stroke={color} fill={C.panel} radius={12} seed={4200} strokeWidth={2.8} />
    {icon ? <Icon name={icon} x={x - w / 2 + 46} y={y - 4} s={0.5} color={color} start={at + 0.1} /> : null}
    <Label text={title} x={x + (icon ? 30 : 0)} y={body ? y - 26 : y} size={42} color={color} start={at + 0.12} />
    {body ? <Label text={body} x={x + (icon ? 30 : 0)} y={y + 30} size={36} color={C.soft} start={bodyAt ?? at + 0.25} /> : null}
  </g>
);

export const BenchIllustrationCard: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  start?: number;
  color?: string;
  children: React.ReactNode;
  seed?: number;
}> = ({x, y, w = 420, h = 200, start = -1, color = C.line, children, seed = 4300}) => (
  <g>
    <SketchRect x={x - w / 2} y={y - h / 2} w={w} h={h} start={start} dur={0.45} stroke={color} fill={C.panel} radius={14} seed={seed} strokeWidth={2.6} />
    {children}
  </g>
);

/** A small animated count-up number, in the display face. */
export const BenchTicker: React.FC<{
  x: number;
  y: number;
  to: number;
  from?: number;
  start: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  size?: number;
  color?: string;
  align?: "center" | "left" | "right";
}> = ({x, y, to, from = 0, start, decimals = 1, prefix = "", suffix = "", size = 96, color = C.fg, align = "center"}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = easeOut(ramp(frame / fps, start, 1.0));
  const v = from + (to - from) * p;
  return <Label text={`${prefix}${v.toFixed(decimals)}${suffix}`} x={x} y={y} size={size} color={color} start={start} align={align} font={FONT_DISPLAY} />;
};
