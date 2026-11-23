import React from "react";
import {C, FONT_BODY, FONT_DISPLAY} from "../theme";
import {
  Label,
  SketchCircle,
  SketchLine,
  SketchPath,
  SketchPolygon,
  SketchRect,
  clamp01,
  easeOut,
  ramp,
} from "./Sketch";
import {useT} from "./useT";

export const Bar: React.FC<{
  x: number;
  y: number;
  w: number;
  h?: number;
  value: number;
  start?: number;
  color?: string;
  track?: string;
  progress?: number;
  seed?: number;
  label?: string;
  labelColor?: string;
  valueLabel?: string;
}> = ({
  x,
  y,
  w,
  h = 28,
  value,
  start = -1,
  color = C.green,
  track = C.well,
  progress,
  seed = 3000,
  label,
  labelColor,
  valueLabel,
}) => {
  const t = useT();
  const p = progress ?? easeOut(ramp(t, start + 0.1, 0.7));
  const v = clamp01(value) * p;
  return (
    <g>
      <SketchRect x={x} y={y} w={w} h={h} start={start} dur={0.35} stroke={C.line} fill={track} radius={h / 2} seed={seed} strokeWidth={2.4} />
      {v > 0.005 ? (
        <SketchRect x={x + 3} y={y + 3} w={Math.max(6, (w - 6) * v)} h={h - 6} start={start + 0.15} dur={0.4} stroke={color} fill={color} radius={(h - 6) / 2} seed={seed + 1} strokeWidth={2} />
      ) : null}
      {label ? <Label text={label} x={x} y={y - 26} size={36} color={labelColor ?? C.soft} align="left" start={start + 0.2} /> : null}
      {valueLabel ? <Label text={valueLabel} x={x + w} y={y - 26} size={36} color={labelColor ?? color} align="right" start={start + 0.3} /> : null}
    </g>
  );
};

export const NumberTicker: React.FC<{
  x: number;
  y: number;
  from?: number;
  to: number;
  start?: number;
  dur?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  size?: number;
  color?: string;
  font?: "Caveat" | "Patrick Hand";
  align?: "center" | "left" | "right";
}> = ({
  x,
  y,
  from = 0,
  to,
  start = -1,
  dur = 1.1,
  decimals = 0,
  prefix = "",
  suffix = "",
  size = 120,
  color = C.fg,
  font = FONT_DISPLAY,
  align = "center",
}) => {
  const t = useT();
  const p = easeOut(ramp(t, start, dur));
  const v = from + (to - from) * p;
  const txt = `${prefix}${v.toFixed(decimals)}${suffix}`;
  return <Label text={txt} x={x} y={y} size={size} color={color} font={font} align={align} start={start} />;
};

export const ProbCard: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  name: string;
  value: number;
  start?: number;
  color?: string;
  winner?: boolean;
  dim?: boolean;
  seed?: number;
  barDelay?: number;
}> = ({x, y, w = 360, h = 132, name, value, start = -1, color = C.cyan, winner = false, dim = false, seed = 3100, barDelay = 0.2}) => {
  const t = useT();
  const p = easeOut(ramp(t, start + barDelay, 0.8));
  const v = clamp01(value) * p;
  return (
    <g opacity={dim ? 0.55 : 1}>
      <SketchRect
        x={x - w / 2}
        y={y - h / 2}
        w={w}
        h={h}
        start={start}
        dur={0.45}
        stroke={winner ? C.green : C.line}
        fill={winner ? C.line : C.panel}
        radius={10}
        seed={seed}
        strokeWidth={winner ? 4 : 2.8}
      />
      <Label text={name} x={x - w / 2 + 24} y={y - 26} size={42} color={winner ? C.green : C.fg} align="left" start={start + 0.12} />
      <Label text={`${Math.round(value * 100)}%`} x={x + w / 2 - 24} y={y - 28} size={44} color={winner ? C.green : color} align="right" start={start + 0.2} />
      <SketchRect x={x - w / 2 + 24} y={y + 16} w={w - 48} h={18} start={start + barDelay} dur={0.35} stroke={C.line} fill={C.well} radius={9} seed={seed + 1} strokeWidth={2} />
      {v > 0.004 ? (
        <SketchRect x={x - w / 2 + 27} y={y + 19} w={Math.max(4, (w - 54) * v)} h={12} start={start + barDelay + 0.15} dur={0.3} stroke={winner ? C.green : color} fill={winner ? C.green : color} radius={6} seed={seed + 2} strokeWidth={1.6} />
      ) : null}
      {winner ? (
        <g>
          <SketchCircle x={x + w / 2 - 4} y={y - h / 2 + 2} d={30} start={start + 0.5} dur={0.25} stroke={C.green} fill={C.green} seed={seed + 3} strokeWidth={2} />
          <SketchPath d={`M ${x + w / 2 - 14} ${y - h / 2 + 2} L ${x + w / 2 - 6} ${y - h / 2 + 10} L ${x + w / 2 + 6} ${y - h / 2 - 6}`} start={start + 0.6} dur={0.25} stroke={C.bg} strokeWidth={3.4} seed={seed + 4} />
        </g>
      ) : null}
    </g>
  );
};

export const ReliabilityPlot: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  start?: number;
  color?: string;
  curve?: "over" | "under" | "calibrated";
  showDiagonal?: boolean;
  labels?: boolean;
  seed?: number;
}> = ({x, y, w = 420, h = 420, start = -1, color = C.purple, curve = "over", showDiagonal = true, labels = true, seed = 3200}) => {
  const t = useT();
  const p = easeOut(ramp(t, start + 0.3, 0.9));
  // plot area
  const px = x + 50;
  const py = y + h - 50;
  const pw = w - 80;
  const ph = h - 80;
  const diag = `M ${px} ${py} L ${px + pw} ${py - ph}`;
  const over = `M ${px} ${py - ph * 0.06} C ${px + pw * 0.35} ${py - ph * 0.18}, ${px + pw * 0.7} ${py - ph * 0.38}, ${px + pw} ${py - ph}`;
  const under = `M ${px} ${py} C ${px + pw * 0.3} ${py - ph * 0.62}, ${px + pw * 0.7} ${py - ph * 0.82}, ${px + pw} ${py - ph}`;
  const calibrated = diag;
  const d = curve === "over" ? over : curve === "under" ? under : calibrated;
  return (
    <g>
      {/* axes */}
      <SketchLine x1={px} y1={py} x2={px + pw} y2={py} start={start} dur={0.45} stroke={C.soft} strokeWidth={3.2} seed={seed} />
      <SketchLine x1={px} y1={py} x2={px} y2={py - ph} start={start + 0.08} dur={0.45} stroke={C.soft} strokeWidth={3.2} seed={seed + 1} />
      {[0.25, 0.5, 0.75].map((v, i) => (
        <g key={i}>
          <SketchLine x1={px + pw * v} y1={py} x2={px + pw * v} y2={py + 8} start={start + 0.2} dur={0.2} stroke={C.soft} strokeWidth={2} seed={seed + 2 + i} />
          <SketchLine x1={px - 8} y1={py - ph * v} x2={px} y2={py - ph * v} start={start + 0.2} dur={0.2} stroke={C.soft} strokeWidth={2} seed={seed + 6 + i} />
        </g>
      ))}
      {showDiagonal ? (
        <SketchPath d={diag} start={start + 0.25} dur={0.6} stroke={C.line} strokeWidth={2.6} seed={seed + 10} dash={true} />
      ) : null}
      <SketchPath d={d} start={start + 0.45} dur={1.1} stroke={color} strokeWidth={4.2} seed={seed + 11} />
      {[0, 0.25, 0.5, 0.75, 1].map((v, i) => {
        const dv = curve === "over" ? Math.pow(v, 1.55) * 0.94 : curve === "under" ? Math.pow(v, 0.7) : v;
        return <SketchCircle key={i} x={px + pw * v} y={py - ph * dv} d={12} start={start + 0.6 + i * 0.09} dur={0.2} stroke={color} fill={C.bg} seed={seed + 20 + i} strokeWidth={2.6} />;
      })}
      {labels ? (
        <g>
          <Label text="confidence" x={px + pw / 2} y={py + 46} size={36} color={C.soft} start={start + 0.5} />
          <Label text="accuracy" x={px - 8} y={py - ph - 24} size={36} color={C.soft} align="left" start={start + 0.55} />
          <Label text="0" x={px - 18} y={py} size={34} color={C.soft} align="right" start={start + 0.55} />
          <Label text="100" x={px + pw + 4} y={py + 26} size={34} color={C.soft} align="left" start={start + 0.6} />
        </g>
      ) : null}
      <text x={0} y={0} opacity={p * 0} />
    </g>
  );
};

export const LineChart: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  series: {points: number[]; color: string; dashed?: boolean; label?: string}[];
  start?: number;
  labels?: boolean;
  seed?: number;
}> = ({x, y, w = 520, h = 340, series, start = -1, labels = true, seed = 3300}) => {
  const t = useT();
  const p = easeOut(ramp(t, start + 0.3, 1.2));
  const px = x + 40;
  const py = y + h - 40;
  const pw = w - 70;
  const ph = h - 80;
  return (
    <g>
      <SketchLine x1={px} y1={py} x2={px + pw} y2={py} start={start} dur={0.4} stroke={C.soft} strokeWidth={3} seed={seed} />
      <SketchLine x1={px} y1={py} x2={px} y2={py - ph} start={start + 0.05} dur={0.4} stroke={C.soft} strokeWidth={3} seed={seed + 1} />
      {series.map((s, si) => {
        const pts = s.points.map((v, i) => [px + (i / (s.points.length - 1)) * pw, py - v * ph] as [number, number]);
        const visible = Math.max(2, Math.ceil(p * pts.length));
        const d = pts
          .slice(0, visible)
          .map((pt, i) => `${i === 0 ? "M" : "L"} ${pt[0]} ${pt[1]}`)
          .join(" ");
        return (
          <g key={si}>
            <SketchPath d={d} start={start + 0.25 + si * 0.2} dur={0.8} stroke={s.color} strokeWidth={4} seed={seed + 10 + si} />
            {pts.slice(0, visible).filter((_, i) => i % 2 === 0 || i === pts.length - 1).map((pt, i) => (
              <SketchCircle key={i} x={pt[0]} y={pt[1]} d={10} start={start + 0.4 + si * 0.2} dur={0.15} stroke={s.color} fill={C.bg} seed={seed + 20 + si * 10 + i} strokeWidth={2.4} />
            ))}
            {s.label ? (
              <Label text={s.label} x={px + pw} y={py - ph - 18 - si * 42} size={36} color={s.color} align="right" start={start + 0.7 + si * 0.15} />
            ) : null}
          </g>
        );
      })}
      {labels ? (
        <g>
          <Label text="training" x={px + pw / 2} y={py + 42} size={34} color={C.soft} start={start + 0.5} />
          <Label text="time" x={px - 14} y={py - ph - 22} size={34} color={C.soft} align="left" start={start + 0.55} />
        </g>
      ) : null}
    </g>
  );
};

export const LedgerRow: React.FC<{
  x: number;
  y: number;
  w?: number;
  start?: number;
  left: string;
  mid: string;
  right: string;
  color?: string;
  dim?: boolean;
  seed?: number;
}> = ({x, y, w = 1000, start = -1, left, mid, right, color = C.green, dim = false, seed = 3400}) => (
  <g opacity={dim ? 0.5 : 1}>
    <SketchLine x1={x - w / 2} y1={y + 52} x2={x + w / 2} y2={y + 52} start={start} dur={0.4} stroke={C.line} strokeWidth={2.4} seed={seed} />
    <Label text={left} x={x - w / 2 + 20} y={y} size={42} color={C.fg} align="left" start={start + 0.1} />
    <Label text={mid} x={x + w * 0.1} y={y} size={42} color={C.soft} align="center" start={start + 0.2} />
    <Label text={right} x={x + w / 2 - 20} y={y} size={48} color={color} align="right" start={start + 0.3} font={FONT_DISPLAY} />
  </g>
);

export const Funnel: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  start?: number;
  color?: string;
  label?: string;
  seed?: number;
}> = ({x, y, w = 300, h = 280, start = -1, color = C.pink, label = "softmax", seed = 3500}) => {
  const topW = w;
  const botW = w * 0.22;
  return (
    <g>
      <SketchPolygon
        points={[
          [x - topW / 2, y],
          [x + topW / 2, y],
          [x + botW / 2, y + h],
          [x - botW / 2, y + h],
        ]}
        start={start}
        dur={0.55}
        stroke={color}
        fill={C.panel}
        fillStart={start + 0.3}
        seed={seed}
        strokeWidth={3.6}
      />
      {[0.25, 0.5, 0.75].map((v, i) => (
        <SketchLine key={i} x1={x - topW / 2 + topW * 0.08} y1={y + h * v} x2={x + topW / 2 - topW * 0.08} y2={y + h * v} start={start + 0.3 + i * 0.05} dur={0.25} stroke={C.soft} strokeWidth={2} seed={seed + 1 + i} opacity={0.3} />
      ))}
      <Label text={label} x={x} y={y + h + 44} size={38} color={color} start={start + 0.4} />
    </g>
  );
};

export const ScatterDots: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  n?: number;
  filled?: number;
  start?: number;
  color?: string;
  seed?: number;
}> = ({x, y, w, h, n = 100, filled = 0, start = -1, color = C.green, seed = 3600}) => {
  const cols = 10;
  const cw = w / cols;
  const rows = Math.ceil(n / cols);
  const ch = h / rows;
  return (
    <g>
      {Array.from({length: n}).map((_, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        const on = i < filled;
        return (
          <SketchCircle
            key={i}
            x={x + c * cw + cw / 2}
            y={y + r * ch + ch / 2}
            d={Math.min(cw, ch) * (on ? 0.58 : 0.45)}
            start={start + i * 0.008}
            dur={0.15}
            stroke={on ? color : C.line}
            fill={on ? color : C.well}
            seed={seed + i}
            strokeWidth={on ? 2.2 : 1.6}
            opacity={on ? 0.95 : 0.75}
          />
        );
      })}
    </g>
  );
};

export const ScoreBar: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  value: number;
  start?: number;
  color?: string;
  label?: string;
  sub?: string;
  positive?: boolean;
  seed?: number;
}> = ({x, y, w = 80, h = 240, value, start = -1, color = C.purple, label, sub, positive = true, seed = 3700}) => {
  const t = useT();
  const p = easeOut(ramp(t, start + 0.2, 0.8));
  const v = clamp01(value) * p;
  return (
    <g>
      <SketchLine x1={x - 40} y1={y} x2={x + 40} y2={y} start={start} dur={0.3} stroke={C.line} strokeWidth={2.4} seed={seed} />
      <SketchRect x={x - 4} y={y - h * v} w={8} h={h * v} start={start} dur={0.1} stroke="none" fill={color} seed={seed + 1} opacity={0.9} />
      <SketchLine x1={x - 4} y1={y} x2={x - 4} y2={y - h} start={start + 0.1} dur={0.3} stroke={C.line} strokeWidth={2} seed={seed + 2} opacity={0.5} />
      <SketchCircle x={x} y={y - h * v} d={14} start={start + 0.35} dur={0.2} stroke={color} fill={color} seed={seed + 3} strokeWidth={2} />
      {label ? <Label text={label} x={x} y={y + 40} size={36} color={color} start={start + 0.4} /> : null}
      {sub ? <Label text={sub} x={x} y={y + 82} size={32} color={C.soft} start={start + 0.5} /> : null}
      {positive ? null : null}
    </g>
  );
};

export const Gauge: React.FC<{
  x: number;
  y: number;
  r?: number;
  value: number;
  start?: number;
  color?: string;
  label?: string;
  ticks?: string[];
  seed?: number;
}> = ({x, y, r = 100, value, start = -1, color = C.green, label, ticks, seed = 3800}) => {
  const v = Math.max(0.01, Math.min(0.99, value));
  const ang = Math.PI + Math.PI * v;
  const ex = x + Math.cos(ang) * r;
  const ey = y + Math.sin(ang) * r;
  return (
    <g>
      <SketchPath d={`M ${x - r} ${y} A ${r} ${r} 0 0 1 ${x + r} ${y}`} start={start} dur={0.6} stroke={C.line} strokeWidth={12} seed={seed} />
      {Array.from({length: 9}).map((_, i) => {
        const a = Math.PI + (i / 8) * Math.PI;
        return (
          <SketchLine
            key={i}
            x1={x + Math.cos(a) * (r - 14)}
            y1={y + Math.sin(a) * (r - 14)}
            x2={x + Math.cos(a) * (r - (i % 4 === 0 ? 28 : 20))}
            y2={y + Math.sin(a) * (r - (i % 4 === 0 ? 28 : 20))}
            start={start + 0.2 + i * 0.02}
            dur={0.15}
            stroke={C.soft}
            strokeWidth={2}
            seed={seed + 1 + i}
          />
        );
      })}
      <SketchPath d={`M ${x - r} ${y} A ${r} ${r} 0 0 1 ${ex} ${ey}`} start={start + 0.2} dur={0.8} stroke={color} strokeWidth={12} seed={seed + 10} />
      <SketchLine x1={x} y1={y} x2={x + Math.cos(ang) * r * 0.78} y2={y + Math.sin(ang) * r * 0.78} start={start + 0.3} dur={0.2} stroke={C.fg} strokeWidth={3.4} seed={seed + 11} />
      <SketchCircle x={x} y={y} d={16} start={start + 0.35} dur={0.15} stroke={C.fg} fill={C.fg} seed={seed + 12} strokeWidth={1.6} />
      {ticks ? (
        <g>
          {ticks.map((t, i) => {
            const a = Math.PI + (i / (ticks.length - 1)) * Math.PI;
            return <Label key={i} text={t} x={x + Math.cos(a) * (r + 26)} y={y + Math.sin(a) * (r + 26) + 8} size={36} color={C.soft} start={start + 0.4} />;
          })}
        </g>
      ) : null}
      {label ? <Label text={label} x={x} y={y + 54} size={40} color={color} start={start + 0.45} /> : null}
    </g>
  );
};
