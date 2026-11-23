import React from "react";
import {C, FONT_DISPLAY} from "../theme";
import {at, clamp, easeInOut, easeOut, prog} from "../timing";
import {
  Arrow,
  Label,
  Pop,
  Scribble,
  SketchCircle,
  SketchEllipse,
  SketchLine,
  SketchPath,
  SketchPolygon,
  SketchRect,
} from "../components/Sketch";
import {
  Callout,
  Caption,
  Chip,
  DotField,
  Heading,
  Icon,
  MiniLineChart,
  MiniNote,
  Rule,
  Stat,
} from "../components/Kit";
import {InkMark} from "../components/Brand";
import {Book, DocPage, LookupTable, Spark} from "../components/Art";
import {SceneProps, useClock} from "./types";

const Fade: React.FC<{t: number; start: number; dur?: number; children: React.ReactNode; dim?: number}> = ({
  t,
  start,
  dur = 0.45,
  children,
  dim = 1,
}) => <g opacity={prog(t, start, dur) * dim}>{children}</g>;

/** The 24-layer stack used by several scenes. */
const LayerBlocks: React.FC<{
  t: number;
  x?: number;
  y?: number;
  w?: number;
  active?: "none" | "middle" | "first" | "last";
  start?: number;
  showNumbers?: boolean;
}> = ({t, x = 760, y = 200, w = 300, active = "none", start = -1, showNumbers = true}) => {
  const rows = 24;
  const h = 17;
  const gap = 3;
  const blockGap = 22;
  const yOf = (i: number) => y + i * (h + gap) + Math.floor(i / 6) * (blockGap - gap);
  return (
    <g>
      {Array.from({length: rows}).map((_, i) => {
        const block = Math.floor(i / 6);
        const isMid = block === 1 || block === 2;
        const on = active === "middle" ? isMid : active === "first" ? block === 0 : active === "last" ? block === 3 : false;
        return (
          <SketchRect
            key={i}
            x={x}
            y={yOf(i)}
            w={w}
            h={h}
            start={start + i * 0.012}
            dur={0.2}
            stroke={on ? C.green : C.line}
            fill={on ? C.panel : C.well}
            radius={3}
            seed={5000 + i}
            strokeWidth={on ? 2.4 : 1.8}
            opacity={active === "none" ? 0.85 : on ? 1 : 0.38}
          />
        );
      })}
      {showNumbers
        ? [0, 1, 2, 3].map((b) => (
            <g key={b}>
              <Label text={`${b + 1}`} x={x - 38} y={yOf(b * 6) + 60} size={38} color={b === 1 || b === 2 ? C.green : C.soft} start={start + 0.4 + b * 0.08} font={FONT_DISPLAY} />
              <Label text="6 layers" x={x + w + 22} y={yOf(b * 6) + 60} size={36} color={C.soft} align="left" start={start + 0.45 + b * 0.08} />
            </g>
          ))
        : null}
    </g>
  );
};

/* ================================================================== */
/* 16 — 24 layers, four blocks of six                                 */
/* ================================================================== */

export const S16_Layers: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const layers = b(at("Picture its 24 layers"));
  const blocks = b(at("four blocks of six"));
  const normal = b(at("A normal model"));
  const once = b(at("each layer once"));
  const topBottom = b(at("top to bottom"));

  return (
    <>
      <LayerBlocks t={t} x={780} y={210} w={320} active="none" start={layers} />

      <g opacity={prog(t, blocks, 0.45)}>
        <SketchRect x={1320} y={276} w={330} h={150} start={blocks} dur={0.45} stroke={C.green} fill={C.panel} radius={14} seed={5100} strokeWidth={3} />
        <Label text="4 × 6" x={1485} y={334} size={82} color={C.green} start={blocks + 0.1} font={FONT_DISPLAY} />
        <Label text="24 layers" x={1485} y={388} size={38} color={C.soft} start={blocks + 0.25} />
      </g>

      <Fade t={t} start={normal}>
        <g>
          <Chip x={1410} y={660} text="normal model" color={C.soft} textColor={C.fg} start={normal} size={40} w={330} />
          <Label text="1× each" x={1410} y={750} size={46} color={C.cyan} start={once} />
          <Label text="top → bottom" x={1410} y={806} size={38} color={C.soft} start={topBottom} />
          <Arrow x1={1230} y1={300} x2={1230} y2={820} start={normal + 0.2} dur={1.0} stroke={C.cyan} strokeWidth={4} seed={5110} head={18} />
          <SketchCircle x={1230} y={300} d={22} start={normal + 0.1} dur={0.2} stroke={C.cyan} fill={C.cyan} seed={5111} strokeWidth={1.6} />
          <SketchLine x1={1280} y1={660} x2={1235} y2={660} start={normal + 0.3} dur={0.25} stroke={C.line} strokeWidth={2.4} seed={5112} opacity={0.6} />
        </g>
      </Fade>

      <Rule y={920} x1={320} x2={1600} start={layers} opacity={0.3} />
    </>
  );
};

/* ================================================================== */
/* 17 — Mini's loop schedule                                          */
/* ================================================================== */

export const S17_Schedule: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const first = b(at("The first block runs once"));
  const middle = b(at("the two middle blocks"));
  const twelve = b(at("twelve layers in all"));
  const three = b(at("run three times"));
  const same = b(at("using the same weights"));
  const last = b(at("Then the last block runs once"));

  return (
    <>
      <LayerBlocks t={t} x={780} y={210} w={320} active="middle" start={-1} showNumbers={false} />

      <g opacity={prog(t, first, 0.4)}>
        <Label text="1×" x={650} y={290} size={56} color={C.cyan} font={FONT_DISPLAY} />
        <SketchLine x1={680} y1={290} x2={762} y2={290} start={first} dur={0.25} stroke={C.cyan} strokeWidth={2.8} seed={5200} />
      </g>
      <g opacity={prog(t, middle, 0.4)}>
        <SketchRect x={700} y={400} w={22} h={370} start={middle} dur={0.4} stroke={C.green} fill="none" radius={4} seed={5210} strokeWidth={3} />
        <Label text="middle · 12 layers" x={960} y={890} size={38} color={C.green} start={twelve} />
      </g>
      <g opacity={prog(t, three, 0.45)}>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <SketchPath d={`M 1165 350 C ${1300 + i * 52} 380, ${1300 + i * 52} 660, 1170 690`} start={three + i * 0.22} dur={0.5} stroke={i === 2 ? C.green : C.cyan} strokeWidth={3.2} seed={5220 + i} />
            <SketchLine x1={1170} y1={690} x2={1192} y2={672} start={three + i * 0.22 + 0.45} dur={0.16} stroke={i === 2 ? C.green : C.cyan} strokeWidth={3.2} seed={5224 + i} />
            <SketchLine x1={1170} y1={690} x2={1188} y2={706} start={three + i * 0.22 + 0.48} dur={0.16} stroke={i === 2 ? C.green : C.cyan} strokeWidth={3.2} seed={5227 + i} />
          </g>
        ))}
        <Label text="×3" x={1480} y={570} size={150} color={C.green} start={three + 0.3} font={FONT_DISPLAY} />
        <Label text="same weights" x={1480} y={660} size={38} color={C.soft} start={same + 0.2} />
      </g>
      <g opacity={prog(t, last, 0.4)}>
        <Label text="1×" x={650} y={820} size={56} color={C.cyan} font={FONT_DISPLAY} />
        <SketchLine x1={680} y1={820} x2={762} y2={820} start={last} dur={0.25} stroke={C.cyan} strokeWidth={2.8} seed={5230} />
      </g>
      <Rule y={920} x1={320} x2={1600} start={-1} opacity={0.25} />
    </>
  );
};

/* ================================================================== */
/* 18 — 6 + 12×3 + 6 = 48                                             */
/* ================================================================== */

export const S18_Arithmetic: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const six = b(at("Six, plus twelve times three"));
  const twelve = b(at("twelve times three"));
  const that = b(at("That's 48 layer applications"));
  const stored = b(at("from only 24 layers"));
  const small = b(at("The file stays small"));
  const depth = b(at("more depth to think with"));

  return (
    <>
      <Label text="6" x={680} y={370} size={130} color={C.cyan} start={six} font={FONT_DISPLAY} />
      <Label text="+" x={770} y={370} size={96} color={C.soft} start={six + 0.15} />
      <Label text="12" x={880} y={370} size={130} color={C.green} start={twelve} font={FONT_DISPLAY} />
      <Label text="× 3" x={1015} y={370} size={104} color={C.green} start={twelve + 0.2} font={FONT_DISPLAY} />
      <Label text="+" x={1165} y={370} size={96} color={C.soft} start={twelve + 0.5} />
      <Label text="6" x={1255} y={370} size={130} color={C.cyan} start={twelve + 0.65} font={FONT_DISPLAY} />

      <g opacity={prog(t, that, 0.45)}>
        <Label text="=" x={760} y={560} size={100} color={C.soft} start={that} />
        <Label text="48" x={930} y={570} size={190} color={C.yellow} start={that + 0.1} font={FONT_DISPLAY} />
        <Label text="layer applications per token" x={1200} y={545} size={40} color={C.soft} align="left" start={that + 0.25} />
        <Label text="from 24 stored layers" x={1200} y={600} size={36} color={C.soft} align="left" start={that + 0.35} />
      </g>

      <g opacity={prog(t, stored, 0.45)}>
        <SketchRect x={350} y={740} w={520} h={130} start={stored} dur={0.4} stroke={C.cyan} fill={C.panel} radius={14} seed={5300} strokeWidth={2.8} />
        <Label text="24 layers stored" x={610} y={782} size={46} color={C.cyan} start={stored + 0.1} />
        <Label text="the file stays small" x={610} y={834} size={36} color={C.soft} start={small} />
      </g>
      <g opacity={prog(t, depth, 0.45)}>
        <SketchRect x={960} y={740} w={520} h={130} start={depth - 0.2} dur={0.4} stroke={C.green} fill={C.panel} radius={14} seed={5310} strokeWidth={2.8} />
        <Label text="48 visits" x={1220} y={782} size={46} color={C.green} start={depth - 0.1} />
        <Label text="far more depth" x={1220} y={834} size={36} color={C.soft} start={depth + 0.1} />
      </g>
      <Rule y={930} x1={300} x2={1620} start={six} opacity={0.25} />
    </>
  );
};

/* ================================================================== */
/* 19 — three drafts and the message                                  */
/* ================================================================== */

export const S19_Drafts: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const fair = b(at("A fair way to picture it"));
  const three = b(at("three drafts of the same paragraph"));
  const notes = b(at("prepared notes"));
  const output = b(at("output of the first block"));
  const drafts = b(at("Drafts two and three"));
  const message = b(at("which the lab calls a message"));

  const xs = [560, 960, 1360];
  return (
    <>
      <g opacity={prog(t, notes, 0.45)}>
        <SketchRect x={780} y={180} w={360} h={118} start={notes} dur={0.45} stroke={C.yellow} fill={C.panel} radius={12} seed={5400} strokeWidth={3} />
        <Label text="prepared notes" x={960} y={228} size={42} color={C.yellow} start={notes + 0.1} />
        <Label text="from block 1" x={960} y={272} size={36} color={C.soft} start={output} />
      </g>
      {xs.map((x, i) => (
        <g key={i}>
          <Arrow x1={960} y1={300} x2={x} y2={360} start={notes + 0.25 + i * 0.12} dur={0.4} stroke={C.line} strokeWidth={3} seed={5403 + i} head={12} opacity={0.8} />
          <g transform={`rotate(${i === 0 ? -3 : i === 2 ? 3 : 0} ${x} 560)`}>
            <DocPage x={x - 140} y={380} w={280} h={300} start={three + i * 0.14} color={i === 1 ? C.green : C.soft} lines={5} />
          </g>
          <Label text={`draft ${i + 1}`} x={x} y={735} size={44} color={i === 1 ? C.green : C.fg} start={three + i * 0.14 + 0.2} font={FONT_DISPLAY} />
        </g>
      ))}
      <g opacity={prog(t, drafts, 0.4)}>
        <Arrow x1={700} y1={540} x2={810} y2={540} start={drafts} dur={0.3} stroke={C.pink} strokeWidth={3.2} seed={5410} head={12} />
        <Arrow x1={1100} y1={540} x2={1210} y2={540} start={drafts + 0.25} dur={0.3} stroke={C.pink} strokeWidth={3.2} seed={5411} head={12} />
        <Chip x={960} y={840} text="a message" color={C.pink} textColor={C.pink} start={message} size={40} w={240} />
        <Label text="draft → draft" x={960} y={900} size={36} color={C.soft} start={message + 0.2} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 20 — the learned gate                                              */
/* ================================================================== */

export const S20_Gate: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const message = b(at("That message passes"));
  const learned = b(at("learned gate"));
  const early = b(at("Early in training"));
  const shut = b(at("the gate is shut"));
  const opens = b(at("then the gate opens gradually"));
  const stable = b(at("without destabilizing training"));
  const openP = easeInOut(prog(t, opens, 1.8));
  const angle = 88 * openP;

  return (
    <>
      <g>
        <SketchLine x1={250} y1={430} x2={652} y2={430} start={message} dur={0.5} stroke={C.line} strokeWidth={10} seed={5500} />
        <SketchLine x1={808} y1={430} x2={1210} y2={430} start={message + 0.1} dur={0.5} stroke={C.line} strokeWidth={10} seed={5501} />
        <Chip x={380} y={330} text="message" color={C.pink} textColor={C.pink} start={message + 0.1} size={38} w={220} />
        <Chip x={1090} y={330} text="the loop" color={C.green} textColor={C.green} start={learned + 0.1} size={38} w={220} />

        <SketchCircle x={730} y={430} d={166} start={learned} dur={0.5} stroke={C.yellow} fill={C.panel} seed={5502} strokeWidth={3.6} />
        <g transform={`rotate(${angle} 730 430)`}>
          <SketchLine x1={730} y1={382} x2={730} y2={478} start={learned + 0.2} dur={0.3} stroke={C.yellow} strokeWidth={9} seed={5503} />
        </g>
        <SketchCircle x={730} y={430} d={14} start={learned + 0.5} dur={0.15} stroke={C.yellow} fill={C.yellow} seed={5504} strokeWidth={1.4} />
        <Label text="gate" x={730} y={565} size={40} color={C.yellow} start={learned + 0.3} />
        <Label text="shut" x={730} y={630} size={40} color={C.red} start={shut} opacity={1 - openP} />
        <Label text="open" x={730} y={630} size={40} color={C.green} start={opens} opacity={openP} />
      </g>

      <g>
        <Label text="gate openness" x={1470} y={252} size={40} color={C.soft} start={early} />
        <MiniLineChart
          x={1240}
          y={300}
          w={440}
          h={310}
          start={early}
          color={C.yellow}
          yLabels={["1", "0"]}
          xLabels={[]}
          points={[
            {x: 0, y: 0.02},
            {x: 0.25, y: 0.02},
            {x: 0.45, y: 0.08},
            {x: 0.65, y: 0.38},
            {x: 0.82, y: 0.78},
            {x: 1, y: 0.98, label: "open"},
          ]}
        />
        <Label text="training →" x={1460} y={660} size={36} color={C.soft} start={early + 0.3} />
        <Label text="opens gradually" x={1460} y={715} size={38} color={C.green} start={opens} />
      </g>

      <g opacity={prog(t, stable, 0.45)}>
        <Callout x={960} y={830} text="looping without destabilizing training" color={C.green} start={stable} size={38} w={760} icon={<Icon name="shield" color={C.green} start={stable} />} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 21 — why the middle?                                               */
/* ================================================================== */

export const S21_WhyMiddle: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const why = b(at("Why loop the middle"));
  const firstLast = b(at("first and last layers mostly translate"));
  const middle = b(at("middle does the abstract reasoning"));
  const tested = b(at("And it tested the idea"));

  const blocks = [
    {x: 380, label: "first", role: "translate", color: C.cyan},
    {x: 780, label: "middle", role: "reason", color: C.green},
    {x: 1180, label: "middle", role: "reason", color: C.green},
    {x: 1580, label: "last", role: "translate", color: C.cyan},
  ];
  return (
    <>
      <g>
        <Arrow x1={250} y1={360} x2={1780} y2={360} start={why + 0.35} dur={0.7} stroke={C.line} strokeWidth={2.4} seed={5620} head={12} opacity={0.5} />
        <SketchCircle x={250} y={360} d={16} start={why + 0.3} dur={0.2} stroke={C.line} fill={C.line} seed={5621} strokeWidth={1.4} opacity={0.6} />
        {blocks.map((b0, i) => (
          <g key={i}>
            <SketchRect x={b0.x - 150} y={420} w={300} h={220} start={why + i * 0.1} dur={0.4} stroke={b0.color} fill={C.panel} radius={16} seed={5600 + i} strokeWidth={3} />
            {Array.from({length: 4}).map((_, k) => (
              <SketchLine key={k} x1={b0.x - 110} y1={460 + k * 34} x2={b0.x + 110} y2={460 + k * 34} start={why + 0.2 + i * 0.1 + k * 0.04} dur={0.2} stroke={b0.color} strokeWidth={2.2} seed={5610 + i * 4 + k} opacity={0.55} />
            ))}
            <Label text={b0.label} x={b0.x} y={690} size={36} color={b0.color} start={why + 0.3 + i * 0.1} />
            <g opacity={prog(t, b0.role === "translate" ? firstLast : middle, 0.45)}>
              {b0.role === "translate" ? (
                <Label text="words ↔ internal" x={b0.x} y={770} size={38} color={C.fg} start={firstLast + 0.1 + i * 0.1} />
              ) : (
                <g>
                  <Icon name="brain" x={b0.x} y={760} s={0.55} color={C.green} start={middle + 0.1} />
                  <Label text="abstract reasoning" x={b0.x} y={830} size={38} color={C.green} start={middle + 0.2} />
                </g>
              )}
            </g>
          </g>
        ))}
      </g>
      <g opacity={prog(t, tested, 0.4)}>
        <Chip x={960} y={900} text="then they tested it" color={C.green} textColor={C.green} start={tested} size={38} w={360} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 22 — 27 of 28, and the compute multipliers                         */
/* ================================================================== */

export const S22_Test: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const win = b(at("beat looping the last twelve"));
  const twentySeven = b(at("27 of 28"));
  const noLoop = b(at("a model with no loop"));
  const low = b(at("1.5 to 1.9 times"));
  const lastCompute = b(at("1.2 to 1.4 times"));

  const dots = Array.from({length: 28}, (_, i) => i);
  return (
    <>
      <g>
        {dots.map((i) => (
          <SketchCircle
            key={i}
            x={330 + (i % 7) * 78}
            y={330 + Math.floor(i / 7) * 78}
            d={44}
            start={win + i * 0.018}
            dur={0.2}
            stroke={i === 27 ? C.red : C.green}
            fill={i === 27 ? C.red : C.green}
            seed={5700 + i}
            strokeWidth={2}
          />
        ))}
        <Label text="27 / 28" x={560} y={700} size={90} color={C.green} start={twentySeven} font={FONT_DISPLAY} />
        <Label text="evaluations won" x={560} y={758} size={36} color={C.soft} start={twentySeven + 0.2} />
        <Label text="looping the middle" x={560} y={812} size={38} color={C.fg} start={win + 0.4} />
      </g>

      <g>
        <SketchLine x1={880} y1={250} x2={880} y2={860} start={win} dur={0.6} stroke={C.line} strokeWidth={2.4} seed={5710} opacity={0.5} />
        <Label text="compute to match" x={1260} y={280} size={40} color={C.soft} start={noLoop} />
        <g opacity={prog(t, low, 0.45)}>
          <SketchRect x={960} y={340} w={700} h={150} start={low - 0.2} dur={0.45} stroke={C.green} fill={C.panel} radius={14} seed={5720} strokeWidth={3} />
          <Label text="middle-loop" x={990} y={380} size={36} color={C.green} align="left" start={low} />
          <Label text="1.5–1.9×" x={1630} y={430} size={82} color={C.green} align="right" start={low + 0.1} font={FONT_DISPLAY} />
          <Label text="vs no loop" x={990} y={430} size={36} color={C.soft} align="left" start={low + 0.2} />
        </g>
        <g opacity={prog(t, lastCompute, 0.45)}>
          <SketchRect x={960} y={530} w={700} h={150} start={lastCompute - 0.2} dur={0.45} stroke={C.orange} fill={C.panel} radius={14} seed={5730} strokeWidth={3} />
          <Label text="last-loop" x={990} y={570} size={36} color={C.orange} align="left" start={lastCompute} />
          <Label text="1.2–1.4×" x={1630} y={620} size={82} color={C.orange} align="right" start={lastCompute + 0.1} font={FONT_DISPLAY} />
          <Label text="vs no loop" x={990} y={620} size={36} color={C.soft} align="left" start={lastCompute + 0.2} />
        </g>
        <Label text="less extra compute" x={1260} y={790} size={40} color={C.soft} start={lastCompute + 0.4} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 23 — 5.4B weight activations                                       */
/* ================================================================== */

export const S23_Activations: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const notFree = b(at("Looping isn't free"));
  const calling = b(at("Calling this a 3.4 billion"));
  const fiveFour = b(at("5.4 billion weight activations"));
  const each = b(at("Each extra pass"));
  const adds = b(at("adds about one billion"));

  return (
    <>
      <g>
        <Label text="the name says" x={480} y={340} size={40} color={C.soft} start={calling} />
        <Chip x={480} y={430} text="3.4B" color={C.cyan} textColor={C.cyan} start={calling + 0.1} size={56} w={210} />
        <Label text="active parameters" x={480} y={520} size={36} color={C.soft} start={calling + 0.2} />
      </g>
      <g>
        <Label text="the lab reports" x={1240} y={340} size={40} color={C.soft} start={fiveFour - 0.2} />
        <SketchRect x={960} y={390} w={120} h={54} start={fiveFour} dur={0.4} stroke={C.cyan} fill={C.cyan} radius={8} seed={5800} strokeWidth={2.2} opacity={0.85} />
        <Label text="3.4B" x={1020} y={426} size={36} color={C.bg} start={fiveFour + 0.1} />
        <g opacity={prog(t, each, 0.4)}>
          <SketchRect x={1086} y={390} w={90} h={54} start={each} dur={0.4} stroke={C.green} fill={C.green} radius={8} seed={5801} strokeWidth={2.2} opacity={0.7} />
          <Label text="+1B" x={1131} y={426} size={36} color={C.bg} start={each + 0.1} />
        </g>
        <g opacity={prog(t, adds, 0.4)}>
          <SketchRect x={1182} y={390} w={90} h={54} start={adds - 0.2} dur={0.4} stroke={C.green} fill={C.green} radius={8} seed={5802} strokeWidth={2.2} opacity={0.7} />
          <Label text="+1B" x={1227} y={426} size={36} color={C.bg} start={adds - 0.1} />
        </g>
        <Stat x={1440} y={480} value="5.4B" color={C.green} size={110} start={fiveFour + 0.2} />
        <Label text="weight activations / token" x={1440} y={545} size={36} color={C.soft} start={fiveFour + 0.35} />
      </g>
      <g opacity={prog(t, fiveFour + 0.4, 0.45)}>
        <SketchLine x1={520} y1={660} x2={1440} y2={660} start={fiveFour + 0.4} dur={0.5} stroke={C.line} strokeWidth={2.4} seed={5810} opacity={0.5} />
        <Label text="each pass adds work" x={960} y={740} size={38} color={C.soft} start={fiveFour + 0.5} />
      </g>
      <Rule y={880} x1={320} x2={1600} start={notFree} opacity={0.25} />
    </>
  );
};

/* ================================================================== */
/* 24 — one fifth of Qwen's work                                      */
/* ================================================================== */

export const S24_OneFifth: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const against = b(at("Against Qwen 3.8 27B"));
  const fifth = b(at("roughly one fifth"));
  const saving = b(at("Still a big saving"));
  const notEight = b(at("Just not the eightfold gap"));

  const maxH = 430;
  return (
    <>
      <g>
        <SketchLine x1={380} y1={760} x2={1540} y2={760} start={against} dur={0.6} stroke={C.soft} strokeWidth={3} seed={5900} />
        <g>
          <SketchRect x={520} y={760 - maxH * (5.4 / 27)} w={220} h={maxH * (5.4 / 27)} start={against + 0.2} dur={0.7} stroke={C.green} fill={C.green} radius={10} seed={5901} strokeWidth={2.4} opacity={0.82} />
          <Label text="Mini" x={630} y={810} size={44} color={C.green} start={against + 0.3} />
          <Label text="5.4B" x={630} y={638} size={64} color={C.green} start={fifth} font={FONT_DISPLAY} />
          <SketchLine x1={630} y1={654} x2={630} y2={672} start={fifth + 0.15} dur={0.2} stroke={C.green} strokeWidth={2.4} seed={5903} opacity={0.7} />
        </g>
        <g>
          <SketchRect x={1080} y={760 - maxH} w={220} h={maxH} start={against + 0.35} dur={0.7} stroke={C.purple} fill={C.purple} radius={10} seed={5902} strokeWidth={2.4} opacity={0.28} />
          <Label text="Qwen" x={1190} y={810} size={44} color={C.purple} start={against + 0.45} opacity={0.75} />
          <Label text="27B" x={1190} y={280} size={64} color={C.purple} start={against + 0.55} font={FONT_DISPLAY} opacity={0.75} />
        </g>
        <g opacity={prog(t, fifth, 0.5)}>
          <Label text="≈ 1/5" x={1430} y={500} size={104} color={C.yellow} start={fifth} font={FONT_DISPLAY} opacity={0.85} />
          <Label text="the work per token" x={1420} y={570} size={36} color={C.soft} start={fifth + 0.2} />
        </g>
      </g>
      <g opacity={prog(t, saving, 0.4)}>
        <Label text="still a big saving" x={960} y={860} size={42} color={C.green} start={saving} />
      </g>
      <g opacity={prog(t, notEight, 0.4)}>
        <Chip x={650} y={270} text="not 8×" color={C.red} textColor={C.red} start={notEight} size={40} w={210} />
        <SketchLine x1={550} y1={270} x2={750} y2={270} start={notEight + 0.3} dur={0.25} stroke={C.red} strokeWidth={5} seed={5910} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 25 — writes more, still cheaper overall                            */
/* ================================================================== */

export const S25_Tokens: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const notFifth = b(at("And it isn't a fifth overall"));
  const writeMore = b(at("tends to write more"));
  const thirtyEight = b(at("38 percent more output tokens"));
  const proxy = b(at("compute proxy"));
  const multiplies = b(at("multiplies active parameters"));
  const twoEight = b(at("2.8 times lower"));

  return (
    <>
      <g>
        <SketchRect x={300} y={330} w={600} h={300} start={notFifth} dur={0.5} stroke={C.line} fill={C.panel} radius={16} seed={6000} strokeWidth={2.6} />
        <Label text="tokens to the same score" x={600} y={390} size={38} color={C.soft} start={writeMore} />
        <g opacity={prog(t, thirtyEight, 0.5)}>
          <SketchRect x={390} y={470} w={300 * 1.38} h={54} start={thirtyEight} dur={0.6} stroke={C.green} fill={C.green} radius={8} seed={6001} strokeWidth={2.2} opacity={0.8} />
          <Label text="Mini +38%" x={500} y={444} size={36} color={C.green} start={thirtyEight + 0.2} />
          <SketchRect x={390} y={560} w={300} h={54} start={thirtyEight + 0.3} dur={0.5} stroke={C.purple} fill={C.purple} radius={8} seed={6002} strokeWidth={2.2} opacity={0.7} />
          <Label text="Qwen" x={500} y={542} size={36} color={C.purple} start={thirtyEight + 0.4} />
        </g>
      </g>

      <g>
        <SketchRect x={1010} y={330} w={610} h={300} start={-1} dur={0.5} stroke={C.yellow} fill={C.panel} radius={16} seed={6010} strokeWidth={2.6} />
        <Label text="compute proxy" x={1315} y={390} size={40} color={C.yellow} start={notFifth + 0.2} />
        <Label text="active params × tokens" x={1315} y={455} size={36} color={C.soft} start={multiplies} />
        <Stat x={1315} y={570} value="2.8×" color={C.green} size={110} start={twoEight} />
        <Label text="lower for Mini" x={1315} y={620} size={36} color={C.soft} start={twoEight + 0.2} />
      </g>

      <g opacity={prog(t, thirtyEight + 0.4, 0.45)}>
        <Label text="writes more, still costs less" x={960} y={760} size={42} color={C.soft} start={thirtyEight + 0.4} />
      </g>
      <Rule y={880} x1={300} x2={1620} start={notFifth} opacity={0.25} />
    </>
  );
};

/* ================================================================== */
/* 26 — the trade: training vs inference                              */
/* ================================================================== */

export const S26_Trade: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const unpruned = b(at("test on unpruned versions"));
  const seven = b(at("7.5 percent cheaper to train"));
  const more = b(at("140 percent more inference"));
  const traces = b(at("512,000 token agentic traces"));
  const little = b(at("A little extra at training time"));
  const home = b(at("For anyone running models at home"));

  return (
    <>
      <g>
        <SketchLine x1={300} y1={350} x2={1620} y2={350} start={unpruned} dur={0.6} stroke={C.line} strokeWidth={3} seed={6100} />
        <Label text="non-looping model" x={960} y={300} size={36} color={C.soft} start={unpruned + 0.2} />
        <g opacity={prog(t, seven, 0.45)}>
          <SketchRect x={350} y={430} w={520} h={190} start={seven} dur={0.45} stroke={C.green} fill={C.panel} radius={16} seed={6110} strokeWidth={3} />
          <Label text="training" x={610} y={490} size={40} color={C.soft} start={seven + 0.1} />
          <Stat x={610} y={570} value="−7.5%" color={C.green} size={94} start={seven + 0.2} />
          
        </g>
        <g opacity={prog(t, more, 0.45)}>
          <SketchRect x={1050} y={430} w={520} h={190} start={more} dur={0.45} stroke={C.red} fill={C.panel} radius={16} seed={6120} strokeWidth={3} />
          <Label text="inference" x={1310} y={490} size={40} color={C.soft} start={more + 0.1} />
          <Stat x={1310} y={570} value="+140%" color={C.red} size={94} start={more + 0.2} />
          
        </g>
        <g opacity={prog(t, traces, 0.45)}>
          <Label text="on 512,000-token agentic traces" x={960} y={700} size={36} color={C.soft} start={traces} />
        </g>
      </g>
      <g opacity={prog(t, little, 0.45)}>
        <Callout x={960} y={810} text="extra training, saved runtime" color={C.green} start={little} size={38} w={980} icon={<Icon name="scale" color={C.green} start={little} />} />
      </g>
      <g opacity={prog(t, home, 0.4)}>
        <Label text="the right direction for local models" x={960} y={900} size={38} color={C.soft} start={home} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 27 — no extra facts                                                */
/* ================================================================== */

export const S27_Facts: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const cant = b(at("What looping can't do"));
  const noFacts = b(at("doesn't store extra facts"));
  const knowledge = b(at("knowledge mostly tracks total parameter count"));

  return (
    <>
      <g>
        <SketchRect x={300} y={330} w={520} h={390} start={cant} dur={0.5} stroke={C.line} fill={C.panel} radius={16} seed={6200} strokeWidth={2.6} />
        <Label text="facts" x={560} y={395} size={40} color={C.soft} start={cant + 0.2} />
        <Book x={560} y={560} s={1.1} start={cant + 0.3} color={C.cyan} />
        <g opacity={prog(t, noFacts, 0.4)}>
          <SketchLine x1={390} y1={660} x2={730} y2={420} start={noFacts} dur={0.3} stroke={C.red} strokeWidth={7} seed={6201} />
          <SketchLine x1={730} y1={660} x2={390} y2={420} start={noFacts + 0.1} dur={0.3} stroke={C.red} strokeWidth={7} seed={6202} />
          <Label text="no extra facts" x={560} y={790} size={50} color={C.red} start={noFacts + 0.2} font={FONT_DISPLAY} />
        </g>
      </g>
      <g opacity={prog(t, knowledge, 0.45)}>
        <SketchRect x={960} y={330} w={640} h={390} start={knowledge - 0.2} dur={0.5} stroke={C.yellow} fill={C.panel} radius={16} seed={6210} strokeWidth={2.6} />
        <Label text="knowledge" x={1280} y={400} size={44} color={C.yellow} start={knowledge} />
        <Label text="tracks" x={1280} y={480} size={40} color={C.soft} start={knowledge + 0.1} />
        <Label text="total parameters" x={1280} y={560} size={54} color={C.yellow} start={knowledge + 0.25} font={FONT_DISPLAY} />
        <Label text="not the number of passes" x={1280} y={640} size={38} color={C.soft} start={knowledge + 0.4} />
      </g>
      <Rule y={880} x1={300} x2={1620} start={cant} opacity={0.25} />
    </>
  );
};

/* ================================================================== */
/* 28 — research version: choose your passes                          */
/* ================================================================== */

export const S28_Research: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const research = b(at("released a research version"));
  const choose = b(at("choose how many passes"));
  const longCtx = b(at("tasks that need long context"));
  const trivia = b(at("closed book trivia barely moved"));

  return (
    <>
      <g>
        <SketchRect x={300} y={330} w={330} h={430} start={research} dur={0.5} stroke={C.yellow} fill={C.panel} radius={18} seed={6300} strokeWidth={3} />
        <Label text="passes" x={465} y={390} size={40} color={C.soft} start={research + 0.2} />
        {Array.from({length: 10}).map((_, i) => (
          <SketchCircle key={i} x={465} y={450 + i * 30} d={14} start={research + 0.3 + i * 0.03} dur={0.15} stroke={i === 2 ? C.yellow : C.line} fill={i === 2 ? C.yellow : C.well} seed={6310 + i} strokeWidth={2} />
        ))}
        <Label text="1–10" x={465} y={790} size={50} color={C.yellow} start={choose + 0.2} font={FONT_DISPLAY} />
      </g>
      <g>
        <Label text="what improves" x={1240} y={300} size={40} color={C.soft} start={longCtx} />
        <MiniLineChart
          x={900}
          y={350}
          w={620}
          h={390}
          start={longCtx}
          color={C.green}
          xLabels={["1", "3", "5", "10"]}
          yLabels={["high", "low"]}
          points={[
            {x: 0, y: 0.12},
            {x: 0.22, y: 0.28},
            {x: 0.45, y: 0.5},
            {x: 0.7, y: 0.78},
            {x: 1, y: 0.95},
          ]}
        />
        <SketchLine x1={900} y1={700} x2={1500} y2={700} start={trivia} dur={0.5} stroke={C.soft} strokeWidth={3} seed={6320} opacity={0.6} />
        <Label text="trivia" x={1530} y={700} size={36} color={C.soft} align="left" start={trivia + 0.3} />
        <Label text="long context + reasoning" x={1120} y={850} size={38} color={C.green} start={longCtx + 0.3} />
        <Label text="trivia stays flat" x={1120} y={900} size={38} color={C.soft} start={trivia} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 29 — Think Fast: 16s → 37s                                         */
/* ================================================================== */

export const S29_ThinkFast: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const think = b(at("The first is called Think Fast"));
  const horizon = b(at("no chain of thought time horizon"));
  const sixteen = b(at("16 seconds at one pass"));
  const thirtySeven = b(at("37 seconds at three passes"));
  const flat = b(at("flattened out"));

  return (
    <>
      <g opacity={prog(t, horizon, 0.45)}>
        <Label text="no-reasoning time horizon" x={960} y={285} size={40} color={C.soft} start={horizon} />
      </g>
      <MiniLineChart
        x={430}
        y={360}
        w={1060}
        h={380}
        start={think}
        color={C.green}
        xLabels={["1", "2", "3", "5", "10"]}
        yLabels={["0", "20 s", "40 s"]}
        xTitle="passes"
        yTitle="seconds"
        points={[
          {x: 0, y: 16 / 40, label: "16s", color: C.cyan},
          {x: 0.22, y: 30 / 40},
          {x: 0.44, y: 37 / 40, label: "37s", color: C.green},
          {x: 0.7, y: 37 / 40},
          {x: 1, y: 37 / 40},
        ]}
      />
      <g opacity={prog(t, sixteen, 0.4)}>
        <Label text="one pass" x={430} y={820} size={38} color={C.cyan} start={sixteen} />
      </g>
      <g opacity={prog(t, thirtySeven, 0.4)}>
        <Label text="three passes" x={780} y={820} size={38} color={C.green} start={thirtySeven + 0.3} />
      </g>
      <g opacity={prog(t, flat, 0.4)}>
        <Label text="then it flattens" x={1370} y={820} size={38} color={C.soft} start={flat} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 30 — N-Hop Lookup                                                  */
/* ================================================================== */

export const S30_NHop: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const second = b(at("The second is N Hop Lookup"));
  const tables = b(at("several lookup tables"));
  const chain = b(at("follow a chain of lookups"));
  const five = b(at("five answer options"));
  const twenty = b(at("random guessing scores 20"));

  return (
    <>
      <g>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <SketchRect x={300 + i * 330} y={310} w={270} h={230} start={tables + i * 0.1} dur={0.4} stroke={C.orange} fill={C.panel} radius={10} seed={6400 + i} strokeWidth={2.8} />
            <Label text={`table ${i + 1}`} x={435 + i * 330} y={290} size={36} color={C.orange} start={tables + i * 0.1 + 0.1} />
            <LookupTable x={330 + i * 330} y={340} cols={4} rows={4} start={tables + i * 0.1 + 0.1} color={C.orange} highlight={-1} gapX={60} gapY={42} />
          </g>
        ))}
        <Arrow x1={590} y1={425} x2={625} y2={425} start={tables + 0.4} dur={0.3} stroke={C.orange} strokeWidth={3} seed={6403} head={12} />
        <Arrow x1={920} y1={425} x2={955} y2={425} start={tables + 0.5} dur={0.3} stroke={C.orange} strokeWidth={3} seed={6404} head={12} />
        <Label text="no notes allowed" x={1260} y={610} size={38} color={C.soft} start={chain} />
      </g>

      <g>
        <Label text="five options" x={700} y={720} size={40} color={C.soft} start={five} />
        {["A", "B", "C", "D", "E"].map((s, i) => (
          <SketchRect key={s} x={300 + i * 100} y={760} w={80} h={60} start={five + 0.1 + i * 0.06} dur={0.25} stroke={i === 2 ? C.green : C.line} fill={i === 2 ? C.panel : C.well} radius={8} seed={6410 + i} strokeWidth={i === 2 ? 2.8 : 2} />
        ))}
        {["A", "B", "C", "D", "E"].map((s, i) => (
          <Label key={s} text={s} x={340 + i * 100} y={802} size={36} color={i === 2 ? C.green : C.soft} start={five + 0.2 + i * 0.06} />
        ))}
        <g opacity={prog(t, twenty, 0.45)}>
          <Label text="20%" x={1280} y={810} size={120} color={C.yellow} start={twenty} font={FONT_DISPLAY} />
          <Label text="random guess" x={1280} y={860} size={36} color={C.soft} start={twenty + 0.2} />
        </g>
      </g>
      <Rule y={900} x1={300} x2={1620} start={second} opacity={0.25} />
    </>
  );
};

/* ================================================================== */
/* 31 — accuracy keeps improving to ten passes                        */
/* ================================================================== */

export const S31_TenPasses: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const accuracy = b(at("accuracy on longer chains"));
  const ten = b(at("all the way to ten passes"));
  const trained = b(at("trained with up to five"));

  return (
    <>
      <g>
        <MiniLineChart
          x={420}
          y={330}
          w={1080}
          h={420}
          start={accuracy}
          color={C.green}
          xLabels={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
          yLabels={["80%", "50%", "20%"]}
          xTitle="passes"
          yTitle="accuracy"
          points={[
            {x: 0, y: 0.22},
            {x: 0.22, y: 0.34},
            {x: 0.44, y: 0.47},
            {x: 0.66, y: 0.6},
            {x: 0.88, y: 0.72},
            {x: 1, y: 0.8, label: "10 passes", color: C.yellow},
          ]}
        />
      </g>
      <g opacity={prog(t, trained, 0.4)}>
        <SketchLine x1={960} y1={380} x2={960} y2={750} start={trained} dur={0.35} stroke={C.red} strokeWidth={2.8} seed={6500} dash />
        <Label text="only trained to 5" x={960} y={290} size={38} color={C.red} start={trained + 0.15} />
      </g>
      <g opacity={prog(t, ten, 0.4)}>
        <Label text="still climbing at 10" x={1370} y={290} size={38} color={C.green} start={ten} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 32 — fit into 20 GB: pruning 384 → 128                             */
/* ================================================================== */

export const S32_Pruning: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const fit = b(at("how does a model like this fit"));
  const two = b(at("two decisions"));
  const pruning = b(at("First, pruning"));
  const began = b(at("Training began with 384"));
  const chosen = b(at("eight chosen"));
  const cut = b(at("cut two thirds"));
  const keep = b(at("keeping the 128"));

  return (
    <>
      <g opacity={prog(t, two, 0.4)}>
        <Chip x={510} y={300} text="weight sharing" color={C.cyan} textColor={C.cyan} start={two} size={38} w={320} />
        <Chip x={1410} y={300} text="+ two decisions" color={C.yellow} textColor={C.yellow} start={two + 0.3} size={38} w={330} />
      </g>
      <g>
        <Label text="experts per layer" x={300} y={430} size={40} color={C.soft} align="left" start={pruning} />
        <g>
          {Array.from({length: 384}).map((_, i) => {
            const c = i % 32;
            const r = Math.floor(i / 32);
            const kept = i < 128;
            return (
              <SketchRect
                key={i}
                x={300 + c * 27}
                y={470 + r * 27}
                w={18}
                h={18}
                start={began + i * 0.0015}
                dur={0.12}
                stroke={kept ? C.green : C.line}
                fill={kept ? C.green : C.well}
                radius={3}
                seed={6600 + i}
                strokeWidth={kept ? 1.6 : 1.2}
                opacity={kept ? 1 : 0.4}
              />
            );
          })}
        </g>
        <Label text="384" x={1500} y={520} size={92} color={C.cyan} start={began} font={FONT_DISPLAY} />
        <g opacity={prog(t, cut, 0.4)}>
          <SketchLine x1={300} y1={430} x2={860} y2={430} start={cut} dur={0.3} stroke={C.red} strokeWidth={4} seed={6610} />
          <Label text="cut 2/3" x={1500} y={640} size={54} color={C.red} start={cut + 0.1} font={FONT_DISPLAY} />
        </g>
        <g opacity={prog(t, keep, 0.4)}>
          <Label text="128 left" x={1500} y={740} size={64} color={C.green} start={keep} font={FONT_DISPLAY} />
          <Label text="most-used experts" x={1500} y={800} size={38} color={C.soft} start={keep + 0.2} />
        </g>
      </g>
      <g opacity={prog(t, chosen, 0.4)}>
        <Label text="8 chosen per token" x={960} y={900} size={38} color={C.soft} start={chosen} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 33 — healing, SFT, RL                                              */
/* ================================================================== */

export const S33_Healing: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const heal = b(at("To heal the damage"));
  const trillion = b(at("trillion tokens distilled"));
  const sft = b(at("supervised fine tuning"));
  const rl = b(at("reinforcement learning phase"));
  const twoTwo = b(at("2.2 trillion tokens"));
  const steps = b(at("2,000 steps"));

  return (
    <>
      <g>
        <SketchLine x1={260} y1={440} x2={1660} y2={440} start={heal} dur={0.7} stroke={C.line} strokeWidth={4} seed={6700} />
        <Arrow x1={260} y1={440} x2={1660} y2={440} start={heal} dur={0.7} stroke={C.line} strokeWidth={2.6} seed={6701} head={14} opacity={0.6} />
        <Stage x={400} label="distill" at={trillion} color={C.cyan} title="1T tokens" sub="from larger Inkling" />
        <Stage x={880} label="SFT" at={sft} color={C.green} title="supervised" sub="fine-tuning" />
        <Stage x={1380} label="RL" at={rl} color={C.pink} title="2.2T tokens" sub="2,000 steps" />
      </g>
      <g opacity={prog(t, sft, 0.4)}>
        <Label text="after pruning" x={960} y={760} size={40} color={C.soft} start={heal + 0.3} />
      </g>
      <g opacity={prog(t, twoTwo, 0.4)}>
        <Label text="all within the 20 GB target" x={960} y={860} size={38} color={C.yellow} start={steps + 0.2} />
      </g>
      <Rule y={920} x1={300} x2={1620} start={heal} opacity={0.25} />
    </>
  );
};

const Stage: React.FC<{x: number; label: string; at: number; color: string; title: string; sub: string}> = ({x, label, at, color, title, sub}) => (
  <g>
    <SketchCircle x={x} y={440} d={104} start={at} dur={0.4} stroke={color} fill={C.panel} seed={6710 + x} strokeWidth={3.2} />
    <Label text={label} x={x} y={440} size={40} color={color} start={at + 0.1} />
    <Label text={title} x={x} y={580} size={52} color={C.fg} start={at + 0.2} font={FONT_DISPLAY} />
    <Label text={sub} x={x} y={640} size={36} color={C.soft} start={at + 0.3} />
  </g>
);

/* ================================================================== */
/* 34 — precision: NVFP4 and MXFP8                                    */
/* ================================================================== */

export const S34_Precision: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const precision = b(at("Second, precision"));
  const nvfp = b(at("N V F P four"));
  const every = b(at("every forward pass"));
  const final = b(at("final four layers"));
  const mxfp = b(at("M X F P eight"));

  return (
    <>
      <g>
        <Label text="the layers" x={300} y={300} size={40} color={C.soft} align="left" start={precision} />
        {Array.from({length: 24}).map((_, i) => (
          <SketchRect
            key={i}
            x={300 + (i % 12) * 55}
            y={340 + Math.floor(i / 12) * 66}
            w={44}
            h={50}
            start={precision + i * 0.02}
            dur={0.2}
            stroke={i < 20 ? C.purple : C.cyan}
            fill={i < 20 ? C.purple : C.cyan}
            radius={6}
            seed={6800 + i}
            strokeWidth={2}
            opacity={i < 20 ? 0.75 : 0.9}
          />
        ))}
        <g opacity={prog(t, nvfp, 0.4)}>
          <SketchRect x={300} y={500} w={310} h={120} start={nvfp} dur={0.4} stroke={C.purple} fill={C.panel} radius={12} seed={6830} strokeWidth={3} />
          <Label text="NVFP4" x={455} y={545} size={52} color={C.purple} start={nvfp + 0.1} font={FONT_DISPLAY} />
          <Label text="20 layers" x={455} y={592} size={36} color={C.soft} start={nvfp + 0.2} />
        </g>
        <g opacity={prog(t, final, 0.4)}>
          <SketchRect x={650} y={500} w={310} h={120} start={final} dur={0.4} stroke={C.cyan} fill={C.panel} radius={12} seed={6840} strokeWidth={3} />
          <Label text="MXFP8" x={805} y={545} size={52} color={C.cyan} start={mxfp - 0.1} font={FONT_DISPLAY} />
          <Label text="final 4 layers" x={805} y={592} size={36} color={C.soft} start={mxfp + 0.1} />
        </g>
      </g>

      <g>
        <SketchRect x={1080} y={280} w={540} h={330} start={precision + 0.3} dur={0.5} stroke={C.line} fill={C.panel} radius={16} seed={6850} strokeWidth={2.6} />
        <Label text="4-bit" x={1350} y={350} size={54} color={C.purple} start={nvfp + 0.3} font={FONT_DISPLAY} />
        <Label text="expert layers" x={1350} y={410} size={38} color={C.soft} start={nvfp + 0.4} />
        <SketchLine x1={1160} y1={450} x2={1540} y2={450} start={every} dur={0.4} stroke={C.line} strokeWidth={2} seed={6851} opacity={0.6} />
        <Label text="every forward pass" x={1350} y={510} size={38} color={C.fg} start={every + 0.12} />
        <Label text="pretraining → RL" x={1350} y={565} size={36} color={C.soft} start={every + 0.25} />
      </g>
      <g opacity={prog(t, mxfp + 0.4, 0.4)}>
        <Label text="no conversion loss, says the lab" x={960} y={820} size={40} color={C.green} start={mxfp + 0.4} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 35 — released layout and the GGUF caveat                           */
/* ================================================================== */

export const S35_GGUF: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const released = b(at("released weights keep exactly"));
  const twenty = b(at("twenty layers"));
  const four = b(at("four in the second"));
  const noLoss = b(at("no conversion loss"));
  const promise = b(at("That promise belongs"));
  const gguf = b(at("A community G G U F file"));

  return (
    <>
      <g>
        <SketchRect x={300} y={330} w={640} h={340} start={released} dur={0.5} stroke={C.line} fill={C.panel} radius={16} seed={6900} strokeWidth={2.6} />
        <Label text="the original checkpoint" x={620} y={390} size={40} color={C.soft} start={released + 0.1} />
        {Array.from({length: 4}).map((_, r) =>
          Array.from({length: 6}).map((_, c) => {
            const i = r * 6 + c;
            return <SketchRect key={i} x={370 + c * 92} y={440 + r * 52} w={74} h={38} start={released + 0.2 + i * 0.015} dur={0.2} stroke={i < 20 ? C.purple : C.cyan} fill={i < 20 ? C.purple : C.cyan} radius={4} seed={6910 + i} strokeWidth={1.8} opacity={0.8} />;
          }),
        )}
        <Label text="20 × 4-bit" x={450} y={640} size={36} color={C.purple} start={twenty} />
        <Label text="4 × 8-bit" x={700} y={640} size={36} color={C.cyan} start={four} />
      </g>
      <g opacity={prog(t, noLoss, 0.45)}>
        <Label text="no conversion loss" x={620} y={760} size={44} color={C.green} start={noLoss} />
      </g>
      <g>
        <SketchRect x={1050} y={330} w={580} h={340} start={promise - 0.2} dur={0.5} stroke={C.orange} fill={C.panel} radius={16} seed={6920} strokeWidth={2.6} />
        <Label text="a community GGUF" x={1340} y={390} size={40} color={C.orange} start={gguf} />
        <Label text="a different artifact" x={1340} y={455} size={46} color={C.fg} start={gguf + 0.15} font={FONT_DISPLAY} />
        <Label text="its own quants, its own reference" x={1340} y={530} size={36} color={C.soft} start={gguf + 0.3} />
        <Label text="the promise doesn't travel" x={1340} y={600} size={36} color={C.orange} start={gguf + 0.45} />
      </g>
      <Rule y={880} x1={300} x2={1620} start={released} opacity={0.25} />
    </>
  );
};

/* ================================================================== */
/* 36 — Unsloth quant agreement                                       */
/* ================================================================== */

export const S36_Quants: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const unsloth = b(at("Unsloth measured"));
  const four = b(at("recommended four bit file"));
  const gb = b(at("17.6 gigabytes"));
  const ninetyEight = b(at("98 percent"));
  const two = b(at("two bit file"));
  const eightFive = b(at("8.5 gigabytes"));
  const ninetySix = b(at("90.6 percent"));

  return (
    <>
      <g>
        <SketchRect x={300} y={320} w={560} h={400} start={four - 0.2} dur={0.5} stroke={C.green} fill={C.panel} radius={16} seed={7000} strokeWidth={3} />
        <Label text="4-bit" x={580} y={390} size={50} color={C.green} start={four} font={FONT_DISPLAY} />
        <Stat x={580} y={500} value="17.6 GB" color={C.fg} size={84} start={gb} />
        <Label text="same top token" x={580} y={580} size={38} color={C.soft} start={ninetyEight - 0.2} />
        <Stat x={580} y={680} value="98%" color={C.green} size={110} start={ninetyEight} />
      </g>
      <g>
        <SketchRect x={1060} y={320} w={560} h={400} start={two - 0.2} dur={0.5} stroke={C.orange} fill={C.panel} radius={16} seed={7010} strokeWidth={3} />
        <Label text="2-bit" x={1340} y={390} size={50} color={C.orange} start={two} font={FONT_DISPLAY} />
        <Stat x={1340} y={500} value="8.5 GB" color={C.fg} size={84} start={eightFive} />
        <Label text="same top token" x={1340} y={580} size={38} color={C.soft} start={ninetySix - 0.2} />
        <Stat x={1340} y={680} value="90.6%" color={C.orange} size={110} start={ninetySix} />
      </g>
      <Label text="agreement with its own reference" x={960} y={800} size={38} color={C.soft} start={ninetyEight + 0.2} />
    </>
  );
};

/* ================================================================== */
/* 37 — agreement isn't a test suite                                  */
/* ================================================================== */

export const S37_TestSuite: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const close = b(at("That's close"));
  const notSame = b(at("isn't the same as passing a test suite"));
  const okay = b(at("Okay"));
  const scoreboard = b(at("The scoreboard"));

  const out = easeInOut(prog(t, scoreboard - 0.2, 0.7));
  return (
    <>
      <g opacity={1 - out}>
        <Label text="same token" x={560} y={360} size={56} color={C.cyan} start={close} font={FONT_DISPLAY} />
        <CheckDot x={800} y={350} at={close + 0.2} color={C.green} />
        <Label text="≠" x={960} y={430} size={140} color={C.red} start={notSame} font={FONT_DISPLAY} />
        <Label text="test suite" x={1360} y={360} size={56} color={C.red} start={notSame + 0.2} font={FONT_DISPLAY} />
        <DocPage x={1260} y={420} w={220} h={260} start={notSame} color={C.red} lines={4} />
        <g opacity={prog(t, notSame + 0.3, 0.4)}>
          <Cross x={1370} y={470} at={notSame + 0.3} />
        </g>
        <Label text="close isn't enough" x={960} y={800} size={40} color={C.soft} start={notSame + 0.4} />
      </g>

      <g opacity={prog(t, okay - 0.2, 0.5)}>
        <Label text="okay." x={960} y={400} size={160} color={C.yellow} start={okay} font={FONT_DISPLAY} />
        <Label text="the scoreboard" x={960} y={560} size={100} color={C.fg} start={scoreboard} font={FONT_DISPLAY} />
        <SketchLine x1={640} y1={640} x2={1280} y2={640} start={scoreboard + 0.2} dur={0.5} stroke={C.yellow} strokeWidth={3} seed={7100} opacity={0.7} />
      </g>
    </>
  );
};

const CheckDot: React.FC<{x: number; y: number; at: number; color: string}> = ({x, y, at, color}) => (
  <g>
    <SketchCircle x={x} y={y} d={58} start={at} dur={0.3} stroke={color} fill={color} seed={7020} strokeWidth={2.4} />
    <SketchPath d={`M ${x - 12} ${y} L ${x - 2} ${y + 11} L ${x + 15} ${y - 12}`} start={at + 0.25} dur={0.2} stroke={C.bg} strokeWidth={4.4} seed={7021} />
  </g>
);

const Cross: React.FC<{x: number; y: number; at: number}> = ({x, y, at}) => (
  <g>
    <SketchLine x1={x - 30} y1={y - 30} x2={x + 30} y2={y + 30} start={at} dur={0.25} stroke={C.red} strokeWidth={6} seed={7030} />
    <SketchLine x1={x + 30} y1={y - 30} x2={x - 30} y2={y + 30} start={at + 0.1} dur={0.25} stroke={C.red} strokeWidth={6} seed={7031} />
  </g>
);
